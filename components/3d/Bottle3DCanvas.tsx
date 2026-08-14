"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Bottle3DProps {
  productSlug: string;
  productName: string;
  className?: string;
  onBottleClick?: () => void;
  onUserInteract?: () => void;
}

const PRODUCT_LABELS: Record<string, { hindi: string; concern: string; color: string; tagline: string }> = {
  gasogex: { hindi: "गैस-ओ-जेक्स", concern: "DIGESTIVE CARE", color: "#5F7348", tagline: "For bloating, wind and heavy stomach" },
  kabzraj: { hindi: "कबजराज", concern: "BOWEL REGULATION", color: "#C44900", tagline: "Classical constipation relief formulation" },
  livgex: { hindi: "लिवजेक्स", concern: "LIVER PROTECTION", color: "#1E4D6B", tagline: "Herbal liver detox & metabolic support" },
  pilegex: { hindi: "पाइलजेक्स", concern: "PILES CARE", color: "#8C4227", tagline: "Soothing relief for anorectal health" },
  lucogex: { hindi: "लुकोजेक्स", concern: "WOMEN'S WELLNESS", color: "#B85B7A", tagline: "For white discharge & intimate health" },
};

function createProceduralLabelCanvas(slug: string, name: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const meta = PRODUCT_LABELS[slug] || { hindi: name, concern: "BOTANICAL FORMULATION", color: "#c44900", tagline: "Classical Botanical Remedy" };

  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 512);

    ctx.strokeStyle = "#e2dacd";
    ctx.lineWidth = 12;
    ctx.strokeRect(12, 12, 1000, 488);

    ctx.fillStyle = meta.color;
    ctx.fillRect(20, 20, 984, 75);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${meta.hindi}  •  ${meta.concern}`, 512, 68);

    ctx.fillStyle = "#111315";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("REGEX REMEDIES", 512, 140);

    ctx.fillStyle = "#6f6a62";
    ctx.font = "16px sans-serif";
    ctx.fillText("AYUSH LIC. PB/AY/000000  •  GMP CERTIFIED", 512, 168);

    ctx.strokeStyle = "#c44900";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(180, 190);
    ctx.lineTo(844, 190);
    ctx.stroke();

    ctx.fillStyle = "#111315";
    ctx.font = "900 68px serif";
    ctx.fillText(name.toUpperCase(), 512, 280);

    ctx.fillStyle = "#4a453e";
    ctx.font = "italic 22px serif";
    ctx.fillText(`"${meta.tagline}"`, 512, 330);

    ctx.fillStyle = "#f4d800";
    ctx.fillRect(20, 380, 984, 112);

    ctx.fillStyle = "#111315";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("100% BOTANICAL FORMULATION", 512, 430);

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#111315";
    ctx.fillText("SCHEDULE T GMP  •  NABL LAB TESTED  •  24 TABLETS", 512, 466);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function Bottle3DCanvas({
  productSlug,
  productName,
  className = "",
  onBottleClick,
  onUserInteract,
}: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const userInteractedRef = useRef(false);
  const previousTouchRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetScaleRef = useRef<number>(1.0);
  const currentScaleRef = useRef<number>(0.96);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Three.js Scene & Renderer Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const initialCamZ = 4.4;
    camera.position.set(0, 0, initialCamZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. High-Gloss Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xfaf8f3);
    
    // Large Softbox Reflection Mesh
    const softbox = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    softbox.position.set(0, 8, 4);
    softbox.lookAt(0, 0, 0);
    envScene.add(softbox);

    const envTexture = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3. DEDICATED STUDIO HEROLIGHTING SETUP (Fixed in World Space)
    // Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Primary Overhead Large Soft Key Light (Softbox Overhead)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 0.0); // Starts at 0, ramps to 3.8
    keyLight.position.set(0, 5.0, 2.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Subtle Rim Light (Separates Black Bottle from Parchment Background)
    const rimLight = new THREE.DirectionalLight(0xfff5ea, 1.2);
    rimLight.position.set(-3.5, 3.0, -2.8);
    scene.add(rimLight);

    // Soft Front Fill Light (Keeps Label Crisp & Un-overexposed)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(0, 0.5, 4.5);
    scene.add(fillLight);

    // Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 0.4);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 4. Build High-Precision Glossy Black Bottle Group
    const bottleGroup = new THREE.Group();

    // Bottle Body Geometry
    const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 1.65, 64);

    // Product Label Texture (Image + Procedural Canvas Fallback)
    const labelTexture = createProceduralLabelCanvas(productSlug, productName);
    
    // Attempt Image Texture Load
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `/products/${productSlug}.png`,
      (imgTex) => {
        imgTex.colorSpace = THREE.SRGBColorSpace;
        imgTex.needsUpdate = true;
        labelMaterial.map = imgTex;
        labelMaterial.needsUpdate = true;
        setLoading(false);
      },
      undefined,
      () => setLoading(false)
    );

    // Glossy Jet Black Plastic Material (NOT Grey)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f1115, // Pure Glossy Jet Black Plastic
      roughness: 0.16,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });

    const bottleBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Front Product Label Cylinder
    const labelGeometry = new THREE.CylinderGeometry(0.76, 0.76, 1.45, 64, 1, true, -Math.PI / 2.2, Math.PI / 1.1);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      transparent: true,
      roughness: 0.18,
      metalness: 0.02,
    });

    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    bottleGroup.add(labelMesh);

    // Bottle Neck & Cap
    const neckGeometry = new THREE.CylinderGeometry(0.48, 0.68, 0.38, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 0.98;
    bottleGroup.add(neckMesh);

    // Ribbed Safety Cap Group (Deep Black Plastic)
    const capGroup = new THREE.Group();
    const capGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.36, 64);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161c,
      roughness: 0.24,
      metalness: 0.15,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.castShadow = true;
    capGroup.add(capMesh);

    // Vertical Cap Ridges
    const ridgeGeo = new THREE.BoxGeometry(0.02, 0.34, 0.03);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x1c1f26, roughness: 0.3 });
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(Math.cos(angle) * 0.525, 0, Math.sin(angle) * 0.525);
      ridge.rotation.y = -angle;
      capGroup.add(ridge);
    }

    capGroup.position.y = 1.32;
    bottleGroup.add(capGroup);

    // Soft Contact Ground Drop Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x111315,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    scene.add(shadowPlane);

    scene.add(bottleGroup);

    // Phase 1 Entrance Animation
    bottleGroup.position.y = -0.35;
    bottleGroup.scale.set(0.96, 0.96, 0.96);

    let revealCompleted = prefersReducedMotion;
    const revealTargetY = prefersReducedMotion ? 0 : Math.PI * 0.78;
    let revealProgress = 0;

    const notifyInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        if (onUserInteract) onUserInteract();
      }
    };

    // 5. Touch & Drag Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      notifyInteraction();
      previousTouchRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousTouchRef.current.x;
      const deltaY = e.clientY - previousTouchRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x));

      velocityRef.current = { x: deltaY * 0.002, y: deltaX * 0.004 };
      previousTouchRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      notifyInteraction();
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        previousTouchRef.current.dist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - previousTouchRef.current.x;
        const deltaY = e.touches[0].clientY - previousTouchRef.current.y;

        targetRotationRef.current.y += deltaX * 0.012;
        velocityRef.current.y = deltaX * 0.005;

        targetRotationRef.current.x += deltaY * 0.004;
        targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x));

        previousTouchRef.current.x = e.touches[0].clientX;
        previousTouchRef.current.y = e.touches[0].clientY;
      } else if (e.touches.length === 2 && previousTouchRef.current.dist) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.hypot(dx, dy);
        const factor = previousTouchRef.current.dist / newDist;
        camera.position.z = Math.max(initialCamZ * 0.85, Math.min(initialCamZ * 1.35, camera.position.z * factor));
        previousTouchRef.current.dist = newDist;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      notifyInteraction();
      camera.position.z = Math.max(initialCamZ * 0.85, Math.min(initialCamZ * 1.35, camera.position.z + e.deltaY * 0.0025));
    };

    const handleScroll = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(1.0, scrollY / 600);
      targetScaleRef.current = 1.0 + scrollProgress * 0.08;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    domElement.addEventListener("touchend", onTouchEnd);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // 6. Animation Timeline & Lighting Fade-In Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Overhead Key Light Fade-In (0 -> 3.8 intensity over 1100ms)
      if (keyLight.intensity < 3.8) {
        keyLight.intensity += (3.8 - keyLight.intensity) * 0.06;
      }

      // Entrance Scale & Settle
      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
      bottleGroup.scale.setScalar(currentScaleRef.current);

      const targetYPos = -0.1 + (prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.4) * 0.04);
      bottleGroup.position.y += (targetYPos - bottleGroup.position.y) * 0.08;

      // Reveal Spin Target (0° -> 140°)
      if (!revealCompleted && !isDraggingRef.current) {
        revealProgress += 0.003;
        targetRotationRef.current.y = THREE.MathUtils.lerp(0, revealTargetY, Math.min(1, revealProgress));
        if (revealProgress >= 1) {
          revealCompleted = true;
        }
      }

      // Damped Rotation Mechanics (Light STAYS FIXED in world space as bottle turns!)
      bottleGroup.rotation.y += (targetRotationRef.current.y - bottleGroup.rotation.y) * 0.10;
      bottleGroup.rotation.x += (targetRotationRef.current.x - bottleGroup.rotation.x) * 0.10;

      // Friction Inertia Decay
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += velocityRef.current.y;
        velocityRef.current.y *= 0.94;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      domElement.removeEventListener("touchmove", onTouchMove);
      domElement.removeEventListener("touchend", onTouchEnd);
      domElement.removeEventListener("wheel", onWheel);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [productSlug, productName, onUserInteract]);

  return (
    <div className={`relative w-full h-full min-h-[320px] sm:min-h-[420px] flex items-center justify-center ${className}`}>
      <div
        ref={containerRef}
        onClick={() => {
          if (onUserInteract) onUserInteract();
          if (onBottleClick) onBottleClick();
        }}
        className="w-full h-full min-h-[320px] sm:min-h-[420px] cursor-grab active:cursor-grabbing touch-pan-y"
        title={`3D Interactive ${productName} Bottle — Drag to rotate, Pinch to zoom`}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-[#c44900] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

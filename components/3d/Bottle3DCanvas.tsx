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
    // 1. Label Background (Clean Warm White Parchment)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle Gold Border Frame
    ctx.strokeStyle = "#e2dacd";
    ctx.lineWidth = 12;
    ctx.strokeRect(12, 12, 1000, 488);

    // 2. Top Devanagari Banner (Warm Ochre Bar)
    ctx.fillStyle = meta.color;
    ctx.fillRect(20, 20, 984, 75);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${meta.hindi}  •  ${meta.concern}`, 512, 68);

    // 3. Logo & Brand Title
    ctx.fillStyle = "#111315";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("REGEX REMEDIES", 512, 140);

    ctx.fillStyle = "#6f6a62";
    ctx.font = "16px sans-serif";
    ctx.fillText("AYUSH LIC. PB/AY/000000  •  GMP CERTIFIED", 512, 168);

    // Separator Line
    ctx.strokeStyle = "#c44900";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(180, 190);
    ctx.lineTo(844, 190);
    ctx.stroke();

    // 4. Giant Main Product Name
    ctx.fillStyle = "#111315";
    ctx.font = "900 68px serif";
    ctx.fillText(name.toUpperCase(), 512, 280);

    // 5. Product Subtitle / Tagline
    ctx.fillStyle = "#4a453e";
    ctx.font = "italic 22px serif";
    ctx.fillText(`"${meta.tagline}"`, 512, 330);

    // 6. Bottom Clinical Yellow Accent Band
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

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 420;

    // 2. Perspective Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const initialCamZ = 4.4;
    camera.position.set(0, 0, initialCamZ);

    // 3. High Precision WebGL Renderer
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
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xfcfaf7);
    
    const softbox1 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    softbox1.position.set(5, 5, 5);
    softbox1.lookAt(0, 0, 0);
    envScene.add(softbox1);

    const envTexture = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Studio Direct Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff9f2, 3.8);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8eb4cf, 1.4);
    fillLight.position.set(-6, -1, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc44900, 4.0, 12);
    rimLight.position.set(0, 4, -2.5);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 1.0);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Build High-Precision 3D Bottle Group
    const bottleGroup = new THREE.Group();

    // Bottle Body Geometry (Pharmaceutical Grade Amber Resin Jar)
    const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 1.65, 64);

    // High Resolution Procedural Product Label Texture
    const labelTexture = createProceduralLabelCanvas(productSlug, productName);
    setLoading(false);

    // Premium Glossy Dark Amber Resin Glass Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x36302b,
      roughness: 0.12,
      metalness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transmission: 0.15,
      ior: 1.54,
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
      roughness: 0.2,
      metalness: 0.02,
    });

    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    bottleGroup.add(labelMesh);

    // Bottle Neck & Cap
    const neckGeometry = new THREE.CylinderGeometry(0.48, 0.68, 0.38, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 0.98;
    bottleGroup.add(neckMesh);

    // Ribbed Safety Cap Group
    const capGroup = new THREE.Group();
    const capGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.36, 64);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2f38,
      roughness: 0.28,
      metalness: 0.35,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.castShadow = true;
    capGroup.add(capMesh);

    // Vertical Ridges
    const ridgeGeo = new THREE.BoxGeometry(0.02, 0.34, 0.03);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x22262e, roughness: 0.4 });
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(Math.cos(angle) * 0.525, 0, Math.sin(angle) * 0.525);
      ridge.rotation.y = -angle;
      capGroup.add(ridge);
    }

    capGroup.position.y = 1.32;
    bottleGroup.add(capGroup);

    // Ground Soft Contact Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x111315,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.15;
    scene.add(shadowPlane);

    scene.add(bottleGroup);

    // Phase 1 Entrance Animation Initial Position (y: -0.35, scale: 0.96)
    bottleGroup.position.y = -0.35;
    bottleGroup.scale.set(0.96, 0.96, 0.96);

    // Initial 3D Reveal Spin Target (0° -> 140°)
    let revealCompleted = prefersReducedMotion;
    const revealTargetY = prefersReducedMotion ? 0 : Math.PI * 0.78;
    let revealProgress = 0;

    const notifyInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        if (onUserInteract) onUserInteract();
      }
    };

    // 6. User Touch & Mouse Physics
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

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

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

      // Damped Rotation Mechanics
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

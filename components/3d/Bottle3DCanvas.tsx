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
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const meta = PRODUCT_LABELS[slug] || { hindi: name, concern: "BOTANICAL FORMULATION", color: "#c44900", tagline: "Classical Botanical Remedy" };

  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 2048, 1024);

    ctx.strokeStyle = "#e2dacd";
    ctx.lineWidth = 24;
    ctx.strokeRect(24, 24, 2000, 976);

    ctx.fillStyle = meta.color;
    ctx.fillRect(40, 40, 1968, 150);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 68px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${meta.hindi}  •  ${meta.concern}`, 1024, 136);

    ctx.fillStyle = "#111315";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("REGEX REMEDIES", 1024, 280);

    ctx.fillStyle = "#6f6a62";
    ctx.font = "32px sans-serif";
    ctx.fillText("AYUSH LIC. PB/AY/000000  •  GMP CERTIFIED FACILITY", 1024, 336);

    ctx.strokeStyle = "#c44900";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(360, 380);
    ctx.lineTo(1688, 380);
    ctx.stroke();

    ctx.fillStyle = "#111315";
    ctx.font = "900 136px serif";
    ctx.fillText(name.toUpperCase(), 1024, 560);

    ctx.fillStyle = "#4a453e";
    ctx.font = "italic 44px serif";
    ctx.fillText(`"${meta.tagline}"`, 1024, 660);

    ctx.fillStyle = "#f4d800";
    ctx.fillRect(40, 760, 1968, 224);

    ctx.fillStyle = "#111315";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("100% BOTANICAL FORMULATION", 1024, 860);

    ctx.font = "bold 40px monospace";
    ctx.fillStyle = "#111315";
    ctx.fillText("SCHEDULE T GMP  •  NABL LAB TESTED  •  24 TABLETS", 1024, 932);
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
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    // 2. PHOTOREALISTIC STUDIO LIGHTING SETUP (Fixed in World Space)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Primary Overhead Large Soft Key Light (Softbox Overhead)
    const keyLight = new THREE.DirectionalLight(0xfffdfa, 0.0);
    keyLight.position.set(0.8, 4.2, 2.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Subtle Rim Light for Back Edge Separation
    const rimLight = new THREE.DirectionalLight(0xfff5eb, 0.35);
    rimLight.position.set(-3.2, 2.5, -2.5);
    scene.add(rimLight);

    // Soft Front Fill Light for Label Clarity
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.22);
    fillLight.position.set(-1.5, 0.5, 3.8);
    scene.add(fillLight);

    // Ground Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 0.2);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // 3. EXACT PHYSICAL RECONSTRUCTION OF KABZRAJ BOTTLE GEOMETRY
    const bottleGroup = new THREE.Group();

    // High-Precision Lathed Profile (Base -> Cylindrical Body -> Shoulder Curve -> Neck -> Ring)
    const profilePoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -0.92),
      new THREE.Vector2(0.68, -0.92), // Curved base bevel start
      new THREE.Vector2(0.78, -0.82), // Base curve transition
      new THREE.Vector2(0.78, 0.52),  // Top of main body
      new THREE.Vector2(0.76, 0.66),  // Shoulder curve stage 1
      new THREE.Vector2(0.68, 0.80),  // Shoulder curve stage 2
      new THREE.Vector2(0.56, 0.92),  // Shoulder to neck transition
      new THREE.Vector2(0.52, 0.96),  // Neck base
      new THREE.Vector2(0.56, 1.02),  // Security collar ring
      new THREE.Vector2(0.52, 1.08),  // Neck top under cap
      new THREE.Vector2(0.0, 1.08),   // Top inner seal
    ];

    const bodyGeometry = new THREE.LatheGeometry(profilePoints, 64);
    bodyGeometry.computeVertexNormals();

    // Deep Glossy Jet Black Plastic Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x08090c,
      roughness: 0.28,
      metalness: 0.0,
      clearcoat: 0.65,
      clearcoatRoughness: 0.22,
      reflectivity: 0.75,
    });

    const bottleBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Front Product Label Geometry (Exact Curvature Wrap & Position)
    const labelGeometry = new THREE.CylinderGeometry(0.785, 0.785, 1.34, 64, 1, true, -Math.PI / 2.2, Math.PI / 1.1);
    const labelTexture = createProceduralLabelCanvas(productSlug, productName);
    
    // Texture Loader with SRGB Color Space
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

    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.0,
    });

    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.y = -0.15; // Centered over main cylindrical body
    bottleGroup.add(labelMesh);

    // Ribbed Safety Cap Group (Reconstructed per Physical Spec)
    const capGroup = new THREE.Group();
    const capGeometry = new THREE.CylinderGeometry(0.55, 0.56, 0.40, 64);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.30,
      metalness: 0.0,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.castShadow = true;
    capGroup.add(capMesh);

    // 32 Vertical Molded Plastic Cap Ridges
    const ridgeGeo = new THREE.BoxGeometry(0.018, 0.38, 0.025);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x181b22, roughness: 0.32 });
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(Math.cos(angle) * 0.562, 0, Math.sin(angle) * 0.562);
      ridge.rotation.y = -angle;
      capGroup.add(ridge);
    }

    capGroup.position.y = 1.28;
    bottleGroup.add(capGroup);

    // Soft Contact Ground Drop Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x111315,
      transparent: true,
      opacity: 0.20,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.93;
    scene.add(shadowPlane);

    scene.add(bottleGroup);

    // Initial Position & Scale
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

    // 4. Touch & Drag Controls
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

    // 5. Animation Timeline Loop (Key Light smooth fade-in 0 -> 1.6)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Overhead Soft Key Light Fade-In
      if (keyLight.intensity < 1.6) {
        keyLight.intensity += (1.6 - keyLight.intensity) * 0.05;
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

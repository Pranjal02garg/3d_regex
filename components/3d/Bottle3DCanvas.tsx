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

    // 4. Studio Lighting (Warm Key, Soft Blue Fill, Gold Rim, Ground Bounce)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7fa8c4, 1.2);
    fillLight.position.set(-6, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc44900, 4.2, 12);
    rimLight.position.set(0, 4, -2.5);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 0.8);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Build High-Precision 3D Bottle Group
    const bottleGroup = new THREE.Group();

    // Body Geometry
    const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 1.65, 64);
    
    // Texture Loader for Product Label
    const textureLoader = new THREE.TextureLoader();
    const productTexture = textureLoader.load(
      `/products/${productSlug}.png`,
      () => setLoading(false),
      undefined,
      () => setLoading(false)
    );
    productTexture.colorSpace = THREE.SRGBColorSpace;

    // Premium Glossy Glass Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111315,
      roughness: 0.08,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.22,
      ior: 1.52,
    });

    const bottleBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Front Product Label Cylinder
    const labelGeometry = new THREE.CylinderGeometry(0.76, 0.76, 1.45, 64, 1, true, -Math.PI / 2.2, Math.PI / 1.1);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: productTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    bottleGroup.add(labelMesh);

    // Bottle Neck & Cap
    const neckGeometry = new THREE.CylinderGeometry(0.48, 0.68, 0.38, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 0.98;
    bottleGroup.add(neckMesh);

    const capGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.36, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      roughness: 0.35,
      metalness: 0.25,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.position.y = 1.32;
    capMesh.castShadow = true;
    bottleGroup.add(capMesh);

    // Ground Contact Drop Shadow Disc
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

    // Phase 1 Entrance Animation Initial Position (y: +35px, scale: 0.96)
    bottleGroup.position.y = -0.35;
    bottleGroup.scale.set(0.96, 0.96, 0.96);

    // Initial 3D Reveal Spin Target (0° -> 140°)
    let revealCompleted = prefersReducedMotion;
    const revealTargetY = prefersReducedMotion ? 0 : Math.PI * 0.78;
    let revealProgress = 0;

    // Trigger interaction callback to hide instruction pill
    const notifyInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        if (onUserInteract) onUserInteract();
      }
    };

    // 6. User Touch & Mouse Physics (With Inertia Damping)
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
        // Pinch zoom range (0.85x - 1.30x distance mapping)
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

    // 7. Scroll-Driven 3D Animation Handler
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(1.0, scrollY / 600);

      // Scale 1.0 -> 1.08 on scroll stage
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

    // 8. Animation Timeline Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Phase 1 Entrance Settle (y: -0.35 -> -0.1, scale 0.96 -> 1.0)
      if (currentScaleRef.current < targetScaleRef.current) {
        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
      } else {
        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
      }
      bottleGroup.scale.setScalar(currentScaleRef.current);

      const targetYPos = -0.1 + (prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.4) * 0.04);
      bottleGroup.position.y += (targetYPos - bottleGroup.position.y) * 0.08;

      // Phase 2 Initial 0° -> 140° Reveal Spin (then stop continuous rotation)
      if (!revealCompleted && !isDraggingRef.current) {
        revealProgress += 0.003;
        targetRotationRef.current.y = THREE.MathUtils.lerp(0, revealTargetY, Math.min(1, revealProgress));
        if (revealProgress >= 1) {
          revealCompleted = true;
        }
      }

      // Exponential Inertia & Damping
      bottleGroup.rotation.y += (targetRotationRef.current.y - bottleGroup.rotation.y) * 0.10;
      bottleGroup.rotation.x += (targetRotationRef.current.x - bottleGroup.rotation.x) * 0.10;

      // Spin-down inertia when finger/mouse released
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += velocityRef.current.y;
        velocityRef.current.y *= 0.94; // Exponential momentum decay
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
  }, [productSlug]);

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

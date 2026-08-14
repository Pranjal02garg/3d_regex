"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Bottle3DProps {
  productSlug: string;
  productName: string;
  className?: string;
  onBottleClick?: () => void;
}

export default function Bottle3DCanvas({
  productSlug,
  productName,
  className = "",
  onBottleClick,
}: Bottle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousTouchRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.008 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 420;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.4);

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

    // Append canvas
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light (Warm Sun)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Soft Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0x7fa8c4, 1.2);
    fillLight.position.set(-6, -2, -3);
    scene.add(fillLight);

    // Gold Rim Light for Luxury Outline
    const rimLight = new THREE.PointLight(0xc44900, 4.0, 12);
    rimLight.position.set(0, 4, -2.5);
    scene.add(rimLight);

    // Bottom Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 0.8);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Build High-Precision 3D Bottle Group
    const bottleGroup = new THREE.Group();

    // Bottle Body Geometry (Pharmaceutical Grade Jar with Smooth Edges)
    const bodyGeometry = new THREE.CylinderGeometry(0.75, 0.75, 1.65, 64);
    
    // Texture Loader for Product Bottle Image
    const textureLoader = new THREE.TextureLoader();
    const productTexture = textureLoader.load(
      `/products/${productSlug}.png`,
      () => setLoading(false),
      undefined,
      () => setLoading(false)
    );
    productTexture.colorSpace = THREE.SRGBColorSpace;

    // Premium Glossy Glass/Resin Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111315,
      roughness: 0.08,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.25,
      ior: 1.52,
    });

    const bottleBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Front Product Label Cylinder with Seamless Wrap
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

    // Bottle Shoulder & Neck
    const neckGeometry = new THREE.CylinderGeometry(0.48, 0.68, 0.38, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 0.98;
    bottleGroup.add(neckMesh);

    // Ribbed Safety Cap
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

    // Realistic Soft Drop Shadow Disc
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
    bottleGroup.position.y = -0.1;

    // Initial Spin Reveal
    bottleGroup.rotation.y = -Math.PI * 0.5;

    // 6. Ultra-Smooth Touch & Mouse Interaction Physics (Damped Velocity + Inertia)
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      autoRotate = false;
      previousTouchRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousTouchRef.current.x;
      const deltaY = e.clientY - previousTouchRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-0.5, Math.min(0.5, targetRotationRef.current.x));

      velocityRef.current = { x: deltaY * 0.002, y: deltaX * 0.004 };
      previousTouchRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };

    // Mobile Touch Physics (Frictionless Pan-Y + Pinch Zoom)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        autoRotate = false;
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

        // Smooth horizontal spin
        targetRotationRef.current.y += deltaX * 0.012;
        velocityRef.current.y = deltaX * 0.005;

        // Gentle tilt
        targetRotationRef.current.x += deltaY * 0.004;
        targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x));

        previousTouchRef.current.x = e.touches[0].clientX;
        previousTouchRef.current.y = e.touches[0].clientY;
      } else if (e.touches.length === 2 && previousTouchRef.current.dist) {
        // Pinch Zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.hypot(dx, dy);
        const factor = previousTouchRef.current.dist / newDist;
        camera.position.z = Math.max(2.4, Math.min(6.2, camera.position.z * factor));
        previousTouchRef.current.dist = newDist;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2.4, Math.min(6.2, camera.position.z + e.deltaY * 0.0025));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    domElement.addEventListener("touchend", onTouchEnd);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // 7. High Performance Damped Animation Loop (60 FPS Exponential Decay)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Silky Smooth Exponential Damping towards target rotation
      bottleGroup.rotation.y += (targetRotationRef.current.y - bottleGroup.rotation.y) * 0.12;
      bottleGroup.rotation.x += (targetRotationRef.current.x - bottleGroup.rotation.x) * 0.12;

      // Organic Sine Floating Motion
      bottleGroup.position.y = -0.1 + Math.sin(elapsedTime * 1.6) * 0.07;

      // Auto-Rotation and Inertia Spin-Down
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.007;
      } else if (!isDraggingRef.current) {
        targetRotationRef.current.y += velocityRef.current.y;
        velocityRef.current.y *= 0.94; // Inertia friction decay
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Dynamic Responsive Resize
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
        onClick={onBottleClick}
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

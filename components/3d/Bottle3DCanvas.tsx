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
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.008 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 400;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    // 3. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Append canvas
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    mainLight.position.set(4, 6, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x7fa8c4, 1.0);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc44900, 3.0, 10);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // 5. Build 3D Bottle Group
    const bottleGroup = new THREE.Group();

    // Bottle Body Geometry (Rounded Medicine Jar)
    const bodyGeometry = new THREE.CylinderGeometry(0.72, 0.72, 1.6, 64);
    
    // Texture Loader for Product Bottle Image
    const textureLoader = new THREE.TextureLoader();
    const productTexture = textureLoader.load(
      `/products/${productSlug}.png`,
      () => setLoading(false),
      undefined,
      () => setLoading(false)
    );
    productTexture.colorSpace = THREE.SRGBColorSpace;

    // Bottle Body Material (White Glossy Pharmaceutical Resin / Glass)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111315,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2,
      ior: 1.5,
    });

    const bottleBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    // Front Product Label Cylinder
    const labelGeometry = new THREE.CylinderGeometry(0.73, 0.73, 1.4, 64, 1, true, -Math.PI / 2.2, Math.PI / 1.1);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: productTexture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    bottleGroup.add(labelMesh);

    // Bottle Neck Geometry
    const neckGeometry = new THREE.CylinderGeometry(0.45, 0.65, 0.35, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 0.95;
    bottleGroup.add(neckMesh);

    // Bottle Ribbed Cap (Safety Cap)
    const capGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      roughness: 0.4,
      metalness: 0.3,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.position.y = 1.25;
    capMesh.castShadow = true;
    bottleGroup.add(capMesh);

    // Base Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.1;
    scene.add(shadowPlane);

    scene.add(bottleGroup);

    // Position bottle
    bottleGroup.position.y = -0.1;

    // 6. Interactive Touch & Mouse Handlers (Rotate + Pinch Zoom + Inertia)
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

      bottleGroup.rotation.y += deltaX * 0.008;
      bottleGroup.rotation.x += deltaY * 0.005;

      // Clamp X rotation so bottle doesn't flip upside down
      bottleGroup.rotation.x = Math.max(-0.6, Math.min(0.6, bottleGroup.rotation.x));

      rotationVelocityRef.current = { x: deltaY * 0.001, y: deltaX * 0.002 };
      previousTouchRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        autoRotate = true;
      }, 1500);
    };

    // Touch Handlers for Mobile (Touch + Drag Rotate, Pinch Zoom)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        autoRotate = false;
        previousTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        // Pinch start distance
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        previousTouchRef.current.dist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - previousTouchRef.current.x;
        const deltaY = e.touches[0].clientY - previousTouchRef.current.y;

        // If horizontal drag is greater than vertical, rotate bottle
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          bottleGroup.rotation.y += deltaX * 0.01;
          rotationVelocityRef.current = { x: 0, y: deltaX * 0.003 };
        } else {
          // Allow page to scroll normally vertically
          bottleGroup.rotation.x += deltaY * 0.003;
          bottleGroup.rotation.x = Math.max(-0.5, Math.min(0.5, bottleGroup.rotation.x));
        }

        previousTouchRef.current.x = e.touches[0].clientX;
        previousTouchRef.current.y = e.touches[0].clientY;
      } else if (e.touches.length === 2 && previousTouchRef.current.dist) {
        // Pinch Zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.hypot(dx, dy);
        const factor = previousTouchRef.current.dist / newDist;
        camera.position.z = Math.max(2.5, Math.min(6.0, camera.position.z * factor));
        previousTouchRef.current.dist = newDist;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        autoRotate = true;
      }, 1500);
    };

    // Wheel Zoom Handler
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2.5, Math.min(6.0, camera.position.z + e.deltaY * 0.003));
    };

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

      // Organic Floating Motion
      bottleGroup.position.y = -0.1 + Math.sin(elapsedTime * 1.5) * 0.08;

      // Auto rotation or Inertia
      if (autoRotate && !isDraggingRef.current) {
        bottleGroup.rotation.y += 0.006;
      } else if (!isDraggingRef.current) {
        bottleGroup.rotation.y += rotationVelocityRef.current.y;
        rotationVelocityRef.current.y *= 0.95;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
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
    <div className={`relative w-full h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center ${className}`}>
      <div
        ref={containerRef}
        onClick={onBottleClick}
        className="w-full h-full min-h-[320px] sm:min-h-[400px] cursor-grab active:cursor-grabbing touch-pan-y"
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

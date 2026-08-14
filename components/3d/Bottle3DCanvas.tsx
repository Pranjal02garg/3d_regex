"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Bottle3DProps {
  productSlug: string;
  productName: string;
  className?: string;
  onBottleClick?: () => void;
  onUserInteract?: () => void;
}

// CAP TOP EMBOSSED REGEX LOGO CANVAS
function createCapTopCanvas(capBgColor = "#121418"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = capBgColor;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("REGEX", 256, 240);
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("REMEDIES", 256, 290);
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

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 340;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
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

    // 2. PHOTOREALISTIC STUDIO LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdfa, 1.8);
    keyLight.position.set(1.2, 4.5, 2.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfff5eb, 0.45);
    rimLight.position.set(-3.5, 2.8, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
    fillLight.position.set(-1.8, 0.8, 3.8);
    scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight(0xf4efe6, 0.25);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // 3. Product Configuration & GLB Source Path
    let glbPath = "/models/base.glb";
    let bodyColor = 0x08090c;
    let capColor = 0x121418;
    let ridgeColor = 0x181b22;
    let labelTexturePath = "/textures/label_atlas.png";
    let capHexStr = "#121418";
    let isBakedModel = false;

    if (productSlug === "kabzraj") {
      glbPath = "/models/kabzraj.glb"; // User's 77.6MB complete baked 3D model!
      isBakedModel = true;
    } else if (productSlug === "gasogex") {
      glbPath = "/models/base.glb";
      bodyColor = 0x008a4b; // Emerald Green Transparent PET
      capColor = 0x00994d;
      ridgeColor = 0x00b359;
      labelTexturePath = "/textures/gasogex_label.png";
      capHexStr = "#00994d";
    } else if (productSlug === "livgex") {
      bodyColor = 0x103652;
      capColor = 0x0a2438;
      ridgeColor = 0x183d5a;
      capHexStr = "#0a2438";
    } else if (productSlug === "pilegex") {
      bodyColor = 0x3d1a0e;
      capColor = 0x240e07;
      ridgeColor = 0x471d0e;
      capHexStr = "#240e07";
    } else if (productSlug === "lucogex") {
      bodyColor = 0x4a1829;
      capColor = 0x300e19;
      ridgeColor = 0x5e1f34;
      capHexStr = "#300e19";
    }

    const bottleBodyMaterial = new THREE.MeshPhysicalMaterial({
      color: bodyColor,
      roughness: 0.22,
      metalness: 0.0,
      clearcoat: 0.70,
      clearcoatRoughness: 0.18,
      reflectivity: 0.85,
    });

    const capMaterial = new THREE.MeshStandardMaterial({
      color: capColor,
      roughness: 0.25,
      metalness: 0.0,
    });

    // Load Label Texture for standard models
    const textureLoader = new THREE.TextureLoader();
    const labelTexture = textureLoader.load(
      labelTexturePath,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    );

    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // 4. Bottle Group
    const bottleGroup = new THREE.Group();

    // High-Precision Lathed Profile Fallback
    const profilePoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -0.92),
      new THREE.Vector2(0.68, -0.92),
      new THREE.Vector2(0.78, -0.82),
      new THREE.Vector2(0.78, 0.52),
      new THREE.Vector2(0.76, 0.66),
      new THREE.Vector2(0.68, 0.80),
      new THREE.Vector2(0.56, 0.92),
      new THREE.Vector2(0.52, 0.96),
      new THREE.Vector2(0.56, 1.02),
      new THREE.Vector2(0.52, 1.08),
      new THREE.Vector2(0.0, 1.08),
    ];

    const bodyGeometry = new THREE.LatheGeometry(profilePoints, 64);
    bodyGeometry.computeVertexNormals();
    const bottleBody = new THREE.Mesh(bodyGeometry, bottleBodyMaterial);
    bottleBody.castShadow = true;
    bottleBody.receiveShadow = true;
    bottleGroup.add(bottleBody);

    const labelGeometry = new THREE.CylinderGeometry(0.785, 0.785, 1.34, 64, 1, true, 0, Math.PI * 2);
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.y = -0.15;
    bottleGroup.add(labelMesh);

    // Ribbed Safety Cap Group
    const capGroup = new THREE.Group();
    const capGeometry = new THREE.CylinderGeometry(0.55, 0.56, 0.40, 64);
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.castShadow = true;
    capGroup.add(capMesh);

    const capTopGeo = new THREE.CircleGeometry(0.54, 64);
    const capTopMat = new THREE.MeshStandardMaterial({ map: createCapTopCanvas(capHexStr), roughness: 0.35, metalness: 0.0 });
    const capTopMesh = new THREE.Mesh(capTopGeo, capTopMat);
    capTopMesh.rotation.x = -Math.PI / 2;
    capTopMesh.position.y = 0.201;
    capGroup.add(capTopMesh);

    const ridgeGeo = new THREE.BoxGeometry(0.018, 0.38, 0.025);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: ridgeColor, roughness: 0.30 });
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(Math.cos(angle) * 0.562, 0, Math.sin(angle) * 0.562);
      ridge.rotation.y = -angle;
      capGroup.add(ridge);
    }
    capGroup.position.y = 1.28;
    bottleGroup.add(capGroup);

    // 5. Load GLB Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      glbPath,
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale GLB model to target height 2.6 units
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetHeight = 2.6;
        const autoScale = targetHeight / (size.y || 1.0);
        model.scale.setScalar(autoScale);

        model.position.x = -center.x * autoScale;
        model.position.y = -center.y * autoScale;
        model.position.z = -center.z * autoScale;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const meshName = mesh.name.toLowerCase();

            // Hide extraneous environment planes / floor boxes baked in CAD
            if (
              meshName.includes("plane") ||
              meshName.includes("floor") ||
              meshName.includes("background") ||
              meshName.includes("cube")
            ) {
              mesh.visible = false;
              return;
            }

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (isBakedModel) {
              // Preserve baked textures and materials from user's GLB model!
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                  if ((m as THREE.MeshStandardMaterial).map) {
                    (m as THREE.MeshStandardMaterial).map!.colorSpace = THREE.SRGBColorSpace;
                  }
                });
              } else if ((mesh.material as THREE.MeshStandardMaterial).map) {
                (mesh.material as THREE.MeshStandardMaterial).map!.colorSpace = THREE.SRGBColorSpace;
              }
            } else {
              // Override untextured materials for standard GLB base
              mesh.material = bottleBodyMaterial;
            }
          }
        });

        // Only attach extra label cylinder if it's NOT a baked model
        if (!isBakedModel) {
          const unscaledRadius = (size.x / 2.0) * 1.01;
          const unscaledLabelHeight = size.y * 0.52;
          const glbLabelMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(unscaledRadius, unscaledRadius, unscaledLabelHeight, 64, 1, true, 0, Math.PI * 2),
            labelMaterial
          );
          glbLabelMesh.position.y = center.y - size.y * 0.08;
          model.add(glbLabelMesh);
        }

        bottleGroup.clear();
        bottleGroup.add(model);
        setLoading(false);
      },
      undefined,
      (err) => console.log("Using High-Precision Profile Fallback Mesh:", err)
    );

    // Ground Drop Shadow
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

    const notifyInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        if (onUserInteract) onUserInteract();
      }
    };

    // Touch & Drag Controls
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
      targetRotationRef.current.x = Math.max(-0.35, Math.min(0.35, targetRotationRef.current.x));

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
        targetRotationRef.current.x = Math.max(-0.35, Math.min(0.35, targetRotationRef.current.x));

        previousTouchRef.current.x = e.touches[0].clientX;
        previousTouchRef.current.y = e.touches[0].clientY;
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
      targetRotationRef.current.x *= 0.85;
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

    // Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
      bottleGroup.scale.setScalar(currentScaleRef.current);

      const targetYPos = -0.1 + (prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.4) * 0.04);
      bottleGroup.position.y += (targetYPos - bottleGroup.position.y) * 0.08;

      if (!isDraggingRef.current) {
        targetRotationRef.current.y += 0.005;
        targetRotationRef.current.x += (0 - targetRotationRef.current.x) * 0.08;
      }

      bottleGroup.rotation.y += (targetRotationRef.current.y - bottleGroup.rotation.y) * 0.10;
      bottleGroup.rotation.x += (targetRotationRef.current.x - bottleGroup.rotation.x) * 0.10;

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
        title={`3D Interactive ${productName} Bottle — Continuous rotation, Drag to turn`}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-[#c44900] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

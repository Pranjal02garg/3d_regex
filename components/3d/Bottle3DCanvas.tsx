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

const PRODUCT_DETAILS: Record<
  string,
  {
    hindi: string;
    concern: string;
    tagline: string;
    accentColor: string;
    yellowBandHindi: string;
    ingredients: string[];
    benefits: string[];
    recommended: string[];
  }
> = {
  kabzraj: {
    hindi: "कबजरास",
    concern: "BOWEL REGULATION",
    tagline: "Classical Laxative & Constipation Relief Formulation",
    accentColor: "#F4D800",
    yellowBandHindi: "कबजरास",
    ingredients: ["Senna", "Haritaki", "Baheda", "Amla", "Ajwain", "Saunf", "Triphala"],
    benefits: ["Relieves Constipation", "Improves Bowel Movement", "Reduces Bloating & Gas", "Supports Gut Health", "Detoxifies System"],
    recommended: ["Constipation", "Bloating", "Irregular Bowel"],
  },
  gasogex: {
    hindi: "गैस-ओ-जेक्स",
    concern: "DIGESTIVE CARE",
    tagline: "Fast Relief from Bloating, Wind & Heavy Stomach",
    accentColor: "#F4D800",
    yellowBandHindi: "गैस-ओ-जेक्स",
    ingredients: ["Hing", "Jeera", "Sounf", "Kala Namak", "Ajwain", "Pudina"],
    benefits: ["Relieves Gas", "Reduces Bloating", "Eases Indigestion", "Calms Stomach"],
    recommended: ["Acidity", "Gas & Flatulence", "Heavy Stomach"],
  },
  livgex: {
    hindi: "लिवजेक्स",
    concern: "LIVER PROTECTION",
    tagline: "Herbal Liver Detox & Metabolic Support Formulation",
    accentColor: "#F4D800",
    yellowBandHindi: "लिवजेक्स",
    ingredients: ["Bhumyamalaki", "Punarnava", "Katuki", "Kalmegh", "Makoy", "Kasani"],
    benefits: ["Detoxifies Liver", "Improves Digestion", "Boosts Metabolism", "Protects Liver Cells"],
    recommended: ["Fatty Liver", "Sluggish Metabolism", "Loss of Appetite"],
  },
  pilegex: {
    hindi: "पाइलजेक्स",
    concern: "PILES CARE",
    tagline: "Soothing Relief for Anorectal Health & Pain Reduction",
    accentColor: "#F4D800",
    yellowBandHindi: "पाइलजेक्स",
    ingredients: ["Suran", "Nagkesar", "Triphala", "Shuddha Guggulu", "Lajjalu"],
    benefits: ["Reduces Pain & Swelling", "Controls Bleeding", "Promotes Healing", "Softens Stool"],
    recommended: ["Haemorrhoids", "Fissures", "Anorectal Swelling"],
  },
  lucogex: {
    hindi: "लुकोजेक्स",
    concern: "WOMEN'S WELLNESS",
    tagline: "Classical Herbal Remedy for Intimate Health & Vitality",
    accentColor: "#F4D800",
    yellowBandHindi: "लुकोजेक्स",
    ingredients: ["Ashoka", "Lodhra", "Shatavari", "Dhataki", "Amalaki"],
    benefits: ["Supports Intimate Health", "Balances Hormones", "Reduces Weakness", "Promotes Vitality"],
    recommended: ["White Discharge", "Pelvic Discomfort", "General Weakness"],
  },
};

// FULL 360° HIGH-ACCURACY PRODUCT LABEL CANVAS GENERATOR
function create360LabelCanvas(slug: string, name: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const meta = PRODUCT_DETAILS[slug] || PRODUCT_DETAILS.kabzraj;

  if (ctx) {
    // Background Split: Top 54% White, Bottom 46% Vivid Yellow
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 2048, 550);

    ctx.fillStyle = meta.accentColor;
    ctx.fillRect(0, 550, 2048, 474);

    // ── SECTION 1: FRONT PANEL (x: 0 → 512) ───────────────────────────
    ctx.save();
    ctx.translate(0, 0);

    // Mortar & Pestle Circular Logo
    ctx.strokeStyle = "#111315";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(256, 160, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#111315";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("REGEX", 256, 145);
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("REMEDIES", 256, 175);

    // Main Brand Headline
    ctx.font = "900 76px serif";
    ctx.fillText(name.toUpperCase(), 256, 360);

    // Yellow Section: Hindi Title + Toilet Illustration + 3 Green Badges
    ctx.fillStyle = "#111315";
    ctx.font = "900 68px sans-serif";
    ctx.fillText(meta.yellowBandHindi, 256, 640);

    // Toilet Seat Illustration Placeholder Circle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(130, 800, 75, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111315";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#c44900";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("HERBAL", 130, 795);
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("FORMULA", 130, 820);

    // 3 Green Badges
    const badgeX = 230;
    const badges = ["• No More Acidity", "• Strengthen Digestion", "• No Gas & Cures Gut-Pain"];
    badges.forEach((b, i) => {
      ctx.fillStyle = "#0d5c3a";
      ctx.beginPath();
      ctx.roundRect(badgeX, 720 + i * 55, 260, 44, 22);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(b, badgeX + 16, 748 + i * 55);
    });

    ctx.restore();

    // ── SECTION 2: LEFT PANEL / INGREDIENTS (x: 512 → 1024) ─────────
    ctx.save();
    ctx.translate(512, 0);

    // White Top: Ingredients List
    ctx.fillStyle = "#111315";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Ingredients:", 60, 100);

    ctx.font = "500 24px sans-serif";
    meta.ingredients.forEach((ing, i) => {
      ctx.fillText(ing, 60, 150 + i * 36);
    });

    // Yellow Bottom: Features & Recommended For
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("• Ayurvedic", 60, 610);
    ctx.fillText("• Natural Laxative", 60, 650);
    ctx.fillText("• Safe & Effective", 60, 690);

    ctx.font = "bold 28px sans-serif";
    ctx.fillText("Recommended For:", 60, 760);

    ctx.font = "500 24px sans-serif";
    meta.recommended.forEach((rec, i) => {
      ctx.fillText(`• ${rec}`, 60, 805 + i * 40);
    });

    ctx.restore();

    // ── SECTION 3: BACK PANEL / DOSAGE & BARCODE (x: 1024 → 1536) ─────
    ctx.save();
    ctx.translate(1024, 0);

    // White Top: Dosage & Caution
    ctx.fillStyle = "#111315";
    ctx.font = "bold 30px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Dosage:", 60, 90);
    ctx.font = "400 20px sans-serif";
    ctx.fillText("Take 1–2 capsules at night", 60, 125);
    ctx.fillText("with lukewarm water or as", 60, 155);
    ctx.fillText("directed by your physician.", 60, 185);

    ctx.font = "bold 30px sans-serif";
    ctx.fillText("Caution:", 60, 250);
    ctx.font = "400 20px sans-serif";
    ctx.fillText("• Keep out of reach of children.", 60, 285);
    ctx.fillText("• Store in a cool, dry place.", 60, 315);
    ctx.fillText("• Do not use if seal is broken.", 60, 345);
    ctx.fillText("• For internal use only.", 60, 375);

    // Yellow Bottom: Manufactured For, Badges & Barcode
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Manufactured for:", 60, 600);
    ctx.font = "bold 28px serif";
    ctx.fillText("Regex Remedies", 60, 635);
    ctx.font = "italic 18px serif";
    ctx.fillText("Heal Naturally. Live Better.", 60, 665);

    // Circular GMP Badge
    ctx.strokeStyle = "#111315";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(100, 750, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GMP", 100, 755);

    // Circular 100% Natural Badge
    ctx.beginPath();
    ctx.arc(210, 750, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText("100%", 210, 745);
    ctx.fillText("NATURAL", 210, 765);

    // EAN-13 Vertical Barcode Lines
    ctx.fillStyle = "#111315";
    ctx.fillRect(320, 600, 120, 240);
    ctx.fillStyle = "#ffffff";
    for (let b = 0; b < 12; b++) {
      ctx.fillRect(330 + b * 9, 610, 4, 220);
    }
    ctx.fillStyle = "#111315";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("8 904195 453788", 380, 860);

    ctx.restore();

    // ── SECTION 4: RIGHT PANEL / BENEFITS & BATCH (x: 1536 → 2048) ────
    ctx.save();
    ctx.translate(1536, 0);

    // White Top: Benefits List
    ctx.fillStyle = "#111315";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Benefits:", 60, 90);

    ctx.font = "500 22px sans-serif";
    meta.benefits.forEach((ben, i) => {
      ctx.fillText(`✔  ${ben}`, 60, 140 + i * 40);
    });

    // Yellow Bottom: Batch Details & MRP
    ctx.font = "bold 22px monospace";
    ctx.fillText("Batch No. : KR-001", 60, 610);
    ctx.fillText("Mfg. Date : JAN 2025", 60, 650);
    ctx.fillText("Exp. Date : DEC 2027", 60, 690);
    ctx.fillText("MRP       : ₹499/-", 60, 730);
    ctx.font = "16px sans-serif";
    ctx.fillText("(Incl. of all taxes)", 240, 730);

    ctx.font = "bold 26px sans-serif";
    ctx.fillText("60 Capsules", 60, 810);

    // Green Veg Square Badge (Green Dot in Square)
    ctx.strokeStyle = "#0d5c3a";
    ctx.lineWidth = 4;
    ctx.strokeRect(320, 780, 40, 40);
    ctx.fillStyle = "#0d5c3a";
    ctx.beginPath();
    ctx.arc(340, 800, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// CAP TOP EMBOSSED REGEX LOGO CANVAS
function createCapTopCanvas(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#121418";
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = "#2e3440";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(256, 256, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#5c6578";
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

    // Full 360° Wrap Product Label Geometry
    const labelGeometry = new THREE.CylinderGeometry(0.785, 0.785, 1.34, 64, 1, true, 0, Math.PI * 2);
    const labelTexture = create360LabelCanvas(productSlug, productName);
    
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

    // Cap Top Embossed Logo Mesh
    const capTopGeo = new THREE.CircleGeometry(0.54, 64);
    const capTopTexture = createCapTopCanvas();
    const capTopMat = new THREE.MeshStandardMaterial({
      map: capTopTexture,
      roughness: 0.35,
      metalness: 0.0,
    });
    const capTopMesh = new THREE.Mesh(capTopGeo, capTopMat);
    capTopMesh.rotation.x = -Math.PI / 2;
    capTopMesh.position.y = 0.201;
    capGroup.add(capTopMesh);

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

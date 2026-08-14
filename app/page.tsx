"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  Sparkles,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Microchip,
  FileText
} from "lucide-react";
import { Accordion } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import FormularySection from "@/components/product/FormularySection";
import { CONCERNS, products, type Product } from "@/content/products";
import { HOME_FAQS } from "@/content/trust";
import { reviews } from "@/content/reviews";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

// Dynamically import 3D WebGL Canvas for Client Side
const Bottle3DCanvas = dynamic(() => import("@/components/3d/Bottle3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-[220px] sm:w-[300px] h-[300px] sm:h-[380px] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#c44900] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(1); // Default to 02 Kabzraj as per specification
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeProduct = products[activeIdx];
  const leftIdx = (activeIdx - 1 + products.length) % products.length;
  const leftProduct = products[leftIdx];
  const rightIdx = (activeIdx + 1) % products.length;
  const rightProduct = products[rightIdx];

  const handleProductSelect = (index: number) => {
    if (index === activeIdx) return;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveIdx(index);
      setIsSwitching(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#111315] font-sans antialiased selection:bg-[#c44900] selection:text-white">
      
      {/* ── 1 · SANTIONI 3D INTERACTIVE HERO STAGE ───────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-gray-200/80 bg-[radial-gradient(ellipse_at_top,#ffffff,#faf8f3)] pt-16 pb-6 px-4 sm:px-8 select-none"
      >
        {/* Ambient Radial Golden Sun Aura */}
        <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-[#c44900]/10 blur-[160px] pointer-events-none animate-glow-pulse" />

        {/* Top Kicker Bar */}
        <div className="flex items-center justify-between z-10 font-mono text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest pt-2 max-w-6xl mx-auto w-full">
          <span>01 / 05 · THE FORMULARY</span>
          <span className="inline-flex items-center gap-1.5 text-[#c44900] font-bold">
            <Sparkles size={12} className="animate-pulse" />
            3D WEBGL STUDIO ACTIVE
          </span>
          <span className="hidden sm:inline">360° · TOUCH + DRAG TO ROTATE BOTTLE</span>
        </div>

        {/* Center Stage: Editorial Typography + 3D WebGL Bottle */}
        <div className="my-auto z-10 text-center max-w-6xl mx-auto flex flex-col items-center justify-center relative w-full">
          
          {/* Santioni Giant Editorial Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-[#111315] uppercase leading-none drop-shadow-xs pointer-events-none z-0">
            BOTANICAL REMEDIES
          </h1>

          {/* 3D WEBGL BOTTLE STAGE CONTAINER */}
          <div className="relative -mt-6 sm:-mt-14 z-10 flex flex-col items-center justify-center w-full">
            
            {/* Prev / Next Navigation Controls */}
            <button
              onClick={() => handleProductSelect(leftIdx)}
              className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 border border-gray-200/90 shadow-xl text-[#111315] hover:bg-[#c44900] hover:text-white transition-all cursor-pointer hover:scale-105"
              aria-label="Previous remedy"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => handleProductSelect(rightIdx)}
              className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 border border-gray-200/90 shadow-xl text-[#111315] hover:bg-[#c44900] hover:text-white transition-all cursor-pointer hover:scale-105"
              aria-label="Next remedy"
            >
              <ChevronRight size={22} />
            </button>

            {/* 3D WebGL Interactive Lineup Stage */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 lg:gap-10 max-w-4xl mx-auto py-2 w-full">
              
              {/* Left Flank Bottle Preview */}
              <button
                key={leftProduct.slug}
                onClick={() => handleProductSelect(leftIdx)}
                className="group relative flex-col items-center justify-end hidden sm:flex opacity-40 hover:opacity-100 transition-all duration-500 scale-85 hover:scale-95 cursor-pointer animate-float-1"
                aria-label={`View ${leftProduct.name}`}
              >
                <Image
                  src={`/products/${leftProduct.slug}.png`}
                  alt={leftProduct.name}
                  width={240}
                  height={320}
                  className="w-[110px] lg:w-[140px] h-auto object-contain mix-blend-multiply drop-shadow-md transition-all"
                />
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-2 bg-white/90 border border-gray-200 px-2 py-0.5 rounded-md shadow-xs">
                  0{leftIdx + 1} · {leftProduct.name}
                </span>
              </button>

              {/* Center Active 3D WebGL Interactive Bottle Canvas */}
              <div className={`relative z-20 w-[240px] sm:w-[320px] h-[320px] sm:h-[400px] transition-all duration-500 ${isSwitching ? "scale-90 opacity-40 blur-xs" : "scale-100 opacity-100"}`}>
                <Bottle3DCanvas
                  key={activeProduct.slug}
                  productSlug={activeProduct.slug}
                  productName={activeProduct.name}
                  onBottleClick={() => setActiveModalProduct(activeProduct)}
                  onUserInteract={() => setHasInteracted(true)}
                />

                {/* Sanskrit Devanagari Floating Pill */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-[#c44900] font-bold whitespace-nowrap bg-white border border-gray-200/90 px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-none">
                  <span className="font-deva text-sm font-bold text-[#c44900]">{activeProduct.devanagari}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#111315]">{activeProduct.name}</span>
                </div>
              </div>

              {/* Right Flank Bottle Preview */}
              <button
                key={rightProduct.slug}
                onClick={() => handleProductSelect(rightIdx)}
                className="group relative flex-col items-center justify-end hidden sm:flex opacity-40 hover:opacity-100 transition-all duration-500 scale-85 hover:scale-95 cursor-pointer animate-float-2"
                aria-label={`View ${rightProduct.name}`}
              >
                <Image
                  src={`/products/${rightProduct.slug}.png`}
                  alt={rightProduct.name}
                  width={240}
                  height={320}
                  className="w-[110px] lg:w-[140px] h-auto object-contain mix-blend-multiply drop-shadow-md transition-all"
                />
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-2 bg-white/90 border border-gray-200 px-2 py-0.5 rounded-md shadow-xs">
                  0{rightIdx + 1} · {rightProduct.name}
                </span>
              </button>

            </div>

            {/* 360° Interaction Hint Pill (Auto Fades Out on Touch/Drag) */}
            <div className={`pt-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2 transition-opacity duration-700 ${hasInteracted ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              <span className="bg-white/90 border border-gray-200 px-3 py-1 rounded-full shadow-xs">
                ↔ DRAG TO ROTATE · PINCH TO ZOOM
              </span>
            </div>

            {/* Pedestal Ground Shadow */}
            <div
              aria-hidden="true"
              className="mt-3 h-4 w-[240px] sm:w-[360px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(17,19,21,0.18),transparent_70%)]"
            />
          </div>

          {/* Minimal Editorial Subtitle */}
          <p className="text-xs sm:text-sm text-gray-600 font-mono uppercase tracking-widest pt-2">
            {activeProduct.tagline} · {activeProduct.unitsPerPack} TABLETS
          </p>

          {/* Santioni Action Buttons with Arrow Micro-interaction */}
          <div className="flex flex-row items-center justify-center gap-3 pt-3">
            <Link
              href={`/products/${activeProduct.slug}`}
              className="group bg-[#111315] text-white hover:bg-[#c44900] px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE {activeProduct.name}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/918360053594"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#111315] hover:text-[#c44900] hover:border-[#c44900] bg-white border border-gray-300 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:scale-102"
            >
              <WhatsAppIcon size={15} className="text-[#25D366]" />
              <span>CONSULT DOCTOR</span>
            </a>
          </div>
        </div>

        {/* Santioni Product Navigation Rail (Bottom Dock) */}
        <div className="z-10 flex items-center justify-center gap-1.5 sm:gap-3 border-t border-gray-200/80 pt-4 max-w-4xl mx-auto w-full">
          {products.map((p, index) => (
            <button
              key={p.slug}
              onClick={() => handleProductSelect(index)}
              className={`font-mono text-xs px-3 sm:px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                activeIdx === index
                  ? "bg-[#111315] text-white border-[#111315] font-bold shadow-md scale-105"
                  : "bg-white/80 text-gray-500 border-gray-200 hover:border-[#c44900] hover:text-[#c44900]"
              }`}
            >
              0{index + 1} · {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── 2 · LUXURY TRUST STRIP (SMOOTH REVEAL) ────────────────────────── */}
      <Reveal as="section" className="py-4 bg-[#f4efe6] border-b border-gray-200/80 font-mono text-xs text-gray-700">
        <div className="shell grid grid-cols-2 md:flex items-center justify-around gap-4 font-bold text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <Award size={14} className="text-[#c44900]" />
            <span>AYUSH LICENCE: <strong className="text-[#c44900]">PB/AY/000000</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <ShieldCheck size={14} className="text-[#1c684e]" />
            <span>SCHEDULE T <strong className="text-[#1c684e]">GMP CERTIFIED</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <Microchip size={14} className="text-[#1e4d6b]" />
            <span>100% <strong className="text-[#1e4d6b]">BOTANICAL DISCLOSURE</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <FileText size={14} className="text-[#c44900]" />
            <span>NABL <strong className="text-[#111315]">LAB TESTED BATCHES</strong></span>
          </div>
        </div>
      </Reveal>

      {/* ── 3 · THE FORMULARY CATALOGUE (STAGE 02 — SMOOTH REVEAL) ─────────── */}
      <Reveal id="catalogue" as="section" className="shell py-12 lg:py-16 border-b border-gray-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              02 · THE FORMULARY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111315] uppercase mt-1">
              FIVE CLASSICAL FORMULATIONS
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-500">
            Swipe horizontally to explore all remedies ← →
          </p>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 text-left -mx-4 px-4 sm:mx-0 sm:px-0">
          {products.map((p, i) => (
            <div key={p.slug} className="w-[290px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={p} priority={i < 3} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 4 · TARGETED CLINICAL CARE (STAGE 03 — SMOOTH REVEAL) ─────────── */}
      <Reveal as="section" className="shell py-12 lg:py-16 border-b border-gray-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              03 · TARGETED CLINICAL CARE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111315] uppercase mt-1">
              HEALTH CONCERN SPECIFIC CARE
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {CONCERNS.map((c) => {
            const items = products.filter((p) => p.concernSlug === c.slug);
            return (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="group bg-white border border-gray-200/90 hover:border-[#c44900] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-deva text-base text-[#c44900] font-bold">
                      {c.hindi}
                    </span>
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold">
                      {items.length} REMEDY
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#111315] mb-2 group-hover:text-[#c44900] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {c.blurb}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-[#1e4d6b] font-bold">
                  <span>View {items.map((i) => i.name).join(", ")}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#c44900]" />
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* ── 5 · FORMULARY ENGINE (SMOOTH REVEAL) ──────────────────────────── */}
      <Reveal as="section">
        <FormularySection />
      </Reveal>

      {/* ── 6 · VERIFIED CLINICAL REVIEWS (STAGE 05 — SMOOTH REVEAL) ──────── */}
      <Reveal as="section" className="shell py-12 lg:py-16 border-b border-gray-200/70 bg-[#f4efe6]/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              05 · VERIFIED CLINICAL REVIEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111315] uppercase mt-1">
              CLINICAL FEEDBACK
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-500">
            Swipe to read verified customer experiences ← →
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 text-left -mx-4 px-4 sm:mx-0 sm:px-0">
          {reviews.filter((r) => r.rating >= 4).map((r) => (
            <div key={r.id} className="w-[300px] sm:w-[340px] shrink-0 snap-start bg-white border border-gray-200 p-6 rounded-2xl flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-1 mb-3 text-[#c44900]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "" : "text-gray-300"} />
                  ))}
                </div>
                {r.title && <h3 className="font-serif font-bold text-[#111315] mb-2">{r.title}</h3>}
                <p className="text-xs text-gray-600 italic mb-4 leading-relaxed line-clamp-4">&quot;{r.body}&quot;</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#111315]">{r.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{r.city}</span>
                </div>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#1c684e] bg-[#1c684e]/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={12} /> VERIFIED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 7 · FAQS (STAGE 06 — SMOOTH REVEAL) ───────────────────────────── */}
      <Reveal as="section" className="shell py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-left">
          <span className="block text-center font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase mb-1">
            06 · FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#111315] uppercase text-center mb-8">
            CLEAR ANSWERS ABOUT OUR REMEDIES
          </h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </Reveal>

      {/* Interactive Detail Modal for Selected Bottle */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl text-left">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-[#faf7f1] rounded-xl p-2 flex items-center justify-center shrink-0 border border-gray-200">
                <Image src={`/products/${activeModalProduct.slug}.png`} alt={activeModalProduct.name} width={100} height={100} className="object-contain max-h-full" />
              </div>
              <div>
                <span className="font-deva text-xs font-bold text-[#c44900]">{activeModalProduct.devanagari}</span>
                <h3 className="font-serif text-2xl font-bold text-[#111315]">{activeModalProduct.name}</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{activeModalProduct.tagline}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-[#111315]">₹{activeModalProduct.price}</span>
              <Link
                href={`/products/${activeModalProduct.slug}`}
                onClick={() => setActiveModalProduct(null)}
                className="bg-[#111315] text-white px-5 py-2 rounded-full font-mono text-xs font-bold hover:bg-[#c44900] transition-colors"
              >
                VIEW FULL DETAILS
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

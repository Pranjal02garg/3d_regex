"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  FileText,
  Award,
  Microchip,
  ChevronRight,
  Star,
  Beaker,
  Leaf,
  Sparkles,
  X,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import { Accordion } from "@/components/ui/Disclosure";
import ProductCard from "@/components/product/ProductCard";
import FormularySection from "@/components/product/FormularySection";
import { CONCERNS, products, type Product } from "@/content/products";
import { HOME_FAQS } from "@/content/trust";
import { reviews } from "@/content/reviews";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  
  // Mouse 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const activeProduct = products[activeIdx];

  // Mouse move 3D tilt effect matching Santioni Spirits physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setTilt({ x: x * 15, y: -y * 15 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const currentStage = stageRef.current;
    if (currentStage) {
      currentStage.addEventListener("mousemove", handleMouseMove);
      currentStage.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (currentStage) {
        currentStage.removeEventListener("mousemove", handleMouseMove);
        currentStage.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#111315] font-sans antialiased selection:bg-[#c44900] selection:text-white">
      
      {/* ── 1 · HERO STAGE (SANTIONI 3D INTERACTIVE HERO STAGE) ─────────────── */}
      <section
        ref={stageRef}
        className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-gray-200/80 bg-[radial-gradient(ellipse_at_top,#ffffff,#faf8f3)] pt-14 pb-8 px-4 sm:px-6 lg:px-8 select-none"
      >
        
        {/* Ambient Warm Golden Sun Glow */}
        <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-[#c44900]/12 blur-[140px] pointer-events-none animate-glow-pulse" />

        {/* Top Header Tag */}
        <div className="text-center pt-4 z-10">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#c44900] uppercase border border-[#c44900]/30 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
            <Sparkles size={12} className="text-[#c44900] animate-pulse" />
            01 · SANTIONI CRAFTED BOTANICAL AYURVEDA
          </span>
        </div>

        {/* Center Stage Spotlight Container */}
        <div className="my-auto z-10 text-center max-w-5xl mx-auto space-y-6">
          
          {/* Main Giant Headline */}
          <div className="overflow-hidden">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111315] uppercase leading-none transition-all duration-700">
              INDULGE IN PURE BOTANICAL WELLNESS
            </h1>
          </div>

          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
            Classical, lab-tested formulations crafted with 100% transparent botanical extracts in our Schedule T GMP facility.
          </p>

          {/* 3D Interactive Floating Bottle Pedestal */}
          <div className="relative py-4 flex flex-col items-center justify-center min-h-[300px]">
            
            {/* Prev / Next Navigation Arrows */}
            <button
              onClick={() => setActiveIdx((prev) => (prev === 0 ? products.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 border border-gray-200/80 shadow-lg text-[#111315] hover:bg-[#c44900] hover:text-white transition-all cursor-pointer"
              aria-label="Previous remedy"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev === products.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 border border-gray-200/80 shadow-lg text-[#111315] hover:bg-[#c44900] hover:text-white transition-all cursor-pointer"
              aria-label="Next remedy"
            >
              <ChevronRight size={20} />
            </button>

            {/* 3D Floating Bottle with Mouse Inertia */}
            <div
              className="relative transition-transform duration-200 ease-out cursor-pointer animate-float-center"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.05, 1.05, 1.05)`,
              }}
              onClick={() => setActiveModalProduct(activeProduct)}
            >
              <Image
                key={activeProduct.slug}
                src={`/products/${activeProduct.slug}.png`}
                alt={activeProduct.name}
                width={380}
                height={480}
                priority
                className="w-[220px] sm:w-[280px] h-auto object-contain mix-blend-multiply drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_35px_45px_rgba(196,73,0,0.35)] transition-all duration-500"
              />

              {/* Sanskrit Devanagari Floating Tag */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-[#c44900] font-bold whitespace-nowrap bg-white border border-gray-200 px-3 py-1 rounded-md shadow-xl flex items-center gap-1.5">
                <span className="font-deva text-xs font-bold">{activeProduct.devanagari}</span>
                <span>· {activeProduct.name}</span>
              </span>
            </div>

            {/* Stand Pedestal Radial Glow */}
            <div
              aria-hidden="true"
              className="mt-6 h-5 w-[240px] sm:w-[320px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(196,73,0,0.3),transparent_70%)] animate-pulse"
            />
          </div>

          {/* Numbered Bottle Selector Wheel (Santioni Pedestal Rotator) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
            {products.map((p, index) => (
              <button
                key={p.slug}
                onClick={() => setActiveIdx(index)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeIdx === index
                    ? "bg-[#111315] text-white border-[#111315] font-bold shadow-md scale-105"
                    : "bg-white/80 text-gray-600 border-gray-200 hover:border-[#c44900] hover:text-[#c44900]"
                }`}
              >
                0{index + 1} · {p.name}
              </button>
            ))}
          </div>

          {/* Santioni Glassmorphism Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 pt-4">
            <Link
              href={`/products/${activeProduct.slug}`}
              className="bg-[#111315] text-white hover:bg-[#c44900] px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <span>INSPECT {activeProduct.name}</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/918360053594"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#111315] hover:text-[#c44900] hover:border-[#c44900] bg-white border border-gray-300 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:scale-105"
            >
              <WhatsAppIcon size={15} className="text-[#25D366]" />
              <span>CONSULT DOCTOR</span>
            </a>
          </div>
        </div>

        {/* Stage Subtitle Footer */}
        <div className="z-10 text-center border-t border-gray-200/80 pt-4">
          <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            ACTIVE FORMULATION: {activeProduct.name} ({activeProduct.devanagari}) — {activeProduct.tagline}
          </p>
        </div>
      </section>

      {/* ── 2 · LUXURY TRUST STRIP ────────────────────────────────────────── */}
      <section className="py-4 bg-[#f4efe6] border-b border-gray-200/80 font-mono text-xs text-gray-700">
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
      </section>

      {/* ── 3 · THE FORMULARY CATALOGUE (STAGE 02) ─────────────────────────── */}
      <section id="catalogue" className="shell py-12 lg:py-16 border-b border-gray-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              02 · THE FORMULARY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111315] uppercase mt-1">
              OUR 5 CLASSICAL FORMULATIONS
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
      </section>

      {/* ── 4 · TARGETED CLINICAL CARE (STAGE 03) ─────────────────────────── */}
      <section className="shell py-12 lg:py-16 border-b border-gray-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              03 · TARGETED CLINICAL CARE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111315] uppercase mt-1">
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
                className="group bg-white border border-gray-200/90 hover:border-[#c44900] rounded-xl p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-deva text-base text-[#c44900] font-bold">
                      {c.hindi}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold">
                      {items.length} REMEDY
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#111315] mb-2 group-hover:text-[#c44900] transition-colors">
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
      </section>

      {/* ── 5 · BOTANICAL PURITY & LAB BANNER (STAGE 04) ──────────────────── */}
      <section className="shell py-12 lg:py-16 border-b border-gray-200/70">
        <div className="bg-[#f4efe6] border border-gray-300/80 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-7 space-y-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
                04 · BOTANICAL PURITY & LAB TEST
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111315] leading-tight uppercase">
                TESTED FOR HEAVY METALS, MICROBES & ASSAY POTENCY
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                Every batch manufactured in our Schedule T certified facility undergoes independent NABL laboratory testing before release.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#111315] shadow-2xs">
                  <Beaker size={14} className="text-[#c44900]" />
                  NABL Lab Tested
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#111315] shadow-2xs">
                  <ShieldCheck size={14} className="text-[#1c684e]" />
                  Schedule T GMP
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[#1c684e] shadow-2xs">
                  <Leaf size={14} />
                  100% Heavy Metal Free
                </span>
              </div>

              <div className="pt-3">
                <a
                  href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20quality%20query"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-md"
                >
                  <WhatsAppIcon size={16} className="text-white" />
                  <span>WHATSAPP QUALITY DESK</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-white border border-gray-200 p-2 shadow-sm">
              <Image
                src="/images/banner-lab-quality.jpg"
                alt="Regex Remedies Lab Quality"
                width={800}
                height={600}
                className="w-full h-auto object-contain block rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · FORMULARY ENGINE ──────────────────────────────────────────── */}
      <FormularySection />

      {/* ── 7 · VERIFIED CLINICAL REVIEWS (STAGE 05) ──────────────────────── */}
      <section className="shell py-12 lg:py-16 border-b border-gray-200/70 bg-[#f4efe6]/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase">
              05 · VERIFIED CLINICAL REVIEWS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111315] uppercase mt-1">
              DON&apos;T JUST TAKE OUR WORD FOR IT
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
      </section>

      {/* ── 8 · FAQS (STAGE 06) ───────────────────────────────────────────── */}
      <section className="shell py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-left">
          <span className="block text-center font-mono text-xs font-bold tracking-widest text-[#c44900] uppercase mb-1">
            06 · FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111315] uppercase text-center mb-8">
            CLEAR ANSWERS ABOUT OUR REMEDIES
          </h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </section>

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

"use client";

import { useState } from "react";
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
  X
} from "lucide-react";
import { Accordion } from "@/components/ui/Disclosure";
import ProductCard from "@/components/product/ProductCard";
import FormularySection from "@/components/product/FormularySection";
import { CONCERNS, products, type Product } from "@/content/products";
import { HOME_FAQS } from "@/content/trust";
import { reviews } from "@/content/reviews";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-[#111315] text-[#f4efe6] font-sans antialiased selection:bg-[#c4923e] selection:text-black">
      
      {/* ── 1 · HERO STAGE (SANTIONI SPIRITS IMMERSIVE FORMAT) ────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(28,35,44,0.8),#111315)] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Warm Glow */}
        <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#c4923e]/10 blur-[120px] pointer-events-none" />

        {/* Header Tag */}
        <div className="text-center pt-4 z-10">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#c4923e] uppercase border border-[#c4923e]/30 px-3.5 py-1 rounded-full bg-[#111315]/80 backdrop-blur-md">
            <Sparkles size={12} className="text-[#c4923e]" />
            01 · THE SCIENCE OF BOTANICAL AYURVEDA
          </span>
        </div>

        {/* Center Stage Title & Bottle Showcase */}
        <div className="my-auto z-10 text-center max-w-5xl mx-auto space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
            NATURAL REMEDIES FOR A BETTER YOU
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto font-sans leading-relaxed">
            Classical, lab-tested botanical formulations manufactured in our Schedule T GMP certified facility. 100% transparent ingredients, zero heavy metals.
          </p>

          {/* Interactive 5-Bottle Center Stage Display */}
          <div className="pt-4 pb-2">
            <div className="flex items-end justify-center gap-2 sm:gap-4 max-w-2xl mx-auto">
              {products.map((p, i) => {
                const centre = (products.length - 1) / 2;
                const lift = (1 - Math.abs(i - centre) / centre) * 16;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setActiveProduct(p)}
                    className="group relative flex-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                    style={{ marginBottom: `${lift}px`, maxWidth: "20%" }}
                  >
                    <Image
                      src={`/products/${p.slug}.png`}
                      alt={p.name}
                      width={400}
                      height={500}
                      priority={i < 3}
                      className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_20px_30px_rgba(196,146,62,0.4)] transition-all"
                    />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-[#c4923e] font-bold whitespace-nowrap bg-[#111315] border border-[#c4923e]/40 px-2 py-0.5 rounded">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stand Plane Shadow */}
            <div
              aria-hidden="true"
              className="mx-auto mt-2 h-4 w-[75%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(196,146,62,0.3),transparent_70%)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href="#catalogue"
              className="w-full sm:w-auto bg-[#c4923e] text-black hover:bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors text-center rounded-none shadow-lg"
            >
              EXPLORE FORMULATIONS
            </a>
            <a
              href="https://wa.me/918360053594"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white hover:text-[#c4923e] hover:border-[#c4923e] bg-white/5 border border-white/20 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors backdrop-blur-md"
            >
              <WhatsAppIcon size={16} className="text-[#25D366]" />
              <span>CONSULT OUR EXPERTS</span>
            </a>
          </div>
        </div>

        {/* Stage Subtitle Footer */}
        <div className="z-10 text-center border-t border-white/10 pt-4">
          <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            THE COMPLETE RANGE · FIVE CLASSICAL FORMULATIONS
          </p>
        </div>
      </section>

      {/* ── 2 · LUXURY TRUST STRIP (SANTIONI TICKER) ────────────────────────── */}
      <section className="py-4 bg-[#181a1d] border-b border-white/10 font-mono text-xs text-gray-300">
        <div className="shell grid grid-cols-2 md:flex items-center justify-around gap-4 font-bold text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <Award size={14} className="text-[#c4923e]" />
            <span>AYUSH LICENCE: <strong className="text-[#c4923e]">PB/AY/000000</strong></span>
          </div>
          <span className="hidden md:inline text-white/20">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <ShieldCheck size={14} className="text-[#1c684e]" />
            <span>SCHEDULE T <strong className="text-[#1c684e]">GMP CERTIFIED</strong></span>
          </div>
          <span className="hidden md:inline text-white/20">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <Microchip size={14} className="text-[#1e4d6b]" />
            <span>100% <strong className="text-[#1e4d6b]">BOTANICAL DISCLOSURE</strong></span>
          </div>
          <span className="hidden md:inline text-white/20">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <FileText size={14} className="text-[#c4923e]" />
            <span>NABL <strong className="text-white">LAB TESTED BATCHES</strong></span>
          </div>
        </div>
      </section>

      {/* ── 3 · THE FORMULARY CATALOGUE (STAGE 02) ─────────────────────────── */}
      <section id="catalogue" className="shell py-12 lg:py-16 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c4923e] uppercase">
              02 · THE FORMULARY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase mt-1">
              OUR 5 CLASSICAL FORMULATIONS
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400">
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
      <section className="shell py-12 lg:py-16 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c4923e] uppercase">
              03 · TARGETED CLINICAL CARE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase mt-1">
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
                className="group bg-[#181a1d] border border-white/10 hover:border-[#c4923e] rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-[#1f2226]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-deva text-base text-[#c4923e] font-bold">
                      {c.hindi}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-bold">
                      {items.length} REMEDY
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#c4923e] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {c.blurb}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#c4923e] font-bold">
                  <span>View {items.map((i) => i.name).join(", ")}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 5 · BOTANICAL PURITY & LAB BANNER (STAGE 04) ──────────────────── */}
      <section className="shell py-12 lg:py-16 border-b border-white/10">
        <div className="bg-[#181a1d] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-7 space-y-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#c4923e] uppercase">
                04 · BOTANICAL PURITY & LAB TEST
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight uppercase">
                TESTED FOR HEAVY METALS, MICROBES & ASSAY POTENCY
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Every batch manufactured in our Schedule T certified facility undergoes independent NABL laboratory testing before release.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-white">
                  <Beaker size={14} className="text-[#c4923e]" />
                  NABL Lab Tested
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-white">
                  <ShieldCheck size={14} className="text-[#1c684e]" />
                  Schedule T GMP
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-[#25D366]">
                  <Leaf size={14} />
                  100% Heavy Metal Free
                </span>
              </div>

              <div className="pt-3">
                <a
                  href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20quality%20query"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-black px-5 py-3 rounded-full font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all"
                >
                  <WhatsAppIcon size={16} className="text-black" />
                  <span>WHATSAPP QUALITY DESK</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2">
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
      <section className="shell py-12 lg:py-16 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 text-left gap-2">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#c4923e] uppercase">
              05 · VERIFIED CLINICAL REVIEWS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase mt-1">
              DON&apos;T JUST TAKE OUR WORD FOR IT
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-400">
            Swipe to read verified customer experiences ← →
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 text-left -mx-4 px-4 sm:mx-0 sm:px-0">
          {reviews.filter((r) => r.rating >= 4).map((r) => (
            <div key={r.id} className="w-[300px] sm:w-[340px] shrink-0 snap-start bg-[#181a1d] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-[#c4923e]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "" : "text-gray-600"} />
                  ))}
                </div>
                {r.title && <h3 className="font-serif font-bold text-white mb-2">{r.title}</h3>}
                <p className="text-xs text-gray-300 italic mb-4 leading-relaxed line-clamp-4">&quot;{r.body}&quot;</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{r.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{r.city}</span>
                </div>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full">
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
          <span className="block text-center font-mono text-xs font-bold tracking-widest text-[#c4923e] uppercase mb-1">
            06 · FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase text-center mb-8">
            CLEAR ANSWERS ABOUT OUR REMEDIES
          </h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </section>

      {/* Interactive Detail Modal for Selected Bottle */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#181a1d] border border-white/20 rounded-2xl p-6 shadow-2xl text-left">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white/5 rounded-xl p-2 flex items-center justify-center shrink-0 border border-white/10">
                <Image src={`/products/${activeProduct.slug}.png`} alt={activeProduct.name} width={100} height={100} className="object-contain max-h-full" />
              </div>
              <div>
                <span className="font-deva text-xs font-bold text-[#c4923e]">{activeProduct.devanagari}</span>
                <h3 className="font-serif text-2xl font-bold text-white">{activeProduct.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{activeProduct.tagline}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-white">₹{activeProduct.price}</span>
              <Link
                href={`/products/${activeProduct.slug}`}
                onClick={() => setActiveProduct(null)}
                className="bg-[#c4923e] text-black px-5 py-2 rounded-full font-mono text-xs font-bold hover:bg-white transition-colors"
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

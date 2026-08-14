import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Award,
  Microchip,
  ChevronRight,
  Star,
  Beaker,
  Leaf
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import FormularySection from "@/components/product/FormularySection";
import { CONCERNS, products } from "@/content/products";
import { HOME_FAQS, MANUFACTURING_STEPS } from "@/content/trust";
import { SITE } from "@/content/site";
import { reviews } from "@/content/reviews";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: "Regex Remedies",
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: "Regex Remedies",
        url: SITE.url,
        logo: `${SITE.url}/brand/emblem-ink.png`,
        sameAs: [SITE.socials.instagram, SITE.socials.facebook],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-8360053594",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111315] font-sans antialiased selection:bg-[var(--ochre)] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1 · HERO BANNER SECTION (ELEGANT & EDITORIAL) ─────────── */}
      <section className="bg-[#faf9f5] border-b border-gray-200">
        <div className="shell flex flex-col-reverse lg:flex-row items-center justify-between gap-10 py-12 lg:py-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
            <Reveal className="space-y-4">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--ochre)] uppercase">
                The Science of Ayurveda
              </span>
              <h1 className="font-serif h1 leading-[1.1] text-[#111315]">
                Natural Remedies for a Better You
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Classical, lab-tested botanical formulations manufactured in our Schedule T GMP certified facility. 100% transparent ingredients, zero heavy metals.
              </p>
            </Reveal>

            <Reveal className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-2 delay-100">
              <ButtonLink
                href="#catalogue"
                size="lg"
                className="w-full sm:w-auto rounded-none bg-[#111315] text-white hover:bg-[var(--ochre)] hover:text-white px-8 py-3.5 font-sans font-medium tracking-wide text-sm transition-colors border border-transparent"
              >
                Explore Formulations
              </ButtonLink>
              <a
                href="https://wa.me/918360053594"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#111315] hover:text-[var(--ochre)] hover:border-[var(--ochre)] bg-transparent border border-[#111315] px-8 py-3.5 font-sans font-medium text-sm transition-colors"
              >
                <WhatsAppIcon size={16} className="text-current" />
                <span>Consult Our Experts</span>
              </a>
            </Reveal>
          </div>

          {/* Hero Image */}
          <Reveal className="w-full lg:w-7/12 delay-200">
            <div className="relative w-full rounded-sm overflow-hidden shadow-sm bg-white p-1 border border-gray-100">
              <Image
                src="/images/banner-natural-remedies.jpg"
                alt="Regex Remedies — Natural Remedies For A Better You"
                width={1200}
                height={570}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="w-full h-auto object-contain block"
              />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 2 · ULTRA-COMPACT MOBILE TRUST BAR ──────────────────────────────── */}
      <section className="py-4 bg-[#faf7f1]/80 border-y border-gray-200/70 font-mono text-[#111315]">
        <div className="shell grid grid-cols-2 md:flex items-center justify-around gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold leading-tight text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1">
            <Award size={13} className="shrink-0 text-[var(--ochre)]" />
            <span>AYUSH LICENCE: <strong className="text-[var(--ochre)]">PB/AY/000000</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1">
            <ShieldCheck size={13} className="shrink-0 text-[var(--safe)]" />
            <span>SCHEDULE T <strong className="text-[var(--safe)]">GMP CERTIFIED</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1">
            <Microchip size={13} className="shrink-0 text-[var(--clinic)]" />
            <span>100% <strong className="text-[var(--clinic)]">BOTANICAL DISCLOSURE</strong></span>
          </div>
          <span className="hidden md:inline text-gray-300">•</span>
          <div className="flex items-center justify-center md:justify-start gap-1">
            <FileText size={13} className="shrink-0 text-[var(--ochre)]" />
            <span>NABL <strong className="text-[#111315]">LAB TESTED BATCHES</strong></span>
          </div>
        </div>
      </section>

      {/* ── 3 · OUR 5 MANUFACTURED REMEDIES (HORIZONTAL SWIPE CAROUSEL) ────────── */}
      <Reveal as="section" id="catalogue" className="shell py-6 sm:py-12 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">THE RANGE</span>
            <h2 className="font-serif h3 text-[#111315] font-bold mt-0.5">
              Our 5 Classical Formulations
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Swipe horizontally to view all 5 remedies ← →
            </p>
          </div>
          <ButtonLink href="/shop" variant="secondary" size="sm" className="rounded-full font-bold text-xs self-start sm:self-auto">
            All Remedies
            <ArrowRight size={14} className="ml-1" />
          </ButtonLink>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 pl-5 pr-[70px] sm:mx-0 sm:pl-0 sm:pr-0">
          {products.map((p, i) => (
            <div key={p.slug} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={p} priority={i < 3} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 4 · SHOP BY HEALTH CONCERN (HORIZONTAL SWIPE CAROUSEL) ─────────────── */}
      <Reveal as="section" className="shell py-6 sm:py-12 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">TARGETED CARE</span>
            <h2 className="font-serif h3 text-[#111315] font-bold mt-0.5">
              What health concern are you dealing with?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Swipe horizontally to explore health concerns ← →
            </p>
          </div>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 pl-5 pr-[70px] sm:mx-0 sm:pl-0 sm:pr-0">
          {CONCERNS.map((c) => {
            const items = products.filter((p) => p.concernSlug === c.slug);
            return (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="w-[260px] sm:w-[280px] shrink-0 snap-start group bg-white border border-gray-200 hover:border-[var(--ochre)] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-deva text-sm text-[var(--ochre)] font-bold">
                      {c.hindi}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold">
                      {items.length} Remedy
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#111315] mb-1 group-hover:text-[var(--ochre)] transition-colors font-bold">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {c.blurb}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-[var(--clinic)] font-bold">
                  <span>View {items.map((i) => i.name).join(", ")}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[var(--ochre)]" />
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* ── 5 · PROMOTIONAL LAB QUALITY BANNER (CLEAN LIGHT MODE CARD) ───────── */}
      <Reveal as="section" className="shell py-6 sm:py-12 border-b border-gray-100">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
            {/* Left Content Side */}
            <div className="md:col-span-7 space-y-3">
              <span className="eyebrow text-[var(--ochre)] font-bold text-xs">
                QUALITY & BOTANICAL PURITY
              </span>
              <h2 className="font-serif h3 text-[#111315] font-bold leading-tight">
                Tested for Heavy Metals, Microbes & Assay Potency
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                Every batch manufactured in our Schedule T certified facility undergoes independent NABL laboratory testing before release.
              </p>

              {/* Quality Badges */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#111315]">
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs">
                  <Beaker size={13} className="shrink-0" />
                  NABL Lab Tested
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs">
                  <ShieldCheck size={13} className="shrink-0" />
                  Schedule T GMP
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs text-[var(--safe)]">
                  <Leaf size={13} className="shrink-0" />
                  100% Heavy Metal Free
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20quality%20query"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-xs"
                >
                  <WhatsAppIcon size={16} className="text-white" />
                  <span>WhatsApp Quality Desk</span>
                </a>
              </div>
            </div>

            {/* Right Image Side — 100% Pristine Un-cropped Lab Banner */}
            <div className="md:col-span-5">
              <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white p-1">
                <Image
                  src="/images/banner-lab-quality.jpg"
                  alt="Pharmaceutical Quality Control Lab — Regex Remedies"
                  width={1200}
                  height={570}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto object-contain rounded-lg block"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 6 · THE OPEN FORMULARY ENGINE (INTERACTIVE COMPOSITION SELECTOR) ──── */}
      <FormularySection />

      {/* ── 7 · MANUFACTURING 6 STEPS (HORIZONTAL SWIPE CAROUSEL) ─────────────── */}
      <Reveal as="section" className="shell py-6 sm:py-12 border-b border-gray-100">
        <div className="text-left max-w-xl mb-4">
          <p className="eyebrow text-[var(--ochre)] font-bold">Manufacturing Standard</p>
          <h2 className="display h3 text-[#111315] mt-0.5">
            Six steps from field to finished formulation.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Swipe horizontally to view manufacturing process ← →
          </p>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 pl-5 pr-[70px] sm:mx-0 sm:pl-0 sm:pr-0">
          {MANUFACTURING_STEPS.map((s) => (
            <div key={s.n} className="w-[260px] sm:w-[280px] shrink-0 snap-start bg-white border border-gray-200 p-4 rounded-xl shadow-xs">
              <span className="font-mono text-xs font-bold text-[var(--ochre)]">{s.n}</span>
              <h3 className="font-serif text-base font-bold text-[#111315] mt-0.5 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 8 · VERIFIED REVIEWS (WALL OF LOVE) ──────────────────────────────── */}
      <Reveal as="section" className="shell py-8 sm:py-12 bg-[#faf7f1]/50 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">WALL OF LOVE</span>
            <h2 className="font-serif h3 text-[#111315] font-bold mt-0.5">
              Don&apos;t just take our word for it.
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Swipe to read verified customer experiences ← →
            </p>
          </div>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 text-left -mx-5 pl-5 pr-[70px] sm:mx-0 sm:pl-0 sm:pr-0">
          {reviews.filter((r) => r.rating >= 4).map((r) => (
            <div key={r.id} className="w-[300px] sm:w-[340px] shrink-0 snap-start bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-[var(--ochre)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "" : "text-gray-300"} />
                  ))}
                </div>
                {r.title && <h3 className="font-serif font-bold text-[#111315] mb-2">{r.title}</h3>}
                <p className="text-sm text-gray-600 italic mb-4 leading-relaxed line-clamp-4">&quot;{r.body}&quot;</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#111315]">{r.name}</span>
                  <span className="text-xs text-gray-500">{r.city}</span>
                </div>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[var(--safe)] bg-[var(--safe)]/10 px-2 py-1 rounded-full">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 9 · FAQS (ACCORDION) ────────────────────────────────────────────── */}
      <Reveal as="section" className="shell py-6 sm:py-12">
        <div className="max-w-3xl mx-auto text-left">
          <p className="eyebrow text-[var(--ochre)] mb-1 font-bold text-center">Frequently Asked Questions</p>
          <h2 className="display h3 text-[#111315] mb-6 text-center">Clear answers about our remedies.</h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </Reveal>

    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Award, 
  Microchip, 
  ChevronRight,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import FormularySection from "@/components/product/FormularySection";
import { CONCERNS, products } from "@/content/products";
import { HOME_FAQS, MANUFACTURING_STEPS } from "@/content/trust";
import { SITE } from "@/content/site";
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

      {/* ── 1 · HERO BANNER SECTION (WORLD-CLASS MOBILE HERO SHOWCASE) ─────────── */}
      <section className="shell pt-2 sm:pt-4 pb-3">
        <div className="space-y-3">
          {/* Main Hero Card Container with Rich Warm Gradient */}
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm bg-gradient-to-b from-[#f7f5ed] via-white to-[#faf9f5] p-2 sm:p-4">
            
            {/* Top Quality Badge */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-[var(--ochre)] bg-white/90 border border-gray-200 rounded-full px-2.5 py-0.5 shadow-2xs">
                <Sparkles size={12} className="text-[var(--ochre)] shrink-0" />
                <span>OFFICIAL MANUFACTURED RANGE</span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold text-gray-500 hidden sm:inline">
                AYUSH Licensed · Schedule T GMP
              </span>
            </div>

            {/* Pristine Large Banner Graphic (0% covered by buttons) */}
            <div className="relative w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-2xs">
              <Image
                src="/images/banner-natural-remedies.jpg"
                alt="Regex Remedies — Natural Remedies For A Better You"
                width={1200}
                height={570}
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="w-full h-auto object-contain block"
              />
            </div>

            {/* Quick Product Tap Selector Bar */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <Link href="#catalogue" className="shrink-0 bg-[#111315] text-white px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold hover:bg-[var(--ochre)] hover:text-black transition-colors">
                🌿 All 5 Remedies
              </Link>
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="shrink-0 bg-white border border-gray-200 text-gray-800 px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors shadow-2xs"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Crisp Mobile Action Grid Directly Below Hero */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <ButtonLink
              href="#catalogue"
              size="sm"
              className="w-full justify-center rounded-xl bg-[#111315] text-white hover:bg-[var(--ochre)] hover:text-black font-bold text-xs sm:text-sm py-2.5 sm:py-3 shadow-xs border border-transparent"
            >
              <ShoppingBag size={15} className="mr-1.5 shrink-0" />
              <span>Explore 5 Remedies</span>
            </ButtonLink>

            <a
              href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 sm:py-3 px-3 rounded-xl font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-xs border border-transparent"
            >
              <WhatsAppIcon size={18} className="text-white shrink-0" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2 · ULTRA-COMPACT MOBILE TRUST BAR ──────────────────────────────── */}
      <section className="py-2.5 bg-[#faf7f1]/80 border-y border-gray-200/70 font-mono text-[#111315]">
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
      <Reveal as="section" id="catalogue" className="shell py-6 sm:py-10 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">THE RANGE</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111315] font-bold mt-0.5">
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
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 px-5 sm:mx-0 sm:px-0">
          {products.map((p, i) => (
            <div key={p.slug} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={p} priority={i < 3} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 4 · SHOP BY HEALTH CONCERN (HORIZONTAL SWIPE CAROUSEL) ─────────────── */}
      <Reveal as="section" className="shell py-6 sm:py-10 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">TARGETED CARE</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111315] font-bold mt-0.5">
              What health concern are you dealing with?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Swipe horizontally to explore health concerns ← →
            </p>
          </div>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 px-5 sm:mx-0 sm:px-0">
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
      <Reveal as="section" className="shell py-6 sm:py-10 border-b border-gray-100">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
            {/* Left Content Side */}
            <div className="md:col-span-7 space-y-3">
              <span className="eyebrow text-[var(--ochre)] font-bold text-xs">
                QUALITY & BOTANICAL PURITY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111315] font-bold leading-tight">
                Tested for Heavy Metals, Microbes & Assay Potency
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                Every batch manufactured in our Schedule T certified facility undergoes independent NABL laboratory testing before release.
              </p>

              {/* Quality Badges */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#111315]">
                <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs">
                  🔬 NABL Lab Tested
                </span>
                <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs">
                  🛡️ Schedule T GMP
                </span>
                <span className="bg-white border border-gray-200 px-2.5 py-1 rounded-full shadow-2xs text-[var(--safe)]">
                  🌿 100% Heavy Metal Free
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
      <Reveal as="section" className="shell py-6 sm:py-10 border-b border-gray-100">
        <div className="text-left max-w-xl mb-4">
          <p className="eyebrow text-[var(--ochre)] font-bold">Manufacturing Standard</p>
          <h2 className="display text-2xl sm:text-3xl text-[#111315] mt-0.5">
            Six steps from field to finished formulation.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Swipe horizontally to view manufacturing process ← →
          </p>
        </div>

        {/* Horizontal Touch Carousel */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 text-left -mx-5 px-5 sm:mx-0 sm:px-0">
          {MANUFACTURING_STEPS.map((s) => (
            <div key={s.n} className="w-[260px] sm:w-[280px] shrink-0 snap-start bg-white border border-gray-200 p-4 rounded-xl shadow-xs">
              <span className="font-mono text-xs font-bold text-[var(--ochre)]">{s.n}</span>
              <h3 className="font-serif text-base font-bold text-[#111315] mt-0.5 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 8 · FAQS (ACCORDION) ────────────────────────────────────────────── */}
      <Reveal as="section" className="shell py-6 sm:py-10">
        <div className="max-w-3xl mx-auto text-left">
          <p className="eyebrow text-[var(--ochre)] mb-1 font-bold text-center">Frequently Asked Questions</p>
          <h2 className="display text-2xl sm:text-3xl text-[#111315] mb-6 text-center">Clear answers about our remedies.</h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </Reveal>

    </div>
  );
}

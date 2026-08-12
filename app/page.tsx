import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Award, 
  Microchip, 
  ChevronRight,
  ShoppingBag
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import FormulationTable from "@/components/product/FormulationTable";
import { CONCERNS, getProduct, products } from "@/content/products";
import { HOME_FAQS, MANUFACTURING_STEPS } from "@/content/trust";
import { SITE } from "@/content/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const formulary = getProduct("kabzraj")!;

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

      {/* ── 1 · HERO BANNER SECTION (MOBILE PERFECT & UNCOVERED BANNER GRAPHIC) ── */}
      <section className="shell pt-2 sm:pt-4 pb-3">
        <div className="space-y-2.5">
          {/* Pristine Un-cropped Banner Image (0% covered by any button) */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-[#faf9f5]">
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

          {/* Crisp Mobile Action Grid Directly Below Banner */}
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

      {/* ── 3 · OUR 5 MANUFACTURED REMEDIES (CATALOGUE UP FRONT) ─────────────── */}
      <Reveal as="section" id="catalogue" className="shell py-8 sm:py-12 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 text-left gap-2">
          <div>
            <span className="eyebrow text-[var(--ochre)] font-bold text-xs">THE RANGE</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111315] font-bold mt-0.5">
              Our 5 Classical Formulations
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Manufactured with 100% full ingredient disclosure and certified quality standards.
            </p>
          </div>
          <ButtonLink href="/shop" variant="secondary" size="sm" className="rounded-full font-bold text-xs self-start sm:self-auto">
            All Remedies
            <ArrowRight size={14} className="ml-1" />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
      </Reveal>

      {/* ── 4 · SHOP BY HEALTH CONCERN ──────────────────────────────────────── */}
      <Reveal as="section" className="shell py-8 sm:py-12 border-b border-gray-100">
        <div className="text-left mb-6 max-w-xl">
          <span className="eyebrow text-[var(--ochre)] font-bold text-xs">TARGETED CARE</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#111315] font-bold mt-0.5">
            What health concern are you dealing with?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Four core health concerns. Select below to find your specific formulation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
          {CONCERNS.map((c) => {
            const items = products.filter((p) => p.concernSlug === c.slug);
            return (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="group bg-white border border-gray-200 hover:border-[var(--ochre)] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
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

      {/* ── 5 · PROMOTIONAL LAB QUALITY BANNER ──────────────────────────────── */}
      <Reveal as="section" className="shell py-8 sm:py-12 border-b border-gray-100">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          <div className="relative aspect-[21/9] w-full min-h-[220px]">
            <Image
              src="/images/banner-lab-quality.jpg"
              alt="Pharmaceutical Quality Control Lab — Regex Remedies"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center p-5 sm:p-10 text-left">
              <div className="max-w-lg text-white space-y-2.5">
                <span className="eyebrow text-[#c4923e] block font-mono text-xs font-bold">QUALITY & BOTANICAL PURITY</span>
                <h2 className="font-serif text-xl sm:text-3xl text-white font-bold">
                  Tested for Heavy Metals, Microbes & Assay Potency
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  Every batch manufactured in our Schedule T certified facility undergoes independent NABL lab testing.
                </p>
                <div className="pt-1">
                  <a
                    href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20quality%20query"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-xs"
                  >
                    <WhatsAppIcon size={16} className="text-white" />
                    <span>WhatsApp Quality Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 6 · THE OPEN FORMULARY ENGINE ────────────────────────────────────── */}
      <Reveal as="section" className="bg-gray-50 py-8 sm:py-12 border-b border-gray-200">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-5 text-left space-y-2.5">
            <p className="eyebrow text-[var(--ochre)] font-bold">Full Transparency</p>
            <h2 className="display text-2xl sm:text-3xl text-[#111315]">
              100% Botanical Ingredient Disclosure
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              We publish exact Sanskrit names, botanical binomials, plant parts used, and milligram quantities per dose for every remedy we make.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2.5 border-b border-gray-100 pb-2">
                <span className="eyebrow text-[var(--ochre)] font-bold text-xs">Formulary Audit · {formulary.name}</span>
                <span className="font-mono text-xs text-gray-500 font-semibold">{formulary.classicalReference}</span>
              </div>
              <FormulationTable product={formulary} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 7 · MANUFACTURING 6 STEPS ───────────────────────────────────────── */}
      <Reveal as="section" className="shell py-8 sm:py-12 border-b border-gray-100">
        <div className="text-left max-w-xl mb-5">
          <p className="eyebrow text-[var(--ochre)] font-bold">Manufacturing Standard</p>
          <h2 className="display text-2xl sm:text-3xl text-[#111315] mt-0.5">
            Six steps from field to finished formulation.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
          {MANUFACTURING_STEPS.map((s) => (
            <div key={s.n} className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs">
              <span className="font-mono text-xs font-bold text-[var(--ochre)]">{s.n}</span>
              <h3 className="font-serif text-base font-bold text-[#111315] mt-0.5 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 8 · FAQS (ACCORDION) ────────────────────────────────────────────── */}
      <Reveal as="section" className="shell py-8 sm:py-12">
        <div className="max-w-3xl mx-auto text-left">
          <p className="eyebrow text-[var(--ochre)] mb-1 font-bold text-center">Frequently Asked Questions</p>
          <h2 className="display text-2xl sm:text-3xl text-[#111315] mb-6 text-center">Clear answers about our remedies.</h2>
          <Accordion items={[...HOME_FAQS]} />
        </div>
      </Reveal>

    </div>
  );
}

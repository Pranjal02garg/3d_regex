import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, CheckCircle2 } from "lucide-react";
import Gallery from "@/components/product/Gallery";
import AddToCart from "@/components/product/AddToCart";
import FormulationTable from "@/components/product/FormulationTable";
import ProductCard from "@/components/product/ProductCard";
import { Accordion } from "@/components/ui/Disclosure";
import { Badge, Callout, Rating, DataRow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { CARE_LEVELS, getProduct, products } from "@/content/products";
import { reviewsFor } from "@/content/reviews";
import { MEDICAL_DISCLAIMER, SITE } from "@/content/site";
import { formatINR, packDuration } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.devanagari}) — ${p.tagline}`,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} — ${p.tagline}`,
      description: p.summary,
      images: [{ url: `/products/${p.slug}-card.jpg`, width: 1200, height: 1500 }],
    },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "composition", label: "Composition" },
  { id: "how-to-take", label: "Dosage & Usage" },
  { id: "safety", label: "Safety & Guidance" },
  { id: "reviews", label: "Reviews" },
  { id: "questions", label: "FAQs" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const care = CARE_LEVELS[product.careLevel];
  const reviews = reviewsFor(product.slug);
  const days = packDuration(product.unitsPerPack, product.unitsPerDay);
  const related = products.filter((p) => p.slug !== product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${SITE.url}/products/${product.slug}.png`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/products/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="shell pt-4 sm:pt-6 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-gray-500 mb-4">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/shop" className="hover:text-[var(--ochre)]">
                Remedies
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/shop/${product.concernSlug}`} className="hover:text-[var(--ochre)]">
                {product.concern}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-bold text-[#111315]">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* ── Buy Block (Premium Editorial Layout) ─────────────────────────── */}
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-start">
          <Reveal className="lg:col-span-6 w-full">
            <Gallery product={product} />
          </Reveal>

          <Reveal className="lg:col-span-6 space-y-6 lg:pt-4 delay-100">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Link
                  href={`/shop/${product.concernSlug}`}
                  className="font-mono text-xs text-[var(--ochre)] font-bold uppercase tracking-widest hover:underline"
                >
                  {product.concern}
                </Link>
                <span className="font-deva text-base font-bold text-[var(--ochre)] px-3 py-0.5 rounded-full border border-gray-200">
                  {product.devanagari}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111315] leading-[1.1]">{product.name}</h1>
              <p className="text-base sm:text-lg text-gray-600 font-sans mt-3">{product.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-y border-gray-100 py-4">
              <Link href="#reviews" className="hover:opacity-80">
                <Rating value={product.rating} count={product.reviewCount} />
              </Link>
              <span className="text-gray-300">•</span>
              <Badge tone={care.tone}>{care.label}</Badge>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-mono font-bold text-gray-600 uppercase">≈ {days} Days Pack</span>
            </div>

            {/* Price Box */}
            <div className="pt-2">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-3xl font-medium text-[#111315]">{formatINR(product.price)}</span>
                {product.mrp > product.price && (
                  <span className="font-sans text-lg text-gray-400 line-through">
                    {formatINR(product.mrp)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 font-sans mb-6">
                Pack of {product.unitsPerPack} {product.form === "tablet" ? "tablets" : "capsules"} · Inclusive of all taxes
              </p>

              <div className="mt-4">
                <AddToCart product={product} />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 text-xs font-mono text-gray-500 pt-6 border-t border-gray-100">
              <p className="flex items-center gap-2">
                <Truck size={16} className="text-[#111315]" />
                <span>Dispatched within 24 hours. Express Delivery 2-4 Days.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#111315]" />
                <span>AYUSH Licensed & Schedule T Certified Manufacturing</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Sticky Section Bar ─────────────────────────────────────────── */}
      <nav
        aria-label="Sections of this page"
        className="sticky top-17 sm:top-20 z-30 mt-8 border-y border-gray-200 bg-white/95 backdrop-blur-md"
      >
        <div className="shell flex gap-6 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-bold">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 text-gray-600 hover:text-[var(--ochre)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="shell text-left space-y-10 py-8">
        {/* ── Overview ──────────────────────────────────────────────────── */}
        <section id="overview" className="scroll-mt-32">
          <div className="max-w-2xl mb-4">
            <p className="eyebrow text-[var(--ochre)]">Overview</p>
            <h2 className="font-serif text-2xl font-bold text-[#111315] mt-1">{product.summary}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.benefits.map((b) => (
              <div key={b.title} className="bg-[var(--surface-2)] p-4 rounded-xl border border-gray-200">
                <h3 className="font-serif text-base font-bold text-[#111315]">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Composition Table ─────────────────────────────────────────── */}
        <section id="composition" className="scroll-mt-32">
          <div className="mb-3">
            <p className="eyebrow text-[var(--ochre)]">Formulation Breakdown</p>
            <h2 className="font-serif text-2xl font-bold text-[#111315]">Active Botanical Formula</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs">
            <FormulationTable product={product} />
          </div>
        </section>

        {/* ── Dosage & Usage ────────────────────────────────────────────── */}
        <section id="how-to-take" className="scroll-mt-32">
          <div className="mb-3">
            <p className="eyebrow text-[var(--ochre)]">Dosage & Usage</p>
            <h2 className="font-serif text-2xl font-bold text-[#111315]">How to take {product.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div className="bg-[var(--surface-2)] p-4 sm:p-5 rounded-xl border border-gray-200">
              <h3 className="font-serif text-lg font-bold text-[#111315] mb-3">{product.dosage.amount}, {product.dosage.timing.toLowerCase()}</h3>
              <dl className="grid grid-cols-2 gap-3 font-mono text-xs">
                <DataRow label="Dose" value={product.dosage.amount} />
                <DataRow label="Timing" value={product.dosage.timing} />
                <DataRow label="Duration" value={product.dosage.duration} />
                <DataRow label="Suitable For" value={product.ageGroup} />
              </dl>
            </div>

            <div className="space-y-2">
              <h3 className="eyebrow text-xs text-gray-500 mb-1">EXPECTED TIMELINE</h3>
              {product.ritual.map((r) => (
                <div key={r.week} className="bg-white p-3 rounded-lg border border-gray-200 text-xs">
                  <span className="font-mono font-bold text-[var(--ochre)] block">{r.week}</span>
                  <span className="text-gray-700 font-sans mt-0.5 block">{r.expect}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Safety ────────────────────────────────────────────────────── */}
        <section id="safety" className="scroll-mt-32">
          <div className="mb-3">
            <p className="eyebrow text-[var(--ochre)]">Safety & Guidance</p>
            <h2 className="font-serif text-2xl font-bold text-[#111315]">Contraindications & Precautions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Callout tone="contra" title="Do not take if">
              <ul className="text-xs space-y-1">
                {product.safety.avoidIf.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </Callout>

            <Callout tone="caution" title="Interactions">
              <ul className="text-xs space-y-1">
                {product.safety.interactions.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </Callout>

            <Callout tone="info" title="Possible Side Effects">
              <p className="text-xs">{product.safety.sideEffects}</p>
            </Callout>
          </div>
        </section>

        {/* ── Reviews ───────────────────────────────────────────────────── */}
        <section id="reviews" className="scroll-mt-32">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="eyebrow text-[var(--ochre)]">Customer Reviews</p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111315]">Verified Ratings ({product.reviewCount})</h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#111315]">{product.rating.toFixed(1)}</span>
              <Rating value={product.rating} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, 4).map((r) => (
              <div key={r.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <Rating value={r.rating} />
                  {r.verified && <Badge tone="safe">Verified Purchase</Badge>}
                </div>
                {r.title && <p className="font-bold text-sm text-[#111315]">{r.title}</p>}
                <p className="text-xs text-gray-700 leading-relaxed">{r.body}</p>
                <p className="text-[10px] font-mono text-gray-400">
                  {r.name} · {r.city}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ──────────────────────────────────────────────────────── */}
        <section id="questions" className="scroll-mt-32">
          <div className="mb-3">
            <p className="eyebrow text-[var(--ochre)]">FAQs</p>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111315]">Frequently Asked Questions</h2>
          </div>
          <Accordion items={product.faqs.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
        </section>

        {/* ── HORIZONTAL TOUCH CAROUSEL FOR OTHER CLASSICAL REMEDIES ────── */}
        <section className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="eyebrow text-[var(--ochre)] text-xs">Explore Range</p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111315]">Other Classical Remedies</h2>
            </div>
            <span className="font-mono text-xs text-gray-400 font-bold">Swipe →</span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory">
            {related.map((p) => (
              <div key={p.slug} className="w-[260px] sm:w-[310px] shrink-0 snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>

        <p className="pt-4 text-xs text-gray-400 font-mono leading-relaxed border-t border-gray-100">
          {MEDICAL_DISCLAIMER}
        </p>
      </div>
    </>
  );
}

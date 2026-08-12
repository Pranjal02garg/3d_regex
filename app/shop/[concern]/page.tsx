import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShopBrowser from "../ShopBrowser";
import { CONCERNS, productsByConcern } from "@/content/products";

export function generateStaticParams() {
  return CONCERNS.map((c) => ({ concern: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ concern: string }>;
}): Promise<Metadata> {
  const { concern } = await params;
  const c = CONCERNS.find((x) => x.slug === concern);
  if (!c) return {};
  return {
    title: `${c.title} — Ayurvedic remedies`,
    description: c.blurb,
    alternates: { canonical: `/shop/${c.slug}` },
  };
}

export default async function ConcernPage({
  params,
}: {
  params: Promise<{ concern: string }>;
}) {
  const { concern } = await params;
  const c = CONCERNS.find((x) => x.slug === concern);
  if (!c) notFound();

  const items = productsByConcern(c.slug);

  return (
    <div className="shell pt-10 md:pt-14">
      <nav aria-label="Breadcrumb" className="text-caption text-fg-3">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/shop" className="link-underline">
              All remedies
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-fg-2">
            {c.title}
          </li>
        </ol>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="display text-h1">
          {c.title}
          <span className="font-deva ml-4 text-h3 text-fg-3">{c.hindi}</span>
        </h1>
        <p className="mt-5 text-lead text-fg-2">{c.blurb}</p>
      </header>

      <div className="mt-14">
        <ShopBrowser products={items} lockedConcern={c.slug} />
      </div>
    </div>
  );
}

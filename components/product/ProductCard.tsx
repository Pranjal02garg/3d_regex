"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { Product } from "@/content/products";
import { getIngredient } from "@/content/ingredients";
import { Rating } from "@/components/ui/Primitives";
import { formatINR, packDuration } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Bottle3DCanvas = dynamic(() => import("@/components/3d/Bottle3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
});

export default function ProductCard({
  product,
}: {
  product: Product;
  priority?: boolean;
}) {
  const days = packDuration(product.unitsPerPack, product.unitsPerDay);

  return (
    <article className="panel card-press group relative flex h-full w-full flex-col p-4 hover:border-accent sm:p-5">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-deva shrink-0 whitespace-nowrap rounded-full border border-line bg-surface-3 px-3 py-0.5 text-[13px] font-bold text-accent">
            {product.devanagari}
          </span>
          <span className="shrink whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-wider text-fg-3 sm:text-[10px]">
            {product.form.toUpperCase()} · {product.unitsPerPack} TAB
          </span>
        </div>

        {/* 3D WebGL Bottle Canvas Stage — 100% Interactive 3D Model */}
        <div className="card-media relative mb-4 flex aspect-[4/3] min-h-[220px] w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-gradient-to-b from-surface-2 to-surface-3 p-1 sm:min-h-[240px]">
          <div
            aria-hidden="true"
            className="stage-floor absolute inset-x-6 bottom-3 h-10 rounded-[50%]"
          />
          
          <Bottle3DCanvas
            productSlug={product.slug}
            productName={product.name}
            className="h-full w-full"
          />

          <span className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-center gap-1 rounded-md border border-line bg-surface/85 px-2 py-1 font-mono text-[10px] font-bold text-safe backdrop-blur-md">
            <CheckCircle2 size={12} />
            <span>AYUSH SCHEDULE T CERTIFIED</span>
          </span>
        </div>

        <div className="mb-1 flex items-baseline justify-between gap-2">
          <h3 className="display h4 text-fg transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <div className="text-right font-mono">
            <span className="text-lg font-bold text-fg">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="ml-1.5 text-xs text-fg-3 line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
        </div>

        <p className="mb-4 line-clamp-2 body-sm text-fg-2">{product.tagline}</p>

        <div className="mb-4 mt-auto rounded-lg border border-line bg-surface-2 p-2.5">
          <div className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-accent">
            Key botanical formula
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.formulation.slice(0, 3).map((row) => {
              const ing = getIngredient(row.ingredient);
              return (
                <span
                  key={row.ingredient}
                  className="rounded border border-line bg-surface-3 px-2 py-0.5 font-mono text-[10px] font-semibold text-fg-2 sm:text-xs"
                >
                  {ing?.sanskrit ?? row.ingredient} {row.mg}mg
                </span>
              );
            })}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-2 border-t border-line-2 pt-3">
        <div className="flex flex-col">
          <Rating value={product.rating} count={product.reviewCount} />
          <span className="mt-0.5 font-mono text-[10px] text-fg-3 sm:text-xs">
            ≈ {days} days pack
          </span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="pill pill-solid px-4 py-2 text-[11px]"
        >
          <span>Buy now</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

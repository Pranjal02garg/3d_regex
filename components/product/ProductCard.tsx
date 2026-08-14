"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/content/products";
import { getIngredient } from "@/content/ingredients";
import { Rating } from "@/components/ui/Primitives";
import { formatINR, packDuration } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const days = packDuration(product.unitsPerPack, product.unitsPerDay);

  return (
    <article className="card-press group relative flex flex-col w-full h-full bg-white border border-gray-200 hover:border-[var(--ochre)] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col flex-1 focus-visible:outline-none"
      >
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-deva shrink-0 whitespace-nowrap text-[13px] font-bold text-[var(--ochre)] px-3 py-0.5 rounded-full bg-[var(--surface-2)] border border-gray-200">
            {product.devanagari}
          </span>
          <span className="eyebrow shrink whitespace-nowrap text-[9px] sm:text-[10px] text-gray-500 font-bold">
            {product.form.toUpperCase()} · {product.unitsPerPack} TAB
          </span>
        </div>

        {/* Official Product Cover Bottle Image Box.
            The frame is fixed and clips; only the bottle inside scales. */}
        <div className="card-media relative flex aspect-[4/3] min-h-[220px] sm:min-h-[240px] w-full items-center justify-center overflow-hidden rounded-xl mb-4 bg-white border border-gray-100 p-3">
          <Image
            src={`/products/${product.slug}.png`}
            alt={`${product.name} — ${product.tagline}`}
            width={600}
            height={700}
            priority={priority}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 360px"
            className="max-h-full max-w-full h-auto w-auto object-contain drop-shadow-md"
          />

          <span className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-white/95 border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-mono text-[var(--safe)] flex items-center justify-center gap-1 shadow-xs font-bold">
            <CheckCircle2 size={12} />
            <span>OFFICIAL COVER PRODUCT</span>
          </span>
        </div>

        {/* Name & Price */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111315] group-hover:text-[var(--ochre)] transition-colors">
            {product.name}
          </h3>
          <div className="text-right font-mono">
            <span className="text-lg font-bold text-[#111315]">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 line-clamp-2">
          {product.tagline}
        </p>

        {/* Botanical Formula Pills */}
        <div className="bg-[var(--surface-2)] p-2.5 rounded-xl border border-gray-200 text-[10px] sm:text-xs font-mono text-gray-600 mb-4 mt-auto">
          <div className="eyebrow text-[9px] text-[var(--ochre)] mb-1 font-bold">KEY HERBAL INGREDIENTS</div>
          <div className="flex flex-wrap gap-1.5 text-gray-800">
            {product.formulation.slice(0, 3).map((row) => {
              const ing = getIngredient(row.ingredient);
              return (
                <span key={row.ingredient} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold">
                  {ing?.sanskrit ?? row.ingredient} {row.mg}mg
                </span>
              );
            })}
          </div>
        </div>
      </Link>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <Rating value={product.rating} count={product.reviewCount} />
          <span className="text-[10px] sm:text-xs font-mono text-gray-500 mt-0.5">≈ {days} days pack</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="press bg-[#111315] text-white px-4 py-2 rounded-full text-xs font-mono font-bold hover:bg-[var(--ochre)] hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>VIEW</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

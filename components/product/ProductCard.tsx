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
    <article className="group relative flex flex-col w-full h-full bg-white border border-gray-200/90 hover:border-[#c44900] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col flex-1 focus-visible:outline-none"
      >
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-deva shrink-0 whitespace-nowrap text-[13px] font-bold text-[#c44900] px-3 py-0.5 rounded-full bg-[#faf7f1] border border-gray-200">
            {product.devanagari}
          </span>
          <span className="font-mono shrink whitespace-nowrap text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {product.form.toUpperCase()} · {product.unitsPerPack} TAB
          </span>
        </div>

        {/* Official Product Cover Bottle Image Box */}
        <div className="relative flex aspect-[4/3] min-h-[200px] sm:min-h-[220px] w-full items-center justify-center overflow-hidden rounded-xl mb-4 bg-white border border-gray-100 p-3 group-hover:border-gray-200 transition-colors">
          <Image
            src={`/products/${product.slug}.png`}
            alt={`${product.name} — ${product.tagline}`}
            width={600}
            height={700}
            priority={priority}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 360px"
            className="max-h-full max-w-full h-auto w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />

          <span className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-white/95 border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-mono text-[#1c684e] flex items-center justify-center gap-1 shadow-xs font-bold">
            <CheckCircle2 size={12} />
            <span>AYUSH SCHEDULE T CERTIFIED</span>
          </span>
        </div>

        {/* Name & Price */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111315] group-hover:text-[#c44900] transition-colors">
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
        <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {product.tagline}
        </p>

        {/* Botanical Formula Pills */}
        <div className="bg-[#faf7f1] p-2.5 rounded-xl border border-gray-200 text-[10px] sm:text-xs font-mono text-gray-700 mb-4 mt-auto">
          <div className="text-[9px] text-[#c44900] mb-1 font-bold tracking-widest uppercase">KEY BOTANICAL FORMULA</div>
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
          className="bg-[#111315] text-white px-4 py-2 rounded-full text-xs font-mono font-bold hover:bg-[#c44900] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>BUY NOW</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

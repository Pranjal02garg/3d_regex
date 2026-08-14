"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/content/products";

const Bottle3DCanvas = dynamic(() => import("@/components/3d/Bottle3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
});

export default function Gallery({ product }: { product: Product }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-surface-2 to-surface-3 p-4 shadow-sm sm:p-6" style={{ aspectRatio: "1 / 1" }}>
      <div
        aria-hidden="true"
        className="stage-floor absolute inset-x-12 bottom-6 h-12 rounded-[50%]"
      />

      <Bottle3DCanvas
        productSlug={product.slug}
        productName={product.name}
        className="h-full w-full"
      />

      <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg border border-line bg-surface/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-fg-2 backdrop-blur-md">
        3D Interactive Model · Drag to Rotate
      </div>
    </div>
  );
}

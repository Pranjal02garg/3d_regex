"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export default function Gallery({ product }: { product: Product }) {
  const views = [
    { id: "product", src: `/products/${product.slug}.png`, label: "Cover Bottle", contain: true },
    { id: "label", src: `/labels/${product.slug}-label.jpg`, label: "Front Label", contain: false },
    { id: "seal", src: `/labels/${product.slug}-seal.jpg`, label: "Quality Seal", contain: false },
  ];

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frame = useRef<HTMLDivElement>(null);

  const view = views[active];

  function track(e: React.MouseEvent) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setOrigin({
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100,
    });
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
      <ul className="flex gap-3 md:flex-col" role="tablist" aria-label="Product images">
        {views.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${v.label.toLowerCase()}`}
              onClick={() => setActive(i)}
              className={cn(
                "flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border transition-colors md:h-20 md:w-20 bg-white",
                i === active ? "border-[#111315] ring-2 ring-[#111315]/10" : "border-gray-200 hover:border-gray-400",
              )}
            >
              <Image
                src={v.src}
                alt={v.label}
                width={120}
                height={120}
                className={cn("h-full w-full", v.contain ? "object-contain p-1" : "object-cover")}
              />
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={frame}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={track}
        className={cn(
          "relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs",
          view.contain ? "flex items-center justify-center p-4 sm:p-6" : "",
          zoom ? "cursor-zoom-in" : "",
        )}
        style={{ aspectRatio: "1 / 1" }}
      >
        <Image
          key={view.id}
          src={view.src}
          alt={
            view.contain
              ? `${product.name} — ${product.tagline}`
              : `${product.name} — ${view.label.toLowerCase()}`
          }
          width={1100}
          height={1100}
          priority
          sizes="(max-width: 768px) 92vw, 46vw"
          className={cn(
            "animate-fade-in transition-transform duration-[420ms]",
            view.contain ? "max-h-full max-w-full h-auto w-auto object-contain drop-shadow-md" : "h-full w-full object-cover",
          )}
          style={
            zoom
              ? { transform: "scale(1.8)", transformOrigin: `${origin.x}% ${origin.y}%` }
              : undefined
          }
        />

        <p className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-gray-200 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase font-bold text-gray-700 backdrop-blur-sm shadow-xs">
          {view.label}
        </p>
      </div>
    </div>
  );
}

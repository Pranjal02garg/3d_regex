"use client";

import { useState } from "react";
import FormulationTable from "./FormulationTable";
import { products } from "@/content/products";

export default function FormularySection() {
  const [selectedSlug, setSelectedSlug] = useState("kabzraj");
  const selectedProduct = products.find((p) => p.slug === selectedSlug) ?? products[0];

  return (
    <section className="border-b border-line bg-surface-2 py-16 lg:py-24">
      <div className="shell grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-4 text-left lg:col-span-5">
          <span className="section-mark">05 · Full Disclosure</span>
          <h2 className="display h2 uppercase text-fg">
            Every milligram, published
          </h2>
          <p className="body-base text-fg-2">
            Exact Sanskrit names, botanical binomials, the plant part used and the
            milligram quantity per dose — for every remedy we make.
          </p>

          <div className="pt-2">
            <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fg-3">
              Select a remedy
            </span>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  aria-pressed={selectedSlug === p.slug}
                  className={`press rounded-full border px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                    selectedSlug === p.slug
                      ? "border-accent bg-accent text-brand-fg"
                      : "border-line bg-fg/5 text-fg-2 hover:border-accent hover:text-accent"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="panel p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-line-2 pb-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                Formulary audit · {selectedProduct.name}
              </span>
              <span className="font-mono text-[11px] font-semibold text-fg-3">
                {selectedProduct.classicalReference}
              </span>
            </div>
            <div key={selectedSlug} className="animate-fade-in">
              <FormulationTable product={selectedProduct} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

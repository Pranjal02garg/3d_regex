"use client";

import { useState } from "react";
import FormulationTable from "./FormulationTable";
import { products } from "@/content/products";

export default function FormularySection() {
  const [selectedSlug, setSelectedSlug] = useState("kabzraj");
  const selectedProduct = products.find((p) => p.slug === selectedSlug) ?? products[0];

  return (
    <section className="bg-gray-50 py-6 sm:py-12 border-b border-gray-200">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10 items-start">
        <div className="lg:col-span-5 text-left space-y-3">
          <span className="eyebrow text-[var(--ochre)] font-bold text-xs">FULL TRANSPARENCY</span>
          <h2 className="font-serif h3 text-[#111315] font-bold">
            100% Botanical Ingredient Disclosure
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-700 font-sans">
            We publish exact Sanskrit names, botanical binomials, plant parts used, and milligram quantities per dose for every remedy we make.
          </p>

          {/* Interactive Remedy Tab Selector */}
          <div className="pt-2">
            <span className="eyebrow text-[10px] text-gray-500 font-bold block mb-2">
              SELECT A REMEDY TO VIEW COMPOSITION:
            </span>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all border ${
                    selectedSlug === p.slug
                      ? "bg-[#111315] text-white border-[#111315] shadow-xs"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[var(--ochre)]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
              <span className="eyebrow text-[var(--ochre)] font-bold text-xs">
                Formulary Audit · {selectedProduct.name}
              </span>
              <span className="font-mono text-xs text-gray-500 font-semibold">
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

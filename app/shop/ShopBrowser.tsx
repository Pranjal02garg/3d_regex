"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Primitives";
import { CARE_LEVELS, CONCERNS, type CareLevel, type Product } from "@/content/products";
import { getIngredient } from "@/content/ingredients";
import { cn } from "@/lib/utils";

type Filters = {
  concern: string[];
  care: string[];
  form: string[];
  ingredient: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
};

const EMPTY: Filters = {
  concern: [],
  care: [],
  form: [],
  ingredient: [],
  maxPrice: 600,
  minRating: 0,
  inStockOnly: false,
};

type Sort = "relevance" | "price-asc" | "price-desc" | "rating";

export default function ShopBrowser({
  products,
  lockedConcern,
}: {
  products: Product[];
  lockedConcern?: string;
}) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("relevance");
  const [sheet, setSheet] = useState(false);

  const allIngredients = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) for (const r of p.formulation) set.add(r.ingredient);
    return [...set].sort();
  }, [products]);

  function toggle(key: "concern" | "care" | "form" | "ingredient", value: string) {
    setF((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  }

  const results = useMemo(() => {
    const out = products.filter((p) => {
      if (f.concern.length && !f.concern.includes(p.concernSlug)) return false;
      if (f.care.length && !f.care.includes(p.careLevel)) return false;
      if (f.form.length && !f.form.includes(p.form)) return false;
      if (f.ingredient.length) {
        const has = p.formulation.some((r) => f.ingredient.includes(r.ingredient));
        if (!has) return false;
      }
      if (p.price > f.maxPrice) return false;
      if (p.rating < f.minRating) return false;
      if (f.inStockOnly && !p.inStock) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      case "rating":
        return [...out].sort((a, b) => b.rating - a.rating);
      default:
        return out;
    }
  }, [products, f, sort]);

  const activeCount =
    f.concern.length +
    f.care.length +
    f.form.length +
    f.ingredient.length +
    (f.maxPrice < EMPTY.maxPrice ? 1 : 0) +
    (f.minRating > 0 ? 1 : 0) +
    (f.inStockOnly ? 1 : 0);

  const panel = (
    <div className="flex flex-col gap-8">
      {!lockedConcern && (
        <FilterGroup title="Concern">
          {CONCERNS.map((c) => (
            <Check
              key={c.slug}
              label={c.title}
              checked={f.concern.includes(c.slug)}
              onChange={() => toggle("concern", c.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {/* The filter no competitor offers, placed first because it is the one
          that most changes whether a product is right for someone. */}
      <FilterGroup title="Care level">
        {(Object.keys(CARE_LEVELS) as CareLevel[]).map((k) => (
          <Check
            key={k}
            label={CARE_LEVELS[k].label}
            hint={CARE_LEVELS[k].short}
            checked={f.care.includes(k)}
            onChange={() => toggle("care", k)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Form">
        {["tablet", "capsule"].map((k) => (
          <Check
            key={k}
            label={k === "tablet" ? "Tablets" : "Capsules"}
            checked={f.form.includes(k)}
            onChange={() => toggle("form", k)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Contains">
        <div className="flex flex-wrap gap-1.5">
          {allIngredients.map((slug) => {
            const ing = getIngredient(slug);
            const on = f.ingredient.includes(slug);
            return (
              <button
                key={slug}
                type="button"
                onClick={() => toggle("ingredient", slug)}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[0.75rem] transition-colors",
                  on
                    ? "border-brand bg-brand text-brand-fg"
                    : "border-line text-fg-2 hover:border-line-strong",
                )}
              >
                {ing?.sanskrit ?? slug}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title={`Up to ₹${f.maxPrice}`}>
        <input
          type="range"
          min={200}
          max={600}
          step={10}
          value={f.maxPrice}
          onChange={(e) => setF((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
          aria-label="Maximum price"
          className="w-full accent-[var(--brand)]"
        />
      </FilterGroup>

      <FilterGroup title="Rating">
        {[4.5, 4, 0].map((r) => (
          <label
            key={r}
            className="flex cursor-pointer items-center gap-2.5 text-[0.875rem] text-fg-2"
          >
            <input
              type="radio"
              name="rating"
              checked={f.minRating === r}
              onChange={() => setF((p) => ({ ...p, minRating: r }))}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            {r === 0 ? "Any rating" : `${r} and above`}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <Check
          label="In stock only"
          checked={f.inStockOnly}
          onChange={() => setF((p) => ({ ...p, inStockOnly: !p.inStockOnly }))}
        />
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="eyebrow">Filter</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setF(EMPTY)}
                className="link-underline text-caption text-fg-3"
              >
                Clear all
              </button>
            )}
          </div>
          {panel}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <p aria-live="polite" className="text-[0.875rem] text-fg-2">
            {results.length} {results.length === 1 ? "remedy" : "remedies"}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-[0.8125rem] text-fg-2 lg:hidden"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} aria-hidden="true" />
              Filter{activeCount > 0 && ` (${activeCount})`}
            </button>

            <label className="flex items-center gap-2 text-[0.8125rem] text-fg-3">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort remedies"
                className="rounded-md border border-line bg-transparent px-2.5 py-1.5 text-[0.8125rem] text-fg-2 outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nothing matches that"
              body="We make five remedies, so the filters run out quickly. Clearing them will show the whole range."
              action={
                <Button variant="secondary" size="sm" onClick={() => setF(EMPTY)}>
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {results.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile filters as a bottom sheet, not a full-page takeover. */}
      {sheet && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-scrim"
            onClick={() => setSheet(false)}
          />
          <div className="animate-slide-up absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-xl border-t border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[0.9375rem] font-medium">Filter</h2>
              <button
                type="button"
                onClick={() => setSheet(false)}
                aria-label="Close filters"
                className="-mr-2 p-2 text-fg-3"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
            <div className="flex gap-3 border-t border-line px-5 py-4">
              <Button variant="secondary" onClick={() => setF(EMPTY)}>
                Clear
              </Button>
              <Button full onClick={() => setSheet(false)}>
                Show {results.length} {results.length === 1 ? "remedy" : "remedies"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3">{title}</legend>
      <div className="flex flex-col gap-2.5">{children}</div>
    </fieldset>
  );
}

function Check({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-[3px] h-4 w-4 shrink-0 accent-[var(--brand)]"
      />
      <span className="text-[0.875rem] leading-snug text-fg-2">
        {label}
        {hint && <span className="block text-caption text-fg-3">{hint}</span>}
      </span>
    </label>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CONCERNS, products } from "@/content/products";
import { ingredients } from "@/content/ingredients";
import { articles } from "@/content/articles";
import { cn } from "@/lib/utils";

type Hit = {
  group: "Remedies" | "Ingredients" | "Library" | "Pages";
  label: string;
  sub: string;
  href: string;
  image?: string;
  accent?: string;
  /** Extra searchable text that is not displayed — common names, synonyms. */
  alias?: string;
};

const PAGES: Hit[] = [
  { group: "Pages", label: "Find your remedy", sub: "Guided, six questions", href: "/find-your-remedy" },
  { group: "Pages", label: "Verify a batch", sub: "Check the code on your pack", href: "/verify" },
  { group: "Pages", label: "Quality & testing", sub: "What we test and who tests it", href: "/quality" },
  { group: "Pages", label: "Manufacturing", sub: "How each batch is made", href: "/manufacturing" },
  { group: "Pages", label: "Our science", sub: "How we handle evidence", href: "/science" },
  { group: "Pages", label: "For practitioners", sub: "Full formulary", href: "/practitioners" },
  { group: "Pages", label: "Track order", sub: "Where your parcel is", href: "/track-order" },
  { group: "Pages", label: "Support", sub: "Help and contact", href: "/support" },
];

const INDEX: Hit[] = [
  ...products.map<Hit>((p) => ({
    group: "Remedies",
    label: p.name,
    sub: `${p.tagline} · ${p.formulation.length} herbs`,
    href: `/products/${p.slug}`,
    image: `/products/${p.slug}.png`,
    accent: p.accent,
    alias: `${p.slug} ${p.devanagari} ${p.concern} ${p.summary}`,
  })),
  ...ingredients.map<Hit>((i) => ({
    group: "Ingredients",
    label: i.sanskrit,
    sub: `${i.latin} · ${i.part}`,
    href: `/ingredients/${i.slug}`,
    // Herbs are known by several names — the slug, the common English name
    // and the Devanagari all have to find the same monograph.
    alias: `${i.slug} ${i.common} ${i.devanagari} ${i.family}`,
  })),
  ...articles.map<Hit>((a) => ({
    group: "Library",
    label: a.title,
    sub: `${a.category} · ${a.readingMinutes} min read`,
    href: `/library/${a.slug}`,
    alias: `${a.kicker} ${a.excerpt}`,
  })),
  ...PAGES,
];

/** Cheap subsequence match — forgiving of typos in a way `includes` is not. */
function score(haystack: string, needle: string): number {
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h.startsWith(n)) return 3;
  if (h.includes(n)) return 2;
  let i = 0;
  for (const ch of h) {
    if (ch === n[i]) i += 1;
    if (i === n.length) return 1;
  }
  return 0;
}

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useCart();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const hits = useMemo(() => {
    if (!q.trim()) return [];
    return INDEX.map((hit) => ({
      hit,
      s: Math.max(
        score(hit.label, q) * 3,
        score(hit.sub, q) * 2,
        hit.alias ? score(hit.alias, q) : 0,
      ),
    }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.hit);
  }, [q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [searchOpen]);

  if (!searchOpen) return null;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(hits.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      router.push(hits[active].href);
      closeSearch();
    }
  }

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="animate-fade-in absolute inset-0 bg-scrim" onClick={closeSearch} />
      <div className="animate-rise relative mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-lg border border-line bg-surface shadow-lg">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} strokeWidth={1.5} className="shrink-0 text-fg-3" aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            type="search"
            placeholder="Search remedies, herbs, articles…"
            aria-label="Search"
            aria-autocomplete="list"
            className="h-14 w-full bg-transparent text-[1rem] outline-none placeholder:text-fg-3"
          />
          <kbd className="hidden shrink-0 font-mono text-[0.625rem] uppercase tracking-wider text-fg-3 sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[54vh] overflow-y-auto">
          {q && hits.length === 0 && (
            <p className="px-4 py-10 text-center text-[0.875rem] text-fg-3">
              Nothing matched &ldquo;{q}&rdquo;. Try a symptom, a herb, or a product name.
            </p>
          )}

          {!q && (
            <div className="px-4 py-5">
              <p className="eyebrow">Start with a concern</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CONCERNS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop/${c.slug}`}
                      onClick={closeSearch}
                      className="inline-flex rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-caption text-fg-3">
                Searches remedies, {ingredients.length} ingredient monographs and the library.
              </p>
            </div>
          )}

          <ul role="listbox" aria-label="Search results">
            {hits.map((hit, i) => {
              const header = hit.group !== lastGroup ? hit.group : null;
              lastGroup = hit.group;
              return (
                <li key={hit.href}>
                  {header && <p className="eyebrow px-4 pb-2 pt-4">{header}</p>}
                  <Link
                    href={hit.href}
                    onClick={closeSearch}
                    onMouseEnter={() => setActive(i)}
                    aria-selected={i === active}
                    role="option"
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 transition-colors",
                      i === active ? "bg-surface-2" : "",
                    )}
                  >
                    {hit.image ? (
                      <span
                        className="flex h-9 w-9 shrink-0 items-end justify-center overflow-hidden rounded"
                        style={{
                          background: `color-mix(in oklab, ${hit.accent} 12%, var(--surface-2))`,
                        }}
                      >
                        <Image
                          src={hit.image}
                          alt=""
                          width={40}
                          height={48}
                          className="h-[88%] w-auto object-contain"
                        />
                      </span>
                    ) : (
                      <span className="h-9 w-9 shrink-0" />
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-[0.9375rem] text-fg">{hit.label}</span>
                      <span className="block truncate text-caption text-fg-3">{hit.sub}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "@/content/products";
import { FREE_SHIPPING_OVER, SHIPPING_FLAT, SUBSCRIBE_DISCOUNT } from "@/content/site";

export type CartLine = {
  slug: string;
  qty: number;
  /** Subscriptions are a per-line choice, not a basket-wide mode. */
  subscribe: boolean;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  searchOpen: boolean;
  ready: boolean;
  add: (slug: string, qty?: number, subscribe?: boolean) => void;
  setQty: (slug: string, qty: number) => void;
  setSubscribe: (slug: string, subscribe: boolean) => void;
  remove: (slug: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  count: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
};

const KEY = "rr-cart-v1";
const CartContext = createContext<CartState | null>(null);

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);

  /* Restore after mount so the server and first client render agree. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        setLines(parsed.filter((l) => getProduct(l.slug)));
      }
    } catch {
      /* A corrupt cart is not worth an error boundary. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* Private browsing, quota — losing the cart is acceptable here. */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1, subscribe = false) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: Math.min(9, l.qty + qty), subscribe } : l,
        );
      }
      return [...prev, { slug, qty, subscribe }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const setSubscribe = useCallback((slug: string, subscribe: boolean) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, subscribe } : l)));
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const totals = useMemo(() => {
    let subtotal = 0;
    let savings = 0;
    for (const line of lines) {
      const p = getProduct(line.slug);
      if (!p) continue;
      const unit = line.subscribe ? p.price * (1 - SUBSCRIBE_DISCOUNT) : p.price;
      subtotal += unit * line.qty;
      savings += (p.mrp - unit) * line.qty;
    }
    subtotal = Math.round(subtotal);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
    return {
      subtotal,
      savings: Math.round(savings),
      shipping,
      total: subtotal + shipping,
      count: lines.reduce((n, l) => n + l.qty, 0),
    };
  }, [lines]);

  const value = useMemo<CartState>(
    () => ({
      lines,
      isOpen,
      searchOpen,
      ready,
      add,
      setQty,
      setSubscribe,
      remove,
      clear: () => setLines([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      ...totals,
    }),
    [lines, isOpen, searchOpen, ready, add, setQty, setSubscribe, remove, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

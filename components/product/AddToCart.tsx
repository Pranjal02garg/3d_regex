"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/Field";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/Toast";
import type { Product } from "@/content/products";
import { SUBSCRIBE_DISCOUNT } from "@/content/site";
import { cn, formatINR, packDuration } from "@/lib/utils";

export default function AddToCart({ product }: { product: Product }) {
  const cart = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [added, setAdded] = useState(false);

  const days = packDuration(product.unitsPerPack, product.unitsPerDay);
  const months = Math.max(1, Math.round(days / 30));
  const subPrice = Math.round(product.price * (1 - SUBSCRIBE_DISCOUNT));

  function add() {
    cart.add(product.slug, qty, subscribe);
    setAdded(true);
    toast({ message: `${product.name} added to cart`, action: { label: "View cart", href: "/cart" } });
    setTimeout(() => {
      setAdded(false);
      cart.openCart();
    }, 550);
  }

  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Purchase option</legend>

        {[
          {
            id: "once",
            on: !subscribe,
            title: "One time",
            price: product.price,
            sub: `One pack · about ${days} days at label dose`,
          },
          {
            id: "sub",
            on: subscribe,
            title: `Every ${months} month${months > 1 ? "s" : ""}`,
            price: subPrice,
            sub: `Save ${Math.round(SUBSCRIBE_DISCOUNT * 100)}% · skip or cancel any time, no notice period`,
          },
        ].map((opt) => (
          <label
            key={opt.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-md border p-3.5 transition-colors",
              opt.on ? "border-brand bg-[color-mix(in_oklab,var(--brand)_5%,transparent)]" : "border-line hover:border-line-strong",
            )}
          >
            <input
              type="radio"
              name={`buy-${product.slug}`}
              checked={opt.on}
              onChange={() => setSubscribe(opt.id === "sub")}
              aria-label={`${opt.title} — ${formatINR(opt.price)}`}
              className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
            />
            <span className="flex flex-1 flex-col">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[0.9375rem] font-medium text-fg">{opt.title}</span>
                <span className="tabular text-[0.9375rem] font-medium">{formatINR(opt.price)}</span>
              </span>
              <span className="mt-0.5 text-caption leading-snug text-fg-3">{opt.sub}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${product.name}`} />
        <Button
          onClick={add}
          size="lg"
          full
          className={cn(added && "bg-safe")}
          disabled={!product.inStock}
        >
          {added ? (
            <>
              <Check size={17} strokeWidth={2} aria-hidden="true" />
              Added
            </>
          ) : product.inStock ? (
            "Add to cart"
          ) : (
            "Out of stock"
          )}
        </Button>
      </div>
    </div>
  );
}

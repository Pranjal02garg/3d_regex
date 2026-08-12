"use client";

import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Disclosure";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/Field";
import { ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { trackEvent } from "@/lib/pixel";
import { getProduct } from "@/content/products";
import { FREE_SHIPPING_OVER, SUBSCRIBE_DISCOUNT } from "@/content/site";
import { formatINR, packDuration } from "@/lib/utils";

export default function CartDrawer() {
  const cart = useCart();
  const toFree = FREE_SHIPPING_OVER - cart.subtotal;

  return (
    <Drawer open={cart.isOpen} onClose={cart.closeCart} title={`Cart (${cart.count})`}>
      {cart.lines.length === 0 ? (
        <div className="flex flex-col items-start gap-4 px-5 py-12">
          <p className="display text-h4">Nothing here yet</p>
          <p className="text-[0.9375rem] text-fg-2">
            If you are not sure where to start, six questions will get you a straight answer —
            including &ldquo;none of these&rdquo;.
          </p>
          <ButtonLink href="/find-your-remedy" variant="secondary" size="sm">
            Find your remedy
          </ButtonLink>
        </div>
      ) : (
        <>
          {toFree > 0 && (
            <div className="border-b border-line px-5 py-3.5">
              <p className="text-[0.8125rem] text-fg-2">
                {formatINR(toFree)} more for free delivery
              </p>
              <div
                className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-surface-3"
                role="progressbar"
                aria-valuenow={Math.min(100, Math.round((cart.subtotal / FREE_SHIPPING_OVER) * 100))}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress towards free delivery"
              >
                <div
                  className="h-full rounded-full bg-brand transition-[width] duration-[420ms] [transition-timing-function:var(--ease-out)]"
                  style={{
                    width: `${Math.min(100, (cart.subtotal / FREE_SHIPPING_OVER) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <ul className="flex flex-col">
            {cart.lines.map((line) => {
              const p = getProduct(line.slug);
              if (!p) return null;
              const unit = line.subscribe ? Math.round(p.price * (1 - SUBSCRIBE_DISCOUNT)) : p.price;
              const days = packDuration(p.unitsPerPack, p.unitsPerDay) * line.qty;

              return (
                <li key={line.slug} className="flex gap-4 border-b border-line px-5 py-5">
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={cart.closeCart}
                    className="flex h-20 w-16 shrink-0 items-end justify-center overflow-hidden rounded-md"
                    style={{ background: `color-mix(in oklab, ${p.accent} 10%, var(--surface-2))` }}
                  >
                    <Image
                      src={`/products/${p.slug}.png`}
                      alt=""
                      width={80}
                      height={96}
                      className="h-[88%] w-auto object-contain"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={cart.closeCart}
                          className="block truncate font-serif text-lg font-bold text-[#111315] hover:text-[var(--ochre)] transition-colors"
                        >
                          {p.name}
                        </Link>
                        <p className="text-caption text-fg-3">
                          {p.unitsPerPack} {p.form === "tablet" ? "tablets" : "capsules"}
                        </p>
                      </div>
                      <p className="tabular shrink-0 text-[0.9375rem] font-medium">
                        {formatINR(unit * line.qty)}
                      </p>
                    </div>

                    {/* The number that actually answers "how much do I need?" */}
                    <p className="text-caption text-fg-3">Lasts about {days} days at label dose</p>

                    <label className="flex items-center gap-2 text-caption text-fg-2">
                      <input
                        type="checkbox"
                        checked={line.subscribe}
                        onChange={(e) => cart.setSubscribe(line.slug, e.target.checked)}
                        className="h-3.5 w-3.5 accent-[var(--brand)]"
                      />
                      Deliver every {Math.max(1, Math.round(days / 30))} month
                      {Math.round(days / 30) > 1 ? "s" : ""} — save{" "}
                      {Math.round(SUBSCRIBE_DISCOUNT * 100)}%
                    </label>

                    <div className="mt-1 flex items-center justify-between gap-3">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(q) => cart.setQty(line.slug, q)}
                        label={`Quantity of ${p.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => cart.remove(line.slug)}
                        className="link-underline text-caption text-fg-3 transition-colors hover:text-contra"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="px-5 py-5">
            <dl className="flex flex-col gap-2 text-[0.875rem]">
              <div className="flex justify-between">
                <dt className="text-fg-2">Subtotal</dt>
                <dd className="tabular font-medium">{formatINR(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-2">Delivery</dt>
                <dd className="tabular font-medium">
                  {cart.shipping === 0 ? "Free" : formatINR(cart.shipping)}
                </dd>
              </div>
              {cart.savings > 0 && (
                <div className="flex justify-between text-safe">
                  <dt>You save</dt>
                  <dd className="tabular font-medium">{formatINR(cart.savings)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 text-caption text-fg-3">
              Inclusive of all taxes. No charges are added at checkout.
            </p>
          </div>
        </>
      )}

      {cart.lines.length > 0 && (
        <div className="border-t border-gray-200 px-5 py-4 bg-[#faf7f1]/50">
          <div className="mb-4 flex items-center justify-center gap-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
             <span className="flex items-center gap-1 text-[var(--safe)]"><ShieldCheck size={14}/> Secure</span>
             <span className="flex items-center gap-1"><Truck size={14}/> Dispatched 24h</span>
          </div>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm font-bold text-[#111315] uppercase tracking-wide">Total</span>
            <span className="tabular font-serif text-2xl font-bold text-[#111315]">{formatINR(cart.total)}</span>
          </div>
          <ButtonLink 
            href="/checkout" 
            full 
            onClick={() => {
              trackEvent("InitiateCheckout", {
                content_ids: cart.lines.map(l => l.slug),
                num_items: cart.count,
                value: cart.total,
                currency: 'INR'
              });
              cart.closeCart();
            }}
          >
            Checkout
          </ButtonLink>
          <Button variant="quiet" full size="sm" className="mt-1" onClick={cart.closeCart}>
            Keep looking
          </Button>
        </div>
      )}
    </Drawer>
  );
}

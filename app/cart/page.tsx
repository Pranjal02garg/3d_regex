"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Primitives";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/content/products";
import { FREE_SHIPPING_OVER, SUBSCRIBE_DISCOUNT } from "@/content/site";
import { formatINR, packDuration } from "@/lib/utils";

export default function CartPage() {
  const cart = useCart();

  if (!cart.ready) {
    return (
      <div className="shell pt-12">
        <div className="skeleton h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="shell pt-10 md:pt-14">
      <h1 className="display text-h1">Your cart</h1>

      {cart.lines.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="Nothing in here yet"
            body="If you are not certain what you need, the finder asks six questions and will happily tell you that none of our remedies are right for you."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/shop">See the range</ButtonLink>
                <ButtonLink href="/find-your-remedy" variant="secondary">
                  Find your remedy
                </ButtonLink>
              </div>
            }
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {cart.lines.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                const unit = line.subscribe
                  ? Math.round(p.price * (1 - SUBSCRIBE_DISCOUNT))
                  : p.price;
                const days = packDuration(p.unitsPerPack, p.unitsPerDay) * line.qty;

                return (
                  <li key={line.slug} className="flex gap-5 border-b border-line py-7">
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex h-32 w-24 shrink-0 items-end justify-center overflow-hidden rounded-lg pb-2"
                      style={{
                        background: `color-mix(in oklab, ${p.accent} 10%, var(--surface-2))`,
                      }}
                    >
                      <Image
                        src={`/products/${p.slug}.png`}
                        alt=""
                        width={120}
                        height={150}
                        className="h-[86%] w-auto object-contain"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${p.slug}`}
                            className="display text-h4 transition-colors hover:text-brand"
                          >
                            {p.name}
                          </Link>
                          <p className="mt-1 text-[0.875rem] text-fg-2">{p.tagline}</p>
                          <p className="mt-1 text-caption text-fg-3">
                            {p.unitsPerPack}{" "}
                            {p.form === "tablet" ? "tablets" : "capsules"} · lasts about {days} days
                          </p>
                        </div>
                        <p className="tabular shrink-0 text-[1.0625rem] font-medium">
                          {formatINR(unit * line.qty)}
                        </p>
                      </div>

                      <label className="mt-1 flex items-center gap-2.5 text-[0.875rem] text-fg-2">
                        <input
                          type="checkbox"
                          checked={line.subscribe}
                          onChange={(e) => cart.setSubscribe(line.slug, e.target.checked)}
                          className="h-4 w-4 accent-[var(--brand)]"
                        />
                        Subscribe and save {Math.round(SUBSCRIBE_DISCOUNT * 100)}% — cancel any
                        time, no notice period
                      </label>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                        <QuantityStepper
                          value={line.qty}
                          onChange={(q) => cart.setQty(line.slug, q)}
                          label={`Quantity of ${p.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => cart.remove(line.slug)}
                          className="link-underline text-[0.8125rem] text-fg-3 transition-colors hover:text-contra"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Button variant="quiet" size="sm" className="mt-6" onClick={cart.clear}>
              Empty cart
            </Button>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-lg border border-line p-6">
              <h2 className="text-[0.9375rem] font-medium">Order summary</h2>

              <dl className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
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
                <div className="mt-2 flex justify-between border-t border-line pt-4 text-[1.0625rem]">
                  <dt className="font-medium">Total</dt>
                  <dd className="tabular font-medium">{formatINR(cart.total)}</dd>
                </div>
              </dl>

              <p className="mt-3 text-caption leading-relaxed text-fg-3">
                Inclusive of all taxes. Nothing is added at checkout — no handling fee, no
                convenience charge.
                {cart.shipping > 0 && ` Free delivery over ${formatINR(FREE_SHIPPING_OVER)}.`}
              </p>

              <ButtonLink href="/checkout" full size="lg" className="mt-6">
                Checkout
              </ButtonLink>
              <ButtonLink href="/shop" variant="quiet" full size="sm" className="mt-1">
                Keep looking
              </ButtonLink>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

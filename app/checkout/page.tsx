"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Select, Checkbox } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/Primitives";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/content/products";
import { SUBSCRIBE_DISCOUNT } from "@/content/site";
import { cn, formatINR } from "@/lib/utils";

const STEPS = ["Contact", "Delivery", "Payment"] as const;

/**
 * Three steps, guest by default, and the total is visible at every one.
 * There is no account wall, no pre-ticked upsell, and no surprise line item
 * appearing at the last step — the three things that cause Indian checkout
 * abandonment more than anything else.
 */
export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);

  if (cart.ready && cart.lines.length === 0) {
    return (
      <div className="shell pt-12">
        <EmptyState
          title="Your cart is empty"
          body="Add something before checking out."
          action={<ButtonLink href="/shop">See the range</ButtonLink>}
        />
      </div>
    );
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      cart.clear();
      router.push("/checkout/confirmation");
    }, 900);
  }

  return (
    <div className="shell pt-10 md:pt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="display text-h1">Checkout</h1>
        <p className="flex items-center gap-2 text-[0.8125rem] text-fg-3">
          <Lock size={14} strokeWidth={1.5} aria-hidden="true" />
          This is a demonstration — no payment is taken and no data is sent anywhere.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {/* Progress */}
          <ol className="flex items-center gap-2" aria-label="Checkout progress">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.75rem]",
                    i < step
                      ? "border-brand bg-brand text-brand-fg"
                      : i === step
                        ? "border-fg text-fg"
                        : "border-line text-fg-3",
                  )}
                >
                  {i < step ? <Check size={13} strokeWidth={2.5} aria-hidden="true" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "text-[0.8125rem]",
                    i <= step ? "text-fg" : "text-fg-3",
                  )}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line" />}
              </li>
            ))}
          </ol>

          <form onSubmit={next} className="mt-10 flex flex-col gap-6">
            {step === 0 && (
              <>
                <Input
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  hint="For the order confirmation and the batch certificate."
                />
                <Input
                  label="Mobile"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  hint="Used only for delivery updates."
                />
                <Checkbox
                  label="Email me the monthly dispatch"
                  description="One email a month. Not ticked by default, and unsubscribe works on the first click."
                />
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input label="First name" required autoComplete="given-name" />
                  <Input label="Last name" required autoComplete="family-name" />
                </div>
                <Input label="Address" required autoComplete="address-line1" />
                <Input label="Apartment, landmark" autoComplete="address-line2" />
                <div className="grid gap-6 sm:grid-cols-3">
                  <Input label="PIN code" required inputMode="numeric" autoComplete="postal-code" />
                  <Input label="City" required autoComplete="address-level2" />
                  <Select
                    label="State"
                    required
                    autoComplete="address-level1"
                    options={[
                      { value: "", label: "Select" },
                      { value: "DL", label: "Delhi" },
                      { value: "MH", label: "Maharashtra" },
                      { value: "KA", label: "Karnataka" },
                      { value: "TN", label: "Tamil Nadu" },
                      { value: "PB", label: "Punjab" },
                      { value: "UP", label: "Uttar Pradesh" },
                      { value: "WB", label: "West Bengal" },
                      { value: "GJ", label: "Gujarat" },
                    ]}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <fieldset className="flex flex-col gap-2">
                {/* UPI first: it is how most of India actually pays. */}
                <legend className="eyebrow mb-3">Payment method</legend>
                {[
                  { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm, or any UPI app" },
                  { id: "card", label: "Card", sub: "Credit or debit" },
                  { id: "netbanking", label: "Net banking", sub: "All major Indian banks" },
                  { id: "cod", label: "Cash on delivery", sub: "₹0 extra — we do not charge for this" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors",
                      payment === m.id
                        ? "border-brand bg-[color-mix(in_oklab,var(--brand)_5%,transparent)]"
                        : "border-line hover:border-line-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
                    />
                    <span className="flex flex-col">
                      <span className="text-[0.9375rem] font-medium text-fg">{m.label}</span>
                      <span className="text-caption text-fg-3">{m.sub}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
            )}

            <div className="mt-4 flex items-center gap-3">
              {step > 0 && (
                <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <Button type="submit" size="lg" full disabled={placing}>
                {placing
                  ? "Placing order…"
                  : step === 2
                    ? `Pay ${formatINR(cart.total)}`
                    : "Continue"}
              </Button>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-lg border border-line p-6">
            <h2 className="text-[0.9375rem] font-medium">
              Order ({cart.count} {cart.count === 1 ? "item" : "items"})
            </h2>

            <ul className="mt-5 flex flex-col gap-4">
              {cart.lines.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                const unit = line.subscribe
                  ? Math.round(p.price * (1 - SUBSCRIBE_DISCOUNT))
                  : p.price;
                return (
                  <li key={line.slug} className="flex items-center gap-3">
                    <span
                      className="relative flex h-14 w-12 shrink-0 items-end justify-center overflow-hidden rounded"
                      style={{
                        background: `color-mix(in oklab, ${p.accent} 10%, var(--surface-2))`,
                      }}
                    >
                      <Image
                        src={`/products/${p.slug}.png`}
                        alt=""
                        width={60}
                        height={72}
                        className="h-[86%] w-auto object-contain"
                      />
                      <span className="tabular absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-fg px-1 text-[0.625rem] text-surface">
                        {line.qty}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.875rem] text-fg">{p.name}</span>
                      {line.subscribe && (
                        <span className="block text-caption text-safe">Subscription</span>
                      )}
                    </span>
                    <span className="tabular shrink-0 text-[0.875rem] font-medium">
                      {formatINR(unit * line.qty)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5 text-[0.875rem]">
              <div className="flex justify-between">
                <dt className="text-fg-2">Subtotal</dt>
                <dd className="tabular">{formatINR(cart.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-fg-2">Delivery</dt>
                <dd className="tabular">
                  {cart.shipping === 0 ? "Free" : formatINR(cart.shipping)}
                </dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-line pt-4 text-[1.0625rem]">
                <dt className="font-medium">Total</dt>
                <dd className="tabular font-medium">{formatINR(cart.total)}</dd>
              </div>
            </dl>

            <p className="mt-4 text-caption leading-relaxed text-fg-3">
              Inclusive of all taxes.{" "}
              <Link href="/shipping-returns" className="link-underline">
                Returns
              </Link>{" "}
              accepted on unopened packs within 14 days.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

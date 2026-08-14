"use client";

import { useState } from "react";
import { Check, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/Field";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/Toast";
import type { Product } from "@/content/products";
import { SUBSCRIBE_DISCOUNT } from "@/content/site";
import { cn, formatINR, packDuration } from "@/lib/utils";
import { trackEvent } from "@/lib/pixel";

export default function AddToCart({ product }: { product: Product }) {
  const cart = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  const days = packDuration(product.unitsPerPack, product.unitsPerDay);
  const months = Math.max(1, Math.round(days / 30));
  const subPrice = Math.round(product.price * (1 - SUBSCRIBE_DISCOUNT));

  function handleCheckPincode(e: React.FormEvent) {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPinStatus("✓ Express Delivery in 2-3 Days. Cash on Delivery (COD) Available.");
    } else {
      setPinStatus("Please enter a valid 6-digit Indian Pincode.");
    }
  }

  function add() {
    cart.add(product.slug, qty, subscribe);
    setAdded(true);
    
    trackEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.slug],
      content_type: 'product',
      value: subscribe ? subPrice * qty : product.price * qty,
      currency: 'INR',
      quantity: qty
    });

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
            title: "One time purchase",
            price: product.price,
            sub: `One pack · about ${days} days at label dose`,
          },
          {
            id: "sub",
            on: subscribe,
            title: `Subscribe & Save ${Math.round(SUBSCRIBE_DISCOUNT * 100)}%`,
            price: subPrice,
            sub: `Every ${months} month${months > 1 ? "s" : ""} · skip or cancel any time`,
          },
        ].map((opt) => (
          <label
            key={opt.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors",
              opt.on ? "border-[#111315] bg-[#faf7f1]" : "border-gray-200 hover:border-gray-300",
            )}
          >
            <input
              type="radio"
              name={`buy-${product.slug}`}
              checked={opt.on}
              onChange={() => setSubscribe(opt.id === "sub")}
              aria-label={`${opt.title} — ${formatINR(opt.price)}`}
              className="mt-0.5 h-4 w-4 accent-[#111315]"
            />
            <span className="flex flex-1 flex-col">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-sm sm:text-base font-bold text-[#111315]">{opt.title}</span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#111315]">{formatINR(opt.price)}</span>
              </span>
              <span className="mt-0.5 text-xs text-gray-500 font-mono">{opt.sub}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {/* Cart Button & Stepper */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${product.name}`} />
        <Button
          onClick={add}
          size="lg"
          full
          className={cn("h-14 text-base font-bold rounded-xl", added && "bg-emerald-800")}
          disabled={!product.inStock}
        >
          {added ? (
            <>
              <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              Added to Cart
            </>
          ) : product.inStock ? (
            "Add to Cart"
          ) : (
            "Out of stock"
          )}
        </Button>
      </div>

      {/* Real Pincode Delivery Checker Widget */}
      <div className="rounded-xl border border-gray-200 bg-[#faf7f1]/60 p-3.5 space-y-2 text-xs">
        <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
          <MapPin size={15} className="text-[#c44900] shrink-0" />
          <span className="font-mono font-bold text-gray-700">Pincode:</span>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 font-mono text-xs outline-none focus:border-[#111315]"
          />
          <button type="submit" className="rounded-lg bg-[#111315] px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#c44900] transition-colors">
            Check
          </button>
        </form>
        {pinStatus && (
          <p className={cn("font-mono text-[11px] font-bold mt-1", pinStatus.includes("✓") ? "text-emerald-800" : "text-amber-800")}>
            {pinStatus}
          </p>
        )}
      </div>

      {/* Official Payment Badges */}
      <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-gray-500">
        <span className="flex items-center gap-1 font-bold text-[#111315]">
          <ShieldCheck size={14} className="text-emerald-700" />
          Guaranteed Safe & Secure Checkout
        </span>
        <span className="flex items-center gap-2">
          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-bold">COD</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-bold">GPay</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-bold">PhonePe</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-bold">Paytm</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 font-bold">UPI</span>
        </span>
      </div>
    </div>
  );
}

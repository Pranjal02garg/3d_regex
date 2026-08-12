import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <div className="shell pt-16 md:pt-24">
      <div className="mx-auto max-w-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-safe text-white">
          <Check size={22} strokeWidth={2} aria-hidden="true" />
        </span>

        <h1 className="display mt-8 text-h1">That is done.</h1>
        <p className="mt-5 text-lead text-fg-2">
          A confirmation is on its way to your inbox, with the batch certificate for everything in
          the order attached — not linked, attached.
        </p>

        <dl className="mt-12 border-t border-line">
          {[
            { k: "Order", v: "RR-2026-000000" },
            { k: "Dispatch", v: "Within 24 hours, Monday to Saturday" },
            { k: "Delivery", v: "Typically 2–5 days across India" },
            { k: "Returns", v: "Unopened packs, within 14 days" },
          ].map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="text-[0.875rem] text-fg-3">{r.k}</dt>
              <dd className="tabular text-[0.9375rem] text-fg">{r.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/track-order">Track this order</ButtonLink>
          <ButtonLink href="/library" variant="secondary">
            Read the library
          </ButtonLink>
        </div>

        <p className="mt-12 border-t border-line pt-8 text-[0.9375rem] leading-relaxed text-fg-2">
          If anything about the order is wrong, reply to the confirmation email or call{" "}
          <a href={`tel:${SITE.phoneHref}`} className="link-underline">
            {SITE.phone}
          </a>
          . A person answers, {SITE.hours.toLowerCase()}.
        </p>
        <p className="mt-4 text-[0.875rem] text-fg-3">
          Not sure how to take what you have ordered? Every product page has a{" "}
          <Link href="/shop" className="link-underline">
            dosage and safety panel
          </Link>{" "}
          written in plain language.
        </p>
      </div>
    </div>
  );
}

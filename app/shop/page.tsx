import type { Metadata } from "next";
import ShopBrowser from "./ShopBrowser";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "All remedies",
  description:
    "Five classical Ayurvedic formulations, each published in full — every herb, the part of the plant, the quantity per dose, and the certificate for the batch.",
};

export default function ShopPage() {
  return (
    <div className="shell pt-10 md:pt-14">
      <header className="max-w-2xl">
        <p className="eyebrow">The range</p>
        <h1 className="display mt-5 text-h1">Five remedies.</h1>
        <p className="mt-5 text-lead text-fg-2">
          That is the whole catalogue. Each one is filterable by care level — whether it is safe to
          take indefinitely, meant as a short course, or should be started with a practitioner.
        </p>
      </header>

      <div className="mt-14">
        <ShopBrowser products={products} />
      </div>
    </div>
  );
}

import type { Product } from "@/content/products";

/**
 * "Indian heritage with global standards" is the claim every brand in this
 * category makes and none of them show. This puts the classical citation and
 * the modern release specification in the same frame, at the same weight,
 * and lets the reader draw the conclusion — which is far more convincing
 * than a paragraph asserting it.
 */
export default function TwoStandards({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="grid border-y border-line md:grid-cols-2">
        <div className="border-b border-line px-0 py-8 md:border-b-0 md:border-r md:pr-10">
          <p className="eyebrow">The classical standard</p>
          <p className="display mt-4 text-h4 leading-snug">{product.classicalReference}</p>
          <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-fg-2">
            {product.lineage}
          </p>
        </div>

        <div className="py-8 md:pl-10">
          <p className="eyebrow">The modern standard</p>
          <p className="display mt-4 text-h4 leading-snug">
            Released against a written specification
          </p>
          <dl className="mt-5">
            {product.qc.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-line-2 py-2.5"
              >
                <dt className="text-[0.8125rem] text-fg-2">{row.label}</dt>
                <dd className="text-right text-[0.8125rem] text-fg-3">{row.spec}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

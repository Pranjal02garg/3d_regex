import Link from "next/link";
import type { Product } from "@/content/products";
import { totalActives } from "@/content/products";
import { getIngredient } from "@/content/ingredients";
import { DATA_VERIFIED } from "@/content/site";

/**
 * The signature component of the whole site.
 *
 * A real pharmacopoeia-style composition table: Sanskrit name, botanical
 * binomial, part used, quantity per dose. Every row links to a monograph.
 * Nobody in this category publishes this, and it is the single strongest
 * argument the brand has — so it is typeset as a document, not a card grid.
 *
 * On narrow screens the table becomes a stack of definition lists rather
 * than a horizontally scrolling table, because a scrollable table on a phone
 * is a table nobody reads.
 */
export default function FormulationTable({ product }: { product: Product }) {
  const total = totalActives(product);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 border-fg pb-3">
        <h3 className="display text-h4">Composition</h3>
        <p className="font-mono text-micro uppercase tracking-[0.16em] text-fg-3">
          Per {product.dosage.amount.toLowerCase()} · {product.form}
        </p>
      </div>

      {/* Desktop: a real table. */}
      <table className="hidden w-full text-left md:table">
        <caption className="sr-only">
          Composition of {product.name}, per {product.dosage.amount}
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-[26%] py-3 font-mono text-micro font-medium uppercase tracking-[0.16em] text-fg-3">
              Sanskrit
            </th>
            <th scope="col" className="w-[30%] py-3 font-mono text-micro font-medium uppercase tracking-[0.16em] text-fg-3">
              Botanical
            </th>
            <th scope="col" className="w-[26%] py-3 font-mono text-micro font-medium uppercase tracking-[0.16em] text-fg-3">
              Part used
            </th>
            <th scope="col" className="py-3 text-right font-mono text-micro font-medium uppercase tracking-[0.16em] text-fg-3">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {product.formulation.map((row) => {
            const ing = getIngredient(row.ingredient);
            if (!ing) return null;
            return (
              <tr key={row.ingredient} className="group border-b border-line-2">
                <th scope="row" className="py-3.5 pr-4 font-normal">
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="link-underline text-[0.9375rem] text-fg"
                  >
                    {ing.sanskrit}
                  </Link>
                  <span className="ml-2 font-deva text-[0.8125rem] text-fg-3">
                    {ing.devanagari}
                  </span>
                </th>
                <td className="py-3.5 pr-4 text-[0.875rem] italic text-fg-2">{ing.latin}</td>
                <td className="py-3.5 pr-4 text-[0.875rem] text-fg-2">
                  {ing.part}
                  {row.note && <span className="block text-caption text-fg-3">{row.note}</span>}
                </td>
                <td className="tabular py-3.5 text-right text-[0.9375rem] font-medium text-fg">
                  {row.mg} mg
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-fg">
            <td colSpan={3} className="py-3.5 text-[0.875rem] font-medium">
              Total declared actives
            </td>
            <td className="tabular py-3.5 text-right text-[0.9375rem] font-medium">{total} mg</td>
          </tr>
        </tfoot>
      </table>

      {/* Mobile: stacked, no horizontal scroll. */}
      <dl className="md:hidden">
        {product.formulation.map((row) => {
          const ing = getIngredient(row.ingredient);
          if (!ing) return null;
          return (
            <div key={row.ingredient} className="border-b border-line-2 py-4">
              <dt className="flex items-baseline justify-between gap-4">
                <Link href={`/ingredients/${ing.slug}`} className="link-underline text-[0.9375rem]">
                  {ing.sanskrit}
                  <span className="ml-2 font-deva text-[0.8125rem] text-fg-3">
                    {ing.devanagari}
                  </span>
                </Link>
                <span className="tabular shrink-0 text-[0.9375rem] font-medium">{row.mg} mg</span>
              </dt>
              <dd className="mt-1 text-[0.8125rem] text-fg-2">
                <span className="italic">{ing.latin}</span> · {ing.part}
                {row.note && <span className="block text-fg-3">{row.note}</span>}
              </dd>
            </div>
          );
        })}
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-fg py-4">
          <dt className="text-[0.875rem] font-medium">Total declared actives</dt>
          <dd className="tabular text-[0.9375rem] font-medium">{total} mg</dd>
        </div>
      </dl>

      <p className="mt-4 text-caption leading-relaxed text-fg-3">
        {product.formulationBase}
      </p>

      {!DATA_VERIFIED && (
        <p className="mt-3 border-l-2 border-caution pl-3 text-caption leading-relaxed text-fg-3">
          Quantities shown are indicative pending transcription from the approved master formula.
          The herbs and parts used are as printed on the pack.
        </p>
      )}
    </div>
  );
}

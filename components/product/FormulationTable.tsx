import type { Product } from "@/content/products";
import { totalActives } from "@/content/products";
import { getIngredient } from "@/content/ingredients";

export default function FormulationTable({ product }: { product: Product }) {
  const total = totalActives(product);

  return (
    <div className="text-left font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3 mb-2">
        <h3 className="font-serif text-lg font-bold text-[#111315]">
          Full Botanical Formula · {product.name}
        </h3>
        <span className="font-mono text-xs uppercase font-bold text-[var(--ochre)] bg-[var(--surface-2)] px-2.5 py-0.5 rounded-full border border-gray-200">
          Per {product.dosage.amount.toLowerCase()} · {product.form}
        </span>
      </div>

      {/* Desktop Table View */}
      <table className="hidden w-full text-left md:table text-xs sm:text-sm">
        <caption className="sr-only">
          Composition of {product.name}, per {product.dosage.amount}
        </caption>
        <thead>
          <tr className="border-b border-gray-200 font-mono text-[11px] font-bold text-gray-500 uppercase">
            <th scope="col" className="py-2.5 w-[30%]">Sanskrit & Devanagari</th>
            <th scope="col" className="py-2.5 w-[30%]">Botanical Binomial</th>
            <th scope="col" className="py-2.5 w-[25%]">Plant Part Used</th>
            <th scope="col" className="py-2.5 text-right w-[15%]">Per Dose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {product.formulation.map((row) => {
            const ing = getIngredient(row.ingredient);
            if (!ing) return null;
            return (
              <tr key={row.ingredient} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-3 pr-2 font-bold text-[#111315]">
                  <span>{ing.sanskrit}</span>
                  <span className="ml-2 font-deva text-xs font-semibold text-[var(--ochre)] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                    {ing.devanagari}
                  </span>
                </td>
                <td className="py-3 pr-2 italic text-gray-700 font-serif">{ing.latin}</td>
                <td className="py-3 pr-2 text-xs text-gray-700">
                  <span className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded font-mono text-[11px]">
                    {ing.part}
                  </span>
                  {row.note && <span className="block text-[10px] text-gray-500 font-sans mt-0.5">{row.note}</span>}
                </td>
                <td className="py-3 text-right font-mono font-bold text-[#111315]">
                  {row.mg} mg
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-[#111315] font-mono text-xs font-bold text-[#111315]">
            <td colSpan={3} className="py-3 uppercase">Total Active Botanical Extract</td>
            <td className="py-3 text-right text-sm text-[var(--safe)]">{total} mg</td>
          </tr>
        </tfoot>
      </table>

      {/* Mobile Stacked View */}
      <div className="md:hidden divide-y divide-gray-100 text-xs">
        {product.formulation.map((row) => {
          const ing = getIngredient(row.ingredient);
          if (!ing) return null;
          return (
            <div key={row.ingredient} className="py-3 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold text-[#111315] flex items-center gap-1.5">
                  <span>{ing.sanskrit}</span>
                  <span className="font-deva text-[11px] text-[var(--ochre)] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {ing.devanagari}
                  </span>
                </div>
                <span className="font-mono font-bold text-[#111315]">{row.mg} mg</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-600">
                <span className="italic font-serif">{ing.latin}</span>
                <span className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded font-mono text-[10px] text-gray-700 font-semibold">
                  {ing.part}
                </span>
              </div>
              {row.note && <p className="text-[10px] text-gray-500 italic">{row.note}</p>}
            </div>
          );
        })}
        <div className="pt-3 flex items-center justify-between font-mono font-bold text-xs text-[#111315] border-t-2 border-[#111315]">
          <span>TOTAL ACTIVE EXTRACT</span>
          <span className="text-[var(--safe)]">{total} mg</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-gray-500 font-mono leading-relaxed">
        {product.formulationBase}
      </p>
    </div>
  );
}

import Link from "next/link";
import { LEGAL_NAV } from "@/content/site";
import type { LegalDoc } from "@/content/legal";
import { cn } from "@/lib/utils";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="shell pt-10 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <nav aria-label="Policies" className="sticky top-28">
            <p className="eyebrow">Policies</p>
            <ul className="mt-4 flex flex-col">
              {LEGAL_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={l.href === `/${doc.slug}` ? "page" : undefined}
                    className={cn(
                      "block border-b border-line-2 py-2.5 text-[0.9375rem] transition-colors",
                      l.href === `/${doc.slug}` ? "text-fg" : "text-fg-3 hover:text-fg-2",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="lg:col-span-8 lg:col-start-5">
          <h1 className="display text-h1">{doc.title}</h1>
          <p className="measure mt-5 text-lead text-fg-2">{doc.intro}</p>
          <p className="mt-4 text-caption text-fg-3">
            Last updated{" "}
            {new Date(doc.updated).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="mt-14 flex flex-col gap-12">
            {doc.sections.map((s) => (
              <section key={s.h}>
                <h2 className="display text-h3">{s.h}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.p.map((p) => (
                    <p key={p} className="measure text-[1rem] leading-[1.7] text-fg-2">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

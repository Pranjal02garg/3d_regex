import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAV, LEGAL_NAV, MEDICAL_DISCLAIMER, REGISTRATIONS, SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="grain mt-32 bg-vetiver-deep text-paper">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/emblem-paper.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="display text-[1.25rem] text-paper">Regex Remedies</span>
            </div>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-paper/65">
              {SITE.promise} Classical formulations, published in full — every herb, every part
              used, every batch record.
            </p>

            <dl className="mt-8 flex flex-col gap-2.5">
              {REGISTRATIONS.map((r) => (
                <div key={r.label} className="flex flex-col">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/40">
                    {r.label}
                  </dt>
                  <dd className="tabular text-[0.8125rem] text-paper/75">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8" aria-label="Footer">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/40">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-[0.875rem] text-paper/70 transition-colors hover:text-paper"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-8 border-t border-paper/15 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/40">
              Manufactured at
            </h2>
            <address className="mt-3 text-[0.875rem] not-italic leading-relaxed text-paper/70">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.country}
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/40">
              Talk to us
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-[0.875rem] text-paper/70">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="transition-colors hover:text-paper">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-paper">
                  {SITE.email}
                </a>
              </li>
              <li className="text-paper/50">{SITE.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper/40">
              Grievance officer
            </h2>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-paper/70">
              {SITE.grievanceOfficer.name} ·{" "}
              <a
                href={`mailto:${SITE.grievanceOfficer.email}`}
                className="transition-colors hover:text-paper"
              >
                {SITE.grievanceOfficer.email}
              </a>
              <span className="mt-1 block text-paper/45">
                Named under the Consumer Protection (E-Commerce) Rules, 2020.
              </span>
            </p>
          </div>
        </div>

        {/* The disclaimer sits in the footer at readable size rather than in
            six-point grey. If it is worth saying it is worth reading. */}
        <p className="mt-12 max-w-4xl border-t border-paper/15 pt-8 text-[0.8125rem] leading-relaxed text-paper/55">
          {MEDICAL_DISCLAIMER}
        </p>

        <div className="mt-10 flex flex-col gap-4 text-[0.8125rem] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-paper/80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

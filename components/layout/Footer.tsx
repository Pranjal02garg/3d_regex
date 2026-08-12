import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-14 bg-[#111315] text-white border-t border-gray-800 py-8 sm:py-10">
      <div className="shell space-y-6 text-left">
        {/* Top Compact Brand & Nav Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/emblem-paper.png"
              alt="Regex Remedies Emblem"
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            />
            <div>
              <span className="display text-lg font-bold text-white block leading-none">
                Regex Remedies
              </span>
              <span className="font-mono text-[10px] text-[var(--ochre)] font-bold">
                Natural Ayurvedic Remedies
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-gray-300">
            <Link href="/shop" className="hover:text-[var(--ochre)] transition-colors">
              SHOP ALL
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[var(--ochre)] transition-colors">
              OUR STORY
            </Link>
            <span>•</span>
            <Link href="/quality" className="hover:text-[var(--ochre)] transition-colors">
              QUALITY
            </Link>
            <span>•</span>
            <a
              href="https://wa.me/918360053594"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#25D366] transition-colors"
            >
              WHATSAPP SUPPORT
            </a>
          </nav>
        </div>

        {/* Middle Statutory License Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-gray-400">
          <div>
            <span>AYUSH LICENCE: <strong className="text-[var(--ochre)]">PB/AY/000000</strong></span>
            <span className="mx-2">•</span>
            <span>SCHEDULE T <strong className="text-[#25D366]">GMP CERTIFIED</strong></span>
          </div>
          <div>
            <span>Customer Support: <strong className="text-white">+91 83600 53594</strong></span>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono text-gray-400">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. Manufactured in Punjab, India.
          </p>
          <p className="max-w-md text-gray-400">
            Ayurvedic proprietary remedies. Read label dosage instructions prior to use.
          </p>
        </div>
      </div>
    </footer>
  );
}

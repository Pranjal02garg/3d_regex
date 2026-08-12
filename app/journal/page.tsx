import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { journalArticles } from "@/content/journal";

export const metadata: Metadata = {
  title: "The Ayurvedic Journal — Regex Remedies",
  description: "Read about the science of Ayurveda, botanical medicine, and our manufacturing standards.",
};

export default function JournalPage() {
  return (
    <div className="pt-[72px] sm:pt-[96px] pb-16">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-[#faf7f1]/50 border-b border-gray-200">
        <div className="shell py-12 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="eyebrow text-[var(--ochre)] font-bold mb-4 block tracking-widest">
              THE JOURNAL
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#111315] leading-tight mb-4">
              Science, Tradition, and Transparency.
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Explore our articles on Ayurvedic principles, clinical botanical medicine, and why we insist on radical transparency in our manufacturing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Article List ──────────────────────────────────────────────────── */}
      <section className="shell py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {journalArticles.map((article) => (
            <Reveal key={article.slug} className="flex flex-col h-full group">
              <Link href={`/journal/${article.slug}`} className="flex flex-col flex-1">
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between transition-all duration-300 group-hover:border-[var(--ochre)] group-hover:shadow-md bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <time className="font-mono text-[10px] text-gray-400">
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#111315] mb-3 leading-snug group-hover:text-[var(--ochre)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111315]">
                    Read Article <span className="text-[var(--ochre)] transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

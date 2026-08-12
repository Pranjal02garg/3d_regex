import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { journalArticles } from "@/content/journal";
import { SITE } from "@/content/site";
import ReactMarkdown from "react-markdown";

// Since it's a static site, we should generate params
export function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  
  if (!article) return {};

  return {
    title: `${article.title} — ${SITE.name}`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pt-[72px] sm:pt-[96px] pb-16">
      {/* ── Article Header ──────────────────────────────────────────────── */}
      <section className="bg-[#faf7f1]/30 border-b border-gray-100">
        <div className="shell py-12 md:py-20 max-w-3xl mx-auto">
          <Reveal>
            <Link 
              href="/journal" 
              className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-[var(--ochre)] mb-8 transition-colors"
            >
              <ArrowLeft size={14} className="mr-1" />
              BACK TO JOURNAL
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--ochre)] bg-[var(--ochre)]/10 px-2 py-1 rounded-full">
                {article.category}
              </span>
              <time className="font-mono text-xs text-gray-400">
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#111315] leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
              <span>By {article.author}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Article Body ────────────────────────────────────────────────── */}
      <section className="shell py-12 md:py-16 max-w-3xl mx-auto">
        <Reveal className="prose prose-lg prose-headings:font-serif prose-headings:text-[#111315] prose-h3:text-2xl prose-h3:mt-10 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#111315] max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </Reveal>
        
        <Reveal className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-[#faf7f1] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-xl font-bold text-[#111315] mb-1">Find Your Remedy</h4>
              <p className="text-sm text-gray-600">Take our 6-question quiz to find the right formulation for you.</p>
            </div>
            <Link 
              href="/find-your-remedy" 
              className="shrink-0 bg-[#111315] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--ochre)] transition-colors"
            >
              Take the Quiz
            </Link>
          </div>
        </Reveal>
      </section>
    </article>
  );
}

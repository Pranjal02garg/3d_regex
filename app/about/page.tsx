import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Story — Regex Remedies",
  description: "The science of Ayurveda. Manufactured in our Schedule T GMP certified facility with 100% botanical transparency.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-[#faf9f5] border-b border-gray-200 py-16 md:py-24">
        <div className="shell max-w-4xl text-center space-y-6">
          <Reveal className="space-y-4">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--ochre)] uppercase">
              Our Philosophy
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#111315] leading-[1.1]">
              The Science of Classical Ayurveda.
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We believe in the power of ancient botanical wisdom, validated by modern analytical science. No hidden ingredients, no heavy metals, just pure efficacy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="shell py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111315] leading-tight">
              A commitment to 100% botanical disclosure.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              <p>
                The Ayurvedic industry is often clouded by proprietary blends and undisclosed formulations. At Regex Remedies, we took a radically different approach: <strong>Absolute Transparency.</strong>
              </p>
              <p>
                Every remedy we manufacture is accompanied by an Open Formulary Engine. We publish the exact Sanskrit names, botanical binomials, plant parts used, and milligram quantities per dose for every single active ingredient. 
              </p>
              <p>
                What you read on the label is exactly what is inside the bottle. Nothing more, nothing less.
              </p>
            </div>
          </Reveal>
          
          <Reveal className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 delay-100 border border-gray-200 shadow-sm p-1">
            <Image
              src="/images/banner-natural-remedies.jpg"
              alt="Regex Remedies Natural Range"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="bg-[#111315] text-white py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-3xl mb-12">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--ochre)] uppercase block mb-3">
              Manufacturing Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">
              Schedule T GMP Certified & NABL Lab Tested.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <Reveal className="space-y-3 delay-100">
              <div className="text-3xl">🔬</div>
              <h3 className="font-serif text-xl font-bold">NABL Lab Tested</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Every manufactured batch undergoes rigorous independent testing in NABL accredited laboratories before it is released to the market.
              </p>
            </Reveal>
            <Reveal className="space-y-3 delay-200">
              <div className="text-3xl">🛡️</div>
              <h3 className="font-serif text-xl font-bold">Zero Heavy Metals</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We strictly monitor our botanical extracts for heavy metals (Lead, Arsenic, Mercury, Cadmium) ensuring 100% safe consumption.
              </p>
            </Reveal>
            <Reveal className="space-y-3 delay-300">
              <div className="text-3xl">🌿</div>
              <h3 className="font-serif text-xl font-bold">Assay Potency</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our extracts are standardized to guarantee the presence of active biomarker compounds, ensuring consistent clinical efficacy in every dose.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="shell py-16 md:py-24 text-center">
        <Reveal className="max-w-2xl mx-auto space-y-6 bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111315]">
            Have questions about our quality?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-sans">
            Our Quality Desk is available to share batch testing reports, classical references, and detailed botanical monographs.
          </p>
          <div className="pt-4">
            <a
              href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-mono text-xs font-bold hover:bg-[#20ba5a] transition-all shadow-sm"
            >
              Contact Quality Desk on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

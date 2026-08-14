"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, ShieldCheck, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CONCERNS, products } from "@/content/products";
import { FREE_SHIPPING_OVER, NAV_PRIMARY, REGISTRATIONS } from "@/content/site";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Header() {
  const pathname = usePathname();
  const { count, openCart, openSearch } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  /* ⌘K / Ctrl-K opens search */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  function scheduleOpen() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMega(true), 120);
  }
  function scheduleClose() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMega(false), 240);
  }

  const licence = REGISTRATIONS[0];

  const marqueeText = (
    <span className="flex items-center gap-6 whitespace-nowrap px-4 text-[11px] sm:text-xs">
      <span className="flex items-center gap-1.5 text-[#c4923e]">
        <ShieldCheck size={13} className="shrink-0" />
        <span>{licence.label.toUpperCase()}: <strong className="text-white">{licence.value}</strong></span>
      </span>
      <span className="text-white/30">•</span>
      <span className="text-white font-bold">
        FREE EXPRESS SHIPPING ON ORDERS OVER <strong className="text-[#c4923e]">₹{FREE_SHIPPING_OVER}</strong>
      </span>
      <span className="text-white/30">•</span>
      <span className="text-[#25D366] font-bold">OFFICIAL WHATSAPP SUPPORT AVAILABLE</span>
      <span className="text-white/30">•</span>
      <span className="text-[#c4923e]">SCHEDULE T GMP CERTIFIED FACILITY</span>
      <span className="text-white/30">•</span>
    </span>
  );

  return (
    <>
      {/* ── CONTINUOUS INFINITE MARQUEE TICKER ─────────────────────────── */}
      <div className="marquee-viewport fixed inset-x-0 top-0 z-[51] bg-[#111315] text-[#ffffff] font-mono shadow-sm overflow-hidden h-8 flex items-center">
        <div className="animate-marquee-continuous font-bold tracking-wider py-0.5">
          {marqueeText}
          {marqueeText}
        </div>
      </div>

      {/* Main Header Container */}
      <header
        className={cn(
          "fixed inset-x-0 top-8 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b",
          scrolled ? "border-gray-200 shadow-sm" : "border-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="shell flex h-14 sm:h-16 items-center justify-between gap-2">
          {/* Left Brand Identity */}
          <Link href="/" aria-label="Regex Remedies — home" className="flex items-center gap-2 shrink-0">
            <Image
              src="/brand/emblem-ink.png"
              alt="Regex Remedies Logo"
              width={32}
              height={32}
              className="h-7 sm:h-8 w-7 sm:w-8 object-contain"
              priority
            />
            <span className="flex flex-col leading-none text-left">
              <span className="display text-base sm:text-lg font-bold text-[#111315]">
                Regex Remedies
              </span>
              <span className="mt-[2px] hidden font-mono text-[9px] uppercase tracking-widest text-[var(--ochre)] font-bold sm:block">
                Natural Ayurvedic Remedies
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {NAV_PRIMARY.map((item) =>
              "mega" in item && item.mega ? (
                <button
                  key={item.href}
                  type="button"
                  aria-expanded={mega}
                  aria-haspopup="true"
                  onMouseEnter={scheduleOpen}
                  onFocus={() => setMega(true)}
                  onClick={() => setMega((v) => !v)}
                  className={cn(
                    "text-[0.9375rem] font-bold transition-colors",
                    mega || pathname.startsWith("/shop") ? "text-[var(--ochre)]" : "text-[#111315] hover:text-[var(--ochre)]",
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={scheduleClose}
                  className={cn(
                    "text-[0.9375rem] font-bold transition-colors",
                    pathname.startsWith(item.href) ? "text-[var(--ochre)]" : "text-[#111315] hover:text-[var(--ochre)]",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right Header Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search remedies"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#111315] hover:border-[var(--ochre)] transition-colors"
            >
              <Search size={14} strokeWidth={2} />
              <span>Search</span>
              <kbd className="font-mono text-[9px] text-gray-400">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="press inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] md:hidden active:bg-gray-100"
            >
              <Search size={18} strokeWidth={2} />
            </button>

            {/* Official WhatsApp SVG Header Icon */}
            <a 
              href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-xs"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon size={18} className="text-white" />
            </a>

            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#111315] hover:bg-gray-100 sm:inline-flex"
            >
              <User size={18} strokeWidth={2} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="press relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] active:bg-gray-100"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ochre)] px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              className="press inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] lg:hidden active:bg-gray-100"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Mega Menu Desktop */}
        {mega && (
          <div
            className="animate-fade-in absolute inset-x-0 top-16 hidden border-b border-gray-200 bg-white lg:block shadow-xl"
            onMouseEnter={() => timer.current && clearTimeout(timer.current)}
          >
            <div className="shell grid grid-cols-12 gap-8 py-8 text-left">
              <div className="col-span-3">
                <p className="eyebrow mb-3">By Concern</p>
                <ul className="flex flex-col gap-1">
                  {CONCERNS.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/shop/${c.slug}`}
                        className="group flex flex-col p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-bold text-[#111315] flex items-center justify-between">
                          <span>{c.title}</span>
                          <span className="font-deva text-[13px] text-[var(--ochre)]">{c.hindi}</span>
                        </span>
                        <span className="text-xs text-[var(--fg-2)] mt-0.5">{c.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-6">
                <p className="eyebrow mb-3">The Range</p>
                <ul className="grid grid-cols-3 gap-3">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex flex-col p-3 rounded-lg border border-gray-200 hover:border-[var(--ochre)] hover:shadow-sm transition-all"
                      >
                        <span className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gray-50 mb-2">
                          <Image
                            src={`/products/${p.slug}.png`}
                            alt={p.name}
                            width={100}
                            height={120}
                            className="h-[85%] w-auto object-contain"
                          />
                        </span>
                        <span className="text-sm font-bold text-[#111315] flex items-center justify-between">
                          <span>{p.name}</span>
                          <span className="font-deva text-[13px] text-[var(--ochre)]">{p.devanagari}</span>
                        </span>
                        <span className="text-xs text-gray-500 truncate">{p.tagline}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-3 border-l border-gray-200 pl-8">
                <p className="eyebrow mb-3">Quick Links</p>
                <ul className="flex flex-col gap-2 text-sm font-semibold">
                  {[
                    { href: "/find-your-remedy", label: "Find Your Remedy Quiz" },
                    { href: "/quality", label: "Quality & Testing Protocol" },
                    { href: "/ingredients", label: "Botanical Ingredient Index" },
                    { href: "https://wa.me/918360053594", label: "Official WhatsApp Support" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1 hover:text-[var(--ochre)] transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobile && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-black/50"
            onClick={() => setMobile(false)}
          />
          <div className="animate-slide-up absolute inset-x-0 bottom-0 max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-white p-5 text-left">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <span className="display text-xl font-bold text-[#111315]">Regex Remedies</span>
              <button
                type="button"
                onClick={() => setMobile(false)}
                className="p-2 text-[#111315]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-2">By Concern</p>
                <div className="grid grid-cols-2 gap-2">
                  {CONCERNS.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}`}
                      className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex flex-col"
                    >
                      <span className="text-sm font-bold text-[#111315]">{c.title}</span>
                      <span className="font-deva text-[13px] text-[var(--ochre)] font-semibold">{c.hindi}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-2">Our 5 Remedies</p>
                <div className="flex flex-col gap-2">
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200"
                    >
                      <Image
                        src={`/products/${p.slug}.png`}
                        alt={p.name}
                        width={40}
                        height={50}
                        className="h-10 w-auto object-contain"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111315] flex items-center gap-2">
                          <span>{p.name}</span>
                          <span className="font-deva text-[13px] text-[var(--ochre)]">{p.devanagari}</span>
                        </span>
                        <span className="text-xs text-gray-500">{p.tagline}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-mono text-xs font-bold py-3 rounded-full shadow-md"
                >
                  <WhatsAppIcon size={18} className="text-white" />
                  <span>CHAT ON WHATSAPP NOW</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

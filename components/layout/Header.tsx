"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, ShieldCheck, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";
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

      {/* Main Header Container (Warm Alabaster Glass) */}
      <header
        className={cn(
          "fixed inset-x-0 top-8 z-50 bg-[#faf8f3]/95 text-[#111315] backdrop-blur-md transition-all duration-200 border-b",
          scrolled ? "border-gray-200 shadow-md" : "border-gray-200/70",
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
              <span className="display text-base sm:text-lg font-bold text-[#111315] tracking-wide">
                Regex Remedies
              </span>
              <span className="mt-[2px] hidden font-mono text-[9px] uppercase tracking-widest text-[#c44900] font-bold sm:block">
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
                    mega || pathname.startsWith("/shop") ? "text-[#c44900]" : "text-[#111315] hover:text-[#c44900]",
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
                    pathname.startsWith(item.href) ? "text-[#c44900]" : "text-[#111315] hover:text-[#c44900]",
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
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-[#111315] hover:border-[#c44900] transition-colors bg-white shadow-xs"
            >
              <Search size={14} strokeWidth={2} />
              <span>Search</span>
              <kbd className="font-mono text-[9px] text-gray-400">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="press inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] md:hidden hover:bg-gray-200/50"
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
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#111315] hover:bg-gray-200/50 sm:inline-flex"
            >
              <User size={18} strokeWidth={2} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="press relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] hover:bg-gray-200/50"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c44900] px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              className="press inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111315] lg:hidden hover:bg-gray-200/50"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

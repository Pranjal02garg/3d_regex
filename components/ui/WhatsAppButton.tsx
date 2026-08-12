"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Show shaking "Chat with us 👋" badge after 8 seconds
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-1.5 pointer-events-none">
      {/* Floating Shaking Contact Us Pill */}
      {showBadge && (
        <a
          href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20query"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto animate-shake animate-fade-in bg-[#111315]/95 backdrop-blur-md text-white px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold shadow-xl border border-[#25D366] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="h-2 w-2 rounded-full bg-[#25D366] animate-ping"></span>
          <span>Chat with us 👋</span>
        </a>
      )}

      {/* Official WhatsApp Floating Button */}
      <a
        href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20query"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 border-2 border-white"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>

        <span className="hidden sm:inline font-mono text-xs font-extrabold tracking-wider text-white">
          CHAT ON WHATSAPP
        </span>
      </a>
    </div>
  );
}

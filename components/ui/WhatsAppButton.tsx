"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const [showBadge, setShowBadge] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    // The pill is a nudge, not furniture. It is fixed-position and used to sit
    // there for the rest of the session covering whatever was beneath it — on
    // the homepage that is the "Consult Our Experts" button. Show it, then
    // retire it, and let it be dismissed outright.
    const show = setTimeout(() => setShowBadge(true), 8000);
    const hide = setTimeout(() => setShowBadge(false), 20000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [dismissed]);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-1.5 pointer-events-none">
      {/* Contact pill. Enters on a plain fade — a rotating shake reads as
          playful, which is the wrong register for a medicine site whose
          buyers are mostly older. */}
      {showBadge && !dismissed && (
        <div className="pointer-events-auto animate-fade-in flex items-center gap-1 rounded-full border border-[#25D366] bg-[#111315]/95 pr-1 shadow-xl backdrop-blur-md">
          <a
            href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20query"
            target="_blank"
            rel="noreferrer"
            className="press flex cursor-pointer items-center gap-1.5 py-1 pl-3 font-mono text-[10px] font-bold text-white sm:text-[11px]"
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366]" />
            <span>Chat with us 👋</span>
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss chat prompt"
            className="press flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Official WhatsApp Floating Button.
          The pulse lives on the wrapper so the anchor keeps its own press and
          hover transforms — an animation and a transition on the same element
          means the animation always wins, silently. */}
      <div className="fab-pulse pointer-events-none">
        <a
          href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20query"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="press pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 border-2 border-white"
        >
          <WhatsAppIcon size={24} className="text-white" />

          <span className="hidden sm:inline font-mono text-xs font-extrabold tracking-wider text-white">
            CHAT ON WHATSAPP
          </span>
        </a>
      </div>
    </div>
  );
}

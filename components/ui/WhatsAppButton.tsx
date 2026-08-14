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
      {/* Contact pill. Enters on a plain fade — a rotating shake reads as
          playful, which is the wrong register for a medicine site whose
          buyers are mostly older. */}
      {showBadge && (
        <a
          href="https://wa.me/918360053594?text=Hello%20Regex%20Remedies%2C%20I%20have%20a%20query"
          target="_blank"
          rel="noreferrer"
          className="press pointer-events-auto animate-fade-in bg-[#111315]/95 backdrop-blur-md text-white px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold shadow-xl border border-[#25D366] flex items-center gap-1.5 cursor-pointer"
        >
          <span className="h-2 w-2 rounded-full bg-[#25D366]"></span>
          <span>Chat with us 👋</span>
        </a>
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

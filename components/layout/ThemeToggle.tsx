"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("rr-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark ?? false}
      className={
        className ??
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-2 transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)] hover:text-fg"
      }
    >
      {/* Rendered only after mount so the icon can never contradict the theme
          the blocking script already applied. */}
      {dark === null ? (
        <span className="h-[18px] w-[18px]" />
      ) : dark ? (
        <Sun size={18} strokeWidth={1.5} />
      ) : (
        <Moon size={18} strokeWidth={1.5} />
      )}
    </button>
  );
}

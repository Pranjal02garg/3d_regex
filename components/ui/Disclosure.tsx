"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------- Accordion ---------- */

export function Accordion({
  items,
  className,
  defaultOpen,
}: {
  items: { q: string; a: React.ReactNode }[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const base = useId();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1rem] font-medium leading-snug text-fg transition-colors group-hover:text-brand">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1.5 h-3 w-3 shrink-0 text-fg-3 transition-colors group-hover:text-fg"
                >
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-[280ms] [transition-timing-function:var(--ease-out)]",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AccordionPanel id={panelId} btnId={btnId} isOpen={isOpen}>
              {item.a}
            </AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Panel body for the Accordion. Drives open/close with a *measured* inline
 * max-height instead of Tailwind utility classes: on this Tailwind v4 build the
 * `max-h-96`/`visible` open-state utilities lost the cascade and the panel stayed
 * collapsed. Inline styles always win, and measuring the real content height
 * means long answers are never clipped.
 */
function AccordionPanel({
  id,
  btnId,
  isOpen,
  children,
}: {
  id: string;
  btnId: string;
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={btnId}
      className="overflow-hidden transition-[max-height,opacity] duration-[280ms] [transition-timing-function:var(--ease-out)]"
      style={{ maxHeight: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
    >
      <div ref={inner} className="pb-6 pr-10 measure text-[0.9375rem] leading-relaxed text-fg-2">
        {children}
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

export function Tabs({
  tabs,
  className,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();
  const listRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent) {
    const i = tabs.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].id);
    (
      listRef.current?.querySelectorAll("[role=tab]")[next] as HTMLButtonElement | undefined
    )?.focus();
  }

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={onKeyDown}
        className="no-scrollbar flex gap-7 overflow-x-auto border-b border-line"
      >
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${base}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "-mb-px shrink-0 border-b-2 pb-3 pt-1 text-[0.875rem] font-medium transition-colors duration-[180ms]",
                on ? "border-brand text-fg" : "border-transparent text-fg-3 hover:text-fg-2",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="pt-7 focus-visible:outline-none"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

/* ---------- Overlay (modal + drawer share the mechanics) ---------- */

function useOverlay(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restore.current = document.activeElement as HTMLElement;
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    const node = ref.current;
    const autoFocusEl = node?.querySelector<HTMLElement>("[data-autofocus]");
    if (autoFocusEl) {
      autoFocusEl.focus();
    } else {
      node?.focus();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;

      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restore.current?.focus();
    };
  }, [open, onClose]);

  return ref;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useOverlay(open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div className="animate-fade-in absolute inset-0 bg-scrim" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="animate-scale-in relative w-full max-w-lg border border-line bg-raised shadow-lg sm:rounded-lg"
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-4">
          <h2 className="display text-h4">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 p-2 text-fg-3 transition-colors hover:text-fg"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-line px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "right" | "bottom";
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useOverlay(open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="animate-fade-in absolute inset-0 bg-scrim" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "absolute flex flex-col border-line bg-surface shadow-lg",
          side === "right"
            ? "animate-slide-right inset-y-0 right-0 w-full max-w-[26rem] border-l"
            : "animate-slide-up inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t",
        )}
      >
        <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4">
          <h2 className="text-[0.9375rem] font-medium">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 p-2 text-fg-3 transition-colors hover:text-fg"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-line px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

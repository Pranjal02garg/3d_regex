"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string; action?: { label: string; href: string } };

const ToastContext = createContext<(t: Omit<Toast, "id">) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Polite, not assertive: a confirmation should not interrupt whatever
          a screen reader is currently saying. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:bottom-6 sm:left-6 sm:translate-x-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-rise pointer-events-auto flex items-center justify-between gap-4 border border-line bg-raised px-4 py-3 shadow-md"
          >
            <p className="text-[0.875rem] text-fg">{t.message}</p>
            {t.action && (
              <a
                href={t.action.href}
                className="link-underline shrink-0 text-[0.8125rem] font-medium text-brand"
              >
                {t.action.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

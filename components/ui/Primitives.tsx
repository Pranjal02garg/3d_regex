import { cn } from "@/lib/utils";

/* ---------- Badges, tags, chips ---------- */

type Tone = "neutral" | "brand" | "safe" | "caution" | "contra" | "info";

const toneStyles: Record<Tone, string> = {
  neutral: "border-line text-fg-2",
  brand: "border-[color-mix(in_oklab,var(--brand)_38%,transparent)] text-brand",
  safe: "border-[color-mix(in_oklab,var(--safe)_38%,transparent)] text-safe",
  caution: "border-[color-mix(in_oklab,var(--caution)_42%,transparent)] text-caution",
  contra: "border-[color-mix(in_oklab,var(--contra)_38%,transparent)] text-contra",
  info: "border-[color-mix(in_oklab,var(--info)_38%,transparent)] text-info",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px]",
        "font-mono text-micro font-medium uppercase tracking-[0.14em]",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Ingredient tags and similar. Pills are allowed here and only here. */
export function Tag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-[3px] text-[0.75rem] text-fg-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Section header ---------- */

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        Boolean(action) && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display text-h2 max-w-[22ch]">{title}</h2>
        {lede && (
          <p className={cn("text-lead text-fg-2 measure", align === "center" && "mx-auto")}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------- Callout ---------- */

const calloutTones = {
  info: { border: "var(--info)", label: "Note" },
  caution: { border: "var(--caution)", label: "Important" },
  contra: { border: "var(--contra)", label: "Do not take if" },
  safe: { border: "var(--safe)", label: "Good to know" },
} as const;

/**
 * Safety information gets a rule down the left rather than a tinted panel.
 * A coloured box reads as a promotion; a rule reads as an annotation, which
 * is what a contraindication actually is.
 */
export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof calloutTones;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const t = calloutTones[tone];
  return (
    <div
      className={cn("border-l-2 pl-4 md:pl-5", className)}
      style={{ borderColor: t.border }}
    >
      <p className="eyebrow" style={{ color: t.border }}>
        {title ?? t.label}
      </p>
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2 measure">{children}</div>
    </div>
  );
}

/* ---------- Data list ---------- */

export function DataRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 border-b border-line-2 py-3", className)}>
      <dt className="text-[0.8125rem] text-fg-3">{label}</dt>
      <dd className="tabular text-right text-[0.875rem] font-medium text-fg">{value}</dd>
    </div>
  );
}

/* ---------- Rating ---------- */

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" className="shrink-0">
            <defs>
              <linearGradient id={`s${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="var(--accent)" />
                <stop offset={`${fill * 100}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.6l2.47 5.3 5.53.68-4.08 3.94 1.05 5.68L10 14.36 4.03 17.2l1.05-5.68L1 7.58l5.53-.68z"
              fill={`url(#s${i}-${Math.round(fill * 100)})`}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
}

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Stars value={value} />
      <span className="tabular text-[0.8125rem] text-fg-2">
        {value.toFixed(1)}
        {count !== undefined && <span className="text-fg-3"> ({count})</span>}
      </span>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5{count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}

/* ---------- Skeleton ---------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-md", className)} aria-hidden="true" />;
}

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Empty state ---------- */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 border border-dashed border-line px-6 py-16 text-center">
      <h3 className="display text-h4">{title}</h3>
      <p className="measure-narrow text-[0.9375rem] text-fg-2">{body}</p>
      {action}
    </div>
  );
}

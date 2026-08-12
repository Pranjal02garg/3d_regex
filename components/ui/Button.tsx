import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "quiet" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-[background-color,border-color,color,transform] duration-[180ms] " +
  "[transition-timing-function:var(--ease-out)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-45 select-none whitespace-nowrap";

/* Rectangles with a small radius, not pills. A pill button is the single
   most reliable signal of a template, and it reads as consumer-app rather
   than as a company that manufactures medicine. */
const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-fg hover:bg-[color-mix(in_oklab,var(--brand)_88%,black)]",
  secondary:
    "border border-line-strong bg-transparent text-fg hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]",
  ghost: "text-fg hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]",
  quiet: "text-fg-2 hover:text-fg",
  danger: "bg-contra text-white hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-[3.25rem] px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  full,
  className,
  href,
  children,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
  const classes = cn(base, variants[variant], sizes[size], full && "w-full", className);

  if (external) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} {...rest}>
      {children}
    </Link>
  );
}

export function IconButton({
  label,
  className,
  children,
  ...rest
}: { label: string; className?: string; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-2",
        "transition-colors duration-[180ms] hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)] hover:text-fg",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

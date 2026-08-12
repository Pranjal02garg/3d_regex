import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The existing emblem — mortar, pestle, leaves, ribbon — is dense and does
 * not survive being set at 20px in a header. Rather than redraw the brand's
 * history away, the wordmark leads and the emblem is demoted to a seal used
 * on trust surfaces, where its density reads as a stamp of certification
 * instead of clutter.
 */
export default function Logo({
  className,
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Regex Remedies — home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span
        className={cn(
          "display text-[1.2rem] leading-none tracking-[-0.015em]",
          onDark ? "text-paper" : "text-fg",
        )}
      >
        Regex
      </span>
      <span
        className={cn(
          "font-mono text-[0.6rem] uppercase leading-none tracking-[0.28em]",
          onDark ? "text-paper/60" : "text-fg-3",
        )}
      >
        Remedies
      </span>
    </Link>
  );
}

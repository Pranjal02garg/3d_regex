export type ClassValue = string | false | null | undefined;

/** Joins class names. Caller-supplied `className` goes last so it wins. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(paise: number): string {
  return INR.format(paise);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * "One pack lasts about N days" — the single most useful number on a
 * supplement PDP, and one no Indian competitor surfaces. Derived from the
 * pack count and the daily dose so it can never drift from the label.
 */
export function packDuration(unitsPerPack: number, unitsPerDay: number): number {
  return Math.floor(unitsPerPack / unitsPerDay);
}

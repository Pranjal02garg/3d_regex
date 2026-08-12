"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-line bg-raised px-3.5 py-2.5 text-[0.9375rem] text-fg " +
  "transition-[border-color,box-shadow] duration-[180ms] " +
  "hover:border-line-strong focus:border-brand focus:outline-none " +
  "focus:ring-2 focus:ring-[color-mix(in_oklab,var(--brand)_28%,transparent)] " +
  "disabled:opacity-50 aria-[invalid=true]:border-contra";

function Shell({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-fg-2">
        {label}
        {required && (
          <span className="ml-1 text-contra" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-caption text-fg-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-caption text-contra" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = { label: string; hint?: string; error?: string };

export function Input({
  label,
  hint,
  error,
  className,
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, className)}
        {...rest}
      />
    </Shell>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <textarea
        id={id}
        rows={rest.rows ?? 4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "resize-y", className)}
        {...rest}
      />
    </Shell>
  );
}

export function Select({
  label,
  hint,
  error,
  options,
  className,
  ...rest
}: BaseProps & {
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={rest.required}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(control, "appearance-none pr-10", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-3"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </Shell>
  );
}

export function Checkbox({
  label,
  description,
  className,
  ...rest
}: { label: string; description?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        className={cn(
          "mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 cursor-pointer rounded-[3px] border border-line-strong",
          "accent-[var(--brand)]",
          className,
        )}
        {...rest}
      />
      <label htmlFor={id} className="cursor-pointer text-[0.875rem] leading-snug text-fg-2">
        {label}
        {description && <span className="mt-0.5 block text-caption text-fg-3">{description}</span>}
      </label>
    </div>
  );
}

export function Radio({
  label,
  description,
  className,
  ...rest
}: { label: string; description?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const id = rest.id ?? auto;
  return (
    <div className="flex items-start gap-3">
      <input
        type="radio"
        id={id}
        className={cn(
          "mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 cursor-pointer border border-line-strong accent-[var(--brand)]",
          className,
        )}
        {...rest}
      />
      <label htmlFor={id} className="cursor-pointer text-[0.875rem] leading-snug text-fg-2">
        {label}
        {description && <span className="mt-0.5 block text-caption text-fg-3">{description}</span>}
      </label>
    </div>
  );
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 9,
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div
      className="inline-flex h-11 items-center rounded-md border border-line-strong"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="h-full w-10 text-fg-2 transition-colors hover:text-fg disabled:opacity-30"
      >
        −
      </button>
      <span
        className="tabular w-9 text-center text-[0.9375rem] font-medium"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="h-full w-10 text-fg-2 transition-colors hover:text-fg disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

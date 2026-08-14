# DESIGN.md template

A project's design decisions belong in a file, not in the last conversation. Write this at the repo root when starting a project, or reverse-engineer it from existing code when adopting one. Read it before every subsequent UI change so later work stays coherent with earlier work.

Keep it short enough that someone actually reads it. Decisions and reasons, not an exhaustive token dump — the tokens live in CSS; this file explains *why* they are what they are.

---

```markdown
# Design System: [Product]

## 1. North star

One paragraph. What should this feel like when someone lands on it?
Name a physical or cultural reference if it helps ("crafted instrument,"
"field notebook," "control room"). Then name the anti-references:
what it must NOT look like.

Lane: brand (marketing/landing/portfolio) or product (app/dashboard/tool).
This decides nearly everything downstream — brand surfaces can be loud
and expressive, product surfaces prioritize density and legibility.

## 2. Color

- Ground / surfaces: [values] — the page background and raised panels
- Primary accent: [value] — where it's allowed (CTAs, active state, brand marks)
- Secondary accent: [value] — what it MEANS (state? change? success?)
- Neutral ramp: [values] — note the tint direction
- Semantic: success / warning / error

Rules — the constraints someone could otherwise violate innocently:
- e.g. "Accent never carries body text; it lives on fills and marks."
- e.g. "All new colors declared in OKLCH."
- e.g. "Never more than two accents visible in one viewport."

## 3. Typography

- Display face: [family, weight, when it's used]
- Body/UI face: [family, weight]
- Mono: [family]
- Scale: [list the allowed steps]

Rules:
- e.g. "Display face never below 1.2rem — it reads too light."
- e.g. "Body max-width 65–75ch."

## 4. Spacing, radii, elevation

- Spacing scale: 8 / 16 / 24 / 32 / 48 / 80
- Radii: [values, and which components use which]
- Elevation: hairline first; shadow only for [specific cases]

## 5. Components

For each recurring primitive — button, input, card, nav, badge, modal —
record the decision, not the CSS: fill, text color, border, radius, padding,
and the hover/active/focus/disabled treatment.

**The reuse rule:** reach for an existing primitive before inventing a new
class. If a new pattern is genuinely needed, add it here rather than leaving
it in page-local CSS. Page CSS is for page-specific scenery only.

## 6. Motion

- Easing tokens: --ease-out, --ease-in-out
- Duration defaults by element class
- What never animates (see the frequency table in motion.md)

## 7. Do / Do not

A short two-column list. The "do not" side is the more useful one —
it's where a future contributor (human or model) will otherwise drift.
```

---

## Reverse-engineering it from existing code

When adopting a project that has no DESIGN.md:

1. Grep every color, font-size, radius, and spacing value actually in use.
2. Cluster them — near-duplicates (`#1a1a1a`, `#191919`, `#1b1b1b`) reveal improvisation.
3. Pick the canonical value per cluster and note how many places need updating.
4. Identify which components already repeat; those become the documented primitives.
5. Write the north star *last*, describing what the product already is — then note explicitly where the current code diverges from it. That divergence list is the design backlog.

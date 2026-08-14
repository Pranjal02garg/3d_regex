---
name: ui-craft
description: Design and motion taste for building or reviewing user interfaces. Use this whenever the work touches frontend visuals or feel — building a landing page, component, dashboard, or web app; adding or fixing animations and transitions; reviewing UI code; picking fonts, colors, spacing, or easing; or when the user says the interface looks generic, "AI-made," flat, boring, or "off" and can't say why. Trigger it even when the user only asks to "build a page" or "make this look better" without mentioning design explicitly, and before writing any HTML/CSS/JSX that a human will look at.
---

# UI Craft

Interfaces fail in predictable ways. Models trained on the same SaaS templates reach for the same defaults — Inter for everything, purple-to-blue gradients, cards inside cards, `transition: all 300ms`, `ease-in` on a dropdown — and the result is competent and forgettable. This skill exists to replace those defaults with decisions that have a reason behind them.

Two ideas drive everything here:

1. **Unseen details compound.** Users rarely consciously notice a correct `transform-origin`. They notice the aggregate. A hundred small correct choices produce an interface people like without knowing why.
2. **Every visual choice needs a "because."** If the answer to "why 300ms?" or "why this gradient?" is "it's the default," that's the bug.

## How to use this skill

Pick the mode that matches what's being asked. Don't run all four.

| Situation | Mode | Read |
|---|---|---|
| Building UI from scratch | **Shape → Build** | `references/anti-slop.md`, then `references/motion.md` if it moves |
| Adding or changing animation | **Animate** | `references/motion.md` |
| Reviewing existing UI code | **Critique** | Both references, then use the review format below |
| "Make this better" / vague | **Diagnose first** | Ask which axis is off (see below) before touching code |

### Establishing design context

Before building anything non-trivial, know three things. If the user hasn't said, ask — one short question, not a questionnaire.

- **Lane:** brand surface (marketing, landing, portfolio — can be loud, opinionated, memorable) or product surface (dashboard, tool, app UI — density, legibility, and speed win over expression)?
- **Audience and voice:** who reads this, and should it feel serious, playful, technical, luxurious?
- **Anti-references:** what should it explicitly *not* look like? This is often the most useful answer, and users give it readily ("not another Linear clone").

For projects that will grow, write these answers into a `DESIGN.md` at the repo root — colors, type scale, spacing scale, radii, component decisions — and read it before every later change. A design system that lives in a file beats one that lives in the last conversation. `references/design-md-template.md` has the structure.

## Non-negotiables

These hold regardless of mode. They're the highest-frequency failures.

**Motion**
- `ease-out` for anything entering or exiting. Never `ease-in` on UI — it delays the first moment of movement, which is exactly when the user is watching, so it feels slow even at identical duration.
- Custom curves, not CSS keywords. The built-ins are too weak to read as intentional: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- UI animations stay under 300ms. Under 200ms for anything triggered often.
- Never animate from `scale(0)`. Nothing in the physical world appears from nothing — start at `scale(0.95)` with `opacity: 0`.
- Never `transition: all`. Name the properties.
- Never animate keyboard-triggered actions. A command palette opened 100 times a day should open instantly.
- Only animate `transform` and `opacity`. Everything else forces layout and paint.

**Visual**
- No pure black or pure white. Tint the neutrals toward the brand hue — it reads as designed rather than defaulted.
- No gray text on a colored background. Use a tinted or desaturated version of that background's hue instead.
- No cards inside cards. If two card layers appear, one of them should be a plain grouped region with spacing and a hairline.
- Default fonts are a tell. Inter, Arial, and raw `system-ui` on a brand surface signal that nobody chose. Pick a face for a reason and pair at most two.
- Borders before shadows. A 1px hairline usually does what a soft shadow was reaching for, and doesn't muddy the surface.
- Purple-to-blue gradients, neon glow, and glassmorphism are the current era's clip art. Skip them unless the brand genuinely calls for one.

## Review format

When reviewing UI code, output a single markdown table. One row per issue. The "Why" column is the point — it teaches the reason, not just the fix.

| Before | After | Why |
|---|---|---|
| `transition: all 300ms` | `transition: transform 200ms var(--ease-out)` | Name properties; `all` animates layout props by accident |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Things don't appear from nothing |
| `ease-in` on a dropdown | `ease-out` with a custom curve | `ease-in` delays the moment the user is watching |
| no `:active` state | `transform: scale(0.97)` on `:active` | Pressable things must acknowledge the press |
| `transform-origin: center` on a popover | origin set to the trigger | Popovers grow from what opened them (modals stay centered) |

Do not use a list of "Before:" / "After:" lines. The table makes the volume of small fixes legible at a glance, which is the whole argument.

After the table, add one short paragraph naming the single highest-impact change. A list of twelve fixes without a priority is a list nobody acts on.

## Diagnosing "it looks off"

When the user can't articulate the problem, it's almost always one of these five. Check in order — earlier ones mask later ones.

1. **Hierarchy** — is it obvious what to look at first? Usually fixed by widening the size gap between levels, not by adding color.
2. **Spacing rhythm** — inconsistent gaps read as sloppy even when nothing is individually wrong. Snap to one scale (e.g. 8 / 16 / 24 / 32 / 48 / 80).
3. **Type** — too many sizes, too many weights, line length past ~75ch, or line-height too tight for the size.
4. **Color** — usually too many accents (one primary, one secondary is enough) or untinted grays.
5. **Motion** — everything static, or everything animated. Both read as unconsidered.

Name the axis before proposing fixes. "The hierarchy is flat — the h1 and body are two steps apart when they should be five" is actionable. "It needs more polish" is not.

## Amplitude adjustments

Common follow-up requests, and what they actually mean:

- **"bolder"** — increase contrast between elements, not saturation across all of them. Bigger display type, one confident accent, more negative space around the focal point.
- **"quieter"** — reduce the number of competing accents, drop decorative elements, lighten borders, slow nothing down.
- **"distill"** — remove elements until removing one more would break comprehension. Usually there are 3-5 to cut.
- **"more delightful"** — add one moment, not many. Delight comes from a single well-placed surprise; several read as noise.

## Accessibility is part of craft, not a separate pass

- `prefers-reduced-motion` means *gentler*, not zero. Keep opacity and color transitions that carry meaning; drop movement.
- Gate hover effects behind `@media (hover: hover) and (pointer: fine)` — touch devices fire hover on tap and leave elements stuck.
- Touch targets at least 44px. Body text at least 16px on mobile.
- Don't skip heading levels; don't communicate state through color alone.

## References

- `references/motion.md` — the full animation decision framework: whether to animate, easing selection, duration tables, springs, gestures, performance, and debugging. Read this before writing any animation code.
- `references/anti-slop.md` — the checklist of generic-AI-design tells and how to fix each, plus quality checks for layout, type, and color. Read before building or reviewing visuals.
- `references/design-md-template.md` — structure for a project's `DESIGN.md`. Use when starting a project or documenting an existing one.

## Attribution

Synthesized from two open-source design skill collections: Emil Kowalski's [skills](https://github.com/emilkowalski/skills) (MIT) for the animation and component craft, and Paul Bakaus's [Impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0) for the anti-pattern taxonomy and design-context workflow. Both are worth reading in full.

# Anti-Slop

Every model was trained on the same SaaS marketing pages, so skipping design guidance produces the same handful of tells on every project. This file lists them and gives the replacement. Read it before building visuals and before reviewing them.

The underlying test for each item: **could you name why this choice is here?** "It's what came out" is the failure mode, not any specific font or color.

---

## The tells

### Typography

| Tell | Why it reads as generic | Instead |
|---|---|---|
| Inter, or raw `system-ui`, on a brand surface | It's the default of the entire category | Pick a display face with a point of view; keep a neutral one for body. Two families maximum |
| Arial / Helvetica by accident | Nobody chooses Arial | If you want a neutral grotesque, choose one deliberately and say why |
| Every heading the same weight | No hierarchy signal beyond size | Vary weight *and* size; a thin display face over a medium body face is a strong, cheap contrast |
| Six type sizes on one page | Reads as accumulation, not design | Fix a scale (e.g. 12/14/16/20/24/32/48) and use only its steps |
| Line length running the full container | Painful to read past ~75 characters | Cap body copy at 65–75ch |
| Tight line-height on body text | Dense text on dark surfaces especially needs air | 1.5–1.8 for body; tighter (1.0–1.1) only for display |
| Full sentences in tracked uppercase | Tracked caps are for short markers | Keep them to 1–3 words |

### Color

| Tell | Why | Instead |
|---|---|---|
| Purple-to-blue gradient | The single most recognizable AI-design signature | One flat brand color, or a gradient between two hues with a reason (brand, physical material, data meaning) |
| Pure black `#000` / pure white `#fff` | Nothing in the physical world is either | Tint neutrals toward the brand hue — a warm near-black reads considered |
| Gray text on a colored background | Muddy, and it fails contrast more often than people check | Use a light/dark variant of that same hue |
| Neon glow, dark drop-glow halos | Dated "AI product" costume | Contrast through surface value and hairlines |
| Five accent colors | Nothing is emphasized when everything is | One primary accent, optionally one secondary that carries a *meaning* (success, live, changed) |
| Untinted `#808080` grays everywhere | Flat and lifeless next to any tinted brand color | Build a neutral ramp with a little chroma in the brand hue |
| Color as the only state signal | Fails for colorblind users | Pair with icon, weight, or position |

### Layout and surfaces

| Tell | Why | Instead |
|---|---|---|
| Cards nested inside cards | Two elevation stories at once; nothing reads as grouped | One card layer. Group inner content with spacing and a hairline |
| Everything wrapped in a card | Cards stop meaning anything | Reserve cards for genuinely separable objects |
| The rounded-square icon tile above every heading | The single most-copied SaaS section pattern | Let the heading carry the section, or use a real illustration/diagram |
| Three feature columns, each icon + heading + two lines | Template shape | Vary the rhythm — one wide, two narrow; a bento grid; asymmetry |
| Soft shadow on everything | Muddies every surface | A 1px hairline first; shadow only for genuinely floating layers |
| Glassmorphism panels | Costume, and usually unreadable | Solid surfaces with value contrast |
| Random spacing values (13px, 27px, 42px) | Reads sloppy even when nothing is individually wrong | Snap to one scale: 8/16/24/32/48/80 |
| Cramped padding | The most common "looks cheap" cause | Give containers real breathing room; whitespace is the cheapest luxury signal |
| Very large border radii on wide cards | Balloons the shape and dates the design | Small radii (2–12px) read more precise |

### Interaction and states

| Tell | Instead |
|---|---|
| No `:active` state on buttons | `transform: scale(0.97)` — see `motion.md` |
| No `:focus-visible` styling | Visible focus ring with offset; keyboard users exist |
| No empty state | Design the zero-data case; it's a user's first impression |
| No loading state, or a full-page spinner | Skeletons matching the eventual layout |
| No error or overflow handling | Test with long strings, missing images, and a second language |
| Touch targets under 44px | Size up; thumbs aren't cursors |

---

## Quality pass (run before calling anything done)

**Hierarchy** — Squint at it. Does the intended focal point survive? If three things compete, two need to recede.

**Responsive** — Check at 375px, 768px, 1440px. Look for: horizontal scroll, text overlapping, images without aspect-ratio reservations causing layout shift, nav collapsing badly.

**Density** — Product surfaces should show more per screen than marketing surfaces. A dashboard with landing-page whitespace wastes the user's screen; a landing page with dashboard density feels cheap.

**Accessibility** — Contrast at 4.5:1 for body text and 3:1 for large text. Heading levels not skipped. Interactive elements reachable and labeled. `prefers-reduced-motion` honored.

**Consistency** — Pull every color, radius, spacing value, and font size out of the file into a list. If the list has forty entries, most were improvised. Consolidate into tokens.

**Real content** — Swap lorem ipsum for realistic text, including the longest plausible string. Most layouts break on the real name of a real product.

---

## When to break these

These are defaults, not laws. A rule is worth breaking when the brand has an actual reason:

- A gradient is right when it *is* the brand, or when it encodes something (heat, depth, time).
- Bounce is right in a deliberately playful product for a young audience.
- Heavy glass is right when the product is literally about layering or transparency.
- Maximal density with no whitespace is right for a trading terminal.

The distinction is always intent. A choice you can defend in a sentence is design; the same choice arrived at by default is slop.

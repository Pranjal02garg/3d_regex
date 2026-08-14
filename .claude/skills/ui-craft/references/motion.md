# Motion

The full animation decision framework. Work through it in order — each question narrows the next.

**Contents**
1. Should this animate at all?
2. What is the purpose?
3. Which easing?
4. How long?
5. Springs
6. Component patterns
7. Transforms and clip-path
8. Gestures and drag
9. Performance
10. Accessibility
11. Debugging
12. Checklist

---

## 1. Should this animate at all?

The deciding variable is frequency. An animation seen once is a gift; the same animation seen two hundred times is a tax.

| How often the user sees it | Decision |
|---|---|
| 100+ times/day — command palette, keyboard shortcuts | No animation at all |
| Tens of times/day — hover states, list navigation | Remove or cut drastically (under 120ms) |
| Occasional — modals, drawers, toasts | Standard animation |
| Rare — onboarding, first-run, celebration, marketing | Room for delight |

**Keyboard-initiated actions never animate.** The user invoked it with a shortcut because they wanted speed. Raycast's palette has no open animation, and that is the correct call for something opened all day.

## 2. What is the purpose?

Every animation needs an answer to "why does this move?" Valid answers:

- **Spatial consistency** — a toast that enters from the right and exits to the right makes swipe-to-dismiss feel obvious.
- **Feedback** — a button scaling down on press confirms the interface heard the input.
- **State indication** — a morph shows that something changed, and into what.
- **Continuity** — elements appearing or vanishing instantly read as broken rendering.
- **Explanation** — marketing motion that demonstrates how a feature works.

"It looks cool" is only a valid answer for something seen rarely. For frequent UI, it's a reason to delete the animation.

## 3. Which easing?

```
Entering or exiting?          → ease-out
Moving/morphing on screen?    → ease-in-out
Hover or color change?        → ease
Constant motion (marquee)?    → linear
Unsure?                       → ease-out
```

The CSS keywords are too weak to feel deliberate. Use custom curves:

```css
--ease-out:     cubic-bezier(0.23, 1, 0.32, 1);    /* UI enter/exit */
--ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);   /* on-screen movement */
--ease-drawer:  cubic-bezier(0.32, 0.72, 0, 1);    /* iOS-like drawer */
```

**Never `ease-in` on UI.** It holds the element still at the start, which is the exact moment the user is watching for a response. A 300ms `ease-in` dropdown feels slower than a 300ms `ease-out` one, measurably identical durations notwithstanding.

Avoid bounce and elastic easing on product UI. It reads as dated and it delays settling. Reserve it for drag-to-dismiss and deliberately playful moments, and keep it subtle.

## 4. How long?

| Element | Duration |
|---|---|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Longer is fine |

**Under 300ms for UI.** Perceived speed is a real product quality: a faster spinner makes a page feel like it loaded faster at identical load time; a 180ms select feels more responsive than a 400ms one; a tooltip that skips its delay once a neighbor is already open makes the whole toolbar feel quick.

**Asymmetric timing.** Slow where the user is deciding, fast where the system is responding. Hold-to-delete: 2s linear on press, 200ms ease-out on release. Generally, exits can be faster than entrances.

## 5. Springs

Springs simulate physics rather than following a fixed duration, so they feel alive and — critically — they preserve velocity when interrupted. CSS transitions and keyframes restart from zero.

Reach for springs when:
- the interaction is a drag with momentum
- the user might reverse mid-motion (expand, then immediately Escape)
- the element should feel physical (Dynamic Island-style)
- the motion is decorative mouse-tracking

Configuration — Apple's parameterization is easier to reason about:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }        // preferred
{ type: "spring", mass: 1, stiffness: 100, damping: 10 } // more control
```

Keep bounce between 0.1 and 0.3 when used at all.

Tying a value directly to mouse position feels synthetic because real objects have inertia. Interpolate through a spring instead:

```js
import { useSpring } from 'framer-motion';
const springRotation = useSpring(mouseX * 0.1, { stiffness: 100, damping: 10 });
```

This works *because* it's decorative. The same treatment on a banking app's data readout would be a lie about the data.

## 6. Component patterns

**Buttons acknowledge the press.**
```css
.button { transition: transform 160ms var(--ease-out); }
.button:active { transform: scale(0.97); }
```
Keep the scale between 0.95 and 0.98. Note that `scale()` also scales children — the label and icon shrink with it, which is what you want.

**Popovers scale from their trigger**, not from their own center. Modals are the exception: they aren't anchored to anything, so they stay centered.
```css
.popover { transform-origin: var(--radix-popover-content-transform-origin); }
/* Base UI: var(--transform-origin) */
```

**Tooltips: delay the first, skip the rest.** The delay prevents accidental activation. Once one tooltip is open, adjacent ones should appear instantly with no transition.
```css
.tooltip { transition: transform 125ms var(--ease-out), opacity 125ms var(--ease-out); }
.tooltip[data-starting-style] { opacity: 0; transform: scale(0.97); }
.tooltip[data-instant] { transition-duration: 0ms; }
```

**Transitions, not keyframes, for anything triggered rapidly.** Transitions retarget from their current position; keyframes restart from zero. Toasts stacking quickly are the canonical case.

**Blur masks an imperfect crossfade.** When two states overlap during a fade you see two objects instead of one transformation. A `filter: blur(2px)` during the transition blends them into a single perceived change. Keep blur under 20px — it's expensive, especially in Safari.

**`@starting-style` for enter animations** replaces the `useEffect(() => setMounted(true))` pattern where support allows:
```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```

**Stagger entering lists** by 30–80ms per item. Longer delays make the interface feel slow, and stagger must never block interaction while it plays.

## 7. Transforms and clip-path

**Percentages in `translate()` are relative to the element's own size.** `translateY(100%)` moves an element exactly its own height regardless of content — this is how drawers hide offscreen and toasts stage their entrance. Prefer this over hardcoded pixels.

**3D:** `rotateX`/`rotateY` with `transform-style: preserve-3d` gives real depth — coin flips, orbits — with no JS.

**`clip-path` is an underused animation tool.** `inset(top right bottom left)` eats into the element from each side, and it animates cheaply:
- *Tab color transitions* — duplicate the tab list, style the copy as active, clip the copy to the active tab, animate the clip. Seamless in a way that timing individual color transitions can't match.
- *Hold-to-delete* — `inset(0 100% 0 0)` → `inset(0 0 0 0)` over 2s linear on `:active`, snapping back in 200ms on release.
- *Scroll reveals* — `inset(0 0 100% 0)` → `inset(0 0 0 0)` triggered by `IntersectionObserver`.
- *Comparison sliders* — overlay two images, clip the top one, drive the inset from drag position. No extra DOM.

## 8. Gestures and drag

- **Velocity beats distance.** Compute `Math.abs(distance) / elapsedMs`; dismiss above roughly 0.11 even if the drag was short. A flick should work.
- **Damp past boundaries** instead of stopping hard. The further past the edge, the less the element moves. Real objects decelerate.
- **Capture the pointer** once a drag starts, so it continues when the cursor leaves the element.
- **Ignore extra touch points** after the drag begins, or switching fingers teleports the element.

## 9. Performance

- **Animate only `transform` and `opacity`.** They skip layout and paint. `width`, `height`, `margin`, `padding` trigger all three.
- **Don't animate CSS variables on a parent.** Variables inherit, so changing one recalculates styles for every descendant. Set `transform` on the element directly.
- **Framer Motion's `x`/`y`/`scale` shorthands are not hardware accelerated** — they run on the main thread via rAF and drop frames when the browser is busy. Use the full string for GPU compositing:
  ```jsx
  <motion.div animate={{ transform: "translateX(100px)" }} />
  ```
- **CSS animations beat JS under load** because they run off the main thread. Use CSS for predetermined motion, JS for dynamic and interruptible motion.
- **WAAPI** gives programmatic control with CSS-grade performance and no library:
  ```js
  element.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
    { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
  ```

## 10. Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* keep the fade, drop the movement */
}
```
Reduced motion means fewer and gentler animations, not none — opacity and color changes still carry meaning and rarely trigger motion sickness. Position and scale changes are what to remove.

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); }
}
```

## 11. Debugging

- **Slow motion.** Multiply durations by 3–5x temporarily, or use the DevTools animation inspector. Look for: two distinct states visible during a crossfade, easing that starts or stops abruptly, a wrong transform-origin, properties drifting out of sync.
- **Frame by frame** in the Chrome Animations panel exposes coordination bugs invisible at speed.
- **Real devices for gestures.** Simulators don't reproduce touch latency or momentum feel.
- **Look again the next day.** Fresh eyes catch timing that felt fine during development.

## 12. Checklist

| Issue | Fix |
|---|---|
| `transition: all` | Name the properties |
| `scale(0)` entry | Start from `scale(0.95)` + `opacity: 0` |
| `ease-in` on UI | Switch to `ease-out` with a custom curve |
| Bounce/elastic on product UI | Remove; reserve for drag and play |
| `transform-origin: center` on a popover | Anchor to the trigger (modals exempt) |
| Animation on a keyboard action | Delete it |
| Duration > 300ms on UI | Cut to 150–250ms |
| Hover effect without a media query | Add `(hover: hover) and (pointer: fine)` |
| Keyframes on a rapidly-triggered element | Use transitions for interruptibility |
| Framer Motion `x`/`y` under load | Use the full `transform` string |
| Symmetric enter/exit timing | Make the exit faster |
| Everything appears at once | Stagger 30–80ms |
| Animating `height`/`width`/`margin` | Move to `transform`, or use `clip-path` |
| No `prefers-reduced-motion` handling | Add it, keeping meaningful fades |

"""
Cut the white studio background off the product shots so the bottles can sit on
a dark stage.

The source PNGs are 800x800 with an opaque pure-white background (~65-73% of
each frame). A global "white is transparent" threshold is wrong here: every
label carries large white areas, and thresholding punches holes straight
through them. So the background is found by flood-filling inward from the
border instead — only white that is *connected to the edge* is background.

Writes RGBA siblings into public/products/cutout/. Originals are left alone.
"""

from pathlib import Path

from PIL import Image, ImageFilter
import numpy as np

SRC = Path("public/products")
OUT = SRC / "cutout"
SLUGS = ["livgex", "kabzraj", "gasogex", "pilegex", "lucogex"]

# How far from pure white still counts as background.
#
# Zero, and that is deliberate. These shots come back from the studio with the
# backdrop already flattened to exactly 255,255,255 — measured, it is 60.7% of
# the livgex frame and every sampled background pixel is exact. The bottles
# never are: livgex is a white bottle, and even its cap has a median distance
# of 13 from white with only 1.3% of cap pixels landing on exact white. Any
# tolerance wide enough to matter (18 was tried) opens a path between the cap's
# moulded ridges and the fill eats the whole cap. Exact-match has no such path.
TOLERANCE = 0

# Exact-match leaves a thin rim of not-quite-white backdrop around each bottle —
# the studio's soft contact shadow — which reads as a bright halo on a dark
# page. These two absorb it: grow the confirmed background outward into
# near-white, but only so far.
#
# The bound is the whole point. Growth into near-white never converges on its
# own, because the bottles have near-white parts of their own that touch the
# backdrop; measured, the first ~5 steps recover the halo (livgex 60.5% -> 62.0%
# background) and everything after is the fill creeping into the cap at a few
# hundred pixels a step until it has eaten the lot. Stopping at 5 takes the
# halo and leaves at most a 5px nibble on genuinely white bottle edges, which
# is not visible at any size the page renders these at.
SOFT_TOLERANCE = 18
SOFT_GROW = 5


def _dilate(mask: np.ndarray) -> np.ndarray:
    out = mask.copy()
    out[1:, :] |= mask[:-1, :]
    out[:-1, :] |= mask[1:, :]
    out[:, 1:] |= mask[:, :-1]
    out[:, :-1] |= mask[:, 1:]
    return out


def flood_from_border(passable: np.ndarray) -> np.ndarray:
    """Every `passable` pixel reachable from the frame edge, 4-connected.

    PIL's ImageDraw.floodfill is the obvious tool and is wrong for this: it
    tracks only a single previous generation of visited pixels, so on a large
    open region it re-treads itself and terminates early — measured here at
    4.8% of a background that is actually 73% of the frame. This is a plain
    iterative propagation instead, which cannot stop short.
    """
    reached = np.zeros_like(passable, dtype=bool)
    reached[0, :] = passable[0, :]
    reached[-1, :] = passable[-1, :]
    reached[:, 0] = passable[:, 0]
    reached[:, -1] = passable[:, -1]

    while True:
        grown = _dilate(reached) & passable
        if np.array_equal(grown, reached):
            return reached
        reached = grown


def cut(slug: str) -> None:
    src = Image.open(SRC / f"{slug}.png").convert("RGB")
    arr = np.asarray(src).astype(np.int16)

    # Distance from white, collapsed to one channel so a pixel that is bright
    # in only one channel still counts as coloured.
    dist = (255 - arr.min(axis=2)).astype(np.uint8)

    background = flood_from_border(dist <= TOLERANCE)

    soft = dist <= SOFT_TOLERANCE
    for _ in range(SOFT_GROW):
        background = _dilate(background) & soft

    alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")

    # The hard mask has a 1px stair-stepped edge, and the outermost kept pixels
    # are blends of bottle and white studio — leaving them produces a bright
    # fringe that is invisible on white and obvious on near-black. MinFilter
    # pulls the edge in by a pixel to drop that fringe, then a sub-pixel blur
    # puts anti-aliasing back.
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(0.6))

    out = src.copy()
    out.putalpha(alpha_img)

    OUT.mkdir(parents=True, exist_ok=True)
    out.save(OUT / f"{slug}.png", optimize=True)

    kept = (np.asarray(alpha_img) > 8).mean()
    print(f"{slug:9s} kept {kept:5.1%} of frame")


if __name__ == "__main__":
    for slug in SLUGS:
        cut(slug)

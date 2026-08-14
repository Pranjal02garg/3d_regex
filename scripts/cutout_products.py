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

# How far from pure white still counts as background. Generous enough to catch
# the studio's soft vignette in the corners, tight enough to stop at the
# bottle's own edge and its drop shadow.
TOLERANCE = 18

# Half-width of the flatness window, in pixels. A pixel only seeds the fill if
# everything within this radius is background-white too, which is what stops
# the fill entering narrow white passages — see `cut`.
FLATNESS = 4


def _dilate(mask: np.ndarray) -> np.ndarray:
    out = mask.copy()
    out[1:, :] |= mask[:-1, :]
    out[:-1, :] |= mask[1:, :]
    out[:, 1:] |= mask[:, :-1]
    out[:, :-1] |= mask[:, 1:]
    return out


def _erode(mask: np.ndarray, radius: int) -> np.ndarray:
    """Shrink `mask` by `radius`, treating outside the frame as still inside.

    Border pixels must survive erosion or the fill would have nowhere to start,
    so the edges are padded with True rather than False.
    """
    out = mask.copy()
    for _ in range(radius):
        shrunk = out.copy()
        shrunk[1:, :] &= out[:-1, :]
        shrunk[:-1, :] &= out[1:, :]
        shrunk[:, 1:] &= out[:, :-1]
        shrunk[:, :-1] &= out[:, 1:]
        # Re-assert the frame edge, which the shifts above always clear.
        shrunk[0, :] = out[0, :]
        shrunk[-1, :] = out[-1, :]
        shrunk[:, 0] = out[:, 0]
        shrunk[:, -1] = out[:, -1]
        out = shrunk
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
    white = dist <= TOLERANCE

    # Livgex is a white bottle photographed on white: its cap is the same value
    # as the background, and the only thing separating them is the thin grey
    # ridge shading. A fill run on `white` alone pours down between those
    # ridges and eats the cap. Requiring a *flat* white neighbourhood closes
    # every passage narrower than 2*FLATNESS, which the ridge gaps are, while
    # the open background is unaffected.
    core = flood_from_border(_erode(white, FLATNESS))

    # Erosion also pulled the background back off every silhouette by FLATNESS
    # pixels. Regrow by exactly that much, constrained to white, so the cut
    # lands on the true edge again — the narrow passages stay sealed because
    # the regrowth is bounded and cannot travel their length.
    background = core
    for _ in range(FLATNESS):
        background = _dilate(background) & white

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

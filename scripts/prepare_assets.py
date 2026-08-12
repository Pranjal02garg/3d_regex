"""
Turn the existing phone photographs into a usable product image system.

The source files are hand-held shots of bottle pairs standing on a laminate
desk. They are the only photography that exists, so the job here is not
retouching for its own sake — it is removing everything that is not the
product (desk, wall, colour cast, inconsistent scale) so that five separate
snapshots read as one shelf.

Pipeline per product:
  1. crop to the tuned bottle box
  2. GrabCut the bottles off the background, refine the mask, feather it
  3. trim to alpha, then scale so every bottle lands at the same cap height
  4. emit transparent PNG (1x/2x) + a card composite with a contact shadow
  5. emit macro label crops for the PDP detail gallery

Run:  python3 scripts/prepare_assets.py
"""

from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

SRC = Path(
    "/Users/pranjalgarg/Desktop/untitled folder/final_site/regex_remedies/public/assets"
)
ROOT = Path(__file__).resolve().parents[1]
OUT_PRODUCTS = ROOT / "public" / "products"
OUT_LABELS = ROOT / "public" / "labels"
OUT_BRAND = ROOT / "public" / "brand"
DEBUG = ROOT / "public" / "_debug"

for d in (OUT_PRODUCTS, OUT_LABELS, OUT_BRAND, DEBUG):
    d.mkdir(parents=True, exist_ok=True)

PAPER = (250, 247, 241)

# Crop boxes are inherited from the previous build; they were tuned by hand
# against these exact frames.  `label` is the region of the front label used
# for the macro detail shots.
PRODUCTS = [
    {
        "key": "livgex",
        "crop": (170, 470, 945, 1500),
        "label": (195, 1075, 500, 1360),
        "seal": (210, 795, 440, 1035),
    },
    {
        "key": "lucogex",
        "crop": (140, 380, 1100, 1492),
        "label": (640, 940, 1070, 1255),
        "seal": (435, 725, 660, 965),
    },
    {
        "key": "kabzraj",
        "crop": (135, 445, 1100, 1512),
        "label": (600, 995, 1045, 1345),
        "seal": (795, 765, 1010, 1005),
    },
    {
        "key": "gasogex",
        "crop": (355, 360, 840, 1449),
        "label": (345, 945, 865, 1235),
        "seal": (420, 735, 645, 975),
    },
    {
        "key": "pilegex",
        "crop": (140, 395, 1060, 1424),
        "label": (595, 855, 1045, 1145),
        "seal": (620, 655, 845, 895),
    },
]

# Every bottle is scaled so the silhouette is this tall. This single number
# is what makes five unrelated snapshots line up as a range.
TARGET_H = 1500


def grabcut_alpha(rgb: np.ndarray, iters: int = 7) -> np.ndarray:
    """Separate product from desk/wall. Returns a 0..255 alpha channel."""
    h, w = rgb.shape[:2]
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)

    mask = np.zeros((h, w), np.uint8)
    inset_x, inset_y = int(w * 0.02), int(h * 0.02)
    rect = (inset_x, inset_y, w - 2 * inset_x, h - 2 * inset_y)

    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(bgr, mask, rect, bgd, fgd, iters, cv2.GC_INIT_WITH_RECT)

    # Second pass. The rect init alone cannot tell a dark bottle from the dark
    # laminate it stands on, so seed the corners — which are always desk or
    # wall, never product — as definite background and let the colour model
    # learn the surface properly.
    seeded = mask.copy()
    ring = max(3, int(min(h, w) * 0.02))
    seeded[:ring, :] = cv2.GC_BGD
    seeded[-ring:, :] = cv2.GC_BGD
    seeded[:, :ring] = cv2.GC_BGD
    seeded[:, -ring:] = cv2.GC_BGD

    corner_h, corner_w = int(h * 0.10), int(w * 0.14)
    seeded[-corner_h:, :corner_w] = cv2.GC_BGD
    seeded[-corner_h:, -corner_w:] = cv2.GC_BGD
    seeded[:corner_h, :corner_w] = cv2.GC_BGD
    seeded[:corner_h, -corner_w:] = cv2.GC_BGD

    # A narrow column through the middle is always bottle.
    seeded[int(h * 0.25) : int(h * 0.75), int(w * 0.46) : int(w * 0.54)] = cv2.GC_FGD

    cv2.grabCut(bgr, seeded, None, bgd, fgd, 4, cv2.GC_INIT_WITH_MASK)
    mask = seeded

    binary = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(
        np.uint8
    )

    # Close pinholes in the label, then drop anything that is not part of the
    # main silhouette (desk speckle, reflections on the wall).
    binary = cv2.morphologyEx(
        binary, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))
    )
    binary = cv2.morphologyEx(
        binary, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    )

    n, labels, stats, _ = cv2.connectedComponentsWithStats(binary, 8)
    if n > 1:
        areas = stats[1:, cv2.CC_STAT_AREA]
        biggest = areas.max()
        keep = np.zeros_like(binary)
        for i, area in enumerate(areas, start=1):
            # Keep the second bottle too — it is a comparable blob.
            if area > biggest * 0.18:
                keep[labels == i] = 255
        binary = keep

    # Fill enclosed holes so translucent label areas do not punch through.
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filled = np.zeros_like(binary)
    cv2.drawContours(filled, contours, -1, 255, cv2.FILLED)

    # A bottle standing on a surface has a wide, flat base. Anything trailing
    # below it is a sliver of desk or a shadow that survived the matte, so
    # walk up from the bottom until the silhouette is properly wide again and
    # clip everything under that line.
    rows = (filled > 0).sum(axis=1)
    if rows.max() > 0:
        threshold = rows.max() * 0.35
        for y in range(filled.shape[0] - 1, -1, -1):
            if rows[y] >= threshold:
                filled[y + 1 :, :] = 0
                break

    # A 1.2px feather kills the jagged matte edge that makes a cut-out read
    # as a cut-out.
    return cv2.GaussianBlur(filled, (0, 0), 1.2)


def normalise(img: Image.Image) -> Image.Image:
    """Neutralise the warm indoor cast and lift the flat phone contrast."""
    img = ImageEnhance.Color(img).enhance(0.94)
    img = ImageEnhance.Contrast(img).enhance(1.10)
    img = ImageEnhance.Brightness(img).enhance(1.04)
    return img


def trim_alpha(img: Image.Image, pad: int = 8) -> Image.Image:
    bbox = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    return img.crop(
        (max(0, l - pad), max(0, t - pad), min(img.width, r + pad), min(img.height, b + pad))
    )


def contact_shadow(canvas: Image.Image, cutout: Image.Image, pos: tuple[int, int]) -> None:
    """
    An ellipse under the bottles, not a drop shadow behind them. A product
    photographed on a surface has a contact shadow that is dense where the
    object meets the surface and diffuse further out; two stacked ellipses
    approximate that convincingly.
    """
    x, y = pos
    w, h = cutout.size
    cx = x + w // 2
    base_y = y + h

    for spread, opacity, blur in ((0.46, 46, 26), (0.30, 62, 12)):
        layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(layer)
        rx = int(w * spread)
        ry = max(6, int(h * 0.028 * (spread / 0.46)))
        draw.ellipse(
            (cx - rx, base_y - ry, cx + rx, base_y + ry),
            fill=(28, 40, 33, opacity),
        )
        canvas.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def build_product(p: dict) -> dict:
    key = p["key"]
    full = Image.open(SRC / f"{key}.jpg").convert("RGB")

    crop = normalise(full.crop(p["crop"]))
    alpha = grabcut_alpha(np.array(crop))

    cut = crop.convert("RGBA")
    cut.putalpha(Image.fromarray(alpha))
    cut = trim_alpha(cut)

    # Uniform scale across the range.
    scale = TARGET_H / cut.height
    cut = cut.resize((max(1, round(cut.width * scale)), TARGET_H), Image.Resampling.LANCZOS)

    cut.save(OUT_PRODUCTS / f"{key}.png")
    cut.resize(
        (max(1, cut.width // 2), cut.height // 2), Image.Resampling.LANCZOS
    ).save(OUT_PRODUCTS / f"{key}@1x.png")

    # Card composite: product standing on paper with a real contact shadow.
    card_w, card_h = 1200, 1500
    canvas = Image.new("RGBA", (card_w, card_h), PAPER + (255,))
    fit = min((card_h * 0.74) / cut.height, (card_w * 0.76) / cut.width)
    placed = cut.resize(
        (max(1, round(cut.width * fit)), max(1, round(cut.height * fit))),
        Image.Resampling.LANCZOS,
    )
    px = (card_w - placed.width) // 2
    py = int(card_h * 0.80) - placed.height
    contact_shadow(canvas, placed, (px, py))
    canvas.alpha_composite(placed, (px, py))
    canvas.convert("RGB").save(OUT_PRODUCTS / f"{key}-card.jpg", quality=90, optimize=True)

    # Macro detail crops for the PDP gallery — real label copy, legible.
    for name, box in (("label", p["label"]), ("seal", p["seal"])):
        det = normalise(full.crop(box))
        det = det.resize(
            (1000, max(1, round(det.height * 1000 / det.width))), Image.Resampling.LANCZOS
        )
        det.save(OUT_LABELS / f"{key}-{name}.jpg", quality=88, optimize=True)

    coverage = float((np.array(alpha) > 128).mean())
    return {"key": key, "cutout": cut.size, "coverage": round(coverage, 3)}


def build_logo() -> None:
    """Lift the emblem off its pale-green plate into a transparent mark."""
    logo = Image.open(SRC / "logo.jpg").convert("RGB")
    arr = np.array(logo).astype(np.int16)

    # The plate is a light desaturated green; the mark is near-black.
    luminance = arr.mean(axis=2)
    mark = (luminance < 150).astype(np.uint8) * 255
    mark = cv2.morphologyEx(
        mark, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    )
    mark = cv2.GaussianBlur(mark, (0, 0), 0.6)

    size = 512
    for name, rgb in (("emblem-ink", (16, 32, 26)), ("emblem-paper", (250, 247, 241))):
        solid = Image.new("RGBA", logo.size, rgb + (255,))
        solid.putalpha(Image.fromarray(mark))
        solid = trim_alpha(solid, pad=2)
        s = size / max(solid.size)
        solid.resize(
            (round(solid.width * s), round(solid.height * s)), Image.Resampling.LANCZOS
        ).save(OUT_BRAND / f"{name}.png")


def build_icons() -> None:
    """Favicon + OG card, drawn from the tokens rather than a screenshot."""
    for size in (32, 180, 512):
        img = Image.new("RGBA", (size, size), (16, 32, 26, 255))
        emblem = Image.open(OUT_BRAND / "emblem-paper.png").convert("RGBA")
        pad = int(size * 0.16)
        inner = size - pad * 2
        s = inner / max(emblem.size)
        emblem = emblem.resize(
            (max(1, round(emblem.width * s)), max(1, round(emblem.height * s))),
            Image.Resampling.LANCZOS,
        )
        img.alpha_composite(emblem, ((size - emblem.width) // 2, (size - emblem.height) // 2))
        img.save(OUT_BRAND / f"icon-{size}.png")

    Image.open(OUT_BRAND / "icon-32.png").save(ROOT / "app" / "favicon.ico", sizes=[(32, 32)])

    # Open Graph card: paper ground, the range, the positioning line.
    og = Image.new("RGB", (1200, 630), PAPER)
    canvas = og.convert("RGBA")
    x = 96
    for p in PRODUCTS:
        cut = Image.open(OUT_PRODUCTS / f"{p['key']}.png").convert("RGBA")
        s = 380 / cut.height
        cut = cut.resize((max(1, round(cut.width * s)), 380), Image.Resampling.LANCZOS)
        pos = (x, 210)
        contact_shadow(canvas, cut, pos)
        canvas.alpha_composite(cut, pos)
        x += cut.width + 18
    canvas.convert("RGB").save(OUT_BRAND / "og-range.jpg", quality=88, optimize=True)


def main() -> None:
    report = [build_product(p) for p in PRODUCTS]
    build_logo()
    build_icons()

    # Contact sheet so the mattes can be eyeballed in one look.
    sheet = Image.new("RGB", (5 * 420, 560), PAPER)
    for i, p in enumerate(PRODUCTS):
        cut = Image.open(OUT_PRODUCTS / f"{p['key']}.png").convert("RGBA")
        s = min(400 / cut.width, 500 / cut.height)
        cut = cut.resize(
            (max(1, round(cut.width * s)), max(1, round(cut.height * s))),
            Image.Resampling.LANCZOS,
        )
        bg = Image.new("RGBA", cut.size, (255, 0, 255, 255))  # magenta shows matte holes
        bg.alpha_composite(cut)
        sheet.paste(bg.convert("RGB"), (i * 420 + 10, 30))
    sheet.save(DEBUG / "contact-sheet.jpg", quality=86)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()

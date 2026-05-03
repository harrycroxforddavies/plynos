"""Generate PNG renders of the Plynos brand assets for use in the PDF proposal.

ReportLab cannot embed SVG directly without optional system libraries
(cairo/svglib), so this script reads the source SVGs and rasterises them
into PNGs that ReportLab can drop into the PDF via drawImage.

Outputs (proposals/assets/):
  - plynos-icon.png    — the Plynos icon glyph, gradient blue
  - concept-1.png      — blue to navy gradient tile
  - concept-2.png      — navy to slate gradient tile
  - concept-3.png      — teal to blue gradient tile
  - concept-4.png      — concept-1 + faint hairline grid (clean variant for proposals)

Sources live in public/concepts/ and public/plynos.svg.
"""

from __future__ import annotations

import os
import re
from typing import List, Tuple

import numpy as np
from PIL import Image, ImageDraw

PROPOSALS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(PROPOSALS_DIR)
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
ASSETS_DIR = os.path.join(PROPOSALS_DIR, "assets")
LOGO_SVG = os.path.join(PUBLIC_DIR, "plynos.svg")

# Brand colours (CLAUDE.md tokens)
BLUE = (11, 95, 255)       # #0B5FFF
BLUE_LIGHT = (38, 123, 255)
NAVY = (11, 18, 32)        # #0B1220
SLATE = (91, 100, 114)     # #5B6472
TEAL = (20, 184, 166)      # #14B8A6


# ---------------------------------------------------------------------------
# Gradient panels
# ---------------------------------------------------------------------------

def linear_gradient(w: int, h: int, c1, c2, angle_deg: float = 135) -> Image.Image:
    """RGBA gradient image. angle 135° goes from top-left to bottom-right."""
    a = np.radians(angle_deg)
    dx, dy = np.cos(a), np.sin(a)
    xs = np.arange(w, dtype=np.float32)[None, :].repeat(h, axis=0)
    ys = np.arange(h, dtype=np.float32)[:, None].repeat(w, axis=1)
    t = xs * dx + ys * dy
    t = (t - t.min()) / (t.max() - t.min() + 1e-9)
    c1 = np.array(c1, dtype=np.float32)
    c2 = np.array(c2, dtype=np.float32)
    rgb = c1[None, None, :] + (c2 - c1)[None, None, :] * t[..., None]
    alpha = np.full((h, w, 1), 255, dtype=np.float32)
    rgba = np.concatenate([rgb, alpha], axis=-1).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def _radial_glow(size: int, max_alpha: int = 30) -> Image.Image:
    """Soft white radial highlight, brightest at centre, fading to transparent."""
    cx = cy = size / 2
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32)
    dist = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2)
    t = np.clip(1 - dist / (size * 0.55), 0, 1)
    alpha = (t ** 2 * max_alpha).astype(np.uint8)
    rgba = np.dstack([
        np.full_like(alpha, 255),
        np.full_like(alpha, 255),
        np.full_like(alpha, 255),
        alpha,
    ])
    return Image.fromarray(rgba, "RGBA")


def render_concept(out_path: str, c1, c2, with_grid: bool = False, size: int = 1000):
    img = linear_gradient(size, size, c1, c2, angle_deg=135)
    if with_grid:
        # subtle 2x2 hairline grid + soft centre highlight, matches concept-4
        # but without the third-party brand wordmarks (proposal, not blog).
        img = Image.alpha_composite(img, _radial_glow(size, max_alpha=30))
        d = ImageDraw.Draw(img, "RGBA")
        line = (255, 255, 255, 38)  # ~15% white
        d.line([(40, size // 2), (size - 40, size // 2)], fill=line, width=2)
        d.line([(size // 2, 40), (size // 2, size - 40)], fill=line, width=2)
    img.save(out_path, "PNG", optimize=True)


# ---------------------------------------------------------------------------
# Plynos icon: parse the SVG path, rasterise as a polygon with gradient fill
# ---------------------------------------------------------------------------

PathPoints = List[Tuple[float, float]]


def _sample_cubic(p0, p1, p2, p3, steps: int = 24) -> PathPoints:
    out: PathPoints = []
    for s in range(1, steps + 1):
        t = s / steps
        u = 1 - t
        x = (u ** 3) * p0[0] + 3 * (u ** 2) * t * p1[0] + 3 * u * (t ** 2) * p2[0] + (t ** 3) * p3[0]
        y = (u ** 3) * p0[1] + 3 * (u ** 2) * t * p1[1] + 3 * u * (t ** 2) * p2[1] + (t ** 3) * p3[1]
        out.append((x, y))
    return out


def _parse_path(d: str) -> PathPoints:
    """Sample an SVG path (M, L, C, Z only) into a polygon point list."""
    tokens = re.findall(r"[MLCZmlcz]|-?\d+(?:\.\d+)?", d)
    pts: PathPoints = []
    cur = (0.0, 0.0)
    start = (0.0, 0.0)
    i = 0
    while i < len(tokens):
        cmd = tokens[i]
        if cmd in "Mm":
            i += 1
            x, y = float(tokens[i]), float(tokens[i + 1])
            i += 2
            if cmd == "m" and pts:
                x += cur[0]
                y += cur[1]
            cur = (x, y)
            start = cur
            pts.append(cur)
            while i < len(tokens) and tokens[i] not in "MLCZmlcz":
                x, y = float(tokens[i]), float(tokens[i + 1])
                i += 2
                if cmd == "m":
                    x += cur[0]
                    y += cur[1]
                cur = (x, y)
                pts.append(cur)
        elif cmd in "Ll":
            i += 1
            while i < len(tokens) and tokens[i] not in "MLCZmlcz":
                x, y = float(tokens[i]), float(tokens[i + 1])
                i += 2
                if cmd == "l":
                    x += cur[0]
                    y += cur[1]
                cur = (x, y)
                pts.append(cur)
        elif cmd in "Cc":
            i += 1
            while i < len(tokens) and tokens[i] not in "MLCZmlcz":
                x1, y1 = float(tokens[i]), float(tokens[i + 1])
                x2, y2 = float(tokens[i + 2]), float(tokens[i + 3])
                x, y = float(tokens[i + 4]), float(tokens[i + 5])
                i += 6
                if cmd == "c":
                    x1 += cur[0]; y1 += cur[1]
                    x2 += cur[0]; y2 += cur[1]
                    x += cur[0]; y += cur[1]
                pts.extend(_sample_cubic(cur, (x1, y1), (x2, y2), (x, y)))
                cur = (x, y)
        elif cmd in "Zz":
            i += 1
            cur = start
        else:
            i += 1
    return pts


def render_logo(out_path: str, size: int = 512):
    with open(LOGO_SVG, "r") as f:
        svg = f.read()
    # The plynos.svg has a single <path d="..."> inside the visible clipPath.
    # Find the *visible* path (the one inside <g clip-path...>), not the
    # clipPath's own helper paths. The visible one uses the gradient fill.
    # Both the clipPath helper and the visible rect use almost the same data;
    # picking the longest "d=" attribute reliably yields the actual P glyph.
    path_matches = re.findall(r'd="([^"]+)"', svg)
    if not path_matches:
        raise RuntimeError("No path found in plynos.svg")
    d = max(path_matches, key=len)

    pts = _parse_path(d)

    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    w_glyph = maxx - minx
    h_glyph = maxy - miny

    pad = size * 0.06
    scale = (size - 2 * pad) / max(w_glyph, h_glyph)
    off_x = (size - w_glyph * scale) / 2 - minx * scale
    off_y = (size - h_glyph * scale) / 2 - miny * scale
    scaled = [(p[0] * scale + off_x, p[1] * scale + off_y) for p in pts]

    # Polygon mask (with anti-aliasing via supersampling)
    ss = 4
    big = size * ss
    big_pts = [(p[0] * ss, p[1] * ss) for p in scaled]
    mask_big = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask_big).polygon(big_pts, fill=255)
    mask = mask_big.resize((size, size), Image.LANCZOS)

    grad = linear_gradient(size, size, BLUE_LIGHT, BLUE, angle_deg=135)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(grad, (0, 0), mask)
    out.save(out_path, "PNG", optimize=True)


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

def build_assets(force: bool = False):
    os.makedirs(ASSETS_DIR, exist_ok=True)
    targets = [
        ("plynos-icon.png", lambda p: render_logo(p, size=512)),
        ("concept-1.png",   lambda p: render_concept(p, BLUE, NAVY)),
        ("concept-2.png",   lambda p: render_concept(p, NAVY, SLATE)),
        ("concept-3.png",   lambda p: render_concept(p, TEAL, BLUE)),
        ("concept-4.png",   lambda p: render_concept(p, BLUE, NAVY, with_grid=True)),
    ]
    for fname, fn in targets:
        out = os.path.join(ASSETS_DIR, fname)
        if force or not os.path.exists(out):
            fn(out)
            print(f"wrote {out}")


if __name__ == "__main__":
    build_assets(force=True)

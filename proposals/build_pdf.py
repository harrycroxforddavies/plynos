"""Generate a PDF version of the Plynos website creation proposal.

Designed to mirror the public site at plynos.dev:
  - Plus Jakarta Sans (the only font on the site) loaded from proposals/fonts/
  - Brand tokens from CLAUDE.md (navy, blue, slate, soft blue)
  - Sentence case throughout. No all-caps, no em-dashes, no en-dashes.
  - Tone matches the site: direct, lower-key, no agency phrasing.

Conversion arc, in order:
  1. Cover               - what this is, who it is for
  2. What this is        - the offer in plain language
  3. What you get        - the build, itemised
  4. How it is built     - principles that shape the work
  5. Investment          - one price, two stages
  6. Timeline            - kick-off to launch
  7. What I need         - small list of inputs from the client
  8. Not included        - scope guard, in the open
  9. Saying yes          - five steps to start, plus contact
"""

from __future__ import annotations

import os
from dataclasses import dataclass

from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from render_assets import build_assets, ASSETS_DIR

# Make sure brand asset PNGs exist before we try to draw them.
build_assets()
LOGO_PNG  = os.path.join(ASSETS_DIR, "plynos-icon.png")
CONCEPT_1 = os.path.join(ASSETS_DIR, "concept-1.png")  # blue → navy
CONCEPT_2 = os.path.join(ASSETS_DIR, "concept-2.png")  # navy → slate
CONCEPT_3 = os.path.join(ASSETS_DIR, "concept-3.png")  # teal → blue
CONCEPT_4 = os.path.join(ASSETS_DIR, "concept-4.png")  # blue → navy + hairline grid

# Brand tokens (CLAUDE.md)
NAVY = HexColor("#0B1220")
BLUE = HexColor("#0B5FFF")
SLATE = HexColor("#5B6472")
SOFT_BLUE = HexColor("#EAF2FF")
WHITE = HexColor("#FFFFFF")
INK = HexColor("#0B1220")
HAIRLINE = HexColor("#E5E7EB")
MUTED_LIGHT = HexColor("#9CA3AF")
MUTED_ON_NAVY = HexColor("#8A93A6")
SUBTLE = HexColor("#F5F7FA")
NAVY_2 = HexColor("#121B2D")
NAVY_HAIR = HexColor("#1F2937")

# Page = 13.333" x 7.5" at 72 DPI (16:9 widescreen)
PAGE_W = 13.333 * 72
PAGE_H = 7.5 * 72
PAGE_SIZE = (PAGE_W, PAGE_H)

# ---------------------------------------------------------------------------
# Fonts: Plus Jakarta Sans, falling back to Helvetica if the TTFs are missing.
# ---------------------------------------------------------------------------

FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

def _register_fonts():
    files = {
        "Jakarta":          "PlusJakartaSans-Regular.ttf",
        "Jakarta-Medium":   "PlusJakartaSans-Medium.ttf",
        "Jakarta-SemiBold": "PlusJakartaSans-SemiBold.ttf",
        "Jakarta-Bold":     "PlusJakartaSans-Bold.ttf",
    }
    ok = True
    for name, fname in files.items():
        path = os.path.join(FONT_DIR, fname)
        if not os.path.exists(path):
            ok = False
            break
        try:
            pdfmetrics.registerFont(TTFont(name, path))
        except Exception:
            ok = False
            break
    return ok


_HAS_JAKARTA = _register_fonts()

if _HAS_JAKARTA:
    BODY = "Jakarta"
    MED = "Jakarta-Medium"
    HEAD = "Jakarta-SemiBold"
    STRONG = "Jakarta-Bold"
else:
    BODY = "Helvetica"
    MED = "Helvetica"
    HEAD = "Helvetica-Bold"
    STRONG = "Helvetica-Bold"


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def x(inches):
    return inches * 72


def y(inches):
    """Convert top-anchored inches to ReportLab bottom-anchored points."""
    return PAGE_H - inches * 72


def rect(c, ax, ay, w, h, fill=None, stroke=None, stroke_w=0.5):
    if fill is not None:
        c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(stroke_w)
    c.rect(x(ax), y(ay + h), x(w), x(h),
           fill=1 if fill else 0, stroke=1 if stroke else 0)


def hairline(c, ax, ay, w, color=HAIRLINE, h=0.01):
    rect(c, ax, ay, w, h, fill=color)


def text(c, s, ax, ay, *, font=BODY, size=12, color=INK, w=None, align="left"):
    c.setFillColor(color)
    c.setFont(font, size)
    baseline_y = y(ay) - size * 0.8

    if align == "center" and w is not None:
        c.drawCentredString(x(ax + w / 2), baseline_y, s)
    elif align == "right" and w is not None:
        c.drawRightString(x(ax + w), baseline_y, s)
    else:
        c.drawString(x(ax), baseline_y, s)


def text_block(c, lines, ax, ay, *, font=BODY, size=12, color=INK,
               w, line_height=1.5, para_after=6):
    """Wrap and render multi-line paragraphs."""
    c.setFillColor(color)
    c.setFont(font, size)
    leading = size * line_height

    cur_y = y(ay) - size * 0.8
    available = x(w)

    for line in lines:
        words = line.split()
        wrapped = []
        cur = ""
        for word in words:
            test_str = (cur + " " + word).strip()
            if c.stringWidth(test_str, font, size) <= available:
                cur = test_str
            else:
                if cur:
                    wrapped.append(cur)
                cur = word
        if cur:
            wrapped.append(cur)

        for w_line in wrapped:
            c.drawString(x(ax), cur_y, w_line)
            cur_y -= leading

        cur_y -= para_after


# ---------------------------------------------------------------------------
# Page chrome
# ---------------------------------------------------------------------------

@dataclass
class ProposalConfig:
    client_business_name: str
    client_contact_name: str
    client_industry: str
    date: str


def image(c, path, ax, ay, w, h, *, preserve_aspect=True):
    """drawImage in our top-anchored inches coordinate system."""
    c.drawImage(path, x(ax), y(ay + h), x(w), x(h),
                mask="auto", preserveAspectRatio=preserve_aspect)


def brand_mark(c, ax, ay, *, size=0.32):
    """The Plynos icon. The icon is the only logo; no wordmark."""
    image(c, LOGO_PNG, ax, ay, size, size)


def header_chrome(c, page_label=None):
    brand_mark(c, 0.6, 0.4, size=0.32)
    if page_label:
        text(c, page_label, 13.333 - 4.0, 0.55, font=MED, size=10,
             color=SLATE, align="right", w=3.4)


def footer_chrome(c, cfg):
    hairline(c, 0.6, 7.5 - 0.55, 13.333 - 1.2, color=HAIRLINE)
    text(c, "Plynos · Website creation proposal",
         0.6, 7.5 - 0.42, font=BODY, size=9, color=SLATE)
    text(c, f"Prepared for {cfg.client_business_name} · {cfg.date}",
         13.333 - 4.6, 7.5 - 0.42, font=BODY, size=9, color=SLATE,
         align="right", w=4.0)


def page_eyebrow(c, number, label):
    """Small hairline + 'NN  Label' eyebrow under the page chrome."""
    text(c, number, 0.6, 1.4, font=HEAD, size=11, color=BLUE)
    text(c, label, 1.0, 1.4, font=MED, size=11, color=SLATE)


# ---------------------------------------------------------------------------
# Slides
# ---------------------------------------------------------------------------

def cover(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)

    brand_mark(c, 0.6, 0.55, size=0.5)

    # Concept tile on the right — the brand mood, square.
    image(c, CONCEPT_4, 7.7, 1.4, 5.0, 5.0)

    text(c, "Proposal", 0.6, 2.55, font=MED, size=13, color=BLUE)
    rect(c, 0.6, 2.9, 0.5, 0.03, fill=BLUE)

    text(c, "A custom website",   0.6, 3.05, font=HEAD, size=46, color=INK)
    text(c, "for your business,", 0.6, 3.85, font=HEAD, size=46, color=INK)
    text(c, "built fast.",         0.6, 4.65, font=HEAD, size=46, color=BLUE)

    text(c, "No template feel. Clean handover, fully owned by you.",
         0.6, 5.55, font=BODY, size=14, color=SLATE)

    hairline(c, 0.6, 7.5 - 1.0, 13.333 - 1.2)
    text(c, f"Prepared for  {cfg.client_business_name}",
         0.6, 7.5 - 0.85, font=MED, size=11, color=INK)
    text(c, f"By  Harry Davies · Plynos · {cfg.date}",
         13.333 - 5.4, 7.5 - 0.85, font=BODY, size=11,
         color=SLATE, align="right", w=4.8)


def what_this_is(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "01 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "01", "What this is")

    text(c, "A clean, custom website,", 0.6, 1.95, font=HEAD, size=44, color=INK)
    text(c, "built around what you actually do.",
         0.6, 2.65, font=HEAD, size=44, color=INK)

    text_block(
        c,
        [
            f"A custom-built website for {cfg.client_business_name}, designed around what the business actually does. Not a template. Not a starter theme dressed up. A site built from the ground up so it matches your brand and the way you sell.",
            "It loads fast on a phone, reads well to a first-time visitor, and makes the next step (call, message, book) the obvious thing to do. Clean copy, clean code, full handover. You own it after launch. No retainer. No lock-in.",
        ],
        0.6, 3.6, font=BODY, size=14, color=SLATE,
        w=11.5, line_height=1.55, para_after=10,
    )

    pillars = [
        ("Custom",  "Built around your services, not a template."),
        ("Fast",    "Light pages, quick to load, easy on mobile."),
        ("Yours",   "Clean handover. No retainer, no lock-in."),
    ]
    sx, sy = 0.6, 5.5
    col_w, gap = 3.9, 0.2
    for i, (title, body) in enumerate(pillars):
        ax = sx + i * (col_w + gap)
        rect(c, ax, sy, 0.4, 0.04, fill=BLUE)
        text(c, title, ax, sy + 0.2, font=HEAD, size=16, color=INK)
        text_block(c, [body], ax, sy + 0.65, font=BODY, size=12,
                   color=SLATE, w=col_w - 0.2, line_height=1.45, para_after=0)

    footer_chrome(c, cfg)


def what_you_get(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "02 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "02", "What you get")

    text(c, "What you get", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, f"The standard build, designed around {cfg.client_business_name}.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    items = [
        ("Homepage",            "A focused first page that explains what you do, fast."),
        ("Services section",    "What you offer, written in plain language."),
        ("About section",       "A short, credible introduction to the business."),
        ("Contact section",     "Phone, email, address, plus a simple form that works."),
        ("Mobile-first design", "Built for phones first, then scaled up. Most visitors arrive on mobile."),
        ("Sensible SEO setup",  "Clean titles, descriptions, and structure so the site can be found."),
        ("Fast-loading pages",  "Light code and optimised images so nothing drags."),
        ("Domain and hosting",  "Help choosing, connecting, and going live with your domain."),
        ("One round of revisions", "A pass of adjustments before launch so you sign off happy."),
    ]
    col_w = 5.95
    row_h = 0.7
    gap_x = 0.2
    sx = 0.6
    sy = 3.1
    for i, (title, body) in enumerate(items):
        col = i % 2
        row = i // 2
        ax = sx + col * (col_w + gap_x)
        ay = sy + row * (row_h + 0.04)
        hairline(c, ax, ay + row_h, col_w)
        rect(c, ax, ay + 0.13, 0.28, 0.28, fill=SOFT_BLUE)
        text(c, "+", ax, ay + 0.05, font=HEAD, size=14, color=BLUE,
             w=0.28, align="center")
        text(c, title, ax + 0.5, ay + 0.12, font=HEAD, size=13, color=INK)
        text(c, body, ax + 0.5, ay + 0.42, font=BODY, size=10.5, color=SLATE)

    footer_chrome(c, cfg)


def how_its_built(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "03 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "03", "How it is built")

    text(c, "How it is built", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, "Six principles that shape every page from sketch to launch.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    items = [
        ("01", "Simple structure",
         "A clean layout that does not fight for attention. Information is easy to find."),
        ("02", "Direct copy",
         "Plain, confident language that explains what you do without filler."),
        ("03", "Mobile-first",
         "Designed for the phone first, then scaled up. That is how most visitors will see it."),
        ("04", "Contact-led",
         "Every page makes the next step (call, message, enquire) the obvious one."),
        ("05", "Clean code",
         "Light pages, modern stack, sensible structure. Fast to load, easy to maintain."),
        ("06", "Built around you",
         "Designed around your real services, your real customers, your real brand."),
    ]
    col_w = 4.0
    row_h = 1.7
    gap = 0.15
    sx = 0.6
    sy = 3.1
    for i, (num, title, body) in enumerate(items):
        col = i % 3
        row = i // 3
        ax = sx + col * (col_w + gap)
        ay = sy + row * (row_h + 0.15)
        rect(c, ax, ay, col_w, row_h, fill=SUBTLE)
        text(c, num, ax + 0.35, ay + 0.35, font=HEAD, size=12, color=BLUE)
        text(c, title, ax + 0.35, ay + 0.7, font=HEAD, size=17, color=INK)
        text_block(c, [body], ax + 0.35, ay + 1.15, font=BODY, size=11.5,
                   color=SLATE, w=col_w - 0.7, line_height=1.4, para_after=0)

    footer_chrome(c, cfg)


def investment(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "04 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "04", "Investment")

    text(c, "One clear price", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, "Paid in two simple stages.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    rect(c, 0.6, 3.1, 6.0, 3.5, fill=SOFT_BLUE)
    text(c, "Total", 0.95, 3.4, font=MED, size=12, color=BLUE)
    text(c, "€600", 0.95, 3.75, font=HEAD, size=88, color=INK)
    text(c, "+ VAT if applicable", 0.95, 5.2, font=BODY, size=14, color=SLATE)
    rect(c, 0.95, 5.65, 0.5, 0.03, fill=BLUE)
    text(c, "Includes design, development, setup, and launch support.",
         0.95, 5.8, font=BODY, size=12, color=INK)

    text(c, "Payment schedule", 7.0, 3.1, font=HEAD, size=14, color=BLUE)

    rows = [
        ("Deposit to begin", "€300", "Paid before work starts."),
        ("Final payment",    "€300", "Paid before the site goes live."),
    ]
    yy = 3.55
    for label, amt, sub in rows:
        hairline(c, 7.0, yy, 5.7)
        text(c, label, 7.0, yy + 0.3, font=HEAD, size=16, color=INK)
        text(c, sub, 7.0, yy + 0.75, font=BODY, size=12, color=SLATE)
        text(c, amt, 10.7, yy + 0.35, font=HEAD, size=20, color=INK,
             align="right", w=2.0)
        yy += 1.2
    hairline(c, 7.0, yy, 5.7)

    text(c, "Total", 7.0, yy + 0.3, font=HEAD, size=14, color=INK)
    text(c, "€600 + VAT", 10.0, yy + 0.3, font=HEAD, size=18, color=BLUE,
         align="right", w=2.7)

    footer_chrome(c, cfg)


def timeline(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "05 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "05", "Timeline")

    text(c, "From kick-off to launch", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, "Usually inside one working week, sometimes faster.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    steps = [
        ("Day 0",   "Kick-off",      "Content and deposit received."),
        ("Day 2-4", "Initial draft", "First design draft delivered for review."),
        ("Day 4-6", "Revisions",     "One to three days of adjustments."),
        ("Day 5-7", "Launch",        "Site goes live. Handover complete."),
    ]
    track_y = 4.1
    track_left = 1.8
    track_right = 13.333 - 1.8
    track_w = track_right - track_left
    rect(c, track_left, track_y, track_w, 0.04, fill=HAIRLINE)
    n = len(steps)
    spacing_x = track_w / (n - 1)
    for i, (when, title, body) in enumerate(steps):
        cx = track_left + i * spacing_x
        dot_d = 0.28
        rect(c, cx - dot_d / 2, track_y - dot_d / 2 + 0.02, dot_d, dot_d, fill=BLUE)
        text(c, when, cx - 1.0, 3.25, font=HEAD, size=11, color=BLUE,
             align="center", w=2.0)
        text(c, title, cx - 1.4, 3.55, font=HEAD, size=16, color=INK,
             align="center", w=2.8)
        text(c, body, cx - 1.4, 4.55, font=BODY, size=11, color=SLATE,
             align="center", w=2.8)

    rect(c, 0.6, 5.85, 13.333 - 1.2, 0.7, fill=SUBTLE)
    text(c, "Timing depends on how quickly business information, images, and feedback are provided.",
         0.85, 6.07, font=BODY, size=12, color=SLATE)

    footer_chrome(c, cfg)


def what_i_need(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "06 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "06", "What I need from you")

    text(c, "What I need from you",
         0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, f"A short list. The faster these arrive, the faster {cfg.client_business_name} goes live.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    items = [
        ("Business name",          "The official name as it should appear on the site."),
        ("Logo",                   "If you have one. We can work without it if not."),
        ("Main services",          "What you offer, in your own words."),
        ("Short description",      "A few lines about who you are and what you do."),
        ("Contact details",        "Phone, email, address, and any social profiles."),
        ("Preferred style",        "Optional. Any colours, fonts, or sites you like the feel of."),
        ("Photos and images",      "Anything you would like featured. Optional."),
        ("Domain access",          "If you already own a domain, the registrar or login."),
    ]
    col_w = 5.95
    row_h = 0.75
    gap_x = 0.2
    sx = 0.6
    sy = 3.2
    for i, (title, body) in enumerate(items):
        col = i % 2
        row = i // 2
        ax = sx + col * (col_w + gap_x)
        ay = sy + row * row_h
        hairline(c, ax, ay + row_h - 0.05, col_w)
        rect(c, ax, ay + 0.22, 0.18, 0.18, fill=BLUE)
        text(c, title, ax + 0.4, ay + 0.15, font=HEAD, size=13, color=INK)
        text(c, body, ax + 0.4, ay + 0.45, font=BODY, size=11, color=SLATE)

    rect(c, 0.6, 6.3, 13.333 - 1.2, 0.5, fill=SOFT_BLUE)
    text(c, "No copy yet? Simple website copy can be drafted as part of the build.",
         0.85, 6.42, font=HEAD, size=12, color=BLUE)

    footer_chrome(c, cfg)


def not_included(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "07 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "07", "Not included")

    text(c, "What is not included", 0.6, 2.0, font=HEAD, size=36, color=INK)
    text_block(
        c,
        ["To keep the price clear, the items below sit outside the standard build. Any of them can be added on request, quoted separately."],
        0.6, 2.65, font=BODY, size=13, color=SLATE, w=11.5,
        line_height=1.5, para_after=0,
    )

    items = [
        "Paid advertising",
        "Advanced SEO campaigns",
        "Ongoing edits after launch",
        "Professional photography",
        "Complex booking systems",
        "E-commerce functionality",
        "Custom software development",
        "Monthly hosting or domain fees, unless agreed",
        "Legal policies, unless legal text is provided",
    ]
    rect(c, 0.6, 3.55, 13.333 - 1.2, 3.0, fill=WHITE, stroke=HAIRLINE, stroke_w=0.75)
    cols = 2
    inner_pad = 0.4
    col_w = (13.333 - 1.2 - inner_pad * 2) / cols
    row_h = 0.5
    for i, label in enumerate(items):
        col = i % cols
        row = i // cols
        ax = 0.6 + inner_pad + col * col_w
        ay = 3.75 + row * (row_h + 0.05)
        rect(c, ax, ay + 0.27, 0.18, 0.04, fill=SLATE)
        text(c, label, ax + 0.4, ay + 0.18, font=HEAD, size=13, color=INK)

    text(c, "Everything in this list can be added later. Prices for additional work are quoted separately.",
         0.6, 6.7, font=BODY, size=12, color=SLATE)

    footer_chrome(c, cfg)


def saying_yes(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "08 of 08")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)
    page_eyebrow(c, "08", "Saying yes")

    text(c, "From here to a live site", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, "Five short steps. Two of them are mine.",
         0.6, 2.65, font=BODY, size=14, color=SLATE)

    steps = [
        ("1", "You confirm",         "A quick yes by email or WhatsApp."),
        ("2", "Deposit invoice",     "A €300 deposit invoice is sent over."),
        ("3", "You send your details", "Business info, images, any preferences."),
        ("4", "First draft",         "Initial design draft within 2 to 4 business days."),
        ("5", "Revisions and launch", "Final adjustments, then the site goes live."),
    ]
    sy = 3.25
    for i, (num, title, body) in enumerate(steps):
        ay = sy + i * 0.55
        rect(c, 0.6, ay, 0.42, 0.42, fill=SOFT_BLUE)
        text(c, num, 0.6, ay + 0.1, font=HEAD, size=14, color=BLUE,
             align="center", w=0.42)
        text(c, title, 1.2, ay + 0.1, font=HEAD, size=15, color=INK)
        text(c, body, 5.8, ay + 0.13, font=BODY, size=13, color=SLATE)

    rect(c, 0.6, 6.1, 13.333 - 1.2, 0.85, fill=SOFT_BLUE)
    text(c, "Once accepted, work can begin as soon as the deposit has cleared.",
         0.85, 6.37, font=HEAD, size=15, color=INK)
    rect(c, 10.65, 6.37, 1.8, 0.4, fill=BLUE)
    text(c, "Ready to start", 10.65, 6.45, font=HEAD, size=10, color=WHITE,
         align="center", w=1.8)

    footer_chrome(c, cfg)


def closing(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)

    brand_mark(c, 0.6, 0.55, size=0.5)

    image(c, CONCEPT_1, 7.7, 1.4, 5.0, 5.0)

    text(c, "Get in touch.", 0.6, 2.95, font=HEAD, size=64, color=INK)
    rect(c, 0.6, 4.05, 0.5, 0.04, fill=BLUE)

    text_block(
        c,
        [
            f"If anything in this proposal needs to flex around {cfg.client_business_name}, just say. The shape of the work can move with what is actually useful.",
            "Otherwise, a quick yes by email or WhatsApp is enough to begin.",
        ],
        0.6, 4.25, font=BODY, size=13, color=SLATE, w=6.8,
        line_height=1.65, para_after=12,
    )

    # Contact card sits in the lower-left, below the body.
    rect(c, 0.6, 6.05, 6.8, 0.85, fill=SOFT_BLUE)
    text(c, "Contact", 0.85, 6.2, font=HEAD, size=10, color=BLUE)
    text(c, "Harry Davies · Plynos", 0.85, 6.45, font=HEAD, size=14, color=INK)
    text(c, "harry@plynos.dev  ·  plynos.dev",
         0.85, 6.72, font=BODY, size=11, color=SLATE)

    hairline(c, 0.6, 7.5 - 0.55, 13.333 - 1.2)
    text(c, "Plynos · Website creation proposal",
         0.6, 7.5 - 0.42, font=BODY, size=9, color=SLATE)
    text(c, f"Prepared for {cfg.client_business_name} · {cfg.date}",
         13.333 - 4.6, 7.5 - 0.42, font=BODY, size=9, color=SLATE,
         align="right", w=4.0)


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

def build_pdf(cfg, output_path):
    c = canvas.Canvas(output_path, pagesize=PAGE_SIZE)
    c.setTitle("Website creation proposal")
    c.setAuthor("Harry Davies / Plynos")

    pages = [
        cover, what_this_is, what_you_get, how_its_built,
        investment, timeline, what_i_need, not_included,
        saying_yes, closing,
    ]
    for fn in pages:
        fn(c, cfg)
        c.showPage()
    c.save()


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))

    cfg = ProposalConfig(
        client_business_name="[Client Business Name]",
        client_contact_name="[Client Contact Name]",
        client_industry="[Client Industry]",
        date="[Date]",
    )
    out = os.path.join(here, "website_creation_offer_[client_name].pdf")
    build_pdf(cfg, out)
    print("PDF written:", out)

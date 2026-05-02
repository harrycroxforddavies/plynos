"""Generate a PDF version of the Plynos website creation proposal.

Mirrors the slide design from build_proposal.py using ReportLab so the user has
both PPTX and PDF deliverables. Run after build_proposal.py.
"""

from __future__ import annotations

import os
from dataclasses import dataclass

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Brand
NAVY = HexColor("#0B1220")
BLUE = HexColor("#0B5FFF")
SLATE = HexColor("#5B6472")
SOFT_BLUE = HexColor("#EAF2FF")
WHITE = HexColor("#FFFFFF")
INK = HexColor("#0B1220")
HAIRLINE = HexColor("#E5E7EB")
MUTED = HexColor("#9CA3AF")
SUBTLE = HexColor("#F5F7FA")
NAVY_2 = HexColor("#121B2D")
NAVY_HAIR = HexColor("#1F2937")

# Page = 13.333" x 7.5" at 72 DPI
PAGE_W = 13.333 * 72
PAGE_H = 7.5 * 72
PAGE_SIZE = (PAGE_W, PAGE_H)

# Try Helvetica Neue (system) — ReportLab default fallback handles missing fonts.
HEAD = "Helvetica-Bold"
HEAD_R = "Helvetica"
BODY = "Helvetica"


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


def text(c, s, ax, ay, *, font=BODY, size=12, color=INK, w=None, align="left", anchor="top"):
    c.setFillColor(color)
    c.setFont(font, size)

    # Anchor "top" means ay is the top edge — convert to baseline using ascent ≈ size * 0.8
    baseline_y = y(ay) - size * 0.8

    if align == "center" and w is not None:
        c.drawCentredString(x(ax + w / 2), baseline_y, s)
    elif align == "right" and w is not None:
        c.drawRightString(x(ax + w), baseline_y, s)
    else:
        c.drawString(x(ax), baseline_y, s)


def text_block(c, lines, ax, ay, *, font=BODY, size=12, color=INK, w, line_height=1.4, para_after=4):
    """Wrap and render multi-line paragraphs."""
    c.setFillColor(color)
    c.setFont(font, size)
    leading = size * line_height

    cur_y = y(ay) - size * 0.8
    available = x(w)

    for li, line in enumerate(lines):
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

        cur_y -= para_after  # extra spacing after paragraph


def char_spaced(c, s, ax, ay, *, font=HEAD, size=10, color=INK, char_spacing=2, align="left", w=None):
    """Draw text with character spacing (for eyebrow labels)."""
    spaced = (" " * 0).join(list(s))  # we'll manually space
    # Draw each character with manual offsets
    c.setFillColor(color)
    c.setFont(font, size)

    # Calculate total width
    chars = list(s)
    char_widths = [c.stringWidth(ch, font, size) for ch in chars]
    total_w = sum(char_widths) + char_spacing * (len(chars) - 1)

    if align == "center" and w is not None:
        cur_x = x(ax + w / 2) - total_w / 2
    elif align == "right" and w is not None:
        cur_x = x(ax + w) - total_w
    else:
        cur_x = x(ax)

    baseline_y = y(ay) - size * 0.8
    for ch, ch_w in zip(chars, char_widths):
        c.drawString(cur_x, baseline_y, ch)
        cur_x += ch_w + char_spacing


# ---------------------------------------------------------------------------
# Slides
# ---------------------------------------------------------------------------

@dataclass
class ProposalConfig:
    client_business_name: str
    client_contact_name: str
    client_industry: str
    date: str


def header_chrome(c, page_label=None, dark=False):
    color = WHITE if dark else INK
    sub = MUTED if dark else SLATE
    char_spaced(c, "PLYNOS", 0.6, 0.45, font=HEAD, size=11, color=color, char_spacing=4)
    if page_label:
        char_spaced(c, page_label, 13.333 - 3.6, 0.45, font=HEAD, size=10,
                    color=sub, char_spacing=2, align="right", w=3.0)


def footer_chrome(c, dark=False):
    color = MUTED if dark else SLATE
    line_color = NAVY_HAIR if dark else HAIRLINE
    hairline(c, 0.6, 7.5 - 0.55, 13.333 - 1.2, color=line_color)
    text(c, "Plynos · Website Creation Proposal",
         0.6, 7.5 - 0.42, font=BODY, size=9, color=color)


def cover(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=NAVY)
    rect(c, 0, 0, 0.12, 7.5, fill=BLUE)

    char_spaced(c, "PLYNOS", 0.9, 0.6, font=HEAD, size=11, color=WHITE, char_spacing=4)
    char_spaced(c, "PROPOSAL", 0.9, 2.4, font=HEAD, size=11, color=BLUE, char_spacing=4)

    text(c, "Website Creation", 0.9, 2.85, font=HEAD, size=64, color=WHITE)
    text(c, "Proposal", 0.9, 3.85, font=HEAD, size=64, color=WHITE)

    rect(c, 0.9, 5.15, 0.6, 0.04, fill=BLUE)
    text(c, f"Prepared for {cfg.client_business_name}", 0.9, 5.4,
         font=HEAD_R, size=20, color=WHITE)

    rect(c, 0.9, 7.5 - 1.0, 13.333 - 1.8, 0.01, fill=NAVY_HAIR)
    text(c, "Prepared by  Harry Davies · Plynos", 0.9, 7.5 - 0.85,
         font=BODY, size=11, color=MUTED)
    text(c, cfg.date, 13.333 - 4.9, 7.5 - 0.85, font=BODY, size=11,
         color=MUTED, align="right", w=4.0)


def objective(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "01 / OBJECTIVE")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    char_spaced(c, "OBJECTIVE", 0.6, 1.5, font=HEAD, size=11, color=BLUE, char_spacing=4)
    text(c, "A clean, modern website", 0.6, 2.0, font=HEAD, size=40, color=INK)
    text(c, "that works as hard", 0.6, 2.65, font=HEAD, size=40, color=INK)
    text(c, "as the business does.", 0.6, 3.3, font=HEAD, size=40, color=INK)

    text_block(
        c,
        [
            f"The goal is to design and build a website for {cfg.client_business_name} that presents the business clearly, builds trust with customers, and makes it easy for them to get in touch.",
            "It should look good on any device, load quickly, and be simple enough that a first-time visitor immediately understands what you do and how to contact you.",
            "Nothing flashy. Nothing complicated. Just a well-built site that does its job, every day.",
        ],
        8.0, 2.05, font=BODY, size=13, color=SLATE, w=4.8, line_height=1.5, para_after=8,
    )

    footer_chrome(c)


def why(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "02 / WHY THIS MATTERS")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "Why this matters", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c, "Three practical reasons a professional site pays for itself.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    cards = [
        ("01", "Customers check first",
         "Most people look up a business online before they call, message, or visit. A clear, professional site is often the first impression they get."),
        ("02", "A site builds trust",
         "A simple, well-built website signals that the business is real, established, and serious. It reassures customers before they ever pick up the phone."),
        ("03", "One central home",
         "Services, contact details, photos, and credibility, all in one place that you control, not scattered across social profiles or directory listings."),
    ]
    col_w = 3.95
    gap = 0.2
    start_x = 0.6
    top = 2.9
    for i, (num, title, body) in enumerate(cards):
        ax = start_x + i * (col_w + gap)
        rect(c, ax, top, col_w, 3.6, fill=WHITE, stroke=HAIRLINE, stroke_w=0.75)
        text(c, num, ax + 0.4, top + 0.45, font=HEAD, size=28, color=BLUE)
        rect(c, ax + 0.4, top + 1.15, 0.4, 0.03, fill=INK)
        text(c, title, ax + 0.4, top + 1.3, font=HEAD, size=18, color=INK)
        text_block(c, [body], ax + 0.4, top + 2.0, font=BODY, size=12, color=SLATE,
                   w=col_w - 0.8, line_height=1.5, para_after=0)

    footer_chrome(c)


def package(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "03 / PACKAGE")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "What's included", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c, f"The standard package, designed around {cfg.client_business_name}.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    items = [
        ("Homepage / landing page", "A focused first page that explains what you do at a glance."),
        ("Services section", "A clear breakdown of what you offer, written in plain language."),
        ("About section", "A short, credible introduction to the business and the people behind it."),
        ("Contact section", "Phone, email, address, and a simple contact form, easy to use."),
        ("Mobile-friendly design", "Built to work and feel right on phones, tablets, and desktops."),
        ("Basic SEO setup", "Sensible page titles, descriptions, and structure so your site can be found."),
        ("Fast-loading structure", "Clean code and optimised images so pages open quickly."),
        ("Domain and hosting guidance", "Help choosing and connecting a domain, and getting it live."),
        ("Pre-launch revisions", "A round of adjustments before launch so you're happy with the result."),
    ]
    col_w = 5.95
    row_h = 0.78
    gap_x = 0.2
    sx = 0.6
    sy = 2.65
    for i, (title, body) in enumerate(items):
        col = i % 2
        row = i // 2
        ax = sx + col * (col_w + gap_x)
        ay = sy + row * (row_h + 0.04)
        hairline(c, ax, ay + row_h, col_w)
        rect(c, ax, ay + 0.13, 0.28, 0.28, fill=SOFT_BLUE)
        text(c, "✓", ax, ay + 0.17, font=HEAD, size=13, color=BLUE,
             w=0.28, align="center")
        text(c, title, ax + 0.5, ay + 0.12, font=HEAD, size=13, color=INK)
        text(c, body, ax + 0.5, ay + 0.42, font=BODY, size=10.5, color=SLATE)

    footer_chrome(c)


def approach(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "04 / APPROACH")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "How the site is designed and built", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c,
         f"Six principles guide the work, from first sketch to launch day for {cfg.client_industry} clients.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    items = [
        ("01", "Simple structure",
         "A clean layout that doesn't fight for attention. Information is easy to find."),
        ("02", "Clear messaging",
         "Plain, confident copy that explains what you do without jargon or filler."),
        ("03", "Mobile-first",
         "Designed for the phone first, then scaled up. That's how most people will see it."),
        ("04", "Contact-focused",
         "Every page is built to make getting in touch the obvious next step."),
        ("05", "Easy to read",
         "Generous spacing, strong hierarchy, and copy your customers will actually understand."),
        ("06", "Built around you",
         "Designed around your real services, your real customers, your real brand."),
    ]
    col_w = 4.0
    row_h = 1.95
    gap = 0.15
    sx = 0.6
    sy = 2.85
    for i, (num, title, body) in enumerate(items):
        col = i % 3
        row = i // 3
        ax = sx + col * (col_w + gap)
        ay = sy + row * (row_h + 0.15)
        rect(c, ax, ay, col_w, row_h, fill=SUBTLE)
        text(c, num, ax + 0.35, ay + 0.35, font=HEAD, size=12, color=BLUE)
        text(c, title, ax + 0.35, ay + 0.75, font=HEAD, size=17, color=INK)
        text_block(c, [body], ax + 0.35, ay + 1.2, font=BODY, size=11.5, color=SLATE,
                   w=col_w - 0.7, line_height=1.4, para_after=0)

    footer_chrome(c)


def investment(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "05 / INVESTMENT")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "Project investment", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c, "One clear price. Paid in two simple stages.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    rect(c, 0.6, 2.85, 6.0, 3.7, fill=NAVY)
    char_spaced(c, "TOTAL", 0.95, 3.15, font=HEAD, size=11, color=MUTED, char_spacing=4)
    text(c, "€600", 0.95, 3.6, font=HEAD, size=92, color=WHITE)
    text(c, "+ VAT if applicable", 0.95, 5.1, font=BODY, size=14, color=MUTED)
    rect(c, 0.95, 5.55, 0.5, 0.03, fill=BLUE)
    text(c, "Includes design, development, setup, and launch support.",
         0.95, 5.7, font=BODY, size=12, color=WHITE)

    char_spaced(c, "PAYMENT SCHEDULE", 7.0, 2.85, font=HEAD, size=11, color=BLUE, char_spacing=4)

    rows = [
        ("Deposit to begin", "€300", "Paid before work starts."),
        ("Final payment", "€300", "Paid before the site goes live."),
    ]
    yy = 3.4
    for label, amt, sub in rows:
        hairline(c, 7.0, yy, 5.7)
        text(c, label, 7.0, yy + 0.3, font=HEAD, size=16, color=INK)
        text(c, sub, 7.0, yy + 0.75, font=BODY, size=12, color=SLATE)
        text(c, amt, 10.7, yy + 0.35, font=HEAD, size=20, color=INK,
             align="right", w=2.0)
        yy += 1.35
    hairline(c, 7.0, yy, 5.7)

    text(c, "Total", 7.0, yy + 0.3, font=HEAD, size=14, color=INK)
    text(c, "€600 + VAT", 10.0, yy + 0.3, font=HEAD, size=18, color=BLUE,
         align="right", w=2.7)

    footer_chrome(c)


def timeline(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "06 / TIMELINE")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "Estimated timeline", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c, "From kick-off to launch, usually within 5–7 business days.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    steps = [
        ("Day 0", "Kick-off", "Content and deposit received."),
        ("Day 2–4", "Initial draft", "First design draft delivered for review."),
        ("Day 4–6", "Revisions", "1–3 business days of adjustments and refinements."),
        ("Day 5–7", "Launch", "Site goes live, handover complete."),
    ]
    track_y = 3.85
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
        char_spaced(c, when, cx - 1.0, 2.95, font=HEAD, size=11, color=BLUE,
                    char_spacing=3, align="center", w=2.0)
        text(c, title, cx - 1.4, 3.35, font=HEAD, size=16, color=INK,
             align="center", w=2.8)
        text_block(c, [body], cx - 1.4, 4.25, font=BODY, size=12, color=SLATE,
                   w=2.8, line_height=1.4, para_after=0)
        # ReportLab text_block left-aligns; we draw centred manually for one-line bodies
        # Just overdraw
        rect(c, cx - 1.4, 4.25, 2.8, 0.5, fill=WHITE)
        text(c, body, cx - 1.4, 4.25, font=BODY, size=11, color=SLATE,
             align="center", w=2.8)

    rect(c, 0.6, 5.85, 13.333 - 1.2, 0.65, fill=SUBTLE)
    text(c, "Timing depends on how quickly business information, images, and feedback are provided.",
         0.85, 6.05, font=BODY, size=12, color=SLATE)

    footer_chrome(c)


def what_i_need(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "07 / WHAT I NEED")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, f"What I need from {cfg.client_business_name}",
         0.6, 1.4, font=HEAD, size=32, color=INK)
    text(c, "A short list. The faster these arrive, the faster the site goes live.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    items = [
        ("Business name", "The official name as you'd like it shown on the site."),
        ("Logo", "If you have one. We can work without it if not."),
        ("Main services", "What you offer, in your own words."),
        ("Short business description", "A few lines about who you are and what you do."),
        ("Contact details", "Phone, email, address, and any social profiles."),
        ("Preferred colours / style", "Optional. Any references or examples you like."),
        ("Photos / images", "Anything you'd like featured. Optional."),
        ("Domain access", "If you already own a domain, the login or registrar."),
    ]
    col_w = 5.95
    row_h = 0.85
    gap_x = 0.2
    sx = 0.6
    sy = 2.85
    for i, (title, body) in enumerate(items):
        col = i % 2
        row = i // 2
        ax = sx + col * (col_w + gap_x)
        ay = sy + row * row_h
        hairline(c, ax, ay + row_h - 0.05, col_w)
        rect(c, ax, ay + 0.22, 0.18, 0.18, fill=BLUE)
        text(c, title, ax + 0.4, ay + 0.15, font=HEAD, size=13, color=INK)
        text(c, body, ax + 0.4, ay + 0.45, font=BODY, size=11, color=SLATE)

    rect(c, 0.6, 6.5, 13.333 - 1.2, 0.5, fill=SOFT_BLUE)
    text(c, "No written content yet? Simple website copy can be drafted for you as part of the package.",
         0.85, 6.62, font=HEAD, size=12, color=BLUE)

    footer_chrome(c)


def scope(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "08 / SCOPE")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "Not included unless agreed separately",
         0.6, 1.4, font=HEAD, size=32, color=INK)
    text_block(
        c,
        ["To keep the package clean and the price clear, the items below sit outside the standard scope. Any of them can be added on request."],
        0.6, 2.05, font=BODY, size=13, color=SLATE, w=11.5, line_height=1.5, para_after=0,
    )

    items = [
        "Paid advertising",
        "Advanced SEO campaigns",
        "Ongoing edits after launch",
        "Professional photography",
        "Complex booking systems",
        "E-commerce functionality",
        "Custom software development",
        "Monthly hosting / domain fees unless agreed",
        "Legal policies unless legal text is provided",
    ]
    rect(c, 0.6, 3.0, 13.333 - 1.2, 3.4, fill=WHITE, stroke=HAIRLINE, stroke_w=0.75)
    cols = 2
    inner_pad = 0.4
    col_w = (13.333 - 1.2 - inner_pad * 2) / cols
    row_h = 0.55
    for i, label in enumerate(items):
        col = i % cols
        row = i // cols
        ax = 0.6 + inner_pad + col * col_w
        ay = 3.2 + row * (row_h + 0.05)
        rect(c, ax, ay + 0.27, 0.18, 0.04, fill=SLATE)
        text(c, label, ax + 0.4, ay + 0.18, font=HEAD, size=13, color=INK)

    text(c, "Anything in this list can be added later. Prices for additional work are quoted separately.",
         0.6, 6.55, font=BODY, size=12, color=SLATE)

    footer_chrome(c)


def next_steps(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=WHITE)
    header_chrome(c, "09 / NEXT STEPS")
    hairline(c, 0.6, 1.0, 13.333 - 1.2)

    text(c, "Next steps", 0.6, 1.4, font=HEAD, size=34, color=INK)
    text(c, "From acceptance to a live website, in five short steps.",
         0.6, 2.05, font=BODY, size=14, color=SLATE)

    steps = [
        ("1", "Confirm acceptance", "By email or WhatsApp, whichever is easier."),
        ("2", "Deposit invoice", "A €300 deposit invoice is sent over."),
        ("3", "Send your details", "Business information, images, and any preferences."),
        ("4", "First draft", "Initial design draft within 2–4 business days."),
        ("5", "Revisions and launch", "Final adjustments, then the site goes live."),
    ]
    sy = 2.95
    for i, (num, title, body) in enumerate(steps):
        ay = sy + i * 0.6
        rect(c, 0.6, ay, 0.42, 0.42, fill=NAVY)
        text(c, num, 0.6, ay + 0.1, font=HEAD, size=14, color=WHITE,
             align="center", w=0.42)
        text(c, title, 1.2, ay + 0.1, font=HEAD, size=15, color=INK)
        text(c, body, 5.8, ay + 0.13, font=BODY, size=13, color=SLATE)

    rect(c, 0.6, 6.05, 13.333 - 1.2, 0.85, fill=NAVY)
    text(c, "Once accepted, work can begin as soon as the deposit has been received.",
         0.85, 6.32, font=HEAD, size=15, color=WHITE)
    rect(c, 10.65, 6.32, 1.8, 0.4, fill=BLUE)
    text(c, "Ready to start", 10.65, 6.4, font=HEAD, size=10, color=WHITE,
         align="center", w=1.8)

    footer_chrome(c)


def closing(c, cfg):
    rect(c, 0, 0, 13.333, 7.5, fill=NAVY)
    rect(c, 0, 0, 0.12, 7.5, fill=BLUE)
    char_spaced(c, "PLYNOS", 0.9, 0.6, font=HEAD, size=11, color=WHITE, char_spacing=4)

    text(c, "Thank you.", 0.9, 2.6, font=HEAD, size=72, color=WHITE)
    rect(c, 0.9, 4.2, 0.6, 0.04, fill=BLUE)

    text_block(
        c,
        [
            f"If anything in this proposal needs adjusting for {cfg.client_business_name}, just say. The shape of the work can flex around what's actually useful.",
            "Otherwise, a quick yes by email or WhatsApp is enough to begin.",
        ],
        0.9, 4.4, font=BODY, size=13, color=WHITE, w=7.9, line_height=1.6, para_after=10,
    )

    rect(c, 9.3, 4.4, 3.4, 1.9, fill=NAVY_2, stroke=NAVY_HAIR)
    char_spaced(c, "CONTACT", 9.55, 4.55, font=HEAD, size=10, color=BLUE, char_spacing=4)
    text(c, "Harry Davies", 9.55, 4.85, font=HEAD, size=16, color=WHITE)
    text(c, "Plynos", 9.55, 5.2, font=BODY, size=12, color=MUTED)
    text(c, "plynos.dev", 9.55, 5.55, font=BODY, size=12, color=WHITE)
    text(c, "harrycroxforddavies@gmail.com", 9.55, 5.85, font=BODY, size=11, color=WHITE)

    text(c, f"Prepared for {cfg.client_business_name} · {cfg.date}",
         0.9, 7.5 - 0.7, font=BODY, size=10, color=MUTED)


def build_pdf(cfg, output_path):
    c = canvas.Canvas(output_path, pagesize=PAGE_SIZE)
    c.setTitle("Website Creation Proposal")
    c.setAuthor("Harry Davies / Plynos")

    for fn in [cover, objective, why, package, approach, investment,
               timeline, what_i_need, scope, next_steps, closing]:
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

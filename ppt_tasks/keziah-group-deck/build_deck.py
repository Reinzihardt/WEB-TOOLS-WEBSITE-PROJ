"""Build the Keziah Group presentation in a bold editorial style.

Run from any directory with the project's pptx_designer environment. The
editable PowerPoint is written to the project root unless
KEZIAH_DECK_OUTPUT points to another path.
"""

import os
from pathlib import Path

from pptx.util import Inches
from pptx_designer import Presentation, validate_resolved_theme
from pptx_designer.renderer.theme import ThemeComposer
from pptx_designer.tools.shapes import rect
from pptx_designer.tools.text import text


# Brand tokens taken from ForPresent/style.css.
INK = "#131210"
STONE = "#e9e4d8"
CREAM = "#f7f3dc"
GOLD = "#c9a96e"
OLIVE = "#3b4a2b"
INK_2 = "#1b1a17"

DISPLAY = "Cormorant Garamond"
SANS = "Montserrat"

COLORS = {
    "background": INK,
    "surface": INK_2,
    "card": INK_2,
    "card_bg": INK_2,
    "text_body": CREAM,
    "text_muted": CREAM,
    "ink": CREAM,
    "text_dark": INK,
    "border": CREAM,
    "divider": CREAM,
    "primary": GOLD,
    "accent": GOLD,
    "on_primary": INK,
    "secondary": OLIVE,
    "success": OLIVE,
    "warning": GOLD,
    "danger": GOLD,
    "font_heading": DISPLAY,
    "font_body": SANS,
    "font_mono": SANS,
}

theme = ThemeComposer().compose(style="minimalism-swiss-style", seed=7)
theme["colors"].update({
    "primary": GOLD,
    "on-primary": INK,
    "secondary": OLIVE,
    "accent": GOLD,
    "background": INK,
    "foreground": CREAM,
    "muted": INK_2,
    "muted-foreground": CREAM,
    "border": CREAM,
    "destructive": GOLD,
})
theme["typography"]["heading"] = DISPLAY
theme["typography"]["body"] = SANS
theme["dark_mode"] = True
theme["semantic_roles"].update({
    "background": INK,
    "surface": STONE,
    "ink": CREAM,
    "muted": CREAM,
    "accent": GOLD,
    "accent-secondary": OLIVE,
    "success": OLIVE,
    "warning": GOLD,
    "danger": GOLD,
    "border": CREAM,
    "data-series-1": GOLD,
    "data-series-2": OLIVE,
})
validate_resolved_theme(theme)

prs = Presentation(theme=theme, strict_theme=True)
BLANK = prs.slide_layouts[6]
WIDTH = prs.slide_width / 914400
HEIGHT = prs.slide_height / 914400
MARGIN = 0.72


def add_text(slide, x, y, w, h, value, size=18, color=INK, font=SANS,
             bold=False, align="left", anchor="top"):
    """Place editable text with explicit, high-contrast type settings."""
    return text(
        slide, x, y, w, h, value,
        font_size=size,
        color=color,
        bold=bold,
        align=align,
        font_name=font,
        C=COLORS,
        anchor=anchor,
    )


def add_rect(slide, x, y, w, h, fill, line=None):
    return rect(slide, x, y, w, h, fill=fill, line=line, C=COLORS)


def add_rule(slide, x, y, w, color=INK, thickness=0.014):
    add_rect(slide, x, y, w, thickness, color)


def new_slide(bg):
    slide = prs.slides.add_slide(BLANK)
    add_rect(slide, 0, 0, WIDTH, HEIGHT, bg)
    return slide


def add_notes(slide, value):
    slide.notes_slide.notes_text_frame.text = value


def accent_bullet(slide, x, y, value, width, color=INK, size=18):
    add_rect(slide, x, y + 0.18, 0.14, 0.045, GOLD)
    add_text(slide, x + 0.32, y, width - 0.32, 0.82, value,
             size=size, color=color, font=SANS)


def screenshot_frame(slide, x, y, w, h, label, dark=False):
    bg = INK_2 if dark else STONE
    ink = CREAM if dark else INK
    add_rect(slide, x, y, w, h, bg, line=ink)
    add_text(slide, x + 0.18, y + h / 2 - 0.38, w - 0.36, 0.42,
             label, size=20, color=ink, font=SANS, bold=True, align="center")


def slide_title(slide, value, color=INK, x=MARGIN, y=0.56, w=11.9,
                size=48, align="left"):
    add_text(slide, x, y, w, 0.88, value, size=size, color=color,
             font=DISPLAY, bold=True, align=align)


# ---------------------------------------------------------------------------
# 1. Title
s = new_slide(INK)
add_text(s, 0.8, 2.05, WIDTH - 1.6, 1.25, "Keziah Group", size=68,
         color=CREAM, font=DISPLAY, bold=True, align="center")
add_text(s, 1.0, 3.45, WIDTH - 2.0, 0.55,
         "SMDC Staycation & Property Management Website", size=24,
         color=CREAM, font=SANS, align="center")
add_rule(s, 2.55, 5.93, WIDTH - 5.1, GOLD, 0.018)
add_text(s, 0.55, 6.22, WIDTH - 1.1, 0.45,
         "Delmon  ·  Bautista  ·  Dela Cruz  ·  Siblero  ·  Barroquillo    |    I-DCSAD · Group 4",
         size=17, color=CREAM, font=SANS, align="center")
add_notes(s, "Delmon: Welcome. We are I-DCSAD Group 4. This is the Keziah Group website for SMDC staycations and property management. "
             "We built the presentation version with HTML and CSS. Each member will introduce one part of the site.")


# ---------------------------------------------------------------------------
# 2. Project overview: asymmetric statement + evidence
s = new_slide(STONE)
add_text(s, 0.82, 1.28, 5.75, 0.9, "2 Properties.", size=52,
         color=INK, font=DISPLAY, bold=True)
add_text(s, 0.82, 2.25, 5.75, 0.9, "6 Units.", size=52,
         color=INK, font=DISPLAY, bold=True)
add_text(s, 0.82, 3.22, 5.95, 1.35, "1 Booking Flow.", size=52,
         color=INK, font=DISPLAY, bold=True)
add_rect(s, 6.78, 1.2, 0.025, 5.05, GOLD)
overview_points = [
    "Field Residences in Sucat and Shore 3 Tower 2 near MOA.",
    "Six furnished stays, priced from ₱2,200 to ₱2,900 per night.",
    "Guests browse, compare, then request their dates.",
    "Hosts manage bookings, unit details, and homepage text.",
]
for index, point in enumerate(overview_points):
    accent_bullet(s, 7.25, 1.32 + index * 1.18, point, 5.25, color=INK, size=19)
add_notes(s, "Delmon: Keziah Group manages six units across Field Residences in Sucat and Shore 3 Tower 2 near MOA. "
             "Guests can browse rooms, compare the two properties, and request dates. The admin pages organize bookings and content for the host team.")


# ---------------------------------------------------------------------------
# 3. Design concept: palette and typography specimen
s = new_slide(STONE)
slide_title(s, "Color, type, restraint.")
swatches = [INK, STONE, CREAM, GOLD, OLIVE]
start_x = 0.77
swatch_w = 2.12
swatch_gap = 0.30
for i, hex_value in enumerate(swatches):
    x = start_x + i * (swatch_w + swatch_gap)
    add_rect(s, x, 1.62, swatch_w, 1.42, hex_value, line=INK)
    add_text(s, x, 3.18, swatch_w, 0.34, hex_value.upper(), size=17,
             color=INK, font=SANS, bold=True, align="center")

add_rule(s, 0.82, 4.0, WIDTH - 1.64, INK, 0.014)
add_text(s, 0.88, 4.26, 3.7, 1.12, "Aa", size=72, color=INK,
         font=DISPLAY, bold=True)
add_text(s, 0.9, 5.48, 4.9, 0.42, "Cormorant Garamond", size=22,
         color=INK, font=SANS, bold=True)
add_text(s, 0.9, 5.98, 4.9, 0.38, "Display headlines", size=18,
         color=INK, font=SANS)
add_text(s, 6.8, 4.28, 4.8, 1.05, "Aa", size=66, color=INK,
         font=SANS, bold=True)
add_text(s, 6.82, 5.48, 4.9, 0.42, "Montserrat", size=22,
         color=INK, font=SANS, bold=True)
add_text(s, 6.82, 5.98, 4.9, 0.38, "Interface and body text", size=18,
         color=INK, font=SANS)
add_notes(s, "Bautista: We carried the website's design tokens into the slides. Ink and stone set the contrast, cream softens dark surfaces, gold marks emphasis, and olive stays secondary. "
             "Cormorant Garamond handles display type. Montserrat handles interface text.")


# ---------------------------------------------------------------------------
# 4. Homepage: callouts beside one large screenshot placeholder
s = new_slide(STONE)
slide_title(s, "Homepage", w=3.1, size=48)
add_rule(s, 0.76, 1.46, 0.8, GOLD, 0.025)
home_callouts = [
    ("Header", "Brand and four links."),
    ("Hero", "Full-width photo and message."),
    ("Units", "Six stays with nightly rates."),
    ("Gallery", "Two CSS-only photo decks."),
]
for i, (heading, detail) in enumerate(home_callouts):
    y = 1.83 + i * 1.18
    add_text(s, 0.78, y, 3.1, 0.36, heading, size=22,
             color=INK, font=DISPLAY, bold=True)
    add_text(s, 0.78, y + 0.39, 3.12, 0.62, detail, size=17,
             color=INK, font=SANS)

screenshot_frame(s, 4.3, 0.65, 8.33, 6.15,
                 "DROP HOME PAGE SCREENSHOT HERE")
add_text(s, 4.55, 6.85, 7.85, 0.35,
         "Figma or ForPresent/index.html capture · 16:10 crop", size=16,
         color=INK, font=SANS, align="center")
add_notes(s, "Delmon: The home page moves from the hero into six unit cards, then a property gallery and comparison, then the reservation fields. "
             "The large frame is reserved for a real capture from Figma or the presentation site.")


# ---------------------------------------------------------------------------
# 5. Page flow: typography and open connectors, no cards
s = new_slide(STONE)
slide_title(s, "One public site. Three host tools.")
flow = [
    ("Public Site", "index.html", "Browse stays"),
    ("Admin Portal", "", "Host entry"),
    ("Dashboard", "", "Booking status"),
    ("Reservations", "", "Stay management"),
    ("CMS", "", "Edit content"),
]
node_x = 0.72
node_w = 2.1
arrow_w = 0.35
gap = 0.35
for i, (heading, filename, desc) in enumerate(flow):
    x = node_x + i * (node_w + gap)
    add_text(s, x, 2.75, node_w, 0.42, heading, size=21,
             color=INK, font=DISPLAY, bold=True, align="center")
    if filename:
        add_text(s, x, 3.2, node_w, 0.34, filename, size=17,
                 color=INK, font=SANS, align="center")
    add_text(s, x, 3.82, node_w, 0.42, desc, size=16,
             color=INK, font=SANS, align="center")
    if i < len(flow) - 1:
        ax = x + node_w + 0.015
        add_text(s, ax, 2.77, arrow_w, 0.45, "→", size=25,
                 color=GOLD, font=SANS, bold=True, align="center")
add_rule(s, 0.86, 2.28, WIDTH - 1.72, INK, 0.014)
add_notes(s, "Dela Cruz: The guest-facing site lives in index.html. Its Admin Portal link opens the host area. "
             "The portal separates booking status, reservation management, and editable site content across three pages.")


# ---------------------------------------------------------------------------
# 6. Responsive design: three proportional capture frames
s = new_slide(INK)
slide_title(s, "Responsive by design.", color=CREAM, size=48)
responsive_frames = [
    (0.9, 2.45, 5.15, 2.9, "DESKTOP  ·  1280px+"),
    (6.45, 2.1, 3.35, 3.25, "TABLET  ·  900px"),
    (10.15, 1.85, 1.8, 3.5, "MOBILE 560px"),
]
for x, y, w, h, label in responsive_frames:
    screenshot_frame(s, x, y, w, h, "DROP", dark=True)
    add_text(s, x - 0.05, 5.62, w + 0.1, 0.48, label, size=16 if w < 2 else 18,
             color=CREAM, font=SANS, bold=True, align="center")
add_text(s, 1.0, 6.55, WIDTH - 2.0, 0.4,
         "Grids stack as the viewport narrows.", size=19,
         color=CREAM, font=DISPLAY, bold=True, align="center")
add_notes(s, "Barroquillo: The layout changes at the 900px and 560px breakpoints. The collection and form stack, the gallery deck changes crop, and the thumbnail row adjusts. "
             "The three frames are placeholders for desktop, tablet, and mobile captures.")


# ---------------------------------------------------------------------------
# 7. AI disclosure: two columns, explicitly tentative
s = new_slide(STONE)
slide_title(s, "How We Used AI", w=8.5)
add_text(s, 9.5, 0.72, 3.0, 0.4, "[TENTATIVE]", size=19,
         color=INK, font=SANS, bold=True, align="right")
add_rule(s, 11.85, 1.18, 0.62, GOLD, 0.025)
add_text(s, 0.82, 1.92, 5.2, 0.55, "Tools & Sample Prompts", size=28,
         color=INK, font=DISPLAY, bold=True)
add_text(s, 6.82, 1.92, 5.65, 0.55,
         "What We Built & Edited Ourselves", size=26,
         color=INK, font=DISPLAY, bold=True)
ai_left = [
    "Tools: [confirm names the group used]",
    "Prompt 1: [paste an actual prompt]",
    "Prompt 2: [paste another actual prompt]",
]
ai_right = [
    "Set the page structure, palette, and final copy.",
    "Selected and matched the 42 real property photos.",
    "Tested layouts and fixed browser issues.",
]
for i, value in enumerate(ai_left):
    accent_bullet(s, 0.9, 2.82 + i * 1.2, value, 5.15, color=INK, size=18)
for i, value in enumerate(ai_right):
    accent_bullet(s, 6.9, 2.82 + i * 1.2, value, 5.45, color=INK, size=18)
add_notes(s, "Siblero: This content is tentative. Confirm the tools and add prompts the group actually used before presenting. "
             "Delmon: The group made the final layout, palette, copy, and image choices. The site uses the project's real property photos.")


# ---------------------------------------------------------------------------
# 8. Member contributions: borderless five-row table
s = new_slide(STONE)
slide_title(s, "Member Contributions", w=8.7)
add_text(s, 9.5, 0.72, 3.0, 0.4, "[TENTATIVE]", size=19,
         color=INK, font=SANS, bold=True, align="right")
add_rule(s, 11.85, 1.18, 0.62, GOLD, 0.025)
headers = [(0.8, 2.1, "MEMBER"), (3.15, 2.35, "FOCUS"),
           (5.75, 5.1, "CONTRIBUTION"), (11.38, 1.2, "SHARE")]
for x, w, value in headers:
    add_text(s, x, 1.72, w, 0.38, value, size=17, color=INK,
             font=SANS, bold=True)
add_rule(s, 0.8, 2.2, 11.78, INK, 0.014)

contributions = [
    ("Delmon", "Main website", "Homepage and visual system"),
    ("Bautista", "Dashboard", "Dashboard and shared admin styles"),
    ("Dela Cruz", "Reservations", "Booking form and reservations page"),
    ("Siblero", "Content studio", "Units, hero text, and image library"),
    ("Barroquillo", "Gallery", "Photo decks and 42-image system"),
]
for i, (member, focus, contribution) in enumerate(contributions):
    y = 2.4 + i * 0.84
    add_text(s, 0.8, y, 2.1, 0.42, member, size=20,
             color=INK, font=DISPLAY, bold=True)
    add_text(s, 3.15, y, 2.35, 0.42, focus, size=18,
             color=INK, font=SANS)
    add_text(s, 5.75, y, 5.1, 0.42, contribution, size=18,
             color=INK, font=SANS)
    add_text(s, 11.55, y, 1.0, 0.42, "20%", size=19,
             color=INK, font=SANS, bold=True, align="right")
    add_rule(s, 0.8, y + 0.57, 11.78, INK, 0.014)
add_notes(s, "Delmon: This division and the equal 20 percent shares need group confirmation. Update the roles if work moved between members before the defense.")


# ---------------------------------------------------------------------------
# 9. Challenges and lessons: two open columns
s = new_slide(STONE)
slide_title(s, "Challenges & Lessons")
add_text(s, 0.82, 1.72, 5.35, 0.62, "What Broke", size=34,
         color=INK, font=DISPLAY, bold=True)
add_text(s, 6.88, 1.72, 5.35, 0.62, "What We Learned", size=34,
         color=INK, font=DISPLAY, bold=True)
add_rect(s, 6.52, 1.8, 0.02, 4.45, GOLD)
broken = [
    "42 image paths had to match exact folders and extensions.",
    "Tabs failed until radio inputs came before their panels.",
    "Without JavaScript, the form cannot save bookings.",
]
learned = [
    "Check image files before wiring paths.",
    "Test CSS states in a browser.",
    "Build the interface now; add behavior next semester.",
]
for i, value in enumerate(broken):
    accent_bullet(s, 0.9, 2.7 + i * 1.15, value, 5.25, color=INK, size=18)
for i, value in enumerate(learned):
    accent_bullet(s, 6.9, 2.7 + i * 1.15, value, 5.3, color=INK, size=18)
add_notes(s, "Each member can name one challenge and one lesson. The exact image paths, CSS-only tab order, and display-only form came from the HTML/CSS-only scope. "
             "Browser testing helped catch layout and selector issues before the presentation.")


# ---------------------------------------------------------------------------
# 10. Demonstration: one title and an inline sequence
s = new_slide(INK)
add_text(s, 0.8, 1.55, WIDTH - 1.6, 1.1, "Live Walkthrough", size=62,
         color=CREAM, font=DISPLAY, bold=True, align="center")
steps = ["index.html", "Dashboard", "Reservations", "CMS"]
step_w = 2.35
arrow_w = 0.6
total_flow = step_w * 4 + arrow_w * 3
start = (WIDTH - total_flow) / 2
for i, value in enumerate(steps):
    x = start + i * (step_w + arrow_w)
    add_text(s, x, 4.12, step_w, 0.58, value, size=22,
             color=CREAM, font=SANS, bold=True, align="center")
    if i < len(steps) - 1:
        add_text(s, x + step_w, 4.1, arrow_w, 0.58, "→", size=27,
                 color=GOLD, font=SANS, bold=True, align="center")
add_notes(s, "Barroquillo leads the live demo. Open index.html, show the homepage and gallery, then move to the dashboard, reservations page, and CMS. "
             "Use the screenshot placeholders if the live pages do not load.")


# ---------------------------------------------------------------------------
# 11. Closing
s = new_slide(INK)
add_text(s, 0.8, 1.62, WIDTH - 1.6, 1.25, "Thank You.", size=76,
         color=GOLD, font=DISPLAY, bold=True, align="center")
add_text(s, 0.8, 3.08, WIDTH - 1.6, 1.0, "Questions?", size=60,
         color=GOLD, font=DISPLAY, bold=True, align="center")
add_rule(s, 4.6, 5.75, WIDTH - 9.2, GOLD, 0.018)
add_text(s, 0.55, 6.12, WIDTH - 1.1, 0.48,
         "Delmon  ·  Bautista  ·  Dela Cruz  ·  Siblero  ·  Barroquillo",
         size=18, color=CREAM, font=SANS, align="center")
add_notes(s, "Delmon: Thank you. All five members can answer questions about the public site, reservations, dashboard, CMS, and gallery.")


project_root = Path(__file__).resolve().parents[2]
output = Path(os.environ.get(
    "KEZIAH_DECK_OUTPUT",
    str(project_root / "Keziah-Group-Presentation.pptx"),
))
output.parent.mkdir(parents=True, exist_ok=True)
prs.save(str(output))
print(f"Saved {output} ({len(prs.slides)} slides)")

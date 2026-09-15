# Design system — JD Construction and Cleaning Services

Every colour below was pixel-sampled from the client's logo, and every
contrast ratio was measured (WCAG 2.1 relative luminance), not estimated.

---

## 1. Palette

Sampled directly from the logo artwork (1260×1260 crest, letterboxing
removed programmatically):

| Token | Hex | Share of artwork | Role |
|---|---|---|---|
| `--navy` | `#113472` | 11.0% | Primary brand. Headlines and body on light grounds. |
| `--red` | `#b90025` | 7.6% | **Urgency only.** Emergency/callout. Never decorative. |
| `--royal` | `#1f4d9f` | 3.9% | Secondary. Links, kickers, icon strokes on light. |
| `--gold` | `#e9c34a` | 2.4% | Accent. See the rule below — it is conditional. |
| `--ink` | `#0a1a3a` | derived | Dark ground. Deepened from the logo's own shadow navy (`#041855`). |
| `--paper` | `#f4f6f9` | derived | Light ground. Cool, not cream — "spotless" is the product. |
| `--mist` | `#e7ecf4` | derived | Banded light sections. |
| `--slate` | `#5a6478` | derived | Secondary text on light. |

### Measured contrast

| Pair | Ratio | Grade |
|---|---|---|
| navy on paper | 11.03 | AAA |
| royal on paper | 7.40 | AAA |
| slate on paper | 5.50 | AA |
| red on paper | 6.28 | AA |
| **gold on paper** | **1.57** | **FAIL** |
| **gold on ink** | **10.12** | **AAA** |
| gold on navy | 7.04 | AAA |
| paper on ink | 15.88 | AAA |
| white on navy | 11.95 | AAA |

### The palette rule (read this before editing any colour)

> **Gold is a fill on light grounds, and text-and-fill on dark grounds.
> Never gold text on paper. Never white text on gold.**

The reasoning, so nobody "fixes" this later: brand gold measures **1.57:1
on our light ground** — it is invisible as text, failing AA by a factor of
three. The same gold measures **10.12:1 on ink navy**, which is AAA with
room to spare. That single measurement is why this site is **dark-first**,
and why the gold you see on light sections is always a bar, a chip, a rule
or an icon fill, never a letterform.

Corollary: on light grounds the eyebrow/kicker text is `--royal`, and the
gold appears only as the 18px rule beside it.

`--red` is held in reserve. It appears on this site in exactly one context
(the emergency/urgent-callout affordance). A construction site that turns
red for marketing has nothing left to say when something is actually wrong.

---

## 2. Typography

**One variable family: Archivo** (`wdth` 62–125, `wght` 100–900).

One download, two voices:

- **Display** — Archivo at `font-stretch: 78%`, weight 700–800, tight
  tracking, uppercase for section kickers. This condensed cut deliberately
  echoes the heavy condensed lettering in the client's own logo banners.
- **Body/UI** — Archivo at normal width, weight 400–600.

Using the width axis rather than a second family means the display face
*rhymes* with the logo instead of competing with it, and costs no extra
network request.

| Token | Value |
|---|---|
| `--text-hero` | `clamp(42px, 7vw, 88px)` |
| `--text-section` | `clamp(32px, 4.6vw, 54px)` |
| `--text-heading` | `clamp(20px, 2vw, 25px)` |
| `--text-body-lg` | `18px` |
| `--text-body` | `16px` |
| `--text-label` | `12px` (uppercase, `0.14em` tracking) |

---

## 3. Spacing & shape

8px base scale: 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.

Radius is deliberately **restrained** — `--radius-card: 4px`,
`--radius-pill: 100px` for buttons only. The category default is
`rounded-2xl` soft cards everywhere (see the clichés below); a 4px radius
reads as built rather than as a SaaS dashboard.

The diamond geometry of the crest is echoed once, as a 45°-rotated gold
square motif in the section kickers — sparingly. Repeating it would turn
the page into the logo.

---

## 4. Motion

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Reveal duration | 620ms |
| Hover/state duration | 200–260ms |

Rules: `transform` and `opacity` only. Every animation ships with its
`prefers-reduced-motion` variant and its no-JS fallback in the same commit.
Content is **visible by default** and only becomes hide-able once an inline
pre-paint script confirms JS is running — a JS failure must never produce a
blank page.

---

## 5. Category clichés — design away from these

Five minutes naming the visual defaults of this category, so we can
actively avoid them.

### Construction/contractor — DON'T
- Navy + safety-orange, hi-vis yellow, hazard diagonals, caution tape
- Hard hats, crossed hammer-and-wrench, shield crests as *decoration*
- Slab-italic "INDUSTRIAL" type; heavy drop shadows and bevels
- Stock photo: men in hard hats pointing at a blueprint

### Cleaning — DON'T
- Sparkles, twinkles, bubbles, aqua-and-lime "fresh" palettes
- Green leaf "eco" badges applied without a real certification
- Smiling model in an apron holding a spray bottle
- Rounded bubbly type that infantilises the work

### Generic home-services template (the supplied inspiration) — DON'T
- `#2563eb` blue on white, `rounded-2xl` cards, circular icon chips
- A hero "search bar" that searches nothing
- "Why Choose Us" as three identical icon + heading + paragraph columns
- Badge row of unverifiable claims: *Trusted Professionals · Upfront
  Pricing · Satisfaction Guaranteed · 24/7 Support*

### DO instead
- Dark-first navy with gold as a scarce, earned accent (the contrast
  measurement demanded this anyway)
- Condensed display type drawn from the client's own logo lettering
- Treat a finish-work business with finish-work design: generous
  whitespace, real hierarchy, restrained radius
- Lead with the one differentiated claim (construction *and* cleaning),
  not a grid of interchangeable virtues
- Let the crest be the only ornament on the page

The through-line: JD's actual argument is *"we hand the place back
spotless."* A finish claim deserves a finished-looking site. That's the
brief.

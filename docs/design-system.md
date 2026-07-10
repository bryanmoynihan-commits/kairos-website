# Kairos Performance — Design System

**Brand:** Kairos Performance  
**URL:** kairosperformance.ai  
**Last updated:** 2026-02-27

---

## 1. Brand Identity

### Visual Philosophy
- **Dark, minimal, premium** — conveys authority and sophistication
- **Anti-"AI slop"** — clean and modern, avoiding generic AI aesthetics (no gradient blobs, no rainbow tech imagery)
- **Operator-grade** — designed to resonate with B2B leadership and operators, not consumers
- **Restrained motion** — animations are subtle and purposeful, never flashy

### Brand Voice (reflected in design)
- Confident but not loud
- Professional but not corporate
- Technical credibility without visual complexity

---

## 2. Color Palette

### Core Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Background** | `#0a0a0a` | `10, 10, 10` | Page background, primary surface |
| **Foreground** | `#f0ede8` | `240, 237, 232` | Primary text, headings, CTA button fill |
| **Muted Text** | `#c0bdb8` | `192, 189, 184` | Body text, paragraphs, descriptions |
| **Card** | `#111111` | `17, 17, 17` | Card backgrounds, input fields, code blocks |
| **Border** | `#1f1f1f` | `31, 31, 31` | Section dividers, card borders, horizontal rules |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Teal/Cyan** | `#2dd4bf` | `45, 212, 191` | Links, scroll progress bar, blockquote borders, step numbers, interactive accents |
| **Teal (translucent)** | `rgba(45, 212, 191, 0.4)` | — | Link underline default state |

### Secondary / UI Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Label text** | `#999999` | Section labels, uppercase eyebrow text |
| **Nav inactive** | `#b0b0b0` | Inactive nav links |
| **Placeholder** | `#555555` | Input placeholders, character counters, list markers |
| **Footer links** | `#666666` | Footer nav text |
| **Hover border** | `#2a2a2a` | Default input borders, scrolled nav border |
| **Focus border** | `#555555` | Input focus state |
| **Active border** | `#333333` | Card hover border |
| **Active border (focus)** | `#444444` | Validated input border |
| **Error** | `red-500` | Form validation errors, required asterisks |

### Key Principle
The foreground color `#f0ede8` is a warm off-white, not pure white. This is intentional — it creates a softer, more premium feel against the near-black background. Pure `#ffffff` white is only used on CTA hover state.

---

## 3. Typography

### Primary Font
- **Font family:** Geist Sans (loaded via `next/font/google`)
- **CSS variable:** `--font-geist-sans`
- **Fallback stack:** `system-ui, sans-serif`
- **Rendering:** antialiased (`-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`)

### Type Scale

| Element | Size | Weight | Line Height | Color | Additional |
|---------|------|--------|-------------|-------|------------|
| **Hero H1** | `5xl` / `6xl` / `7xl` (responsive) | 600 (semibold) | 1.1 | `#f0ede8` | `tracking-tight` |
| **Hero tagline** | `4xl` / `5xl` / `6xl` (responsive) | 700 (bold) | 1.1 | `#f0ede8` | `tracking-tight` |
| **Section H2** | `3xl` / `4xl` (responsive) | 600 (semibold) | snug | `#f0ede8` | — |
| **Card H3** | `lg` (1.125rem) | 600 (semibold) | — | `#f0ede8` | — |
| **Body text** | `base` (1rem) | 400 (normal) | relaxed (1.625) | `#c0bdb8` | — |
| **Card body** | `sm` (0.875rem) | 400 | relaxed | `#c0bdb8` | — |
| **Hero subtitle** | `lg` (1.125rem) | 400 | relaxed | `#c0bdb8` | `max-w-2xl` |
| **Eyebrow labels** | `xs` (0.75rem) | 400 | — | `#999999` | `uppercase tracking-widest` |
| **Nav links** | `base` (1rem) | 400 | — | `#b0b0b0` / `#f0ede8` | — |
| **Logo text** | `base` (1rem) | 600 (semibold) | — | `#f0ede8` | `uppercase tracking-wide` |
| **CTA buttons** | `sm` (0.875rem) | 600 (semibold) | — | `#0a0a0a` (dark on light) | — |
| **Footer text** | `xs` (0.75rem) | 400 | — | `#666666` | — |
| **Step numbers** | `xs` (0.75rem) | 400 | — | `#2dd4bf` | `font-mono` |

### Article / Prose Typography (`.prose-kairos`)

| Element | Size | Weight | Line Height | Margins |
|---------|------|--------|-------------|---------|
| **Prose body** | `1.125rem` | 400 | 1.75 | — |
| **Prose H2** | `1.5em` | 600 | 1.2 | `2em` top, `0.75em` bottom |
| **Prose H3** | `1.25em` | 600 | 1.3 | `1.75em` top, `0.5em` bottom |
| **Prose H4** | `1.1em` | 600 | 1.4 | `1.5em` top, `0.5em` bottom |
| **Prose paragraphs** | — | — | — | `1.25em` top and bottom |
| **Prose strong** | — | 600 | — | Color: `#f0ede8` |
| **Prose code (inline)** | `0.875em` | — | — | `#111` bg, `#1f1f1f` border, `0.2em 0.4em` padding |
| **Prose code block** | `0.875em` | — | 1.7 | `#111` bg, `#1f1f1f` border, `1rem 1.25rem` padding |
| **Prose lists** | — | — | — | `1.625em` left padding, disc/decimal markers |
| **Prose blockquote** | — | italic | — | `3px` left border `#2dd4bf`, `#111111` bg (50% opacity) |

---

## 4. Layout & Spacing

### Container
- **Max width:** `max-w-6xl` (72rem / 1152px)
- **Horizontal padding:** `px-6` (1.5rem)
- **Centered:** `mx-auto`

### Section Structure
- Each section is separated by `border-b border-[#1f1f1f]`
- **Section padding:** `py-20` to `py-24` (5rem to 6rem)
- **Content spacing within sections:** `space-y-5` for text blocks

### Grid Patterns
- **Two-column split (label + content):** `grid grid-cols-1 lg:grid-cols-2 gap-8 items-start`
- **Three-column cards:** `grid grid-cols-1 md:grid-cols-3 gap-6`
- **Form rows:** `grid grid-cols-1 sm:grid-cols-2 gap-5`

### Responsive Breakpoints
- `sm` — 640px (text size scaling, form layout)
- `md` — 768px (nav visibility, card grid columns)
- `lg` — 1024px (content grid, hero text scaling)

---

## 5. Components & Patterns

### Navigation Bar
- **Fixed position**, full-width, `z-50`
- **Height:** `h-16` (4rem)
- **Background:** semi-transparent with backdrop blur
  - Default: `bg-[#0a0a0a]/80 backdrop-blur-sm`
  - Scrolled: `bg-[#0a0a0a]/95 backdrop-blur-md` with subtle border and shadow
- **Scroll progress bar:** 1px teal (`#2dd4bf`) line at bottom, scales with scroll position
- **Mobile:** hamburger menu with animated lines, dropdown panel

### Cards (How It Works, Features)
- **Background:** transparent (inherits page bg)
- **Border:** `border border-[#1f1f1f] rounded-sm`
- **Padding:** `p-8`
- **Hover state:** `-translate-y-1`, border lightens to `#333`, subtle bg `#111111/40`, faint outer glow `rgba(240,237,232,0.04)`
- **Transition:** `duration-300`

### CTA Buttons (Primary)
- **Fill:** `bg-[#f0ede8]` (foreground color)
- **Text:** `text-[#0a0a0a]` (background color — inverted)
- **Size:** `text-sm font-semibold px-8 py-4` (hero), `px-8 py-3.5` (form), `px-6 py-3` (footer)
- **Shape:** `rounded-sm` (slight rounding, not pill)
- **Shadow:** `0 1px 3px rgba(240,237,232,0.08)`
- **Hover:** `bg-white`, `-translate-y-0.5`, larger glow shadow `0 4px 20px rgba(240,237,232,0.15)`
- **Active:** `translate-y-0`, shadow resets
- **Arrow icon:** slides right `translate-x-1` on hover
- **Transition:** `duration-300 ease-out`
- **Disabled:** `opacity-50`, no hover effects

### Form Inputs
- **Background:** `bg-[#111]`
- **Text:** `text-[#f0ede8]`
- **Placeholder:** `text-[#555]`
- **Padding:** `px-4 py-3`
- **Font size:** `text-sm`
- **Border states:**
  - Default: `border-[#2a2a2a]`
  - Focus: `border-[#555]`
  - Valid (touched): `border-[#444]`, focus `border-[#666]`
  - Error: `border-red-500/50`, focus `border-red-500/70`
- **Labels:** `text-xs uppercase tracking-widest text-[#999]`

### Footer
- **Background:** `bg-[#0a0a0a]` with top border
- **Atmospheric glow:** radial gradient at top edge (600x300px, `rgba(240,237,232,0.06)` center fading to transparent)
- **Layout:** flex row (desktop), column (mobile), max-w-6xl centered
- **Bottom bar:** secondary border with copyright + nav links

### Section Eyebrow Labels
A consistent pattern used across all content sections:
```
<p className="text-xs uppercase tracking-widest text-[#999] mb-4">
  Section Label
</p>
```

---

## 6. Motion & Animation

### Framework
- **Library:** Framer Motion (React)
- **Accessibility:** All animations respect `prefers-reduced-motion` — reduced motion users see static content

### Global Easing Curve
```
[0.25, 0.1, 0.25, 1]  // custom cubic-bezier
```

### Animation Patterns

| Pattern | Properties | Duration | Notes |
|---------|-----------|----------|-------|
| **Hero entrance** | `opacity: 0→1, y: 20→0` | 700ms | Staggered delays: 0, 150ms, 300ms, 450ms |
| **Scroll fade-in** | `opacity: 0→1, y: 24→0` | 600ms | Triggered once when element enters viewport (`margin: -80px`) |
| **Scroll fade-in (left)** | `opacity: 0→1, x: -16→0` | 600ms | Alternative direction |
| **Neural mesh fade** | `opacity: 0→0.12` | 2000ms | Background SVG element |
| **Hub node breathing** | `opacity: 0.2→0.6→0.2` | 4–7.2s (varies) | Infinite loop, easeInOut |
| **Traveling pulses** | Position along edge + `opacity: 0→0.7→0` | 2.4–3.5s | Infinite, staggered delays |
| **Nav scroll progress** | `scaleX: 0→1` | Spring (stiffness: 100, damping: 30) | Tracks scroll position |
| **Mobile menu** | `opacity: 0→1, y: -8→0` | 200ms | Quick reveal |
| **Card hover** | `translate-y: -4px` | 300ms | CSS transition, not Framer |
| **CTA hover** | `translate-y: -2px` + shadow expansion | 300ms | CSS transition |
| **Arrow hover** | `translate-x: 4px` | 300ms | CSS transition |
| **Link underline** | `text-decoration-color opacity` | 200ms | CSS transition |

### CSS Transitions
- **Default duration:** 300ms for interactive elements
- **Easing:** `ease-out` for CTAs, default ease for nav/links
- **Color transitions:** 200ms for hover color changes

---

## 7. Visual Effects

### Grain Texture Overlay
- Applied globally via `body::after` pseudo-element
- **Method:** SVG fractalNoise filter (`baseFrequency: 0.65`, `numOctaves: 3`, `stitchTiles: stitch`)
- **Opacity:** 0.03 (extremely subtle)
- **Size:** 256x256px, repeating
- **Position:** Fixed, covers viewport, `z-index: 9999`, `pointer-events: none`

### Neural Mesh Network (Hero)
- Custom SVG visualization (800x800 viewBox, rendered at 700-900px)
- **Overall opacity:** 0.12
- **25 nodes:** 5 hub nodes (larger, animated) + 20 regular nodes
- **~35 edges:** connecting nodes in a network pattern
- **12 traveling pulses:** animated dots moving along edges
- **Central glow:** radial gradient (`#f0ede8`, 12% opacity center, fading to 0)
- **Color:** monochrome `#f0ede8` throughout (matches foreground)

### Footer Atmospheric Glow
- Radial gradient ellipse centered at top edge
- 600px wide, 300px tall
- Colors: `rgba(240,237,232,0.06)` → `rgba(240,237,232,0.02)` → transparent
- Creates subtle upward light effect at section boundary

### Card Hover Glow
- Box shadow: `0 0 30px rgba(240,237,232,0.04)`
- Barely visible — creates a warm, ambient lift effect

### CTA Button Glow
- Default: `0 1px 3px rgba(240,237,232,0.08)`
- Hover: `0 4px 20px rgba(240,237,232,0.15)`
- Creates a "floating" light effect on interaction

---

## 8. Iconography

### Arrow Icon
- Custom SVG arrow used in all CTA buttons
- Animates right on hover (`translate-x-1`)
- Rendered as inline component (`ArrowIcon`)

### Mobile Menu
- Custom hamburger → X animation using three `<span>` lines
- Lines are 1px height, animated with rotation and translation

### No icon library — all icons are custom inline SVGs

---

## 9. Technical Implementation

### Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **CSS:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Animations:** Framer Motion
- **Font loading:** `next/font/google` (Geist Sans, `latin` subset)
- **Deployment:** Vercel

### CSS Architecture
- **CSS Variables** defined in `:root` for core colors
- **Tailwind utility classes** for layout, spacing, and responsive design
- **Hand-written CSS** for prose/article typography (`.prose-kairos` in `globals.css`)
- **Note:** `@tailwindcss/typography` plugin is NOT compatible with Tailwind v4 + Turbopack — all article styles are custom CSS

### Key Files
| File | Purpose |
|------|---------|
| `app/globals.css` | CSS variables, prose typography, grain texture |
| `app/layout.tsx` | Font loading, root theme classes |
| `components/Hero.tsx` | Neural mesh network, hero animations |
| `components/Nav.tsx` | Navigation, scroll progress, mobile menu |
| `components/Footer.tsx` | Footer layout, atmospheric glow |
| `components/FadeIn.tsx` | Reusable scroll-triggered animation wrapper |
| `components/ContactForm.tsx` | Form patterns, input styling, validation states |

---

## 10. Design Tokens Summary (Quick Reference)

```css
:root {
  --background: #0a0a0a;
  --foreground: #f0ede8;
  --muted: #6b6b6b;
  --border: #1f1f1f;
  --card: #111111;
  
  /* Extended (used in components, not CSS vars) */
  --text-body: #c0bdb8;
  --text-label: #999999;
  --text-nav-inactive: #b0b0b0;
  --text-footer: #666666;
  --text-placeholder: #555555;
  --accent: #2dd4bf;
  --accent-translucent: rgba(45, 212, 191, 0.4);
  --border-hover: #2a2a2a;
  --border-active: #333333;
  --error: theme(colors.red.500);
}
```

```
Font: Geist Sans (Google Fonts)
Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
Container: max-w-6xl (1152px), px-6
Sections: py-20–24, border-b border-[#1f1f1f]
Transitions: 300ms (interactive), 200ms (color), 600–700ms (entrance)
Border radius: rounded-sm (buttons/cards), 0.5rem (code blocks/images)
```

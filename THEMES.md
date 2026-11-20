# Themes — ME Digital

The entire visual layer is **token-driven**: every colour, shadow, radius, spacing
value and the button glow lives as a CSS custom property in `src/styles.scss`.
Components reference `var(--…)` and never hard-code a value, so **re-skinning the
site means editing tokens, not components.**

---

## The four themes

Selected by `<html data-theme="…">`. All four are fully defined in `src/styles.scss`:

| Key         | Look                              | Base (page)      | Brand gradient             |
|-------------|-----------------------------------|------------------|----------------------------|
| `light`     | Warm copper / cream (legacy)      | cream `#f7f3ec`   | copper → amber             |
| `dark`      | Warm anthracite (legacy)          | near-black `#16130e` | brighter copper → amber |
| `gta`       | GTA VI / "sunset Vice City"       | dusk `#0a0612`    | magenta → orange → violet  |
| `gta-light` | Same neon, sunlit                 | lavender `#f6f1fb`| magenta → orange → violet  |

- `light` + `dark` are the **original** warm-copper themes.
- `gta` + `gta-light` are the **new neon family** (default = `gta`).
- The neon palette is a "sunset Vice City" look (not Rockstar's assets): a
  near-black dusk base, a magenta→orange→violet gradient, one teal signal accent.

## How a theme is chosen (precedence, highest first)

1. **`?theme=` URL param** — `?theme=gta-light`, `?theme=dark`, … wins *for the
   session*. It is **non-destructive**: it does **not** overwrite the saved choice.
   (This is how the hidden legacy themes stay reachable.) See the no-flash script
   in `src/index.html`.
2. **Saved toggle choice** — `localStorage` key **`theme`**.
3. **OS `prefers-color-scheme`** — dark OS → `gta`, light OS → `gta-light`
   (mapped to the neon family, because the legacy themes are hidden).

The `<html data-theme>` is set by an **inline script in `src/index.html` *before
first paint***, so there is no theme flash on load.

## The toggle (moon/sun button in the nav)

`src/app/nav/nav.ts` is the single source of truth for what the toggle offers:

| Setting              | Value (current)            | What it controls                          |
|----------------------|----------------------------|-------------------------------------------|
| `INCLUDE_LEGACY`     | `false`                    | `true` → legacy `light`/`dark` re-join the cycle |
| `THEMES`             | `['gta', 'gta-light']`     | the themes the toggle cycles through       |
| `DEFAULT_THEME`      | `'gta'`                    | first-visit theme (must match index.html)  |
| `DARK_THEMES`        | `Set(['dark', 'gta'])`     | which keys show the **sun** icon (night variants) |
| `showToggle`         | `THEMES.length > 1`        | the toggle auto-hides with a single theme  |
| `isDark`             | `DARK_THEMES.has(theme)`   | drives the sun/moon icon                   |

**One-line restores / variants:**
- Restore the original 4-theme cycle: `INCLUDE_LEGACY = true` in `nav.ts`.
- Ship *one* GTA theme (no toggle): `const THEMES: Theme[] = ['gta'];` — the toggle
  hides itself automatically.

## Token map — where to edit what

Edit the token; the whole site updates. (Defined in `:root`; a theme block
overrides only what changes.)

| Token                  | Used for                                    |
|------------------------|---------------------------------------------|
| `--brand` / `--brand-2`| primary colour + the gradient stops         |
| `--accent-grad`        | the brand gradient (buttons, logo mark, CTAs)|
| `--bg` / `--bg-alt`    | page background / alternating section band  |
| `--surface`            | cards, inputs, nav toggle                   |
| `--ink` / `--muted`    | primary / secondary text                    |
| `--border`             | hairlines, card + input borders             |
| `--dark`               | footer + CTA-band background (deep)         |
| `--on-accent`          | text **on** the bright gradient (dark on gta)|
| `--on-dark*`           | text / chips / hairlines on the `--dark` footer |
| `--btn-light-bg/fg`    | the always-white "Kontakt aufnehmen" button |
| `--danger`             | form-error red                              |
| `--radius*` / `--gap`  | corner + spacing rhythm                     |
| `--shadow` / `--shadow-lg` | card drop shadows                       |

**Theme-invariant tokens** (defined once in `:root`, inherited by every theme):
`--on-accent*`, `--on-dark*`, `--btn-light-*`, `--danger`, `--font*`, `--radius*`,
`--gap`, and the primary-button glow (below). A theme overrides any of these only
when its `--dark` / gradient differs.

### GTA-only flourish tokens

Defined **only** in the `gta` / `gta-light` blocks and consumed elsewhere as
`var(--token, fallback)` — the fallback reproduces the original value, so
`light` / `dark` stay pixel-identical:

| Token          | What it does                                  | How to tune                              |
|----------------|-----------------------------------------------|------------------------------------------|
| `--hero-grid`  | faint synthwave "digital horizon" texture     | `--grid-line` alpha (**`0` = grid off**), `--grid-size` (px cell) |
| `--hero-bg`    | hero background wash + the grid               | the two `radial-gradient` `color-mix` %s |
| `--heading-glow` | soft glow behind big headings (dark only)   | `0 0 22px color-mix(…)` or `none`        |
| `--btn-glow`   | **shared** primary-button glow (all themes)   | see note below                           |

> **Primary-button glow is intentionally ONE shared style** — defined a single time
> in `:root` and inherited by every theme, with **no per-theme exceptions**. The
> glow colour tracks `--brand` (so it glows the right hue per theme) but the
> *shape and strength are identical everywhere*. To make it louder or softer, edit
> `--btn-glow` / `--btn-glow-hover` **once in `:root`** — it applies to all themes.

## Add or edit a theme

1. In `src/styles.scss`, copy a `:root[data-theme='…'] { … }` block and rename it,
   e.g. `:root[data-theme='neon-blue'] { … }`.
2. Set the tokens for the new look. At minimum: `--brand`, `--brand-2`,
   `--accent-grad`, `--bg`, `--bg-alt`, `--surface`, `--ink`, `--muted`,
   `--border`, `--dark`, and — when the gradient is bright — `--on-accent`
   (dark text for legibility).
3. Make it reachable:
   - add the key to `VALID` in the `src/index.html` no-flash script (otherwise
     `?theme=` ignores it),
   - add it to `DARK_THEMES` in `src/app/nav/nav.ts` if it is a dark variant,
   - add it to `THEMES` (and/or set `INCLUDE_LEGACY = true`) to include it in the
     toggle cycle.
4. `pnpm build` and confirm the new `data-theme` selector appears in the emitted
   `dist/**/styles-*.css`.

## Quick reference

- **Default theme:** `gta` (`DEFAULT_THEME` in `nav.ts`).
- **Toggle shows:** `gta` ↔ `gta-light` (`THEMES` in `nav.ts`).
- **Reach any theme:** `…/?theme=light|dark|gta|gta-light`.
- **Restore legacy toggle:** `INCLUDE_LEGACY = true` in `src/app/nav/nav.ts`.
- **Kill the hero grid:** set `--grid-line` alpha to `0` (or delete the
  `var(--hero-grid)` layer from `--hero-bg`) in the relevant theme block.
- **Change the button glow everywhere:** edit `--btn-glow` / `--btn-glow-hover`
  once in `:root`.

## Files

| File                          | Role                                                        |
|-------------------------------|-------------------------------------------------------------|
| `src/styles.scss`             | All tokens + the four `:root[data-theme]` blocks            |
| `src/index.html`              | No-flash theme bootstrap + `?theme=` + `theme-color` meta   |
| `src/app/nav/nav.ts`          | Toggle config (`THEMES`, `DEFAULT_THEME`, `DARK_THEMES`, …) |
| `src/app/scroll-manager/…ts`  | Scroll-to-top on page nav + footer `#id` section jumps       |

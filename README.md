# ME Digital

Modern, single-page business website for **ME Digital** — an independent IT consultant
(frontend, full-stack, cloud & AI). German-language, deployed to **GitHub Pages**
(`me-digital.io`).

Generated with [Angular CLI](https://github.com/angular/angular-cli) v22.2.6.

## Tech stack

- **Angular 22** — standalone components, `@angular/build` (esbuild)
- **pnpm** — pinned to `12.3.4` via the `packageManager` field
- **TypeScript** ~6.0 · **RxJS** 7.8
- Custom CSS (no CSS framework); self-hosted **Inter** font — no external CDNs / Google Fonts
- **Vitest** for unit tests (`ng test`); no e2e framework configured
- No SSR — content is static and client-rendered

## Project layout

- `src/app/content.ts` — **single source of truth for all copy**. Navigation, footer,
  every page and the legal pages all read from this one file; nothing is duplicated.
  Edit content here.
- `src/app/pages/{home,services,about,contact,impressum,datenschutz}/` — one folder per route
- `src/app/nav/`, `src/app/footer/` — shared header / footer
- `src/app/app.routes.ts` — routes, lazy-loaded per page
- `public/` — static assets (favicon, web manifest, self-hosted font)
- `deploy.sh` — build + publish to GitHub Pages
- `docs/` — **published artifacts** (tracked, deployed to Pages). Generated — **do not
  edit by hand.**
- `dist/` — local build output (git-ignored)

## Getting started

```bash
corepack enable            # or: npm i -g pnpm@12.3.4
pnpm install
pnpm start                 # dev server → http://localhost:4200
                           # custom port: pnpm start -- --port 3000
```

## Build

```bash
pnpm build                 # → dist/it-consultant/browser/
```

The project name is still `it-consultant`, which is why the build output lives at
`dist/it-consultant/browser/`. Not required to change for the site to work.

## Deploy (GitHub Pages)

```bash
./deploy.sh
```

Builds the app, copies the output into `docs/`, then **recreates** the static files that
must survive a clean deploy — `CNAME` (→ `me-digital.io`), `404.html` (SPA fallback) and
`.nojekyll` — and finally commits + pushes to `develop:/docs`. GitHub Pages re-publishes
in ~1–2 minutes.

> ⚠️ Do **not** delete `docs/` by hand (e.g. `rm -rf docs`) and re-copy only the build
> output — that removes `CNAME` / `404.html` and the custom domain drops to a 404.
> `deploy.sh` recreates those files on every run, so just run it.

## Content & toggles

All text lives in `src/app/content.ts`. Current temporary toggles:

- `site.email` — `''` (empty) → the email link is hidden everywhere (domain mail not set
  up yet). Set it to e.g. `'kontakt@me-digital.io'` to re-enable.
- `site.formEnabled` — `false` → the contact form is hidden and replaced by a
  "Kontaktformular folgt in Kürze" panel. Set to `true` once a real backend (e.g.
  Web3Forms) is wired up.
- `site.socials.linkedin` — `null` → the LinkedIn link is hidden.

## Legal

The `Impressum` and `Datenschutz` pages are data-driven from `content.ts`
(`legal.impressum`, `legal.datenschutz`, `legal.impressumClauses`). USt-IdNr is
`DE304454733`; the register fields are `null` (Einzelunternehmer, no GmbH/AG).

## Brand & domain

Brand is **ME Digital** (domain **me-digital.io**) — there is no "ME Consulting" anywhere
in `src/`.

## Additional resources

For Angular CLI command references, see the
[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

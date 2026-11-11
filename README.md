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
pnpm start                 # dev server → http://localhost:4444
                           # custom port: pnpm start -- --port 3000
```

## Build

```bash
pnpm build                 # → dist/it-consultant/browser/
```

The project name is still `it-consultant`, which is why the build output lives at
`dist/it-consultant/browser/`. Not required to change for the site to work.

## Deploy (GitHub Pages)

Two branches: **`develop`** for development, **`main`** is the **published** branch
(GitHub Pages source: branch **`main`**, folder **`/docs`**).

```bash
./deploy.sh                # build + push to develop:/docs
```

`deploy.sh` builds the app, copies the output into `docs/`, then **recreates** the static
files that must survive a clean deploy — `CNAME` (→ `me-digital.io`), `404.html` (SPA
fallback) and `.nojekyll` — and commits + pushes to `develop:/docs`.

To publish a dev branch to the live site, fast-forward `main` onto it and push:

```bash
git checkout main
git pull --rebase origin main
git merge --ff-only develop
git push origin main
```

GitHub Pages re-publishes `main` in ~1–2 minutes.

> In this devcontainer the shell's `VSCODE_GIT_IPC_HANDLE` points at a stale socket, so a
> plain `git push` fails with `ECONNREFUSED`. `deploy.sh` already probes the live socket;
> for manual pushes use `VSCODE_GIT_IPC_HANDLE=<live-sock> git push …`.

> ⚠️ Do **not** delete `docs/` by hand (e.g. `rm -rf docs`) and re-copy only the build
> output — that removes `CNAME` / `404.html` and the custom domain drops to a 404.
> `deploy.sh` recreates those files on every run, so just run it.

## Content & toggles

All text lives in `src/app/content.ts`. Current toggles:

- `site.email` — `''` (empty) → the email link is hidden everywhere (domain mail not set
  up yet). Set it to e.g. `'kontakt@me-digital.io'` to re-enable.
- `site.formEnabled` — `true` → the contact form is **live**, submitted to
  **Web3Forms** (`site.form.accessKey`, `site.form.subject`, `site.form.fromName`). The
  form is signal-based (`[value]` / `(input)`, no `ngModel`) with a hidden honeypot for
  spam and a `submit` handler that `preventDefault()`s so the page never reloads. Set to
  `false` to hide the form again.
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

# Noe Quezada — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-111?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![CI](https://github.com/GodNoden/noe-new-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/GodNoden/noe-new-portfolio/actions/workflows/ci.yml)

> Personal site of **Noe Quezada** — *backend engineer* with experience in
> financial systems, event-driven architectures, and AWS.
> **[ixmak.com](https://www.ixmak.com)**

A trilingual portfolio (EN/ES/FR) with dark mode, self-generating résumés, and
a favicon designed by the house rule: *if it doesn't read at 16 px, it doesn't
ship*.

## What's inside

- **Trilingual for real** — EN, ES and FR with persistence across visits and
  sync between tabs. Add a project once and it lands in all three languages and
  all three résumés at the same time.
- **Light/dark theme** with no hydration flash.
- **Résumés that are generated, never hand-edited** — one PDF per language,
  laid out with a real print route in Tailwind.
- **LinkedIn drafts** written from facts that already live in the repo
  (projects, metrics, stack). They open an *issue*; nothing is ever posted.
- **Icons from a single source** (`app/icon.svg`) with true-size previews and
  measured contrast on light and dark backgrounds.
- **Zero-dependency tests** (`node --test`) and CI that runs them on every push.

## Repository map

| Path | What lives there |
| --- | --- |
| `app/` | App Router routes: the home page, the `cv/[lang]` print route, manifest, icons |
| `app/lib/` | **The data**: identity, copy, projects, stack, résumé profile |
| `app/components/` | Portfolio sections (hero, projects, contact, selectors…) |
| `components/ui/` | Interface primitives |
| `scripts/` | Résumé, icon, preview and LinkedIn-draft generation |
| `tests/` | `node --test`: pure logic, translation invariants and brand rules |
| `brand/` | Identity: the favicon proposal with its measured trade-offs |
| `public/` | Résumé PDFs, icon PNGs and static assets |

## Getting it running

Prerequisites: **Node ≥ 20** and **pnpm 10** (the exact version is pinned in
`packageManager`; `corepack enable` picks it up automatically).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the build
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` / `build` / `start` | The usual Next.js trio |
| `pnpm lint` | ESLint (flat config, `eslint.config.mjs`) |
| `pnpm test` | The whole suite with `node --test` |
| `pnpm cv:setup` | One-time: downloads the Chromium build Playwright needs |
| `pnpm cv:generate` | Builds the site and regenerates the three PDFs in `public/` |
| `pnpm icons:generate` | Rasterises `app/icon.svg` → `.ico`, `apple-icon` and PNGs |
| `pnpm icons:preview` | 16/32/64 px previews over light and dark + measured contrast |

## Content lives in data, not JSX

This is the idea that organises the whole repo: **editing your life shouldn't
touch the interface**.

| File | What it holds |
| --- | --- |
| `app/lib/site.ts` | Identity and contact: URL, email, phone, LinkedIn, GitHub + JSON-LD. The single source: `ContactSection` and the résumé profile both derive from it |
| `app/lib/translations.ts` | Site copy and project entries in all three languages, side by side |
| `app/lib/stack.ts` | Technologies and categories |
| `app/lib/profile.ts` | The résumé layout (employers, folios, languages), built on the files above |

A test keeps the three language blocks from drifting apart (same projects, same
links, same order).

## Icons

`app/icon.svg` is the single source of truth for the monogram; everything else
is rasterised from it (via `sharp`, no browser needed):

```bash
pnpm icons:generate
pnpm icons:preview   # 16/32/64 px previews + measured contrast
```

| Output | Purpose |
| --- | --- |
| `app/icon.svg` | Modern browsers. Also the editable source |
| `app/favicon.ico` | 16 + 32 + 48 px, for legacy browsers and Safari |
| `app/apple-icon.png` | 180 px, iOS home screen |
| `public/icon-192.png`, `public/icon-512.png` | Referenced by `app/manifest.ts`; the 512 doubles as a profile avatar |

The active design is the **«N Degradado»** (pink → violet) proposal, documented
with all its measurements and rejects in
[`brand/propuesta-favicon/`](brand/propuesta-favicon/README.md). Two rules worth
keeping: the "N" is a **closed polygon, never a stroked path** (miter spikes
ruin the letter), and every change is judged **at 16 px on both light and dark
backgrounds** — which is exactly what `pnpm icons:preview` prints.

## Generated résumés

The three PDFs in `public/` are **generated**, never edited by hand. Their
content comes from `app/lib/profile.ts`, which in turn reads
`app/lib/translations.ts` and `app/lib/stack.ts`: adding a project to the
portfolio adds it to all three résumés on the next run.

```bash
pnpm cv:setup      # one-time: downloads the Playwright Chromium build
pnpm cv:generate   # builds the site, then writes public/Noe_Quezada_CV_{EN,ES,FR}.pdf
```

The source is the print route `app/cv/[lang]`, so the layout is plain Tailwind
and you can preview it in the browser at `/cv/en`, `/cv/es` and `/cv/fr` (then
`Cmd/Ctrl + P`). The print stylesheet in `app/globals.css` strips the site
header and forces light colours. Commit the regenerated PDFs.

### If Chromium refuses to start

Playwright needs a few system libraries. On Debian or Ubuntu:

```bash
sudo pnpm exec playwright install-deps chromium
# or, minimally:
sudo apt-get install -y libnss3 libnspr4 libasound2
```

## Automation

| Workflow | What it does |
| --- | --- |
| `.github/workflows/ci.yml` | Typecheck, lint, tests and build on every push and PR: the guard that stops a broken build from silently stalling a deployment |
| `.github/workflows/linkedin-drafts.yml` | Every third Monday (a 21-day cadence, enforced by a guard step) it opens an *issue* with LinkedIn drafts written from real repository data. It never posts anything and needs no secret beyond `GITHUB_TOKEN` |

Preview the drafts locally without touching git or the network:

```bash
node scripts/linkedin-drafts.mjs --dry-run
node scripts/linkedin-drafts.mjs --dry-run --include-commits   # also reads git log
```

## Tests

```bash
pnpm test   # node --test, zero testing dependencies
```

36 tests across three fronts: the LinkedIn draft logic (its pure helpers are
exported so they can be tested without a DOM), language detection
(`app/lib/language.mjs`, JSDoc-typed), and the brand and integrity invariants —
including a guard that fails if the manifest points at an icon that doesn't
exist, which is exactly how the ghost icons were caught.

## Deploy

`next.config.ts` pins `output: 'standalone'`, meant for serving the standalone
build on a VPS or container without the full `node_modules`. Two things to
remember: the `public/` PDFs and icon PNGs are served as static assets (commit
them after regenerating), and the workflows are GitHub Actions.

### On the roadmap

- **i18n per route** (`/en`, `/es`, `/fr`): today the language is client-side
  over a single URL with a fixed `lang="en"` — it works, but search engines
  only ever see one language.
- `shadcn` is still in `dependencies` and only used as a CLI: it should be a
  devDependency.
- No custom `not-found.tsx` or `error.tsx` yet.
- The CV viewer modal needs a focus trap and localised `aria-label`s.

## Lockfiles

Only `pnpm-lock.yaml` is committed (`pnpm` is the package manager, see
`packageManager` in `package.json`); the npm lockfile was removed so the two can
never drift. To update the lockfile:

```bash
pnpm install --lockfile-only
```

---

Made in Los Cabos, Baja California Sur.

# Copilot Instructions: FFC-IN-freeforcharity.org

Free For Charity main nonprofit website. Next.js 16 static export served in production from InterServer cPanel at freeforcharity.org (apex). GitHub Pages is a manual staging/preview surface only.

## Workflow

Issue -> branch -> PR -> merge. No direct commits to main.

On merge to `main`, CI (`.github/workflows/ci.yml`, "CI - Build and Test") runs; on green, `.github/workflows/deploy-cpanel.yml` mirrors `out/` into `~/public_html` (production apex docroot) over FTPS, excluding WHMCS at `~/public_html/hub` and cPanel keepers. GitHub Pages staging is a manual preview only (`.github/workflows/deploy-gh-pages-staging.yml`).

## Pre-Push Checks (in order)

1. `npm run lint`
2. `npm run build`
3. `npm run test`

## Architecture

- **Framework:** Next.js 16 (`^16.2.9`) App Router, React 19.2.7, TypeScript, Tailwind CSS v4 (Node 24.x)
- **Output:** Static export (`output: 'export'` in next.config.ts)
- **Pages:** `src/app/` (~35 routes, App Router conventions)
- **Components:** `src/components/` (footer/, header/, home-page/, ui/)
- **Content:** `src/data/` (team/, faqs/, testimonials/ as JSON + .ts loaders)
- **Utilities:** `src/lib/`

## Conventions

- Route folders: **kebab-case only** (`about-us/`, not `aboutUs/`)
- Asset paths: use `assetPath()` from `src/lib/assetPath.ts` for all images
- `NEXT_PUBLIC_BASE_PATH` controls basePath for the GitHub Pages subpath (staging/preview at `https://freeforcharity.github.io/FFC-IN-freeforcharity.org/`, basePath `/FFC-IN-freeforcharity.org`); production cPanel serves at ROOT so `NEXT_PUBLIC_BASE_PATH=''`
- Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

## Mandatory Standards

- **Footer:** 3-column layout (Endorsements, Quick Links + 6 Policies, Contact Us) + copyright bar
- **Team Section:** Grid of team members with circular photos, LinkedIn links

## Known Constraints

- Static export: no API routes, no middleware, no ISR
- `<img>` tags are correct for static export; `next/image` has limitations
- Google Fonts may fail on restricted networks (graceful fallback to system fonts)
- Never expose secrets in code; use `${{ secrets.* }}` in workflows

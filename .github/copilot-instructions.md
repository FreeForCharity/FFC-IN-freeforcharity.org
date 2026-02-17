# Copilot Instructions: FFC-IN-freeforcharity.org

Free For Charity main nonprofit website. Next.js static site on GitHub Pages at freeforcharity.org.

## Workflow

Issue -> branch -> PR -> merge. No direct commits to main.

## Pre-Push Checks (in order)

1. `npm run lint`
2. `npm run build`
3. `npm run test`

## Architecture

- **Framework:** Next.js App Router, TypeScript, Tailwind CSS v4
- **Output:** Static export (`output: 'export'` in next.config.ts)
- **Pages:** `src/app/` (~29 routes, App Router conventions)
- **Components:** `src/components/` (footer/, header/, home-page/, ui/)
- **Content:** `src/data/` (team/, faqs/, testimonials/ as JSON + .ts loaders)
- **Utilities:** `src/lib/`

## Conventions

- Route folders: **kebab-case only** (`about-us/`, not `aboutUs/`)
- Asset paths: use `assetPath()` from `src/lib/assetPath.ts` for all images (once added)
- `NEXT_PUBLIC_BASE_PATH` controls basePath for GitHub Pages subpath fallback
- Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

## Mandatory Standards

- **Footer:** 3-column layout (Endorsements, Quick Links + 6 Policies, Contact Us) + copyright bar
- **Team Section:** Grid of team members with circular photos, LinkedIn links

## Known Constraints

- Static export: no API routes, no middleware, no ISR
- `<img>` tags are correct for static export; `next/image` has limitations
- Google Fonts may fail on restricted networks (graceful fallback to system fonts)
- Never expose secrets in code; use `${{ secrets.* }}` in workflows

# AI Agent Instructions: FFC-IN-freeforcharity.org

**Project:** FFC-IN-freeforcharity.org -- the main Free For Charity nonprofit website

**Organization:** [Free For Charity](https://freeforcharity.org) provides free, professionally built websites for 501(c)(3) nonprofit organizations. Every repo in this organization serves that mission.

---

## Tech Stack

| Layer     | Technology                                                  |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js with App Router (see package.json for version)      |
| Language  | TypeScript (strict mode)                                    |
| Styling   | Tailwind CSS v4 (CSS-based config, no tailwind.config file) |
| Export    | Static (`output: 'export'` in next.config.ts)               |
| Hosting   | GitHub Pages (custom domain freeforcharity.org)             |
| CI/CD     | GitHub Actions                                              |
| Testing   | Playwright (E2E)                                            |

---

## Core Commands

| Command           | What It Does               | Typical Duration |
| ----------------- | -------------------------- | ---------------- |
| `npm install`     | Install dependencies       | ~17s             |
| `npm run dev`     | Start dev server (Turbo)   | ~1s startup      |
| `npm run lint`    | Run ESLint                 | ~2s              |
| `npm run build`   | Production static build    | ~30s             |
| `npm run test`    | Run Playwright E2E tests   | ~15s             |
| `npm run preview` | Serve built output locally | immediate        |

**NEVER CANCEL long-running commands.** Builds and E2E tests take time. Set your timeout to 180+ seconds and let them finish.

---

## Development Workflow

All changes follow this process:

1. **Issue** -- Work starts from a GitHub Issue in this repo
2. **Branch** -- Create a feature branch from `main`
3. **Develop** -- Make changes, commit frequently
4. **Pre-commit checklist** (run in this order):
   1. `npm run lint` -- Catch code quality issues
   2. `npm run build` -- Verify the static export succeeds
   3. `npm run test` -- Run Playwright E2E tests
5. **PR** -- Open a Pull Request, link to the issue with `Fixes #NNN`
6. **Merge** -- Merge via PR review (no direct commits to `main`)

---

## Project Architecture

```
src/
  app/                  # Next.js App Router -- pages and layouts
    page.tsx            # Home page (imports from home-page/)
    layout.tsx          # Root layout with global metadata
    globals.css         # Global styles (Tailwind v4 imports)
    sitemap.ts          # Dynamic sitemap generator
    robots.ts           # Robots.txt generator
    [route]/page.tsx    # ~29 additional routes
  components/           # Reusable UI components
    footer/             # Mandatory 3-column footer (FFC standard)
    header/             # Navigation header
    home-page/          # Homepage section components (Figma redesign)
      Hero/
      Mission/
      SupportFreeForCharity/
      Endowment-Features/
      Our-Programs/
      Volunteer-with-Us/
      Results-2023/
      VoicesofGratitude/
      TheFreeForCharityTeam/
      FrequentlyAskedQuestions/
    ui/                 # Shared UI primitives (cards, buttons, etc.)
  data/                 # Content modules and JSON data files
    team/               # Team member JSON files
    faqs/               # FAQ JSON files
    testimonials/       # Testimonial JSON files
    team.ts             # Team data loader
    faqs.ts             # FAQ data loader
    testimonials.ts     # Testimonials data loader
  lib/                  # Utility functions and helpers
public/                 # Static assets
  Images/               # Photos, logos, screenshots
  Svgs/                 # SVG icons and illustrations
```

---

## Naming Conventions

**ALL route folders MUST use kebab-case.** This is an SEO best practice per Google Search Central. URLs like `/about-us` are preferred over `/aboutUs` or `/about_us`.

Examples:

- `src/app/about-us/page.tsx` (correct)
- `src/app/aboutUs/page.tsx` (wrong)
- `src/app/contact-form/page.tsx` (correct)

Component files use PascalCase: `HeroSection.tsx`, `DonateButton.tsx`.

---

## GitHub Pages & Asset Paths

This site deploys to `https://freeforcharity.org` (custom domain) via GitHub Pages.

The `basePath` and `assetPrefix` in `next.config.ts` are controlled by `NEXT_PUBLIC_BASE_PATH` for subpath fallback support. For custom domain deployment, these remain empty.

---

## Mandatory Footer Standard (FFC-Wide)

The Footer is a **non-negotiable standard** across every FFC-supported charity site. The 3-column layout must include:

### Column 1: Endorsements

- GuideStar Platinum Seal SVG (linked to profile)
- Organization EIN number display

### Column 2: Quick Links + Policies

- Navigation links to all major site sections
- **All 6 mandatory policy links:**
  1. Donation Policy
  2. Privacy Policy
  3. Cookie Policy
  4. Terms of Service
  5. Vulnerability Disclosure Policy
  6. Security Acknowledgements

### Column 3: Contact Us

- Email with mailto link
- Phone with tel: link
- Address(es) with Google Maps link(s)
- Social media icon buttons (Facebook, X/Twitter, LinkedIn, GitHub)

### Bottom Bar

- Copyright with dynamic year
- Organization name as US 501c3 Non Profit
- "A project of https://freeforcharity.org" attribution

---

## Mandatory Team Section Standard (FFC-Wide)

Every FFC-supported site MUST have a Team section with:

- Circular photo (300x300px, ring-4 white border, shadow)
- Full name, Title/Role
- LinkedIn profile link (SVG icon button)
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Uses `TeamMemberCard` reusable component

---

## Security

- **NEVER** expose API tokens or secrets in code, comments, or documentation
- **NEVER** hardcode secrets in any file
- In GitHub Actions workflows, **ALWAYS** use `${{ secrets.SECRET_NAME }}` syntax
- **ALWAYS** validate that secrets exist before using them in workflows
- **NEVER** echo or print secrets to logs
- For local development, use `.env` files (excluded from git via `.gitignore`)
- If a user provides a secret, **DO NOT** write it in any file. Instruct them to add it to GitHub Secrets or a local `.env` file.

---

## Known Issues

- **ESLint `img` warnings:** Some ESLint rules flag `<img>` tags in favor of `next/image`. For static exports, `<img>` is the correct approach. These warnings are expected.
- **Google Fonts:** Font loading may fail on restricted networks. The site should degrade gracefully with system fonts.
- **Static export limitations:** Dynamic features like API routes, middleware, and ISR are not available. All pages must be statically renderable at build time.

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format: `<type>: <description>`

| Type        | When to Use                             |
| ----------- | --------------------------------------- |
| `feat:`     | New feature or page                     |
| `fix:`      | Bug fix                                 |
| `docs:`     | Documentation only                      |
| `style:`    | Formatting (no code change)             |
| `refactor:` | Code restructuring (no behavior change) |
| `test:`     | Adding or updating tests                |
| `chore:`    | Build config, dependencies, CI          |

Example: `feat: add volunteer signup form with validation`

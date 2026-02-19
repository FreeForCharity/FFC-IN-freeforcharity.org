# Free For Charity

Free For Charity website built with Next.js 15.5.2 (App Router).

## Organization

**Free For Charity** is a 501(c)(3) nonprofit organization (EIN: 46-2471893) dedicated to supporting other nonprofits.

## Purpose

Free For Charity connects students, professionals, and businesses with nonprofits to reduce operating costs and increase impact. By providing free web hosting, domain names, Microsoft 365 grants assistance, and consulting services, we help nonprofits put more resources back into their charitable missions.

## Site Structure

The website consists of **29 pages** covering:

- **Main pages**: Home, About Us, Contact Us
- **Program pages**: 501c3, Pre-501c3, Help for Charities, Domains, Free Charity Web Hosting, Endowment Fund
- **Resource pages**: Tools for Success, GuideStar Guide, Validation Guide, Onboarding Guide
- **Training pages**: Volunteer Proving Ground, Web Developer Training, Service Delivery Stages, Tech Stack
- **Policy pages**: Privacy Policy, Terms of Service, Cookie Policy, Donation Policy, Vulnerability Disclosure, Security Acknowledgements
- **Action pages**: Donate, Volunteer
- **Admin pages**: FFC Admin, cPanel Backup SOP

For a complete list, see the [Site Map](#site-map) section below.

## Deployment

- **Primary Site**: [https://www.freeforcharity.org](https://www.freeforcharity.org) (custom domain with CNAME)
- **GitHub Pages**: [https://freeforcharity.github.io/freeforcharity-web/](https://freeforcharity.github.io/freeforcharity-web/)
- **Hosting**: GitHub Pages
- **Deployment**: Automated via GitHub Actions on push to `main` branch
- **Build Configuration**: Dual deployment support (custom domain and GitHub Pages basePath)

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router with TypeScript)
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**:
  - Framer Motion 12.23.24 (animations)
  - Lucide React 0.469.0 (icons)
  - React Icons 5.5.0 (additional icons)
  - Swiper 12.0.3 (carousels)
- **Testing**: Playwright 1.56.0
- **Linting**: ESLint 9 with Next.js config
- **Build**: Static export for GitHub Pages deployment

## Local Development

### Prerequisites

- Node.js 20.x (tested with v20.19.6)
- npm (comes with Node.js)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/FreeForCharity/freeforcharity-web.git
cd freeforcharity-web
```

2. **Install dependencies**

```bash
npm install
```

_Takes approximately 10-15 seconds_

3. **Start development server**

```bash
npm run dev
```

_Server starts in ~1 second with Turbopack. Visit http://localhost:3000_

### Available Commands

```bash
npm run dev          # Start development server (with Turbopack)
npm run build        # Build for production (~15-20 seconds)
npm run preview      # Preview production build (requires build first)
npm run lint         # Run ESLint (expect 11 warnings)
npm test             # Run Playwright tests (requires build first)
npm run test:headed  # Run tests with visible browser
npm run test:ui      # Run tests in interactive UI mode
```

## Testing

This project uses Playwright for end-to-end testing to ensure quality and consistency.

### Quick Start

```bash
# 1. Build the site
npm run build

# 2. Install Playwright browsers (first time only)
npx playwright install chromium

# 3. Run tests
npm test              # Headless mode
npm run test:headed   # With browser visible
npm run test:ui       # Interactive UI mode
```

### Test Coverage

**Test Statistics**: 29 tests across 6 test suites

- ✅ 28 passing tests
- ⏭️ 1 skipped test (image dimensions - unreliable in CI)
- 📊 Execution time: ~25-30 seconds

The test suite includes:

1. **Logo and Image Visibility** (`tests/logo.spec.ts`) - 3 tests
   - Header logo display
   - Hero section image display
   - Logo consistency verification

2. **Image Loading** (`tests/image-loading.spec.ts`) - 3 tests
   - Image visibility and loading
   - Hero image from local assets
   - Image dimensions check (skipped)

3. **Animated Numbers** (`tests/animated-numbers.spec.ts`) - 5 tests
   - Results 2023 section statistics
   - Animation from 0 on scroll
   - Animation triggers once
   - Reduced motion support

4. **Mission Video** (`tests/mission-video.spec.ts`) - 2 tests
   - Video element presence
   - Video source configuration

5. **Cookie Consent Banner** (`tests/cookie-consent.spec.ts`) - 14 tests
   - Banner display and interactions (5 tests)
   - Preferences modal functionality (7 tests)
   - Accessibility attributes (2 tests)

6. **Footer Copyright** (`tests/copyright.spec.ts`) - 2 tests
   - Copyright notice with current year
   - Link to freeforcharity.org

**Test Configuration** (`playwright.config.ts`)

- Uses system Chromium to avoid network restrictions
- Runs against production build (`npm run preview`)
- Retries failed tests 2x in CI, 0x locally
- Collects traces on first retry for debugging

Tests run automatically on every push to main via GitHub Actions before deployment.

**Full Testing Documentation**: See [TESTING.md](./TESTING.md) for complete details.

### Code Quality

**ESLint**

```bash
npm run lint
```

Currently reports **11 warnings** (expected):

- 6 warnings about using `<img>` instead of Next.js `<Image>` component (acceptable for static export)
- 3 warnings about unused imports
- 2 warnings about React hooks dependencies

**TypeScript**

- Strict mode enabled
- Type checking runs during build
- No type errors in codebase

## Key Features

### Global Header and Footer

- **Header** (`src/components/Header/index.tsx`):
  - Responsive navigation with mobile menu
  - Logo and primary navigation links
  - Donate and Volunteer buttons
  - Sticky header with scroll effects
- **Footer** (`src/components/Footer/index.tsx`):
  - GuideStar endorsement badges
  - Social media links
  - Quick links to key pages
  - Newsletter subscription
  - Cookie consent integration

### Content Management

Content is stored as JSON files in `src/data/` for easy editing:

- **FAQs** (`src/data/faqs/`): 2 FAQ entries from JSON files, additional FAQs inline
- **Team Members** (`src/data/team/`): 5 board member profiles
- **Testimonials** (`src/data/testimonials/`): 3 testimonial entries

To update content, simply edit the JSON files directly.

### UI Components Library

Reusable components in `src/components/UI/`:

- `HeroSection.tsx` - Page hero sections
- `CallToActionCard.tsx` - CTA cards with animations
- `General-Donation-Card.tsx` - Donation cards
- `trainingcard.tsx` - Training program cards

### SEO Optimization

- **Global metadata** in `src/app/layout.tsx`: title templates, descriptions, Open Graph, Twitter cards
- **Sitemap** (`src/app/sitemap.ts`): Currently configured for homepage
- **Robots.txt** (`src/app/robots.ts`): Search engine indexing rules
- **Structured metadata** per page for optimal search visibility

## Project Structure

```
freeforcharity-web/
├── .github/
│   ├── workflows/
│   │   └── nextjs.yml          # CI/CD pipeline for GitHub Pages
│   └── copilot-instructions.md # Instructions for GitHub Copilot agents
├── public/                      # Static assets
│   ├── Images/                  # Image files
│   ├── Svgs/                    # SVG files
│   └── *.png                    # Icons and favicons
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx            # Homepage (routes to Figma-Home-page)
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── globals.css         # Global styles
│   │   ├── sitemap.ts          # Sitemap generation
│   │   ├── robots.ts           # Robots.txt generation
│   │   ├── [29 page routes]/  # All site pages
│   │   └── Figma-Home-page/    # Main homepage component
│   ├── components/              # React components
│   │   ├── Header/             # Site header
│   │   ├── Footer/             # Site footer
│   │   ├── UI/                 # Reusable UI components
│   │   ├── Home/               # Original home page components
│   │   ├── Figma-Home-Page-Components/  # Current home page
│   │   ├── [program-components]/  # Components for specific pages
│   │   └── CookieConsent/      # Cookie consent banner
│   ├── data/                    # JSON data files
│   │   ├── faqs/               # FAQ JSON files
│   │   ├── team/               # Team member profiles
│   │   ├── testimonials/       # Testimonial data
│   │   ├── faqs.ts            # FAQ data loader
│   │   ├── team.ts            # Team data loader
│   │   └── testimonials.ts     # Testimonial data loader
│   └── lib/
│       └── assetPath.ts        # Helper for GitHub Pages asset paths
├── tests/                       # Playwright tests
│   ├── logo.spec.ts            # Logo visibility tests
│   ├── image-loading.spec.ts   # Image loading tests
│   ├── animated-numbers.spec.ts # Results 2023 animated statistics tests
│   ├── mission-video.spec.ts   # Video element tests
│   ├── cookie-consent.spec.ts  # Cookie consent banner tests
│   ├── copyright.spec.ts       # Footer copyright tests
│   └── README.md               # Test documentation
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── playwright.config.ts        # Playwright test configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── README.md                   # This file
└── TESTING.md                  # Testing documentation
```

## Common Tasks

### Content Updates

**Edit Homepage**

- Main homepage: `src/app/Figma-Home-page/index.tsx`
- Original alternative: `src/app/Home/page.tsx`

**Update Team Members**

```bash
# Edit existing team member
vi src/data/team/clarke-moyer.json

# Available team members:
# - clarke-moyer.json (Founder/President)
# - chris-rae.json (Vice President)
# - tyler-carlotto.json (Secretary)
# - brennan-darling.json (Treasurer)
# - rebecca-cook.json (Member at Large)
```

**Update FAQs**

```bash
# Edit FAQ JSON files
vi src/data/faqs/what-is-the-organization-aiming-to-accomplish.json
vi src/data/faqs/are-you-really-a-charity.json

# Additional FAQs defined inline in:
vi src/data/faqs.ts
```

**Update Testimonials**

```bash
vi src/data/testimonials/testimonial-1.json
vi src/data/testimonials/testimonial-2.json
vi src/data/testimonials/testimonial-3.json
```

### Component Development

**Add a New Page**

```bash
# Create new page directory
mkdir -p src/app/my-new-page

# Create page component
touch src/app/my-new-page/page.tsx

# Update sitemap (if needed)
vi src/app/sitemap.ts
```

**Create Reusable Component**

```bash
# Add to UI components
touch src/components/UI/MyComponent.tsx
```

### Styling

**Global Styles**

```bash
vi src/app/globals.css
```

**Component Styles**

- Use Tailwind CSS utility classes directly in components
- Tailwind config: `postcss.config.mjs`

### SEO and Metadata

**Update Site Metadata**

```bash
vi src/app/layout.tsx
# Edit the metadata object
```

**Add Pages to Sitemap**

```bash
vi src/app/sitemap.ts
# Add new routes to the returned array
```

**Configure Robots**

```bash
vi src/app/robots.ts
```

## Deployment Details

### Production Deployment

The site uses **dual deployment** strategy:

1. **Custom Domain**: [https://www.freeforcharity.org](https://www.freeforcharity.org)
   - Primary production site
   - CNAME configured in DNS
   - No basePath required
   - Assets served from root path

2. **GitHub Pages**: [https://freeforcharity.github.io/freeforcharity-web/](https://freeforcharity.github.io/freeforcharity-web/)
   - Backup/alternative URL
   - Requires basePath: `/freeforcharity-web`
   - Assets served from subpath

### CI/CD Pipeline

**Workflow**: `.github/workflows/nextjs.yml`

**Trigger**: Push to `main` branch

**Pipeline Steps**:

1. Checkout repository
2. Setup Node.js 20
3. Install dependencies with `npm ci`
4. Install Playwright browsers
5. Build with `NEXT_PUBLIC_BASE_PATH=/freeforcharity-web`
6. Run Playwright tests
7. Upload build artifacts (./out directory)
8. Deploy to GitHub Pages (only if tests pass)

**Environment Variables**:

- `NEXT_PUBLIC_BASE_PATH`: Set to `/freeforcharity-web` for GitHub Pages deployment
- Not set (empty) for custom domain deployment

### Local Production Build

**Build for custom domain** (default):

```bash
npm run build
npm run preview
# Visit http://localhost:3000
```

**Build for GitHub Pages** (with basePath):

```bash
NEXT_PUBLIC_BASE_PATH=/freeforcharity-web npm run build
npm run preview
# Visit http://localhost:3000
```

### Build Configuration

**next.config.ts**:

- `output: "export"` - Enables static site generation
- `images.unoptimized: true` - Allows static image export
- `basePath: process.env.NEXT_PUBLIC_BASE_PATH || ""` - Dynamic basePath
- `assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || ""` - Asset path prefix

**Asset Path Helper**:
When adding images that need to work on both deployments, use the `assetPath()` helper:

```typescript
import { assetPath } from "@/lib/assetPath";

<img src={assetPath("/Images/my-image.png")} alt="Description" />
```

This automatically handles the basePath for both deployment scenarios.

### Build Output

- **Directory**: `./out`
- **Files**: Static HTML, CSS, JS, and assets
- **Routes**: 29 page routes + 3 system routes (`/_not-found`, `/robots.txt`, `/sitemap.xml`) = 32 total
- **Size**: ~180 kB First Load JS (homepage)
- **Build Time**: ~15-20 seconds

## Site Map

The website consists of 29 page routes organized as follows:

### Main Pages

- `/` - Homepage (Free For Charity overview)
- `/Home` - Alternative homepage layout
- `/about-us` - About Free For Charity organization
- `/contact-us` - Contact form and information

### Action Pages

- `/donate` - Donation page
- `/volunteer` - Volunteer sign-up

### Program Pages

- `/501c3` - Services for established 501(c)(3) nonprofits
- `/pre501c3` - Services for organizations seeking 501(c)(3) status
- `/help-for-charities` - Overview of charity assistance programs
- `/domains` - Domain name services
- `/free-charity-web-hosting` - Web hosting program details
- `/free-for-charity-endowment-fund` - Endowment fund information

### Resource & Training Pages

- `/free-for-charitys-tools-for-success` - Tools and resources
- `/guidestar-guide` - GuideStar profile guide
- `/charity-validation-guide-ensuring-mutual-benefit-through-comprehensive-validation-processes` - Validation guide
- `/online-impacts-onboarding-guide` - Onboarding process guide
- `/ffc-volunteer-proving-ground-core-competencies` - Volunteer competencies
- `/free-for-charity-ffc-web-developer-training-guide` - Developer training
- `/free-for-charity-ffc-service-delivery-stages` - Service delivery process
- `/techstack` - Technology stack information

### Admin Pages

- `/ffcadmin` - Admin dashboard
- `/ffcadmin-free-for-charity-cpanel-backup-sop` - cPanel backup procedures

### Policy Pages

- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/cookie-policy` - Cookie policy
- `/donation-policy` - Donation policy
- `/free-for-charity-donation-policy` - Donation policy (alternate URL)
- `/vulnerability-disclosure-policy` - Security vulnerability disclosure
- `/security-acknowledgements` - Security acknowledgements

**Note**: `/donation-policy` and `/free-for-charity-donation-policy` are separate routes that may serve similar or related content.

## Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**

```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Issue: Build cache issues**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Issue: Dependencies out of sync**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue: Playwright browsers not found**

```bash
# Install Playwright browsers
npx playwright install chromium --with-deps
```

**Issue: Tests fail in CI but pass locally**

- Check GitHub Actions logs for specific errors
- Review test artifacts (screenshots, traces)
- Ensure build was successful before tests run
- Check for timing/race conditions

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow the code style**: Run `npm run lint` before committing
3. **Test your changes**: Run `npm test` to ensure tests pass
4. **Write descriptive commit messages**
5. **Submit a pull request** with a clear description

For major changes, please open an issue first to discuss the proposed changes.

## License

This project is maintained by Free For Charity, a 501(c)(3) nonprofit organization.

## Contact

- **Website**: [https://www.freeforcharity.org](https://www.freeforcharity.org)
- **Organization**: Free For Charity
- **EIN**: 46-2471893
- **Contact**: Use the contact form at [/contact-us](https://www.freeforcharity.org/contact-us)

---

**Documentation Status**: ✅ Updated December 2025  
**Next.js Version**: 15.5.2  
**Node.js Version**: 20.x required

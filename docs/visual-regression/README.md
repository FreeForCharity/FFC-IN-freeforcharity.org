# Visual regression — WordPress origin vs Next.js staging

This directory holds the artifacts for issue #24: comparing every
non-homepage page on the WordPress origin
(`https://freeforcharity.org`) against the same page on the Next.js
staging site (`https://freeforcharity.github.io/FFC-IN-freeforcharity.org`)
so we can sign off on content parity before DNS cutover.

The homepage (`/`) is intentionally excluded. The new homepage is the
Figma redesign and is not expected to match the WordPress version —
diffs there are intentional product direction, not regressions.

## Run

```sh
npm run visual-regression
```

That runs [`scripts/visual-regression/capture.mjs`](../../scripts/visual-regression/capture.mjs),
which uses Playwright to load each pair in a headless Chromium browser and
save a full-page screenshot from both sides. Output lands in
`screenshots/wp/` and `screenshots/staging/`, and an index report is
written to `REPORT.md`.

To run against different origins (e.g., a PR preview):

```sh
WP_BASE_URL=https://freeforcharity.org \
STAGING_BASE_URL=https://your-preview.example.com \
node scripts/visual-regression/capture.mjs
```

## Review

Open `REPORT.md` once the run finishes. The table has links to the WP
and Next.js screenshots for each route. Open the pair side-by-side in
an image viewer (Windows Photos: select both → right-click → Open with)
or in VS Code (drag both PNGs into split editors).

Focus on **content parity** rather than pixel-level styling — Tailwind
v4 vs Divi will always produce different layouts. Flag pages where the
Next.js version is missing content that exists in WordPress.

## Why this lives outside `tests/`

The Playwright specs under `tests/` run against the local static export
on every CI build. This regression compares the **deployed staging** to
the **live WordPress origin** — it's a one-shot pre-cutover gate, not a
recurring check, so it lives under `scripts/`.

After cutover, this directory can be deleted (or retained for historical
reference).

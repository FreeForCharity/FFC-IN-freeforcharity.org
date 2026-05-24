# WordPress baseline — captured 2026-05-24 (mobile, Lighthouse 13.3.0)

Compare against the Next.js Lighthouse CI after cutover.

| Page                 | Perf | A11y | Best | SEO | LCP (s) |   CLS | TBT (ms) |
| -------------------- | ---: | ---: | ---: | --: | ------: | ----: | -------: |
| `about-us`           |   77 |   63 |   73 |  85 |     2.5 | 0.011 |      612 |
| `contact-us`         |   59 |   63 |   73 |  85 |     4.2 |  0.12 |      640 |
| `donate`             |   60 |   65 |   73 |  85 |     4.8 | 0.089 |      578 |
| `help-for-charities` |   71 |   63 |   73 |  85 |     2.7 | 0.067 |      709 |
| `home`               |   57 |   69 |   73 |  77 |     2.5 | 0.238 |      898 |

## Methodology

- Tool: Lighthouse 13.3.0 CLI, mobile form factor
- Chromium: whatever your system Chrome resolves to; in our run, the
  Playwright-bundled Chromium 1208 was used by setting `CHROME_PATH=...`
- Flags: `--ignore-certificate-errors --no-sandbox --headless=new`
- Origin: live WordPress at `https://freeforcharity.org` (pre-cutover state)
- Each page run once (no median-of-3) — directional baseline, not a benchmark
- Only summary metrics are committed (the full Lighthouse JSON embeds
  base64-encoded screenshots that GitHub secret-scanning false-positive
  flags as Azure bot keys). To regenerate a full HTML report locally:

  ```bash
  # Optional: pin to the same Chromium binary the baseline used. Without
  # CHROME_PATH set, lighthouse uses whatever Chrome it finds on $PATH.
  export CHROME_PATH=$(npx --yes @playwright/browser-chromium@latest find chromium)

  npx lighthouse https://freeforcharity.org/ \
    --form-factor=mobile --output=html \
    --output-path=/tmp/wp-home.html \
    --chrome-flags="--headless=new --no-sandbox --ignore-certificate-errors"
  ```

## How to compare post-cutover

After the document-root swap and 48-hour soak, run Lighthouse against the new
Next.js export at the same URLs and append a `next-` prefixed report set.
Delta of > 10 points on perf or LCP > +500ms is worth investigating.

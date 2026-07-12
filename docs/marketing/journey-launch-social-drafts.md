# DRAFTS — operator review before posting

> **These are unpublished drafts.** Nothing in this file has been posted anywhere.
> An FFC operator must review, edit, and approve each post before it goes to any
> social channel. Do not copy-paste without review. Never add promo or coupon
> codes to public posts.

Announcing: the gated onboarding journey — the website is built and validated
free on GitHub Pages **first**, and the free .org domain is only purchased once
the site is proven.

---

## Launch ladder (post in this order)

These drafts are a sequenced launch, not a flat list. Suggested spacing:
**3–4 days between rungs**, so each post gets a clean attribution window
before the next one lands.

| Rung | Post                                            | Angle slug             | Gate                                                                                                                      |
| ---- | ----------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1    | Pilot story (placeholder — see below)           | `pilot-story`          | Publishes **only** after the Catnip & Cattitude production cutover completes **and** written publicity consent is on file |
| 2    | Donor-trust explainer (LinkedIn 3 / Facebook 3) | `donor-trust`          | none                                                                                                                      |
| 3    | Volunteer recruiting (LinkedIn 2 / Facebook 2)  | `volunteer-recruiting` | none                                                                                                                      |

The charity-recruiting drafts (LinkedIn 1 / Facebook 1) are evergreen: run
them as ongoing follow-ups once the ladder completes, and any time
application volume needs a nudge.

**Rung 1 placeholder — pilot story.** Not drafted yet, deliberately: it will
draw its facts, screenshots, and quotes from
`docs/marketing/case-study-catnipandcattitude-draft.md`, which cannot be
finalized until the cutover is done and Catnip & Cattitude's written consent
is on file (see that file's publication checklist). Draft the post only from
the approved case study.

**Measurement.** Every link below carries UTM tags
(`utm_campaign=gated-journey-launch`), so each post's applicant lift is
measurable two ways:

1. UTM-attributed sessions and conversions in analytics, split by
   `utm_content` (angle) and `utm_source` (platform); and
2. funnel-beacon **views** on the onboarding order forms — pid 16
   (pre-501c3 onboarding) and pid 33 (501c3 onboarding) — via
   `scripts/funnel-report.mjs`, compared against the pre-post baseline.

**One CTA per post.** Each draft ends with exactly one ask. Keep it that way
when editing — a second ask splits the click.

---

## Suggested visuals

- **Social card (default for every post):** `public/Images/journey-og.png`
  (1200×630) — the five-stage journey diagram with the highlighted funding
  gate and the freeforcharity.org wordmark. Source is
  `public/Images/journey-og.svg`; re-render with
  `node scripts/render-og-image.mjs` after edits. This PNG is also the
  `og:image` for `/why-website-first/`, so posts that share that link bare
  get the same card automatically.
- **Live diagram:** the interactive version at
  `https://www.freeforcharity.org/why-website-first/` (screenshot if a
  platform needs an alternate crop).
- `[PLACEHOLDER — consent-gated]` **Before/after screenshots of Catnip &
  Cattitude** (original GoDaddy site vs. the GitHub Pages rebuild) for the
  rung-1 pilot story. Do not capture-and-post until written publicity
  consent is on file per the
  [publicity consent policy](https://www.freeforcharity.org/publicity-consent-policy/).

---

## LinkedIn drafts

### LinkedIn 1 — Charity-recruiting angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/help-for-charities/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=charity-recruiting`

Is your 501(c)(3) still paying for hosting — or worse, running without a
website at all?

Free For Charity builds verified nonprofits a complete website at no cost, and
we do it in an order most providers won't: the website comes first. Your site
is built by volunteers from our open-source template, goes live on free GitHub
Pages hosting, and is validated end to end with your team — before a single
dollar is spent. Only then do we register your free .org domain and set up
free Microsoft 365 or Google Workspace email.

No setup fees. No hosting bills. No sunk costs if you're not ready yet.

Apply here:
https://www.freeforcharity.org/help-for-charities/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=charity-recruiting

### LinkedIn 2 — Volunteer-recruiting angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/volunteer/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=volunteer-recruiting`

Want a portfolio project that actually ships — and stays online serving a real
nonprofit?

Free For Charity volunteers build real websites for verified 501(c)(3)
organizations using a modern static stack: GitHub, CI checks, accessibility
testing, and GitHub Pages hosting. Our new gated onboarding journey means every
build has a clear finish line: the charity's site validated live, which
unlocks their free domain and email.

You bring a few hours a week; we bring the template, the process, and a
charity that genuinely needs you. Every merged PR is public proof of your
work.

See open roles:
https://www.freeforcharity.org/volunteer/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=volunteer-recruiting

### LinkedIn 3 — Donor-trust angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/why-website-first/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=donor-trust`

How do you make sure a donated dollar is never wasted? You spend it last.

Free For Charity's onboarding journey is gated: volunteers build and validate
each charity's website on free GitHub Pages hosting before we spend anything
on their domain. If an organization isn't ready, nothing has been lost — no
parked domains, no renewal fees for sites that never launched. When we do
spend, it's on a charity whose site is already live and proven.

We wrote up the full reasoning — donor trust, zero sunk costs, and the four
gates every charity passes through:
https://www.freeforcharity.org/why-website-first/?utm_source=linkedin&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=donor-trust

---

## Facebook drafts

### Facebook 1 — Charity-recruiting angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/help-for-charities/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=charity-recruiting`

Does your nonprofit need a website but not the bills that come with one?

Free For Charity builds websites for verified nonprofits completely free —
designed by volunteers and hosted for free. Once your site is live and
validated, we register your free .org domain, and approved 501(c)(3)
organizations get free nonprofit email (Microsoft 365 or Google Workspace).
Still waiting on your IRS determination? Your email is set up the moment it
comes through.

Everything before the domain purchase costs nothing, so there's zero risk.
Apply here:
https://www.freeforcharity.org/help-for-charities/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=charity-recruiting

### Facebook 2 — Volunteer-recruiting angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/volunteer/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=volunteer-recruiting`

Know your way around websites (or want to learn)? A charity near you needs
that.

Our volunteers build free websites for real nonprofits — from first template
to validated launch on GitHub Pages. You'll follow a clear five-stage journey,
get support from experienced builders, and end with public, shippable work you
can point to.

A few hours a week changes a charity's whole online presence. Join us:
https://www.freeforcharity.org/volunteer/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=volunteer-recruiting

### Facebook 3 — Donor-trust angle

**Link (UTM-tagged):**
`https://www.freeforcharity.org/why-website-first/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=donor-trust`

Here's a promise most organizations can't make: we never spend money on a
charity's website until the website already works.

Free For Charity builds and validates every charity site on free hosting
first. Only when the site is live and proven do we buy the domain — so every
donated dollar buys something real. Read how the gated journey works:
https://www.freeforcharity.org/why-website-first/?utm_source=facebook&utm_medium=social&utm_campaign=gated-journey-launch&utm_content=donor-trust

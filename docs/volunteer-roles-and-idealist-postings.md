# Volunteer Roles — FFC Admin details, Idealist applications & posting kit

This is the operational companion to the **Volunteer Roles** section on
`/volunteer` (`src/components/volunteer/Free-For-Charity/index.tsx`). It covers:

1. The role → links matrix (what's live vs. pending)
2. A ready-to-paste **Idealist posting kit** (exact fields) for all 7 roles
3. The **FFC Admin (ffcadmin.org) supporting docs** to create — including the
   full content for the missing "Volunteer Recruiter & Onboarding Manager" page
   and the cross-links to add

> Roles and details are sourced from the live ffcadmin.org `/volunteer/<role>/`
> pages and the two live Idealist postings. Where a field wasn't stated on the
> source, the **house defaults** in §2 are used and flagged.

---

## 1. Role → links matrix

| #   | Role                                         | FFC Admin details                                        | Idealist application                                                                                                                                                                                    | Status                 |
| --- | -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | **Web Developer** ⭐                         | `https://ffcadmin.org/volunteer/web-developer/`          | [Charity Web Developer](https://www.idealist.org/en/volunteer-opportunity/c3d5f8b143224d4dbe7074d138a63370-charity-web-developer-state-college-pa-free-for-charity-state-college)                       | ✅ both live           |
| 2   | Microsoft 365 Administrator                  | `https://ffcadmin.org/volunteer/microsoft-365-admin/`    | _general board_                                                                                                                                                                                         | ⚠️ needs posting       |
| 3   | Google Workspace Administrator               | `https://ffcadmin.org/volunteer/google-workspace-admin/` | _general board_                                                                                                                                                                                         | ⚠️ needs posting       |
| 4   | Data & Analytics                             | `https://ffcadmin.org/volunteer/data-analytics/`         | _general board_                                                                                                                                                                                         | ⚠️ needs posting       |
| 5   | Canva Designer                               | `https://ffcadmin.org/volunteer/canva-designer/`         | _general board_                                                                                                                                                                                         | ⚠️ needs posting       |
| 6   | Military Volunteers (MOVSM)                  | `https://ffcadmin.org/volunteer/military-volunteers/`    | _general board_                                                                                                                                                                                         | ⚠️ needs posting       |
| 7   | **Volunteer Recruiter & Onboarding Manager** | _page pending — see §3_                                  | [Recruiter & Onboarding](https://www.idealist.org/en/volunteer-opportunity/685f715b4d294936898237da5d2649a6-volunteer-recruiter-and-onboarding-manager-state-college-pa-free-for-charity-state-college) | ⚠️ needs ffcadmin page |

- ⭐ = the headline "most needed" ask (new-model AI web development).
- **General board:** `https://www.idealist.org/en/nonprofit/356bfc8e2ae64f83beea4a4e677e99d7-free-for-charity-state-college#opportunities`
- The `/volunteer` cards already point each role at its FFC Admin page (where it
  exists) and its best available Idealist link. Once postings #2–#6 exist, swap
  those cards' `idealistUrl` from `IDEALIST_BOARD` to the specific posting URL.

---

## 2. Idealist posting kit (exact fields, ready to paste)

Idealist's **volunteer-opportunity** form uses these labels (verbatim from the
two live FFC postings — note it's "Cause Areas", not "Areas of Focus", and a
split "Time Commitment" / "Commitment Details"):

`Title` · `Recurrence` · `Time Commitment` · `Commitment Details` ·
`Volunteers Needed` · `Cause Areas` · `Benefits` · `Participation Requirements` ·
`Requirements` · `Age Requirement` · `Long-term opportunity` · `Description` ·
`Location` · `Associated Location` · application form ("Please fill out this form")

### House defaults (apply to every role unless the role overrides them)

| Field                                   | Default value                                                                                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Recurrence                              | Recurring                                                                                                                                      |
| Time Commitment                         | A few hours per week                                                                                                                           |
| Commitment Details                      | At least 100 hours per year; flexible, self-scheduled; long-term encouraged.                                                                   |
| Volunteers Needed                       | Multiple                                                                                                                                       |
| Age Requirement                         | 18 or older                                                                                                                                    |
| Long-term opportunity                   | Yes                                                                                                                                            |
| Location                                | Remote (United States) — FFC operates hybrid from State College, PA                                                                            |
| Associated Location                     | Free For Charity, 301 Science Park Road, Suite 119, State College, PA 16803                                                                    |
| Cause Areas                             | Science & Technology (+ role-specific below)                                                                                                   |
| How to apply                            | Apply through Idealist                                                                                                                         |
| Prerequisite (put in every Description) | "Before starting, all volunteers complete the free **Core Competencies Training** (our proving ground): https://freeforcharity.org/volunteer/" |

---

### Posting 1 — Web Developer _(live; values to keep/refresh)_

- **Title:** Charity Web Developer
- **Cause Areas:** Science & Technology; Community Development
- **Participation Requirements / Skills:** Personal GitHub account with MFA;
  willingness to use an AI coding agent (Claude / GitHub Copilot) responsibly and
  review its output; basic web familiarity (HTML/CSS helpful); confidentiality of
  FFC & charity data; contributions donated under an open-source license. Client
  web-design / theme / SEO experience preferred.
- **Benefits:** Hands-on Next.js + React + Tailwind + AI-agent workflow; GitHub
  Foundations certification path; a portfolio of shipped charity sites; progression
  on the FFC contributor ladder.
- **Description:** Build and maintain free, fast, secure GitHub Pages websites for
  nonprofits using AI development agents. You'll work the Issue → PR → merge flow
  with your AI agent, keep sites accessible and secure, and help charity owners
  hand off to self-service editing. _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/web-developer/ · Training:
  https://ffcadmin.org/training/web-developer/

### Posting 2 — Microsoft 365 Administrator

- **Title:** Microsoft 365 Administrator (Volunteer)
- **Cause Areas:** Science & Technology
- **Participation Requirements / Skills:** GitHub + MFA, a password manager, an AI
  assistant, and a Microsoft 365 account (setup guide provided); interest in
  identity & security. No prior admin experience required.
- **Benefits:** **AB-900 certification (Microsoft 365 Copilot & Agent Administration Fundamentals) — FFC sponsors the exam**; real Microsoft 365
  tenant administration experience (MFA, Conditional Access, compliance);
  contributor-ladder progression.
- **Description:** Run email, identity, and security for the charities FFC supports —
  provision mailboxes and licenses, enforce MFA and Conditional Access, and manage
  compliance and data retention. _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/microsoft-365-admin/

### Posting 3 — Google Workspace Administrator

- **Title:** Google Workspace Administrator (Volunteer)
- **Cause Areas:** Science & Technology
- **Participation Requirements / Skills:** GitHub + MFA, a password manager, an AI
  assistant, and a Google Workspace account (setup guide provided). Personal account,
  real name, MFA on.
- **Benefits:** Google Workspace administration experience (users, groups, shared
  drives, security controls); contributor-ladder progression.
- **Description:** Manage Google Workspace for charities — provision users, groups,
  and shared drives, configure security and sharing controls, and support charity
  staff on Workspace tools, coordinating with the web and analytics roles.
  _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/google-workspace-admin/ · Training:
  https://ffcadmin.org/training/google-workspace-admin/

### Posting 4 — Data & Analytics

- **Title:** Data & Analytics Volunteer
- **Cause Areas:** Science & Technology
- **Participation Requirements / Skills:** GitHub + MFA, a password manager, and an AI
  assistant (setup guide provided); interest in analytics, dashboards, and SEO.
- **Benefits:** Hands-on analytics (consent-gated tracking, dashboards, impact
  reporting) and on-page SEO experience; contributor-ladder progression.
- **Description:** Measure impact for the charities FFC supports — configure
  consent-gated analytics and event tracking, build dashboards and impact reports,
  maintain on-page SEO, and partner with web developers during site builds.
  _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/data-analytics/ · Training:
  https://ffcadmin.org/training/data-analytics/

### Posting 5 — Canva Designer

- **Title:** Canva Designer Volunteer
- **Cause Areas:** Science & Technology; Arts & Culture
- **Participation Requirements / Skills:** GitHub + MFA, a password manager, an AI
  assistant, and a Canva account (setup guide provided); an eye for clean,
  on-brand design.
- **Benefits:** Canva Pro access; Canva Design School courses; a brand-design
  portfolio; contributor-ladder progression.
- **Description:** Create brand identities and marketing materials for nonprofits
  using Canva Pro — build complete brand kits and style guides, social media and
  email templates, and print/marketing collateral. _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/canva-designer/ · Training:
  https://ffcadmin.org/canva-designer-path/

### Posting 6 — Volunteer Recruiter & Onboarding Manager _(live; values to keep/refresh)_

- **Title:** Volunteer Recruiter and Onboarding Manager (State College PA)
- **Cause Areas:** Economic Development; Housing & Homelessness; Science & Technology
- **Time Commitment / Commitment Details:** Full-time volunteer — **minimum 8 hours/week
  for 10 months, or 800 hours/year** (heavier than the 100-hr house default).
- **Requirements:** Self-motivated and able to work proactively; full-time volunteer
  status; valid Driver's License; attend Orientation; 18+.
- **Responsibilities (Description body):** Develop and refine volunteer opportunities
  as new projects launch; set up opportunities in VolunteerMatch and on the website;
  perform initial sorting of applicants to verify requirements; enter all contacts
  into the charity CRM and other systems. _Prerequisite (above)._
- **Languages:** English (posting also offered in Spanish and Portuguese).
- **Location:** Remote, or the State College, PA office; volunteer must be in the US.

### Posting 7 — Military Volunteers (MOVSM)

- **Title:** Military Volunteers — earn MOVSM recognition
- **Cause Areas:** Science & Technology; (add Veterans if available)
- **Participation Requirements / Skills:** Open to service members and veterans;
  contribute in any FFC role (development, administration, design, analytics) — bring
  the skills for whichever track you pick.
- **Benefits:** Eligibility toward the **Military Outstanding Volunteer Service Medal
  (MOVSM)** plus all the benefits of your chosen role; hours tracked via self-report +
  board attestation.
- **Description:** Serving or a veteran? Contribute in any FFC role and track
  qualifying volunteer hours toward MOVSM recognition. Text FFC at 520-222-8104 to find
  your fit. _Prerequisite (above)._ Details:
  https://ffcadmin.org/volunteer/military-volunteers/ · Eligibility:
  https://ffcadmin.org/movsm/

---

## 3. FFC Admin (ffcadmin.org) supporting docs to create

> These live in the **ffcadmin.org repository**, not this one. They're specified
> here as ready-to-apply content; create them in that repo (this session's GitHub
> access is scoped to `freeforcharity.org`).

### 3a. NEW page — `/volunteer/volunteer-recruiter-onboarding/`

Match the existing `/volunteer/<role>/` page pattern. Suggested content:

- **Title:** Volunteer Recruiter & Onboarding Manager
- **Summary:** Manage Free For Charity's volunteer pipeline — post opportunities,
  screen applicants, and onboard new volunteers so every other role can grow.
- **What you'll do:**
  - Develop and refine volunteer opportunities as new projects launch
  - Set up opportunities in VolunteerMatch and on the website
  - Perform initial screening of applicants against role requirements
  - Enter all contacts into the charity CRM and supporting systems
- **Commitment:** Full-time volunteer — at least 8 hours/week for 10 months
  (≈800 hours/year). Valid Driver's License; attend Orientation; 18+.
- **Prerequisite & setup (match sibling pages):** Core Competencies Training first;
  personal accounts with MFA (GitHub, password manager, AI assistant); confidentiality;
  responsible AI use; unpaid / at-will / open-source contributions.
- **Apply:** Link to the live Idealist posting (Recruiter & Onboarding) and back to
  `https://freeforcharity.org/volunteer/`.

### 3b. Cross-links to add on ffcadmin.org

- [ ] Add the new Recruiter role to the **`/volunteer/` index** role grid.
- [ ] Add it to **`/get-involved/`** if that page lists roles.
- [ ] Confirm the Recruiter page links out to the Idealist posting + the FFC site
      `/volunteer/`.

### 3c. Fix the Microsoft 365 training-track slug

The M365 volunteer page links to **`/training-plan/`**, while Web Developer / Google
Workspace / Data & Analytics use **`/training/<slug>/`**. Either create
`/training/microsoft-365-admin/` for consistency, or confirm `/training-plan/` is the
intended target. (Canva intentionally uses `/canva-designer-path/`.)

---

## 4. When the 5 missing Idealist postings go live

After creating postings #2–#6 on Idealist, update the role cards so each links to its
specific posting instead of the general board:

- In `src/components/volunteer/Free-For-Charity/index.tsx`, change the affected
  entries in `volunteerRoles[]` from `idealistUrl: IDEALIST_BOARD` to the new
  posting URL.
- For the Recruiter card, set `adminPath` to the new ffcadmin page from §3a once it
  exists (it's `null` today so the card shows only "Apply on Idealist").

// Canonical deep-links from the freeforcharity.org marketing frontend to the
// detailed, authoritative guides on the FFC Admin portal (ffcadmin.org).
//
// freeforcharity.org is the public marketing site; ffcadmin.org holds the
// step-by-step workflows and is the single source of truth. Every product /
// guide page on this site should point at the matching ffcadmin.org page
// instead of duplicating the steps (which is how the old copy went stale).
//
// `newModel` = the current GitHub Pages + AI-driven-development guide.
// `legacy`   = the WordPress/cPanel equivalent under ffcadmin.org's
//              /legacy-wordpress-administration/ section (kept for existing
//              charities still on the legacy stack).
//
// Slugs verified against https://ffcadmin.org/sitemap.xml.

export const FFC_ADMIN_BASE = 'https://ffcadmin.org'

export type AdminLink = {
  /** Path to the up-to-date (GitHub Pages + AI) guide on ffcadmin.org. */
  newModel: string
  /** Optional path to the legacy WordPress equivalent on ffcadmin.org. */
  legacy?: string
}

/**
 * Keyed by a stable guide topic — usually the page's route slug (e.g.
 * `techstack`, `domains`), but intentionally NOT a 1:1 mirror of `src/app/`
 * folder names: long routes use a short, readable alias (e.g.
 * `service-delivery-stages` for the `free-for-charity-ffc-service-delivery-stages`
 * page), and some entries are supplementary ffcadmin.org guides referenced
 * alongside a page rather than a page of their own (e.g. `build-from-template`,
 * `developer-environment-setup`, `contributor-ladder`, `site-owner`).
 */
export const adminLinks = {
  techstack: {
    newModel: '/tech-stack/',
    legacy: '/legacy-wordpress-administration/wordpress-hosting-techstack/',
  },
  'free-charity-web-hosting': {
    newModel: '/what-ffc-delivers/',
    legacy: '/legacy-wordpress-administration/wordpress-web-hosting/',
  },
  'build-from-template': {
    newModel: '/guides/build-charity-site-from-template/',
  },
  domains: {
    newModel: '/guides/microsoft-365-email/',
    legacy: '/legacy-wordpress-administration/wordpress-domains/',
  },
  'web-developer-training': {
    newModel: '/training/web-developer/',
    legacy: '/legacy-wordpress-administration/wordpress-web-developer-training/',
  },
  'developer-environment-setup': {
    newModel: '/developer-environment-setup/claude-desktop/',
  },
  'service-delivery-stages': {
    newModel: '/sites-list/',
    legacy: '/legacy-wordpress-administration/wordpress-service-delivery-stages/',
  },
  'volunteer-core-competencies': {
    newModel: '/volunteer/',
    legacy: '/legacy-wordpress-administration/wordpress-volunteer-core-competencies/',
  },
  'contributor-ladder': {
    newModel: '/contributor-ladder/',
  },
  'workforce-development': {
    newModel: '/training/',
  },
  'tools-for-success': {
    newModel: '/guides/',
    legacy: '/legacy-wordpress-administration/wordpress-tools-for-success/',
  },
  'online-impacts-onboarding': {
    newModel: '/site-owner/',
    legacy: '/legacy-wordpress-administration/wordpress-online-impacts-onboarding/',
  },
  'guidestar-guide': {
    newModel: '/guides/candid/',
    legacy: '/legacy-wordpress-administration/wordpress-guidestar-guide/',
  },
  'charity-validation': {
    newModel: '/charity-prerequisites/',
    legacy: '/legacy-wordpress-administration/wordpress-charity-validation/',
  },
  'training-programs': {
    newModel: '/training/',
    legacy: '/legacy-wordpress-administration/wordpress-training-programs/',
  },
  onboarding: {
    newModel: '/charity-prerequisites/',
  },
  'site-owner': {
    newModel: '/site-owner/',
  },
  'help-for-charities': {
    newModel: '/what-ffc-delivers/',
  },
  consulting: {
    newModel: '/guides/',
  },
  ffcadmin: {
    newModel: '/',
  },
  'cpanel-backup-sop': {
    // No current-model equivalent: cPanel backups are a legacy WordPress-hosting
    // concern, so newModel points at the FFC Admin portal home and the SOP lives
    // under legacy (keeps the newModel = current / legacy = WordPress contract).
    newModel: '/',
    legacy: '/legacy-wordpress-administration/wordpress-cpanel-backup-sop/',
  },
} satisfies Record<string, AdminLink>

export type AdminLinkKey = keyof typeof adminLinks

/** Build an absolute ffcadmin.org URL from a path (e.g. '/tech-stack/'). */
export function ffcAdminUrl(path: string): string {
  return `${FFC_ADMIN_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

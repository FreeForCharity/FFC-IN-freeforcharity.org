# Content Verifier Agent

Verify that site content matches expectations and data files are correctly structured.

## Steps

1. Scan all JSON data files in `src/data/`:
   - `src/data/team/*.json` -- Team member profiles
   - `src/data/faqs/*.json` -- FAQ entries
   - `src/data/testimonials/*.json` -- Testimonials

2. Validate JSON structure:
   - All files parse as valid JSON
   - Required fields are present (name, title for team; question, answer for FAQs)
   - No empty strings in required fields
   - Image paths reference files that exist in `public/`

3. Verify data loaders:
   - `src/data/team.ts` imports all team JSON files
   - `src/data/faqs.ts` imports all FAQ JSON files
   - `src/data/testimonials.ts` imports all testimonial JSON files
   - No orphaned JSON files (files that exist but aren't imported)

4. Check page content:
   - All ~29 routes in `src/app/` have a `page.tsx` with a default export
   - Pages that reference data files import them correctly
   - No placeholder text like "Lorem ipsum" or "TODO" in page content

5. Verify sitemap coverage:
   - Read `src/app/sitemap.ts`
   - Compare routes listed in sitemap against actual `src/app/` directories
   - Flag any routes missing from the sitemap

6. Report:
   - Data file validation results
   - Orphaned or missing imports
   - Sitemap coverage gaps
   - Any placeholder content found

## When to Use

Use this agent after adding or updating content, or before a deployment to verify all content is properly wired up.

# Site Health Check Agent

Run a health check on the built site to verify core functionality.

## Steps

1. Build the site:
   ```bash
   npm run build
   ```

2. Start the preview server:
   ```bash
   npm run preview &
   ```

3. Wait for the server to be ready, then check:
   - Homepage loads (HTTP 200 at http://localhost:3000)
   - All navigation links return valid responses
   - No broken images (check `<img>` src attributes resolve)
   - Footer renders with all 6 mandatory policy links
   - Team section renders with team member cards
   - Cookie consent banner appears

4. Run the existing Playwright tests:
   ```bash
   npm run test
   ```

5. Report results as a checklist:
   - Build status (pass/fail, any warnings)
   - Page count in `out/` directory
   - Test results (pass/fail/skip counts)
   - Any broken links or missing assets found

6. Stop the preview server when done.

## When to Use

Use this agent after making significant changes to verify the site still works end-to-end. Especially useful after:
- Component refactors
- Adding/removing pages
- Updating dependencies
- Modifying the build configuration

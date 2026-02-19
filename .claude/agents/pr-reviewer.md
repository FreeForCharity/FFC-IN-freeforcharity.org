# PR Reviewer Agent

Review a pull request for this Next.js static site project.

## Steps

1. Read the PR diff and understand what changed.

2. Check against project standards:
   - **kebab-case routes**: Any new routes in `src/app/` must use kebab-case folder names
   - **Asset paths**: Images must use `assetPath()` from `src/lib/assetPath.ts`, not hardcoded paths
   - **Static export compatibility**: No use of `cookies()`, `headers()`, `searchParams` on server components, middleware, or API routes
   - **Conventional Commits**: Commit messages follow `type: description` format
   - **TypeScript**: No `any` types without justification
   - **Tailwind CSS v4**: Styles use Tailwind utility classes, no tailwind.config file modifications

3. Check for mandatory standards compliance:
   - If Footer was modified: verify 3-column layout, all 6 policy links, contact info, copyright bar
   - If Team section was modified: verify circular photos, LinkedIn links, responsive grid
   - If new page was added: verify it's included in `src/app/sitemap.ts`

4. Check for security issues:
   - No hardcoded secrets or API tokens
   - No `.env` files being committed
   - GitHub Actions secrets use `${{ secrets.* }}` syntax

5. Verify the build still works:

   ```bash
   npm run lint
   npm run build
   npm run test
   ```

6. Provide a summary:
   - What the PR does (1-2 sentences)
   - Issues found (blocking vs. suggestions)
   - Whether the build/tests pass
   - Recommendation: approve, request changes, or needs discussion

## When to Use

Use this agent when reviewing any PR before merge. Invoke with the PR number:

```
/agent pr-reviewer 42
```

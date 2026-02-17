# Contributing to Free For Charity

Thank you for your interest in contributing to Free For Charity! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Project Structure](#project-structure)

## Code of Conduct

Free For Charity is committed to providing a welcoming and inclusive environment. We expect all contributors to:

- Be respectful and considerate
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other contributors

## Getting Started

### Prerequisites

- **Node.js**: Version 20.x (tested with v20.19.6)
- **npm**: Comes with Node.js
- **Git**: For version control
- **Code Editor**: VS Code recommended with TypeScript support

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/freeforcharity-web.git
   cd freeforcharity-web
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/FreeForCharity/freeforcharity-web.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to see the site

## Development Workflow

### Creating a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Make your changes** in small, logical commits
2. **Test your changes** frequently:
   ```bash
   npm run lint        # Check code quality
   npm run build       # Test production build
   npm test           # Run automated tests
   ```
3. **Commit with descriptive messages**:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add team member profile page
fix: correct logo alignment in mobile view
docs: update README with deployment instructions
test: add tests for contact form validation
```

## Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- **Enable strict mode**: Already configured in `tsconfig.json`
- **Type everything**: Avoid `any` types when possible
- **Use interfaces** for component props

Example:
```typescript
interface TeamMemberProps {
  name: string;
  title: string;
  bio?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, title, bio }) => {
  // Component implementation
};
```

### React Components

- **Use functional components** with hooks
- **Keep components small** and focused
- **Extract reusable logic** into custom hooks
- **Use descriptive names** for components and props

### Styling

- **Use Tailwind CSS** utility classes
- **Responsive design**: Mobile-first approach
- **Consistency**: Follow existing patterns in the codebase
- **Accessibility**: Ensure proper ARIA labels and semantic HTML

Example:
```tsx
<button
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
             transition-colors duration-200 focus:outline-none focus:ring-2 
             focus:ring-blue-500 focus:ring-offset-2"
  aria-label="Submit form"
>
  Submit
</button>
```

### File Organization

- **Components**: Place in appropriate directory under `src/components/`
- **Pages**: Add to `src/app/` following Next.js App Router conventions
- **Data**: JSON files in `src/data/` with corresponding TypeScript loaders
- **Utilities**: Helper functions in `src/lib/`
- **Tests**: Place in `tests/` directory

## Testing Guidelines

### Before Submitting

Always run these commands before submitting a pull request:

```bash
# 1. Run linter (expect 11 warnings - documented)
npm run lint

# 2. Build the project
npm run build

# 3. Run automated tests
npm test

# 4. Manual testing
npm run preview
# Test in browser at http://localhost:3000
```

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works (desktop and mobile)
- [ ] All links navigate properly
- [ ] Forms submit correctly
- [ ] Images display properly
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] No console errors in browser
- [ ] Accessibility: Keyboard navigation works

### Writing Tests

When adding new features, consider adding tests:

```typescript
// tests/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    
    const element = page.locator('[data-testid="my-element"]');
    await expect(element).toBeVisible();
  });
});
```

Run your tests:
```bash
npm test                 # All tests
npx playwright test my-feature.spec.ts  # Specific test
```

## Submitting Changes

### Pull Request Process

1. **Update from upstream**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Push to your fork**:
   ```bash
   git push origin your-feature-branch
   ```

3. **Create Pull Request** on GitHub:
   - Use a descriptive title
   - Reference any related issues
   - Describe your changes in detail
   - Include screenshots for UI changes
   - List any breaking changes

4. **Respond to feedback**:
   - Address review comments
   - Make requested changes
   - Push updates to the same branch

### Pull Request Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Lint passed
- [ ] Build successful
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Fixes #123
```

## Project Structure

Understanding the project structure helps you know where to make changes:

```
freeforcharity-web/
├── src/
│   ├── app/              # Next.js pages (29 routes)
│   │   ├── page.tsx     # Homepage
│   │   ├── layout.tsx   # Root layout
│   │   └── [pages]/     # Other pages
│   ├── components/       # React components
│   │   ├── Header/      # Site header
│   │   ├── Footer/      # Site footer
│   │   ├── UI/          # Reusable UI components
│   │   └── [others]/    # Feature-specific components
│   ├── data/            # Content as JSON
│   │   ├── faqs/        # FAQ entries
│   │   ├── team/        # Team members
│   │   └── testimonials/ # Testimonials
│   └── lib/             # Utility functions
├── public/              # Static assets
│   ├── Images/          # Image files
│   └── Svgs/            # SVG files
├── tests/               # Playwright tests
├── .github/             # GitHub workflows and configs
└── [config files]       # Project configuration
```

## Content Updates

### Editing JSON Content

To update team members, FAQs, or testimonials:

1. **Find the JSON file** in `src/data/`
2. **Edit the content**:
   ```json
   {
     "name": "John Doe",
     "title": "Board Member",
     "bio": "Description here..."
   }
   ```
3. **Test your changes** by running the dev server

### Adding New Content

Create a new JSON file following the existing format, then import it in the corresponding TypeScript loader file.

## Getting Help

If you need help:

- **Check documentation**: README.md, TESTING.md, and this file
- **Review existing code**: Look at similar features for examples
- **Ask questions**: Open a discussion on GitHub
- **Report bugs**: Create an issue with detailed information

## Questions?

If you have questions about contributing, please:

1. Check the documentation first
2. Search existing issues on GitHub
3. Open a new discussion if needed

Thank you for contributing to Free For Charity! Your efforts help nonprofits reduce costs and increase their impact.

---

**Last Updated**: December 2025

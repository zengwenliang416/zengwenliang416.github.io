# Git Conventions Reference

## Commit Format

**Standard**: Conventional Commits

**Prefix Types**:
- `feat:` - New features or functionality additions
- `fix:` - Bug fixes and corrections
- `Updated with Dev Metrics` - Automated WakaTime statistics updates

**Message Style**:
- Descriptive and action-oriented
- Focus on user-facing or architectural changes
- Include technical details when relevant (e.g., "zero dependencies", "base path", "subpath deployment")
- Use imperative mood (e.g., "add", "fix", "update")

**Examples**:
```
feat: add Chinese/English locale toggle with zero dependencies
fix: update base path to root for username.github.io deployment
feat: add paper citations and update email
feat: redesign portfolio with Awwwards-style bold contrasting colors
fix: set vite base path for GitHub Pages subpath
```

## Branch Strategy

**Active Branches**:
- `main` - Source branch, all development commits land here
- `gh-pages` - Auto-generated deployment branch (managed by CI/CD)

**Workflow**:
```
Developer Push → main branch → GitHub Actions → Build → gh-pages branch → GitHub Pages CDN
```

**Protected Branches**: `gh-pages` is managed by automation, never commit manually

## CI/CD Pipelines

### 1. GitHub Pages Deployment

**Workflow**: `.github/workflows/deploy.yml`

**Trigger**:
- Automatic: Push to `main` branch
- Manual: `workflow_dispatch`

**Process**:
1. Checkout repository (actions/checkout@v4)
2. Setup Node.js 20 with npm cache
3. Install dependencies (`npm ci`)
4. Build production bundle (`npm run build`)
5. Deploy to `gh-pages` branch (peaceiris/actions-gh-pages@v4)

**Permissions**: `contents: write`

**Output**: Publishes `./dist` to `gh-pages` branch

### 2. WakaTime Metrics Update

**Workflow**: `.github/workflows/waka-readme.yml`

**Trigger**:
- Scheduled: Daily at 12am IST (cron: `30 18 * * *`)
- Manual: `workflow_dispatch`

**Function**: Updates README.md with coding statistics

**Metrics**:
- Lines of code
- Commit activity
- Days of week activity
- Language distribution
- OS usage
- Project breakdown
- Timezone
- Editor usage
- Short profile info

**Requirements**: `WAKATIME_API_KEY` and `GH_TOKEN` secrets

## Deployment Flow

**Target**: GitHub Pages at `username.github.io` (root deployment)

**Base Path Configuration**:
- Vite base path: `/` (configured in `vite.config.ts`)
- Historical evolution: `/Zengwenliang0416/` → `/`

**Deployment Sequence**:
```
git push origin main
  ↓
GitHub Actions triggered
  ↓
npm ci → npm run build
  ↓
./dist directory created
  ↓
peaceiris/actions-gh-pages@v4 publishes to gh-pages
  ↓
GitHub Pages CDN serves live site
```

**Build Artifacts**:
- Bundled React application
- Optimized static assets
- Entry point: `index.html`

## Best Practices

1. **Commit Messages**: Always use conventional commit prefixes
2. **Branch Usage**: All development on `main`, never touch `gh-pages`
3. **Deployment**: Push to `main` triggers automatic deployment, no manual steps required
4. **Dependencies**: Use `npm ci` for reproducible builds (matches CI environment)
5. **Build Verification**: Test locally with `npm run preview` before pushing

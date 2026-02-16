# Build & Deployment Architecture

## Build Pipeline

**System**: Vite 6 + TypeScript 5.7

**Process**:
```
tsc -b → vite build → ./dist
```

**Scripts**:
- `npm run dev`: Development server with HMR
- `npm run build`: TypeScript compilation + production bundling
- `npm run preview`: Local preview of production build

## Vite Configuration

**File**: `/vite.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

**Characteristics**:
- Minimal configuration (single React plugin)
- Base path: `/` (username.github.io root deployment)
- React Fast Refresh for HMR
- No custom chunk splitting or build optimizations

## TypeScript Configuration

**Target**: ES2020
**Module System**: ESNext with bundler resolution
**JSX**: Automatic runtime (`react-jsx`)
**Strict Mode**: Enabled (relaxed unused variable checks)
**Build Mode**: `noEmit: true` (Vite handles compilation)

**Library Support**: ES2020, DOM, DOM.Iterable

**App Config** (`tsconfig.app.json`): Extends main config with no overrides (single-app structure)

## Development Workflow

1. **Local Development**: `npm run dev` starts Vite dev server with HMR
2. **Type Checking**: TypeScript compiler runs in watch mode
3. **Production Preview**: `npm run preview` serves built artifacts locally
4. **Deployment**: Push to `main` triggers automated CI/CD

## CI/CD Pipeline

**Platform**: GitHub Actions
**Trigger**: Push to `main` branch (also manual dispatch)

**Workflow** (`.github/workflows/deploy.yml`):

```yaml
1. actions/checkout@v4           # Clone repository
2. actions/setup-node@v4         # Setup Node.js 20 with npm cache
3. npm ci                        # Clean install dependencies
4. npm run build                 # Production build
5. peaceiris/actions-gh-pages@v4 # Deploy to gh-pages branch
```

**Permissions**: `contents: write` (required for gh-pages push)

**Build Artifacts**:
- Bundled React app with automatic code splitting
- Optimized assets (images, fonts, JSON)
- Static HTML entry point

## Deployment Strategy

**Target**: GitHub Pages (username.github.io)

**Branch Structure**:
- **Source**: `main` branch
- **Artifact**: `gh-pages` branch (auto-generated)
- **Output Directory**: `./dist`

**Deployment Flow**:
```
main push → GitHub Actions → build → gh-pages branch → GitHub Pages CDN
```

**Base Path Evolution**:
- Previous: `/Zengwenliang0416/` (subpath deployment)
- Current: `/` (root deployment for username.github.io)

## Dependencies

**Total Packages**: 16 (8 production + 8 dev)

**Production** (8):
- `react@18.3.1`, `react-dom@18.3.1` (framework)
- `framer-motion@11.15.0` (animations)
- `@react-three/fiber@8.17.10`, `@react-three/drei@9.117.0`, `three@0.170.0` (3D graphics)

**Development** (8):
- `vite@6.0.5`, `typescript@5.7.2`, `@vitejs/plugin-react@4.3.4` (build tools)
- `tailwindcss@3.4.17`, `postcss@8.4.49`, `autoprefixer@10.4.20` (styling)
- `@types/react@18.3.12`, `@types/react-dom@18.3.1`, `@types/three@0.170.0` (types)

**Philosophy**: Minimal focused stack, no unnecessary dependencies

**Optimization Note**: Three.js dependencies (~500KB) may be unused in current implementation. Candidate for tree-shaking analysis.

## Additional Workflows

**WakaTime Metrics** (`.github/workflows/waka-readme.yml`):
- **Schedule**: Daily at 12am IST (cron: `30 18 * * *`)
- **Function**: Updates README with coding statistics
- **Metrics**: Lines of code, commits, languages, OS, editors, projects, timezone

---

**Build System**: Vite 6 (fast HMR, optimized production builds)
**Deployment**: Automated via GitHub Actions to GitHub Pages
**Type Safety**: Full TypeScript coverage with strict mode
**Dependency Count**: 16 total packages (minimal approach)

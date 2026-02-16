# Requirements - GitHub Portfolio Page Complete Redesign

## Scenario
- **Mode**: from_scratch (complete redesign)
- **Tech Stack**: React + Vite + TailwindCSS
- **3D Engine**: Three.js via @react-three/fiber + @react-three/drei
- **Animation**: Framer Motion
- **Deployment**: GitHub Pages via GitHub Actions
- **Purpose**: Personal portfolio / GitHub profile showcase

## Functional Requirements

### FR-1: Navigation
- Fixed top navigation with glassmorphism backdrop
- Smooth scroll to sections
- Active section indicator
- Mobile hamburger menu

### FR-2: Hero Section
- Full-viewport 3D animated background (React Three Fiber)
- Name display with visual effect (glitch / morphing / particle text)
- Role typing animation cycling through titles
- "Open to opportunities" status badge
- CTA buttons: GitHub profile + Explore projects
- Scroll indicator with animation

### FR-3: Stats Display
- Key metrics: 43+ repos, 6 languages, 80+ stars, 2 papers, 3+ MCP servers
- Animated counters on scroll into view
- Marquee or grid layout

### FR-4: Skills/Tech Stack
- Categorized display: Languages, Frontend, Backend, Infrastructure, AI/ML, Databases
- Interactive cards with hover effects
- Tags: Python, TypeScript, JavaScript, Swift, Rust, Java, Vue 3, React, TailwindCSS, FastAPI, Node.js, Spring Boot, Django, Docker, Kubernetes, GitHub Actions, Nacos, PyTorch, GNN, MCP Protocol, Deep Learning, MySQL, MongoDB, Redis, PostgreSQL

### FR-5: Featured Projects (8 total)
- mcp-server-sequential-thinking (JavaScript, MCP, 42 stars)
- claude-notifier (Swift, macOS, 17 stars)
- banana-image-mcp (Python, MCP, 11 stars)
- IWSS (Python, Deep Learning, CV, 8 stars)
- AI-Cloth (Python, Deep Learning, 2 stars)
- Mermaid_General_Pic (Vue 3, Node.js, 1 star)
- 12306QueryMaster (FastAPI, Vue 3, 1 star)
- ClosetCutie-API (Rust, REST API)

### FR-6: Publications
- GDilatedDTA - Drug-target binding affinity prediction using graph dilated convolution
- ParaCPI - Parallel graph convolutional network for compound-protein interaction prediction

### FR-7: Footer/Contact
- GitHub link, Email link
- Copyright 2025

## Non-Functional Requirements

### NFR-1: Performance
- Smooth 60fps 3D animation with React Three Fiber
- Lazy reveal animations via Framer Motion
- Responsive: desktop, tablet, mobile
- Code splitting for 3D components

### NFR-2: Visual Impact
- Technically impressive (showcasing dev skills)
- 3D effects via React Three Fiber
- Interactive elements (mouse tracking, hover, parallax)
- Dark theme with modern color palette

### NFR-3: Deployment
- Vite build → `dist/` folder
- GitHub Actions auto-deploy to GitHub Pages
- CDN fonts only

### NFR-4: Code Quality
- Component-based React architecture
- TailwindCSS for styling
- Clean, maintainable code structure

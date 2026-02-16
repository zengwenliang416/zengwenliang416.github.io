# Requirements - GitHub Portfolio Page Redesign

## Scenario
- **Mode**: from_scratch (complete redesign)
- **Tech Stack**: vanilla HTML/CSS/JS + Three.js (CDN)
- **Deployment**: GitHub Pages (single `index.html`)
- **Purpose**: Job seeking - Full-Stack Developer

## Functional Requirements

### FR-1: Navigation
- Fixed top navigation with blur backdrop
- Smooth scroll to sections
- Visual indicator for scroll state

### FR-2: Hero Section
- Full-viewport 3D animated background (Three.js)
- Name display with visual effect (glitch, morphing, or similar)
- Role typing animation cycling through titles
- "Open to opportunities" status badge
- CTA buttons: GitHub profile + Explore projects
- Scroll indicator

### FR-3: Stats Display
- Key metrics: 43+ repos, 6 languages, 80+ stars, 2 papers, 3+ MCP servers
- Animated number counters or marquee

### FR-4: Skills/Tech Stack
- Categorized display: Languages, Frontend, Backend, Infrastructure, AI/ML, Databases
- Tags: Python, TypeScript, JavaScript, Swift, Rust, Java, Vue 3, React, TailwindCSS, FastAPI, Node.js, Spring Boot, Django, Docker, Kubernetes, GitHub Actions, Nacos, PyTorch, GNN, MCP Protocol, Deep Learning, MySQL, MongoDB, Redis, PostgreSQL

### FR-5: Featured Projects (8 total)
- mcp-server-sequential-thinking (JS, 42 stars)
- claude-notifier (Swift, 17 stars)
- banana-image-mcp (Python, 11 stars)
- IWSS (Python, 8 stars)
- CommitCraft (PowerShell, 4 stars)
- AI-Cloth (Python, 2 stars)
- Mermaid_General_Pic (Vue 3 + Node.js, 1 star)
- 12306QueryMaster (FastAPI + Vue 3, 1 star)

### FR-6: Publications
- GDilatedDTA - Drug-target binding affinity prediction
- ParaCPI - Parallel graph convolutional network for CPI

### FR-7: Footer/Contact
- GitHub link, Email link
- Copyright

## Non-Functional Requirements

### NFR-1: Performance
- Smooth 60fps Three.js animation
- Lazy reveal animations on scroll
- Responsive: desktop, tablet, mobile

### NFR-2: Visual Impact
- Must feel technically impressive (showcasing dev skills)
- 3D effects that demonstrate WebGL/Three.js capability
- Interactive elements (mouse tracking, hover effects)
- Dark theme with ice blue / silver white palette

### NFR-3: Deployment
- Single HTML file (inline CSS + JS)
- External CDN only for Three.js and fonts
- No build step required
- GitHub Pages compatible

### NFR-4: Accessibility
- Semantic HTML structure
- Readable text contrast
- Keyboard navigable

# Design System Architecture

## Color Palette

### Dark Backgrounds
```javascript
dark: '#0A0A0A',        // Page background base
'dark-surface': '#141414',  // Elevated surfaces
'dark-card': '#1A1A1A',     // Card components
'dark-border': '#262626',   // Dividers and borders
```

**Usage Strategy**: Four-level hierarchy for depth perception in dark theme. Each level provides subtle elevation through incremental lightness.

---

## Triple Accent System

### Primary Colors
```javascript
coral: '#FF3C5F',       // CTAs, highlights, primary actions
lime: '#BEFF00',        // Energy, code elements, secondary emphasis
indigo: '#6C63FF',      // Depth, variation, tertiary accents
```

### Dim Variants
```javascript
'coral-dim': 'rgba(255,60,95,0.12)',    // Subtle backgrounds
'lime-dim': 'rgba(190,255,0,0.12)',     // Hover states
'indigo-dim': 'rgba(108,99,255,0.12)',  // Muted accents
```

**Rationale**: Three-color system prevents visual monotony while maintaining brand cohesion. Dim variants (12% opacity) provide subtle interactive feedback without overwhelming dark backgrounds.

---

## Text Hierarchy

### Contrast Levels
```javascript
'text-primary': '#FAFAFA',    // High-contrast body text, headings
'text-secondary': '#888888',  // Mid-contrast descriptions, labels
'text-muted': '#555555',      // Low-contrast metadata, timestamps
```

**Selection Color**: `rgba(255, 60, 95, 0.25)` (coral with 25% opacity)

---

## Typography

### Font Stack
```javascript
sans: ['Inter', 'Noto Sans SC', '-apple-system', 'sans-serif']
  → Body text, UI elements
  → Chinese support via Noto Sans SC fallback

mono: ['JetBrains Mono', 'monospace']
  → Code blocks, technical content

display: ['Space Grotesk', 'sans-serif']
  → Headings, hero text, display elements
```

### Loading Strategy
**Location**: `index.html` (lines 8-10)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Performance Optimization**: Preconnect reduces DNS lookup time. Single request loads all weights with `display=swap` for immediate text rendering.

---

## Gradient Text Utilities

### Implementation
**Location**: `src/index.css` (lines 19-34)

```css
.text-gradient-coral {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(135deg, #FF3C5F, #FF8A5C);
}

.text-gradient-lime {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(135deg, #BEFF00, #63FF6C);
}

.text-gradient-multi {
  @apply bg-clip-text text-transparent;
  background-image: linear-gradient(135deg, #FF3C5F, #6C63FF, #BEFF00);
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}
```

### Animated Gradient
**Keyframe**: `gradient-shift` (8s loop)
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Technical Detail**: `background-size: 200%` creates animation headroom. Position shift creates color flow effect without re-rendering DOM.

---

## Noise Overlay Effect

### Implementation
**Location**: `src/index.css` (lines 71-82)

```css
.noise-overlay::before {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9998;
  animation: noise 8s steps(10) infinite;
}
```

**SVG Filter**:
```xml
<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
  </filter>
  <rect width='100%' height='100%' filter='url(%23n)'/>
</svg>
```

**Effect Parameters**:
- `baseFrequency: 0.9` → Fine-grain texture
- `numOctaves: 4` → Depth of noise layers
- `opacity: 0.03` → Subtle film-grain effect
- `200% size` → Prevents edge visibility during animation
- `steps(10)` → Discrete frame jumps for authentic noise aesthetic

---

## TailwindCSS Configuration

### Custom Theme Extension
**Location**: `tailwind.config.js` (lines 4-27)

```javascript
theme: {
  extend: {
    colors: { /* color palette above */ },
    fontFamily: { /* typography stack above */ }
  }
}
```

**Content Paths**:
```javascript
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
```

**Philosophy**: Minimal plugin usage. All visual effects achieved through custom CSS utilities and native Tailwind classes.

---

## Design System Principles

### Awwwards-Style Aesthetic
- **High Contrast**: Near-black backgrounds (#0A0A0A) with near-white text (#FAFAFA)
- **Bold Accents**: Vibrant colors (coral, lime, indigo) create energy against dark backgrounds
- **Motion**: Subtle animations (noise, gradients) add premium feel without distraction

### Multi-Language Typography
- **Latin Scripts**: Inter (humanist sans) for readability
- **CJK Characters**: Noto Sans SC maintains visual consistency for Chinese text
- **Display Text**: Space Grotesk (geometric sans) for modern, technical personality

### Performance Considerations
- **Font Preconnect**: Reduces Google Fonts latency by ~100-200ms
- **Gradient Utilities**: CSS-only (no JS overhead)
- **Noise Overlay**: Data URI SVG avoids additional HTTP request

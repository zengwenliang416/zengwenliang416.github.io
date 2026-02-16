# Animation Patterns Guide

## Adding Scroll-Revealed Sections

### Using RevealOnScroll

Wrap any section with `<RevealOnScroll>` to trigger fade-in + slide-up on scroll:

```tsx
import RevealOnScroll from './ui/RevealOnScroll'

<RevealOnScroll delay={0.2}>
  <section className="py-24">
    {/* Your content */}
  </section>
</RevealOnScroll>
```

**Props**:
- `delay?: number` - Additional delay in seconds (default: 0)
- `className?: string` - CSS classes applied to wrapper

**Behavior**:
- Initial state: `opacity: 0, y: 30`
- Final state: `opacity: 1, y: 0`
- Triggers when element is 60px before viewport
- Animates only once (`once: true`)

**Source**: `src/components/ui/RevealOnScroll.tsx`

## Creating Staggered Card Animations

### Pattern 1: Manual Delay Calculation

```tsx
{items.map((item, i) => (
  <RevealOnScroll key={item.id} delay={i * 0.08}>
    <Card {...item} />
  </RevealOnScroll>
))}
```

**Stagger interval**: 80ms (0.08s)

### Pattern 2: Direct Framer Motion

```tsx
{links.map((link, i) => (
  <motion.a
    key={link.href}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}
  >
    {link.label}
  </motion.a>
))}
```

**Formula**: Base delay (0.3s) + index × interval (0.1s)

### Pattern 3: Character-by-Character

```tsx
const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

{text.split('').map((char, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={letterVariants}
    initial="hidden"
    animate="visible"
  >
    {char}
  </motion.span>
))}
```

**Stagger interval**: 40ms per character

**Example**: `Hero.tsx:5-36` (name animation)

## Using Custom Cursor Hover Effects

The custom cursor automatically detects hover states on:
- All `<a>` elements
- All `<button>` elements
- Elements with `.cursor-hover` class

### Adding Hover to Custom Elements

```tsx
<div className="cursor-hover">
  {/* Your content */}
</div>
```

**Effect**: Cursor ring expands to 56px with coral border

**Note**: Desktop only (hidden on mobile via `hidden md:block`)

### Grouped Hover States

Combine with Tailwind `group` for multi-element effects:

```tsx
<div className="group cursor-hover">
  <img className="group-hover:scale-[1.03] transition-transform duration-700" />
  <h3 className="group-hover:text-gradient-multi">Title</h3>
</div>
```

**Source**: `CustomCursor.tsx:33-35`, `Projects.tsx` (examples)

## Adding CSS Animations

### Creating New Keyframes

1. Define keyframe in `src/index.css`:

```css
@keyframes my-animation {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

2. Apply to element:

```tsx
<div style={{ animation: 'my-animation 2s ease-in-out infinite' }}>
  {/* Content */}
</div>
```

### Creating Utility Classes

For reusable animations, create Tailwind utility:

```css
@layer utilities {
  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}
```

Usage:
```tsx
<div className="animate-pulse-slow">Pulsing element</div>
```

### Existing Animations

Reference for available animations:

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `marquee` | 30s | linear | Horizontal scroll left |
| `marquee-reverse` | 30s | linear | Horizontal scroll right |
| `float` | 20-25s | ease-in-out | Pseudo-3D floating |
| `noise` | 8s | steps(10) | Grain texture shift |
| `gradient-shift` | 8s | ease-in-out | Background position animation |

**Source**: `index.css:36-69`

## Performance Considerations

### IntersectionObserver Throttling

Always use viewport configs to prevent performance issues:

```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: '-60px' }}
/>
```

**Why**:
- `once: true` prevents re-animation on scroll back
- `margin: '-60px'` triggers early for smoother perceived loading

### RAF vs. CSS Transitions

Use `requestAnimationFrame` for high-frequency updates:

```typescript
// ✅ Good: 60fps smooth cursor tracking
const animate = () => {
  pos.cx += (pos.mx - pos.cx) * 0.12
  element.style.left = pos.cx + 'px'
  requestAnimationFrame(animate)
}

// ❌ Bad: Lags on mousemove events
element.addEventListener('mousemove', (e) => {
  element.style.left = e.clientX + 'px'
})
```

**When to use RAF**:
- Mouse-following effects
- Continuous animations (60fps loops)
- Physics simulations

**When to use CSS**:
- Hover states
- Simple transitions
- Keyframe animations

### Transform > Position

Prefer `transform` over `top`/`left` for animations:

```css
/* ✅ GPU-accelerated */
transform: translateY(-4px);

/* ❌ Causes layout recalculation */
top: -4px;
```

**Benefit**: Transforms trigger GPU compositing instead of CPU layout.

### Reducing Bundle Size

Framer Motion supports tree-shaking. Import only needed functions:

```typescript
// ✅ Tree-shakeable
import { motion } from 'framer-motion'

// ❌ Imports entire library
import * as Framer from 'framer-motion'
```

### Avoid Animation Overload

Current limits:
- Hero sequence: 7 staggered elements
- Project grid: 12 cards × 80ms stagger
- Nav links: 3 items × 100ms stagger

**Rule**: Keep total page animations under 30 elements to maintain 60fps on mid-range devices.

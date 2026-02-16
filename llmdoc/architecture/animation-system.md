# Animation System Architecture

## Overview

The portfolio uses a **Framer Motion-first** animation architecture with no 3D libraries. All visual effects are achieved through Framer Motion's declarative API and CSS keyframe animations.

## Framer Motion Patterns

### Variant System

Character-by-character animations use custom variants with staggered timing:

```typescript
const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.04,  // 40ms stagger per character
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}
```

**Usage**: Hero name reveal (`Hero.tsx:5-12`)

### Shared Easing Curve

**Curve**: `[0.16, 1, 0.3, 1]` (cubic-bezier)

**Rationale**: Expo-out-like acceleration creates fast start with smooth deceleration, matching Awwwards-style motion design.

**Used in**:
- Navigation slide-down (`Navigation.tsx`)
- RevealOnScroll wrapper (`RevealOnScroll.tsx:16`)
- Hero character animations (`Hero.tsx:10`)

### Staggered Animation Strategy

#### Sequential Delay Pattern

**Navigation links**:
```typescript
transition={{ delay: 0.1 * i + 0.3 }}  // 100ms intervals starting at 300ms
```

**Project cards**:
```typescript
<RevealOnScroll delay={i * 0.08}>  // 80ms intervals
```

#### Orchestration Timeline

Hero section sequence:
1. Greeting text: 200ms
2. Name character animation: 500ms + 40ms/char
3. Chinese name: 1000ms
4. Role pills: 1200ms
5. Description: 1400ms
6. Stats grid: 1800ms
7. Scroll indicator: 2200ms

### Motion Hooks

#### whileInView

Triggers animation when element enters viewport:

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
/>
```

**Performance**: `once: true` prevents re-animation on scroll back.

#### whileHover

Project cards use lift + scale pattern:

```typescript
whileHover={{ y: -4, borderColor: 'rgba(108,99,255,0.3)' }}
```

Image scaling uses CSS for better performance:
```css
group-hover:scale-[1.03] transition-transform duration-700
```

#### whileTap

Button feedback:
```typescript
whileTap={{ scale: 0.98 }}
```

## CSS Keyframe Animations

### marquee / marquee-reverse

**Duration**: 30s linear infinite

**Technique**: Content duplication (`[...items, ...items]`) + translateX(-50%)

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Usage**: `TechMarquee.tsx:11` (tech stack tags)

### float

**Duration**: 20-25s ease-in-out infinite

**Effect**: Hero background blobs pseudo-3D motion

```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -30px) rotate(2deg); }
  50% { transform: translate(-20px, 20px) rotate(-1deg); }
  75% { transform: translate(20px, 10px) rotate(1deg); }
}
```

**Usage**: `Hero.tsx:46,48` (decorative blobs)

### noise

**Duration**: 8s steps(10) infinite

**Effect**: Subtle grain texture shift

```css
@keyframes noise {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  /* ... 8 more steps ... */
}
```

**Usage**: Applied to `.noise-overlay::before` pseudo-element via SVG filter (`index.css:71-82`)

### gradient-shift

**Duration**: 8s ease-in-out infinite

**Effect**: Multi-color gradient animation via background-position shift

```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Usage**: `.text-gradient-multi` utility class (`index.css:28-33`)

## Performance Optimizations

### IntersectionObserver

- **RevealOnScroll**: Viewport config `margin: '-60px'` triggers animation 60px before element is visible
- **CountUp**: `threshold: 0.3` starts counting when 30% visible
- **One-time triggers**: `once: true` / `triggered.current` prevents repeated work

### requestAnimationFrame

**CustomCursor** uses RAF loop instead of CSS transitions:

```typescript
const animate = () => {
  p.cx += (p.mx - p.cx) * 0.12  // 12% interpolation (exponential easing)
  ring.current.style.left = p.cx + 'px'
  raf = requestAnimationFrame(animate)
}
```

**Why**: 60fps smooth tracking vs. mousemove event lag with CSS transitions

### GPU Acceleration

Transform-based animations (translateX, translateY, scale) trigger GPU compositing instead of CPU layout recalculation.

## Design Tokens

### Color Gradients

- **coral**: `#FF3C5F → #FF8A5C`
- **lime**: `#BEFF00 → #63FF6C`
- **multi**: `#FF3C5F → #6C63FF → #BEFF00` (200% size, animated)

### Timing Constants

- Character stagger: `40ms`
- Card reveal stagger: `80ms`
- Nav link stagger: `100ms`
- Viewport trigger offset: `-60px`
- Default duration: `0.8s` (long animations) / `0.6s` (short)

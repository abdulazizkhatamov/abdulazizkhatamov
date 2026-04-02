---
title: "CSS Animations vs Framer Motion: When to Use Each"
date: "2025-01-28"
excerpt: "Framer Motion is powerful but adds 40KB to your bundle. Understanding when CSS transitions are enough — and when they aren't — is a key frontend skill."
tags: ["CSS", "Framer Motion", "React", "Animation", "Performance"]
published: true
---

Framer Motion is one of those libraries where the API is so good that you start reaching for it by default. But it adds ~40KB gzipped to your bundle and carries runtime overhead for every animated element. Knowing when CSS is enough — and when it isn't — is what separates thoughtful UI work from over-engineered animation.

## Where CSS Wins

CSS handles the majority of UI animations well, and does so with no JavaScript overhead and GPU acceleration by default.

### Hover and focus transitions

```css
.button {
  background: #090909;
  transform: translateY(0);
  transition: background 150ms ease, transform 150ms ease, opacity 150ms ease;
}

.button:hover {
  background: #1a1a1a;
  transform: translateY(-1px);
}
```

For any interaction that's triggered by a CSS pseudo-class (`:hover`, `:focus`, `:active`), CSS transitions are the right choice. They're faster, simpler, and don't add a component re-render.

### Entry animations on static elements

If an element always animates in the same way on page load, CSS keyframes are sufficient:

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-text {
  animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

No JS, no layout effect, no bundle cost.

### Dark mode transitions

```css
:root { --bg: #f0f0ec; }
.dark { --bg: #090909; }

body {
  background: var(--bg);
  transition: background 200ms ease;
}
```

## Where Framer Motion Wins

### Scroll-driven animations

CSS scroll animations are still not universally supported and have limited control. Framer Motion's `useScroll` and `useTransform` are the practical choice:

```tsx
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

return (
  <motion.div ref={ref} style={{ y, opacity }}>
    {children}
  </motion.div>
);
```

### Staggered children

Staggering a list of items based on their index is cumbersome in CSS. In Framer Motion:

```tsx
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.li key={item.id} variants={item}>
      {item.label}
    </motion.li>
  ))}
</motion.ul>
```

### Shared layout animations (layout prop)

This is Framer Motion's killer feature — elements that move between positions in the DOM are smoothly interpolated:

```tsx
<motion.div layoutId="selected-indicator" />
```

When `layoutId` is the same across two elements in different positions, Framer Motion automatically animates the transition. CSS can't do this at all.

### Gesture-based animations

Drag, pan, and pinch interactions with spring physics:

```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  onDragEnd={(_, info) => {
    if (info.offset.x > 80) onSwipeRight();
    if (info.offset.x < -80) onSwipeLeft();
  }}
  whileDrag={{ scale: 1.02 }}
>
  {children}
</motion.div>
```

## Performance Rules for Both

### Always animate `transform` and `opacity`

Both are composited by the browser and don't trigger layout or paint:

```css
/* ✅ Composited — GPU only */
transform: translateX(10px);
opacity: 0.5;

/* ❌ Triggers layout — expensive */
width: 200px;
margin-left: 10px;
```

This rule applies whether you're using CSS or Framer Motion.

### Use `will-change` sparingly

```css
/* ✅ For elements you know will animate */
.hero { will-change: transform; }

/* ❌ Don't put this on everything */
* { will-change: transform; }
```

`will-change` tells the browser to create a compositing layer. Too many layers waste GPU memory.

### Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

In Framer Motion, use the `useReducedMotion` hook:

```tsx
const shouldReduce = useReducedMotion();
const animate = shouldReduce ? {} : { y: [0, -10, 0] };
```

## The Decision Heuristic

Use CSS when:
- The trigger is a CSS pseudo-class (hover, focus, active)
- The element always animates in the same way from a static starting point
- You need maximum performance with minimal bundle impact

Use Framer Motion when:
- The animation depends on scroll position, user gestures, or component state
- You need staggered or sequenced animations across children
- You need `layoutId` for shared element transitions

The best UI code uses both — CSS for the small stuff, Framer Motion for the interactions that CSS can't handle well.

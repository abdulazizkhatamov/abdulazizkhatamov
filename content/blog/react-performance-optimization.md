---
title: "React Performance Optimization: What Actually Moves the Needle"
date: "2025-02-05"
excerpt: "Most React performance advice is either obvious or wrong. Here's what I've found actually makes a measurable difference in production apps."
tags: ["React", "Performance", "Next.js", "JavaScript"]
published: true
---

React performance optimization is one of those topics filled with advice that sounds smart but doesn't move your Lighthouse score at all. After profiling several production apps, here's what I've found actually matters.

## Start With a Measurement

Before touching code, open the React DevTools Profiler and record an interaction that feels slow. Without this, you're guessing. The two things to look for:

- **Render count** — components that re-render far more than expected
- **Render duration** — components that are slow when they do render

Only optimize what the profiler shows is a real problem.

## The Re-render Problem

The most common performance issue isn't slow renders — it's unnecessary ones. Every re-render costs something. The question is whether the cost is justified.

### State Placement

The most impactful fix is often just moving state down:

```tsx
// ❌ Filter state lives at the top level — every keystroke re-renders the entire page
function ProductsPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ExpensiveProductList />   {/* Re-renders on every keystroke */}
      <Sidebar />                {/* Also re-renders */}
      <Footer />                 {/* Also re-renders */}
    </>
  );
}

// ✅ Filter is self-contained
function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
```

Lifting state up is often necessary, but think twice before you do it.

### `memo` — Use It Sparingly

`React.memo` is useful but people reach for it too quickly:

```tsx
// ✅ Warranted: this component is slow to render AND re-renders often with same props
const DataGrid = memo(function DataGrid({ rows }: { rows: Row[] }) {
  // expensive render
});

// ❌ Premature: a simple div with text doesn't need memoization
const Label = memo(function Label({ text }: { text: string }) {
  return <span>{text}</span>;
});
```

`memo` adds overhead on every render (shallow prop comparison). It only helps when the comparison cost is less than the prevented render cost.

### `useCallback` and `useMemo`

Same rule: only use these when passing to a `memo`-wrapped component or when the computation is genuinely expensive.

```tsx
// ✅ Necessary: sortedItems passed to memo'd component, sort is O(n log n)
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
);

// ❌ Unnecessary: cheap computation, not passed to memo'd child
const fullName = useMemo(() => `${first} ${last}`, [first, last]);
// Just write: const fullName = `${first} ${last}`;
```

## Code Splitting

For large React apps, the biggest wins come from splitting code — not micro-optimizing renders.

```tsx
import { lazy, Suspense } from "react";

// The editor is only loaded when the user navigates to it
const RichEditor = lazy(() => import("@/components/RichEditor"));

function PostEditorPage() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <RichEditor />
    </Suspense>
  );
}
```

A 300KB editor bundle that only loads when needed is far better than shaving 2ms off a render.

## List Virtualization

For lists over ~100 items, virtualization is non-negotiable:

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
  });

  return (
    <div ref={parentRef} style={{ height: "600px", overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((vItem) => (
          <div
            key={vItem.index}
            style={{
              position: "absolute",
              top: vItem.start,
              height: vItem.size,
              width: "100%",
            }}
          >
            <ItemRow item={items[vItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

Rendering 1000 DOM nodes vs. 15 visible ones is an order-of-magnitude difference.

## Images

In Next.js, there's no excuse for unoptimized images. The `Image` component handles everything:

```tsx
import Image from "next/image";

// ✅ Automatically resized, WebP-converted, lazy-loaded, prevents CLS
<Image
  src="/project-thumbnail.jpg"
  alt="Project screenshot"
  width={800}
  height={450}
  priority={isAboveFold}  // Prevents LCP penalty for hero images
/>
```

The `priority` prop is important for above-the-fold images — without it, LCP suffers.

## What Not to Bother With

- **Avoiding anonymous functions in JSX** — the performance impact is negligible in modern React. `onClick={() => handler(id)}` is fine.
- **Splitting every component into its own file** — file count doesn't affect bundle size or render performance.
- **`useCallback` everywhere** — function creation is cheap. The overhead from `useCallback` can exceed the overhead it prevents.

## The Real Performance Budget

Perceived performance often has more to do with loading states and skeleton screens than actual render time. A 400ms render that shows a skeleton immediately feels faster than a 50ms render that blocks the UI. Invest in your loading experience before micro-optimizing renders.

Run Lighthouse on production builds, not dev builds. Dev mode adds significant overhead that disappears in production.

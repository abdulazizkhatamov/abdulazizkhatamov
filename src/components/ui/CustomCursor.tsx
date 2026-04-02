"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  /* Dot — snappy */
  const dx = useSpring(mx, { stiffness: 700, damping: 32 });
  const dy = useSpring(my, { stiffness: 700, damping: 32 });

  /* Ring — lagging */
  const rx = useSpring(mx, { stiffness: 140, damping: 20 });
  const ry = useSpring(my, { stiffness: 140, damping: 20 });

  useEffect(() => {
    /* Only show on pointer devices */
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isTouch) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!el.closest(
        "a, button, [role='button'], input, textarea, select, label, summary, [tabindex]"
      );
      setPointer(interactive);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove",   onMove,  { passive: true });
    document.addEventListener("mouseover",   onOver,  { passive: true });
    document.addEventListener("mousedown",   onDown);
    document.addEventListener("mouseup",     onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer ring — follows with lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width:  pointer ? 52 : clicking ? 22 : 36,
          height: pointer ? 52 : clicking ? 22 : 36,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div
          className={[
            "w-full h-full rounded-full border",
            "border-(--color-accent) dark:border-(--color-accent-dark)",
            pointer
              ? "bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle)"
              : "",
          ].join(" ")}
        />
      </motion.div>

      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dx,
          y: dy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible && !pointer ? 1 : 0,
          width:  clicking ? 4 : 6,
          height: clicking ? 4 : 6,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <div className="w-full h-full rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
      </motion.div>
    </>
  );
}

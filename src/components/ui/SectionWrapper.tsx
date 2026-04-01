"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ id, children, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto max-w-6xl px-6 sm:px-12 py-24 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 py-24 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}

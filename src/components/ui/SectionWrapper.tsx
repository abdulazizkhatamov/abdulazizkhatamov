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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mx-auto max-w-5xl px-6 py-20 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}

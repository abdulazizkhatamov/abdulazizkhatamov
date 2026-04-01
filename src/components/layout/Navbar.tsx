"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/#about",      label: t("about")      },
    { href: "/#skills",     label: t("skills")     },
    { href: "/#experience", label: t("experience") },
    { href: "/projects",    label: t("projects")   },
    { href: "/blog",        label: t("blog")       },
    { href: "/contact",     label: t("contact")    },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={[
          "transition-all duration-500",
          scrolled
            ? "bg-(--color-bg)/75 dark:bg-(--color-bg-dark)/75 backdrop-blur-2xl border-b border-(--color-border) dark:border-(--color-border-dark) shadow-lg shadow-black/5 dark:shadow-black/20"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-12 h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-0.5">
            <span className="text-sm font-black tracking-tight text-(--color-text) dark:text-(--color-text-dark) transition-all duration-200 group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark)">
              abdulaziz
            </span>
            <span className="text-sm font-black tracking-tight text-(--color-accent) dark:text-(--color-accent-dark)">
              .cv
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm font-medium text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) rounded-(--radius-lg) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-(--radius-lg) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) text-(--color-muted) dark:text-(--color-muted-dark) transition-colors hover:text-(--color-text) dark:hover:text-(--color-text-dark)"
            >
              <motion.div animate={menuOpen ? "open" : "closed"} className="relative w-4 h-3.5">
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                  transition={{ duration: 0.22 }}
                  className="absolute top-0 left-0 block h-px w-full bg-current"
                />
                <motion.span
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-[6px] left-0 block h-px w-full bg-current"
                />
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                  transition={{ duration: 0.22 }}
                  className="absolute bottom-0 left-0 block h-px w-full bg-current"
                />
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg)/90 dark:bg-(--color-bg-dark)/90 backdrop-blur-2xl"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3 rounded-(--radius-lg) text-sm font-medium text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-all"
                  >
                    <span className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) font-mono tabular-nums">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

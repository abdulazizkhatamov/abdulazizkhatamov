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
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/#about",      label: t("about"),      num: "01" },
    { href: "/#skills",     label: t("skills"),     num: "02" },
    { href: "/#experience", label: t("experience"), num: "03" },
    { href: "/projects",    label: t("projects"),   num: "04" },
    { href: "/blog",        label: t("blog"),       num: "05" },
    { href: "/contact",     label: t("contact"),    num: "06" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled ? "border-b border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg)/85 dark:bg-(--color-bg-dark)/85 backdrop-blur-xl" : "bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12 h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-xs font-bold tracking-widest uppercase text-(--color-text) dark:text-(--color-text-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors duration-200"
          >
            abdulaziz<span className="text-(--color-accent) dark:text-(--color-accent-dark)">.cv</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative px-3.5 py-2 font-mono text-xs tracking-widest uppercase text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 bottom-1.5 h-px scale-x-0 bg-(--color-accent) dark:bg-(--color-accent-dark) transition-transform duration-200 group-hover:scale-x-100 origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <LocaleSwitcher />
            <ThemeToggle />

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px] text-(--color-text) dark:text-(--color-text-dark)"
            >
              <motion.span
                className="block h-px w-5 bg-current"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-5 bg-current"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-px w-5 bg-current"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-(--color-bg) dark:bg-(--color-bg-dark) flex flex-col md:hidden"
          >
            {/* Close zone at top */}
            <div className="h-16 border-b border-(--color-border) dark:border-(--color-border-dark) flex items-center justify-end px-6">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="font-mono text-xs tracking-widest uppercase text-(--color-muted) dark:text-(--color-muted-dark)"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col justify-center flex-1 px-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-4 border-b border-(--color-border) dark:border-(--color-border-dark) last:border-0"
                  >
                    <span className="font-mono text-xs text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
                      {link.num}
                    </span>
                    <span
                      className="font-black text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors duration-200 tracking-tight"
                      style={{ fontSize: "clamp(1.6rem, 6vw, 3rem)" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Footer */}
            <div className="h-16 border-t border-(--color-border) dark:border-(--color-border-dark) flex items-center px-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-(--color-muted) dark:text-(--color-muted-dark)">
                ABDULAZIZ HATAMOV — FRONTEND DEVELOPER
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

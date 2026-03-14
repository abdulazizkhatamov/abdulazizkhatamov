"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "/#about", label: t("about") },
    { href: "/#skills", label: t("skills") },
    { href: "/#experience", label: t("experience") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-(--color-bg)/90 dark:bg-(--color-bg-dark)/90 backdrop-blur-md border-b border-(--color-border) dark:border-(--color-border-dark)"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-(--color-text) dark:text-(--color-text-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors"
        >
          AH<span className="text-(--color-accent) dark:text-(--color-accent-dark)">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-(--color-text) dark:bg-(--color-text-dark) transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-(--color-text) dark:bg-(--color-text-dark) transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-(--color-text) dark:bg-(--color-text-dark) transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="border-border bg-bg/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6"
      >
        <a
          href="#top"
          className="hover:text-accent text-sm font-medium tracking-tight transition-colors"
        >
          {site.name}
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="text-muted hover:text-fg hidden text-sm transition-colors sm:block"
          >
            Work
          </a>
          <a
            href="#services"
            className="text-muted hover:text-fg hidden text-sm transition-colors sm:block"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-muted hover:text-fg text-sm transition-colors"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

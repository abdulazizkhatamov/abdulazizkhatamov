import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) dark:border-(--color-border-dark)">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <Link href="/" className="font-mono text-xs font-bold text-(--color-text) dark:text-(--color-text-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors tracking-widest uppercase">
              AH<span className="text-(--color-accent) dark:text-(--color-accent-dark)">.cv</span>
            </Link>
            <p className="font-mono text-[10px] text-(--color-muted) dark:text-(--color-muted-dark) tracking-wider">
              {t("built_with")}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              {
                href: "https://github.com/abdulazizkhatamov",
                label: "GitHub",
                fill: true,
                d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
                vb: "0 0 24 24",
              },
              {
                href: "https://t.me/abdulaziz_khatamov",
                label: "Telegram",
                fill: true,
                d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.857l-2.95-.924c-.64-.203-.657-.64.136-.953l11.57-4.461c.537-.194 1.006.131.968.702z",
                vb: "0 0 24 24",
              },
              {
                href: "mailto:abdulazizkhatamov@hotmail.com",
                label: "Email",
                fill: false,
                d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                vb: "0 0 24 24",
              },
            ].map(({ href, label, fill, d, vb }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
              >
                <svg
                  width="14" height="14" viewBox={vb}
                  fill={fill ? "currentColor" : "none"}
                  stroke={fill ? undefined : "currentColor"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] text-(--color-muted) dark:text-(--color-muted-dark) tracking-wider">
            © {year} Abdulaziz Hatamov. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

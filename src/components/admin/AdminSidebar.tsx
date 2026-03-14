"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/blog", label: "Blog", icon: "✦" },
  { href: "/admin/skills", label: "Skills", icon: "◇" },
  { href: "/admin/experience", label: "Experience", icon: "◉" },
  { href: "/admin/messages", label: "Messages", icon: "◎" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) flex flex-col">
      <div className="p-6 border-b border-(--color-border) dark:border-(--color-border-dark)">
        <Link href="/" className="text-sm font-bold text-(--color-text) dark:text-(--color-text-dark)">
          AH<span className="text-(--color-accent) dark:text-(--color-accent-dark)">.</span>
          <span className="ml-2 text-xs font-normal text-(--color-muted) dark:text-(--color-muted-dark)">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-(--radius-md) px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) text-(--color-accent) dark:text-(--color-accent-dark) font-medium"
                  : "text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) hover:bg-(--color-bg) dark:hover:bg-(--color-bg-dark)",
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-(--color-border) dark:border-(--color-border-dark)">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-(--radius-md) px-3 py-2 text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) hover:bg-(--color-bg) dark:hover:bg-(--color-bg-dark) transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}

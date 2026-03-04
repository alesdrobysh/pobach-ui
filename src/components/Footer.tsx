"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Галоўная" },
  { href: "/about", label: "Пра праект" },
  { href: "/privacy", label: "Прыватнасць" },
];

export default function Footer() {
  const pathname = usePathname();
  const links = LINKS.filter((l) => l.href !== pathname);
  return (
    <footer className="border-t border-[var(--accent)]/20 pt-6 mt-12 mb-8 text-center text-sm text-[var(--text-muted)]">
      <p className="mb-3">Зроблена з ❤️ да роднай мовы</p>
      <nav className="flex justify-center gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="hover:text-[var(--accent)] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

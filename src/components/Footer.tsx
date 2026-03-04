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
    <footer>
      Зроблена з ❤️ да роднай мовы
      <br />
      {links.map((l, i) => (
        <span key={l.href}>
          {i > 0 && " · "}
          <Link href={l.href}>{l.label}</Link>
        </span>
      ))}
    </footer>
  );
}

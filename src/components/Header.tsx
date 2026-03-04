"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header({ title = "Побач" }: { title?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isMain = pathname === "/";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header>
      <div ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыць меню" : "Адкрыць меню"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div>
            <Link
              href="/stats"
              onClick={() => setMenuOpen(false)}
              aria-label="Паказаць статыстыку"
            >
              Статыстыка
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              aria-label="Паказаць інфармацыю пра праект"
            >
              Пра праект
            </Link>
          </div>
        )}
      </div>

      <h1>{title}</h1>

      {!isMain && (
        <Link href="/" aria-label="Вярнуцца да гульні">
          ← Назад
        </Link>
      )}

      <button
        onClick={toggleTheme}
        aria-label={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
        title={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
        type="button"
      >
        {theme === "light" ? (
          <Moon size={18} />
        ) : (
          <Sun size={18} color="white" />
        )}
      </button>
    </header>
  );
}

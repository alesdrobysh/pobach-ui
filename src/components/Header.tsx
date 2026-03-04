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
    <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--accent)]/30 bg-[var(--bg)]">
      {/* Left: hamburger menu */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыць меню" : "Адкрыць меню"}
          aria-expanded={menuOpen}
          className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1 rounded-lg hover:bg-[var(--border)] transition-colors"
        >
          <span className="block h-0.5 w-full bg-[var(--text)] rounded-full transition-all" />
          <span className="block h-0.5 w-full bg-[var(--text)] rounded-full transition-all" />
          <span className="block h-0.5 w-full bg-[var(--text)] rounded-full transition-all" />
        </button>

        {menuOpen && (
          <div className="absolute left-0 top-full mt-2 w-44 bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] border-l-4 border-l-[var(--accent)] overflow-hidden z-50">
            <Link
              href="/stats"
              onClick={() => setMenuOpen(false)}
              aria-label="Паказаць статыстыку"
              className="block px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--border)] transition-colors"
            >
              Статыстыка
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              aria-label="Паказаць інфармацыю пра праект"
              className="block px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--border)] transition-colors"
            >
              Пра праект
            </Link>
          </div>
        )}
      </div>

      {/* Center: logo */}
      <h1 className="font-serif text-[2rem] font-semibold text-[var(--accent)] leading-none tracking-wide">
        {title}
      </h1>

      {/* Right: back link or theme toggle */}
      <div className="flex items-center gap-2">
        {!isMain && (
          <Link
            href="/"
            aria-label="Вярнуцца да гульні"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← Назад
          </Link>
        )}
        <button
          onClick={toggleTheme}
          aria-label={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
          title={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text)]"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}

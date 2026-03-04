import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import BackHeaderButton from "./BackHeaderButton";

type PageHeaderProps = {
  variant: "main" | "secondary";
  title?: string;
  onShowHelp?: () => void;
};

export default function PageHeader({
  variant,
  title,
  onShowHelp,
}: PageHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <>
      <header>
        {/* Left section */}
        <div>
          {variant === "main" ? (
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
          ) : (
            <BackHeaderButton href="/" label="← Назад" />
          )}
        </div>

        {/* Center section */}
        <div>
          {variant === "main" ? (
            <button
              onClick={() => window.location.reload()}
              type="button"
              aria-label="Побач - перазагрузіць гульню"
            >
              ПОБАЧ
            </button>
          ) : (
            <h1>{title}</h1>
          )}
        </div>

        {/* Right section */}
        <div>
          {variant === "main" && (
            <button
              onClick={onShowHelp}
              aria-label="Паказаць інструкцыі як гуляць"
              type="button"
            >
              Як гуляць?
            </button>
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
        </div>
      </header>
      <div />
    </>
  );
}

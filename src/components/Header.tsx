import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Header.module.css";

type HeaderProps = {
  onShowHelp: () => void;
  onShowStats: () => void;
};

export default function Header({ onShowHelp, onShowStats }: HeaderProps) {
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
    <header className={styles.header}>
      <button
        className={styles.title}
        onClick={() => window.location.reload()}
        type="button"
        aria-label="Побач - перазагрузіць гульню"
      >
        ПОБАЧ
      </button>
      <div className={styles.menu}>
        <button
          className={styles.menuButton}
          onClick={onShowHelp}
          aria-label="Паказаць інструкцыі як гуляць"
          type="button"
        >
          Як гуляць?
        </button>

        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.hamburgerButton} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрыць меню" : "Адкрыць меню"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {menuOpen && (
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  onShowStats();
                  setMenuOpen(false);
                }}
                aria-label="Паказаць статыстыку"
                type="button"
              >
                Статыстыка
              </button>

              <Link
                href="/about"
                className={styles.dropdownItem}
                onClick={() => setMenuOpen(false)}
                aria-label="Паказаць інфармацыю пра праект"
              >
                Пра праект
              </Link>
            </div>
          )}
        </div>

        <button
          className={styles.themeToggle}
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
  );
}

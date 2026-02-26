import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import BackHeaderButton from "./BackHeaderButton";
import styles from "./PageHeader.module.css";

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
    <header className={styles.header}>
      {/* Left section */}
      <div className={styles.leftSection}>
        {variant === "main" ? (
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
                <Link
                  href="/stats"
                  className={styles.dropdownItem}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Паказаць статыстыку"
                >
                  Статыстыка
                </Link>

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
        ) : (
          <BackHeaderButton href="/" label="← Назад" />
        )}
      </div>

      {/* Center section */}
      <div className={styles.centerSection}>
        {variant === "main" ? (
          <button
            className={styles.title}
            onClick={() => window.location.reload()}
            type="button"
            aria-label="Побач - перазагрузіць гульню"
          >
            ПОБАЧ
          </button>
        ) : (
          <h1 className={styles.pageTitle}>{title}</h1>
        )}
      </div>

      {/* Right section */}
      <div className={styles.rightActions}>
        {variant === "main" && (
          <button
            className={styles.menuButton}
            onClick={onShowHelp}
            aria-label="Паказаць інструкцыі як гуляць"
            type="button"
          >
            Як гуляць?
          </button>
        )}

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

"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./page.module.css";

export default function AboutPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Вярнуцца да гульні
        </Link>
        <h1>Пра Побач</h1>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
          title={`Пераключыць на ${theme === "light" ? "цёмную" : "светлую"} тэму`}
        >
          {theme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} color="white" />
          )}
        </button>
      </header>

      <section className={styles.section}>
        <h2>Як гэта працуе?</h2>
        <p>
          Побач выкарыстоўвае алгарытмы машыннага навучання для вызначэння
          семантычнай блізкасці слоў. Мадэль аналізуе, як часта словы ўжываюцца
          разам у тэкстах, і будуе "карту" іх сэнсаў.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Стваральнік</h2>
        <p>Зроблена з ❤️ да роднай мовы</p>
        <p>
          Натхненнем сталі{" "}
          <a
            href="https://contexto.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contexto
          </a>{" "}
          і{" "}
          <a
            href="https://semantle.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Semantle
          </a>
        </p>
        <p>
          Аўтар:{" "}
          <a
            href="https://github.com/alesdrobysh"
            target="_blank"
            rel="noopener noreferrer"
          >
            alesdrobysh
          </a>
        </p>
        <p>База слоў:</p>
        <ul>
          <li>
            <a
              href="https://github.com/Belarus/GrammarDB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Belarus/GrammarDB
            </a>
          </li>
          <li>
            <a
              href="https://github.com/verbumby/slouniki"
              target="_blank"
              rel="noopener noreferrer"
            >
              verbumby/slouniki
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Кантакт</h2>
        <p>
          Маеце пытанні або прапановы? Напішыце нам па пошце{" "}
          <a href="mailto:support@pobach.app">support@pobach.app</a>
        </p>
      </section>

      <footer className={styles.footer}>
        <Link href="/">← Вярнуцца да гульні</Link> ·{" "}
        <Link href="/privacy">Прыватнасць</Link>
      </footer>
    </main>
  );
}

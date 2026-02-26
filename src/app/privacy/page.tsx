"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import BackHeaderButton from "@/components/BackHeaderButton";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./page.module.css";

export default function PrivacyPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <BackHeaderButton href="/" />
        <h1>Прыватнасць</h1>
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
        <h2>Збор дадзеных</h2>
        <p>
          Мы збіраем толькі мінімальныя дадзеныя, неабходныя для працы гульні:
        </p>
        <ul>
          <li>Ідэнтыфікатар сесіі (для захавання прагрэсу)</li>
          <li>Гісторыя вашых спробаў і здагадак</li>
          <li>Статыстыка гульні (колькасць спробаў, час)</li>
        </ul>
        <p>
          Усе дадзеныя захоўваюцца ананімна і не змяшчаюць асабістай інфармацыі.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Мэта выкарыстання</h2>
        <p>Дадзеныя выкарыстоўваюцца выключна для:</p>
        <ul>
          <li>Захавання вашага прагрэсу ў гульні</li>
          <li>Паказу статыстыкі і дасягненняў</li>
          <li>Аналізу папулярнасці слоў для паляпшэння слоўніка</li>
          <li>Тэхнічнай падтрымкі працы сайта</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Аналітыка</h2>
        <p>
          Мы выкарыстоўваем Vercel Analytics для збору агульнай статыстыкі
          наведванняў сайта. Гэта дазваляе нам разумець, як карыстальнікі
          выкарыстоўваюць гульню, і паляпшаць яе.
        </p>
        <p>
          Vercel Analytics не збірае асабістых дадзеных і не выкарыстоўвае
          cookies.
        </p>
        <p>
          Мы таксама выкарыстоўваем PostHog для аналізу гульнявой актыўнасці:
          колькасць спробаў, выкарыстанне падказак, водгукі пра словы. Усе
          дадзеныя ананімныя і не ўтрымліваюць асабістай інфармацыі.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Доступ да дадзеных</h2>
        <p>
          Вашы дадзеныя не перадаюцца трэцім асобам. Мы не выкарыстоўваем
          рэкламу і не прадаем інфармацыю знешнім сэрвісам.
        </p>
        <p>
          Толькі адміністратары сайта маюць доступ да тэхнічных дадзеных для
          падтрымкі працы сістэмы.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Захаванне дадзеных</h2>
        <p>
          Дадзеныя захоўваюцца ананімна без IP-адрасоў або іншай ідэнтыфікуючай
          інфармацыі. Вы можаце ачысціць свой прагрэс у любы момант праз налады
          браўзера.
        </p>
        <p>
          Мы не захоўваем IP-адрасы, геалакацыю або іншую тэхнічную інфармацыю
          пра карыстальнікаў.
        </p>
        <p>
          Мы не збіраем дакладную геалакацыю (GPS). Мы вызначаем толькі
          прыблізнае месцазнаходжанне (Краіна, Горад) на аснове IP-адраса для
          агульнай статыстыкі. Самі IP-адрасы мы не захоўваем.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Кантакт</h2>
        <p>
          Калі ў вас ёсць пытанні пра прыватнасць або вы хочаце выдаліць свае
          дадзеныя, звяжыцеся з намі па пошце{" "}
          <a href="mailto:support@pobach.app">support@pobach.app</a>.
        </p>
      </section>

      <footer className={styles.footer}>
        <Link href="/">← Вярнуцца да гульні</Link> ·{" "}
        <Link href="/about">Пра праект</Link>
      </footer>
    </main>
  );
}

"use client";

import type { Guess } from "@/core/entities/game";
import { getCurrentDayIndex } from "@/lib/storage";
import { pluralize } from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";
import DictionaryLink from "./DictionaryLink";
import styles from "./FinishCard.module.css";
import ShareButton from "./ShareButton";
import TopWordsList from "./TopWordsList";

type FinishCardProps = {
  dayIndex: number;
  sessionDayIndex: number | null;
  guesses: Guess[];
  mode: "win" | "lose";
  targetWord?: string;
};

export default function FinishCard({
  dayIndex,
  sessionDayIndex,
  guesses,
  mode,
  targetWord,
}: FinishCardProps) {
  const attempts = guesses.length;

  // Check if new day is available
  const currentDayIndex = getCurrentDayIndex();
  const isNewDayAvailable =
    sessionDayIndex !== null && currentDayIndex > sessionDayIndex;

  const isWin = mode === "win";

  return (
    <div
      className={`${styles.finishCard} ${isWin ? styles.finishCardWin : styles.finishCardLose}`}
      data-testid="finish-card"
    >
      <div className={styles.finishMessage}>
        {isWin && <span className={styles.finishEmoji}>🎉</span>}
        <h2>{isWin ? "Віншуем!" : "Таямніца раскрыта!"}</h2>
        <p className={styles.finishStats}>
          {isWin
            ? `Вы адгадалі слова за ${attempts} ${pluralize(attempts)}! Заўтра будзе новае слова — заходзьце праверыць веды!`
            : `Таямніца раскрыта! 🔓 Дзякуй за гульню. Заўтра будзе новае слова — заходзьце праверыць веды!`}
        </p>
        {!isWin && targetWord && (
          <p className={styles.targetWord}>
            Правільнае слова:{" "}
            <strong>
              <DictionaryLink
                word={targetWord}
                className={styles.targetWordLink}
              />
            </strong>
          </p>
        )}
      </div>

      <div className={styles.shareSection}>
        <ShareButton dayIndex={dayIndex} guesses={guesses} />
      </div>

      <div className={styles.nextGameSection}>
        {isNewDayAvailable ? (
          <button
            className={styles.newGameButton}
            onClick={() => window.location.reload()}
            type="button"
          >
            Даступна новае слова! Грай зараз
          </button>
        ) : (
          <>
            <span className={styles.nextGameLabel}>Наступнае слова праз:</span>
            <CountdownTimer />
          </>
        )}
      </div>

      <TopWordsList dayIndex={dayIndex} mode={mode} targetWord={targetWord} />
    </div>
  );
}

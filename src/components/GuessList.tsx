import { BookOpen } from "lucide-react";
import type { Guess } from "@/core/entities/game";
import GuessCard from "./GuessCard";
import styles from "./GuessList.module.css";

type GuessListProps = {
  guesses: Guess[];
};

export default function GuessList({ guesses }: GuessListProps) {
  return (
    <>
      <div className={styles.header}>
        {guesses.length > 0 && (
          <span className={styles.hint}>
            <BookOpen size={12} />
            Націсніце на любое слова, каб адкрыць слоўнік
          </span>
        )}
        <output
          className={styles.guessCounter}
          aria-live="polite"
          aria-label={`Колькасць спроб: ${guesses.length}`}
        >
          Спроб: {guesses.length}
        </output>
      </div>
      <ul className={styles.list} aria-label="Спіс здагадак">
        {guesses.map((guess) => (
          <li key={guess.word}>
            <GuessCard guess={guess} isWin={guess.rank === 1} />
          </li>
        ))}
      </ul>
    </>
  );
}

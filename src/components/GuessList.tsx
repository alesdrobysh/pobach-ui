import type { Guess } from "@/core/entities/game";
import GuessCard from "./GuessCard";
import styles from "./GuessList.module.css";

type GuessListProps = {
  guesses: Guess[];
};

export default function GuessList({ guesses }: GuessListProps) {
  return (
    <>
      <output
        className={styles.guessCounter}
        aria-live="polite"
        aria-label={`Колькасць спроб: ${guesses.length}`}
      >
        Спроб: {guesses.length}
      </output>
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

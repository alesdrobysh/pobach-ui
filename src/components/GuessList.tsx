import { BookOpen } from "lucide-react";
import type { Guess } from "@/core/entities/game";
import GuessCard from "./GuessCard";

type GuessListProps = {
  guesses: Guess[];
};

export default function GuessList({ guesses }: GuessListProps) {
  return (
    <>
      <div>
        {guesses.length > 0 && (
          <span>
            <BookOpen size={12} />
            <span>Слоўнік па кліку на слова</span>
            <span>Націсніце на любое слова для тлумачэння</span>
          </span>
        )}
        <output
          aria-live="polite"
          aria-label={`Колькасць спроб: ${guesses.length}`}
        >
          Спроб: {guesses.length}
        </output>
      </div>
      <ul aria-label="Спіс здагадак">
        {guesses.map((guess) => (
          <li key={guess.word}>
            <GuessCard guess={guess} isWin={guess.rank === 1} />
          </li>
        ))}
      </ul>
    </>
  );
}

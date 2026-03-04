import type { Guess } from "@/core/entities/game";
import { getBarPercentage, getBarWidth, getRankColor } from "@/lib/rank-utils";
import DictionaryLink from "./DictionaryLink";

type GuessCardProps = {
  guess: Guess;
  isWin?: boolean;
};

export default function GuessCard({ guess, isWin = false }: GuessCardProps) {
  const rankColor = getRankColor(guess.rank);
  const barWidth = getBarWidth(guess.rank);
  const barPercentage = getBarPercentage(guess.rank);

  return (
    <article
      style={{ borderLeft: `3px solid ${rankColor}` }}
      aria-label={`Слова ${guess.word}, ранг ${guess.rank}${isWin ? ", вы перамаглі" : ""}`}
    >
      <div>
        <DictionaryLink word={guess.word} />
        <div>
          <div
            style={{
              width: barWidth,
              backgroundColor: rankColor,
            }}
            role="progressbar"
            aria-valuenow={barPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Якасць здагадкі: ${barPercentage}%`}
          />
        </div>
      </div>
      <span>{guess.rank}</span>
    </article>
  );
}

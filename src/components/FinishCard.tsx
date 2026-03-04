"use client";

import { Flame } from "lucide-react";
import Link from "next/link";
import type { Guess } from "@/core/entities/game";
import { getCurrentDayIndex, getStats } from "@/lib/storage";
import {
  pluralize,
  pluralizeHintsAccusative,
  pluralizeHintsInstrumental,
  pluralizeStreak,
} from "@/lib/utils";
import CountdownTimer from "./CountdownTimer";
import DictionaryLink from "./DictionaryLink";
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
  const hintsCount = guesses.filter((g) => g.isHint).length;
  const streak = mode === "win" ? getStats().currentStreak : 0;

  const currentDayIndex = getCurrentDayIndex();
  const isNewDayAvailable =
    sessionDayIndex !== null && currentDayIndex > sessionDayIndex;

  const isWin = mode === "win";

  return (
    <div
      data-testid="finish-card"
      className="mb-6 rounded-2xl overflow-hidden bg-[var(--card)] shadow-md border border-[var(--border)]"
    >
      {/* Top accent border */}
      <div
        className={`h-1 w-full ${isWin ? "bg-[var(--rank-1)]" : "bg-[var(--border)]"}`}
      />

      <div className="px-6 py-5">
        {/* Heading */}
        <h2
          className={`font-serif text-2xl font-semibold mb-2 ${isWin ? "text-[var(--rank-10)]" : "text-[var(--text-muted)]"}`}
        >
          {isWin ? "Віншуем!" : "Таямніца раскрыта!"}
        </h2>

        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
          {isWin
            ? `Вы адгадалі слова за ${attempts} ${pluralize(attempts)}${hintsCount > 0 ? ` (з ${hintsCount} ${pluralizeHintsInstrumental(hintsCount)})` : ""}! Заўтра будзе новае слова.`
            : `Дзякуй за гульню.${hintsCount > 0 ? ` Выкарыстана ${hintsCount} ${pluralizeHintsAccusative(hintsCount)}.` : ""} Заўтра будзе новае слова.`}
        </p>

        {!isWin && targetWord && (
          <p className="text-sm mb-4">
            Правільнае слова:{" "}
            <strong className="text-[var(--accent)] font-semibold">
              <DictionaryLink word={targetWord} />
            </strong>
          </p>
        )}

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--border)] text-[var(--text-muted)]">
            {attempts} {pluralize(attempts)}
          </span>
          {hintsCount > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[var(--border)] text-[var(--text-muted)]">
              {hintsCount} {pluralizeHintsAccusative(hintsCount)}
            </span>
          )}
        </div>

        {/* Share button */}
        <div className="mb-5">
          <ShareButton dayIndex={dayIndex} guesses={guesses} won={isWin} />
        </div>

        {/* Streak & stats link */}
        {isWin && (
          <div className="flex items-center gap-4 mb-5">
            {streak > 0 && (
              <Link
                href="/stats"
                className="flex items-center gap-1.5 text-[var(--accent)] text-sm font-medium hover:opacity-80 transition-opacity"
              >
                <Flame size={16} />
                <span>
                  {streak} {pluralizeStreak(streak)}
                </span>
              </Link>
            )}
            <Link
              href="/stats"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Паглядзець статыстыку
            </Link>
          </div>
        )}

        {/* Countdown / new day */}
        <div className="text-sm text-[var(--text-muted)]">
          {isNewDayAvailable ? (
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="btn-primary"
            >
              Даступна новае слова! Грай зараз
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span>Наступнае слова праз:</span>
              <span className="font-mono text-[var(--text)]">
                <CountdownTimer />
              </span>
            </div>
          )}
        </div>
      </div>

      <TopWordsList dayIndex={dayIndex} mode={mode} targetWord={targetWord} />
    </div>
  );
}

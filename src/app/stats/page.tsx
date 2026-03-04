"use client";

import { Check, Share2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import type { HistoryRecord } from "@/core/entities/game";
import { formatRelativeDate } from "@/lib/stats";
import { getCurrentDayIndex, getHistory, getStats } from "@/lib/storage";
import { pluralize } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div>
      <div>{value}</div>
      <div>{label}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div />
      <span>{children}</span>
      <div />
    </div>
  );
}

type DistributionChartProps = {
  distribution: Record<number, number>;
  todayAttempts?: number;
};

type DistributionRange = {
  label: string;
  min: number;
  max: number;
};

const DISTRIBUTION_RANGES: DistributionRange[] = [
  { label: "1", min: 1, max: 1 },
  { label: "2-10", min: 2, max: 10 },
  { label: "11-20", min: 11, max: 20 },
  { label: "21-30", min: 21, max: 30 },
  { label: "31-40", min: 31, max: 40 },
  { label: "41-50", min: 41, max: 50 },
  { label: "51-60", min: 51, max: 60 },
  { label: "61-70", min: 61, max: 70 },
  { label: "71-80", min: 71, max: 80 },
  { label: "81-90", min: 81, max: 90 },
  { label: "91-100", min: 91, max: 100 },
  { label: "100+", min: 101, max: Infinity },
];

function getCountForRange(
  distribution: Record<number, number>,
  min: number,
  max: number,
): number {
  let count = 0;
  for (const [attempts, value] of Object.entries(distribution)) {
    const num = Number(attempts);
    if (num >= min && num <= max) {
      count += value;
    }
  }
  return count;
}

function DistributionChart({
  distribution,
  todayAttempts,
}: DistributionChartProps) {
  const rangeCounts = DISTRIBUTION_RANGES.map((range) => ({
    ...range,
    count: getCountForRange(distribution, range.min, range.max),
  }));

  const maxCount = Math.max(...rangeCounts.map((r) => r.count), 1);

  return (
    <div>
      {rangeCounts.map((range) => {
        const percentage =
          range.count > 0 ? Math.round((range.count / maxCount) * 100) : 0;

        return (
          <div key={range.label}>
            <div>{range.label}</div>
            <div>
              <div
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div>{range.count}</div>
          </div>
        );
      })}
    </div>
  );
}

type HistoryItemProps = {
  game: HistoryRecord;
};

function HistoryItem({ game }: HistoryItemProps) {
  const targetWord = game.guesses.find((g) => g.rank === 1)?.word;
  const displayWord = targetWord
    ? targetWord.toUpperCase()
    : `Гульня #${game.dayIndex + 1}`;

  return (
    <div>
      <div>{game.won ? <Check size={16} /> : <X size={16} />}</div>
      <div>{displayWord}</div>
      <div>
        <span>
          {game.won
            ? `${game.attempts} ${pluralize(game.attempts)}`
            : "Не адгадана"}
        </span>
        <span>{formatRelativeDate(game.dayIndex)}</span>
      </div>
    </div>
  );
}

async function handleShare(
  text: string,
): Promise<"share" | "clipboard" | false> {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return "share";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return "clipboard";
  } catch {
    return false;
  }
}

export default function StatsPage() {
  const stats = getStats();
  const history = getHistory().slice(0, 10).reverse();
  const currentDay = getCurrentDayIndex();
  const todayGame = history.find((g) => g.dayIndex === currentDay);
  const todayAttempts = todayGame?.won ? todayGame.attempts : undefined;

  const [showToast, setShowToast] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const onShareStats = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const text = [
      "Мая статыстыка ў «Побач»:",
      `🏆 Перамог: ${stats.gamesWon}/${stats.gamesPlayed} (${winRate}%)`,
      `🔥 Макс. серыя: ${stats.maxStreak}`,
      stats.bestAttempts > 0
        ? `🎯 Лепшы вынік: ${stats.bestAttempts} ${pluralize(stats.bestAttempts)}`
        : null,
      "pobach.app",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await handleShare(text);
    if (result === "clipboard") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    setIsSharing(false);
  };

  return (
    <main>
      <PageHeader variant="secondary" title="Статыстыка" />

      <div>
        <div>
          <StatCard label="ГУЛЬНЯЎ" value={stats.gamesPlayed} />
          <StatCard label="% ПЕРАМОГ" value={winRate} />
          <StatCard label="СЕРЫЯ" value={stats.currentStreak} />
          <StatCard label="МАКС. СЕРЫЯ" value={stats.maxStreak} />
        </div>

        <SectionTitle>Размеркаванне спроб</SectionTitle>
        <DistributionChart
          distribution={stats.distribution}
          todayAttempts={todayAttempts}
        />

        <SectionTitle>Апошнія гульні</SectionTitle>
        <div>
          {history.length === 0 ? (
            <div>Пакуль няма гісторыі гульняў</div>
          ) : (
            history.map((game) => (
              <HistoryItem key={game.dayIndex} game={game} />
            ))
          )}
        </div>

        <button type="button" onClick={onShareStats} disabled={isSharing}>
          <Share2 size={18} />
          ПАДЗЯЛІЦЦА
        </button>
      </div>

      <footer>
        <Link href="/">← Вярнуцца да гульні</Link> ·{" "}
        <Link href="/privacy">Прыватнасць</Link>
      </footer>

      {showToast && <div aria-live="polite">Скапіравана!</div>}
    </main>
  );
}

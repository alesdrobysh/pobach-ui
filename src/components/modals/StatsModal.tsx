"use client";
import { Check, Flame, X } from "lucide-react";
import type { ReactNode } from "react";
import type { HistoryRecord } from "@/core/entities/game";
import { formatRelativeDate } from "@/lib/stats";
import { getHistory, getStats } from "@/lib/storage";
import Modal from "./Modal";
import styles from "./StatsModal.module.css";

type StatCardProps = {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
};

function StatCard({ label, value, subtitle, icon }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {icon && <span className={styles.statIcon}>{icon}</span>}
        {value}
      </div>
      {subtitle && <div className={styles.statSubtitle}>{subtitle}</div>}
    </div>
  );
}

type DistributionChartProps = {
  distribution: Record<number, number>;
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

function DistributionChart({ distribution }: DistributionChartProps) {
  const rangeCounts = DISTRIBUTION_RANGES.map((range) => ({
    ...range,
    count: getCountForRange(distribution, range.min, range.max),
  }));

  const maxCount = Math.max(...rangeCounts.map((r) => r.count), 1);
  const totalGames = rangeCounts.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className={styles.distributionChart}>
      {rangeCounts.map((range) => {
        const percentage =
          range.count > 0 ? Math.round((range.count / maxCount) * 100) : 0;
        const gamePercent =
          totalGames > 0 ? Math.round((range.count / totalGames) * 100) : 0;

        return (
          <div key={range.label} className={styles.distributionBar}>
            <div className={styles.barLabel}>{range.label}</div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ width: `${percentage}%` }}
                data-count={range.count}
              >
                {range.count > 0 && (
                  <span className={styles.barCount}>{range.count}</span>
                )}
              </div>
            </div>
            <div className={styles.barPercent}>
              {range.count > 0 ? `${gamePercent}%` : ""}
            </div>
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
  return (
    <div className={styles.historyItem}>
      <div className={styles.historyDate}>
        {formatRelativeDate(game.dayIndex)}
      </div>
      <div className={styles.historyResult}>
        {game.won ? (
          <>
            <Check className={styles.winIcon} size={18} />
            {game.attempts} спроб
          </>
        ) : (
          <>
            <X className={styles.lossIcon} size={18} />
            Не адгадана
          </>
        )}
      </div>
    </div>
  );
}

type StatsModalProps = {
  onClose: () => void;
};

export default function StatsModal({ onClose }: StatsModalProps) {
  const stats = getStats();
  const history = getHistory().slice(-10).reverse();

  return (
    <Modal onClose={onClose} title="Статыстыка">
      <div className={styles.statsGrid}>
        <StatCard label="Гульняў" value={stats.gamesPlayed} />
        <StatCard
          label="Перамог"
          value={stats.gamesWon}
          subtitle={`${stats.winRate.toFixed(0)}%`}
        />
        <StatCard
          label="Серыя"
          value={stats.currentStreak}
          icon={<Flame size={18} />}
        />
        <StatCard
          label="Найлепшы"
          value={stats.bestAttempts > 0 ? stats.bestAttempts : "-"}
          subtitle={stats.bestAttempts > 0 ? "спроб" : undefined}
        />
      </div>

      <h3>Размеркаванне спроб</h3>
      <DistributionChart distribution={stats.distribution} />

      <h3>Апошнія гульні</h3>
      <div className={styles.historyList}>
        {history.length === 0 ? (
          <div className={styles.emptyHistory}>
            Пакуль няма гісторыі гульняў
          </div>
        ) : (
          history.map((game) => <HistoryItem key={game.dayIndex} game={game} />)
        )}
      </div>
    </Modal>
  );
}

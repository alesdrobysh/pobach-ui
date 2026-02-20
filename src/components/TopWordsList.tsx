"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TopWord } from "@/core/entities/game";
import DictionaryLink from "./DictionaryLink";
import styles from "./TopWordsList.module.css";

type TopWordsListProps = {
  dayIndex: number;
  mode: "win" | "lose";
  targetWord?: string;
};

export default function TopWordsList({
  dayIndex,
  mode: _mode,
  targetWord,
}: TopWordsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topWords, setTopWords] = useState<TopWord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleExpanded = async () => {
    if (!isExpanded) {
      // Load data on first expand
      if (!topWords) {
        await loadTopWords();
      }
    }
    setIsExpanded(!isExpanded);
  };

  const loadTopWords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/top-words?dayIndex=${dayIndex}`);
      if (!response.ok) {
        throw new Error("Failed to load top words");
      }
      const data: TopWord[] = await response.json();
      setTopWords(data);
    } catch (err) {
      console.error("Failed to load top words:", err);
      setError("Не ўдалося загрузіць спіс слоў");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.topWordsSection}>
      <button
        className={styles.toggleButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="top-words-list"
        type="button"
      >
        Паказаць бліжэйшыя словы
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isExpanded ? styles.chevronRotated : ""}`}
        />
      </button>

      {isExpanded && (
        <div id="top-words-list" className={styles.wordsContainer}>
          {isLoading && (
            <div className={styles.skeletonContainer}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={styles.skeletonRow}>
                  <div className={styles.skeletonRank}></div>
                  <div className={styles.skeletonWord}></div>
                </div>
              ))}
            </div>
          )}

          {error && <div className={styles.errorMessage}>{error}</div>}

          {topWords && (
            <div className={styles.tableContainer}>
              <table className={styles.wordsTable}>
                <thead>
                  <tr>
                    <th className={styles.rankHeader}>Месца</th>
                    <th className={styles.wordHeader}>Слова</th>
                  </tr>
                </thead>
                <tbody>
                  {topWords.map((word) => (
                    <tr key={word.rank}>
                      <td className={styles.rankCell}>
                        {word.rank === 1 ? (
                          <span className={styles.rankOne}>{word.rank}</span>
                        ) : (
                          word.rank
                        )}
                      </td>
                      <td className={styles.wordCell}>
                        <DictionaryLink
                          word={word.word}
                          className={
                            word.rank === 1 && targetWord
                              ? styles.targetWord
                              : styles.wordLink
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

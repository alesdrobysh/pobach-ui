"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TopWord } from "@/core/entities/game";
import DictionaryLink from "./DictionaryLink";

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
    <div>
      <button
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="top-words-list"
        type="button"
      >
        Паказаць бліжэйшыя словы
        <ChevronDown size={16} />
      </button>

      {isExpanded && (
        <div id="top-words-list">
          {isLoading && (
            <div>
              {Array.from({ length: 10 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <div key={`skeleton-${i}`}>
                  <div></div>
                  <div></div>
                </div>
              ))}
            </div>
          )}

          {error && <div>{error}</div>}

          {topWords && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Месца</th>
                    <th>Слова</th>
                  </tr>
                </thead>
                <tbody>
                  {topWords.map((word) => (
                    <tr key={word.rank}>
                      <td>
                        {word.rank === 1 ? <span>{word.rank}</span> : word.rank}
                      </td>
                      <td>
                        <DictionaryLink word={word.word} />
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

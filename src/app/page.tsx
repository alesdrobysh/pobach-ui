"use client";

import { useState } from "react";
import FinishCard from "@/components/FinishCard";
import Footer from "@/components/Footer";
import GiveUpModal from "@/components/GiveUpModal";
import GuessCard from "@/components/GuessCard";
import GuessInput from "@/components/GuessInput";
import GuessList from "@/components/GuessList";
import Header from "@/components/Header";
import Modal from "@/components/modals/Modal";
import RulesComponent from "@/components/RulesComponent";
import { useGame } from "@/hooks/useGame";
import { getCurrentDayIndex } from "@/lib/storage";

export default function Home() {
  const { state, actions } = useGame();
  const [showHelp, setShowHelp] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);

  const handleGiveUp = async () => {
    await actions.handleGiveUp();
    setShowGiveUpModal(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-[600px] mx-auto px-4 pb-12 pt-6">
        {/* Day badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[var(--accent)]/40 text-[var(--accent)]">
            дзень {getCurrentDayIndex() + 1}
          </span>
        </div>

        <GuessInput
          input={state.input}
          setInput={actions.setInput}
          onSubmit={actions.handleSubmit}
          onHint={actions.getHint}
          onGiveUp={() => setShowGiveUpModal(true)}
          loading={state.loading}
          won={state.won}
          gameOver={state.gameOver}
          error={state.error}
          errorWord={state.errorWord}
          guessCount={state.guesses.length}
        />

        {(state.won || state.gameOver) && state.dayIndex !== null ? (
          <FinishCard
            dayIndex={state.dayIndex}
            sessionDayIndex={state.sessionDayIndex}
            guesses={state.guesses}
            mode={state.won ? "win" : "lose"}
            targetWord={state.won ? undefined : state.targetWord}
          />
        ) : (
          state.lastGuess && (
            <output aria-live="polite" className="block mb-4">
              <p className="text-xs text-[var(--text-muted)] mb-2">
                Апошняе слова:
              </p>
              <GuessCard guess={state.lastGuess} />
            </output>
          )
        )}

        {state.guesses.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="font-serif text-2xl font-semibold text-[var(--text)] mb-2">
              Вітаем у «Побач»!
            </h2>
            <div className="w-12 h-0.5 bg-[var(--accent)]/40 mx-auto mb-6 rounded-full" />
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              className="text-sm text-[var(--accent)] underline underline-offset-2 hover:opacity-80 transition-opacity mb-8"
            >
              Як гуляць?
            </button>
            <div className="text-left mt-6 text-sm text-[var(--text-muted)]">
              <RulesComponent />
            </div>
          </div>
        ) : (
          <GuessList guesses={state.guesses} />
        )}
      </div>

      {showHelp && (
        <Modal onClose={() => setShowHelp(false)} title="Як гуляць?">
          <RulesComponent />
        </Modal>
      )}

      {showGiveUpModal && (
        <GiveUpModal
          onConfirm={handleGiveUp}
          onClose={() => setShowGiveUpModal(false)}
        />
      )}

      <div className="w-full max-w-[600px] mx-auto px-4">
        <Footer />
      </div>
    </main>
  );
}

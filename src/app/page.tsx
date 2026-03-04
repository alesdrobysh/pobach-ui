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
    <main>
      <Header />

      <div>дзень {getCurrentDayIndex() + 1}</div>

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
          <output aria-live="polite">
            <div>Апошняе слова:</div>
            <GuessCard guess={state.lastGuess} />
          </output>
        )
      )}

      {state.guesses.length === 0 ? (
        <div>
          <h2>Вітаем у «Побач»!</h2>
          <button type="button" onClick={() => setShowHelp(true)}>
            Як гуляць?
          </button>
          <RulesComponent />
        </div>
      ) : (
        <GuessList guesses={state.guesses} />
      )}

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

      <Footer />
    </main>
  );
}

import { useEffect, useRef } from "react";
import styles from "./GuessInput.module.css";

type GuessInputProps = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onHint: () => void;
  onGiveUp: () => void;
  loading: boolean;
  won: boolean;
  gameOver: boolean;
  error: string | null;
  errorWord: string | null;
  guessCount: number;
};

export default function GuessInput({
  input,
  setInput,
  onSubmit,
  onHint,
  onGiveUp,
  loading,
  won,
  gameOver,
  error,
  errorWord,
  guessCount,
}: GuessInputProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const isDisabled = won || gameOver;

  // Sync: when parent resets input to "" (after submit), clear the div
  useEffect(() => {
    if (input === "" && divRef.current && divRef.current.textContent !== "") {
      divRef.current.textContent = "";
    }
  }, [input]);

  const handleInput = () => {
    const text = divRef.current?.textContent ?? "";
    setInput(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className={styles.inputWrapper}>
      {/* biome-ignore lint/a11y/useSemanticElements: contenteditable div used intentionally to suppress Chrome Android autofill bar */}
      <div
        ref={divRef}
        contentEditable={!isDisabled}
        className={`${styles.input} ${loading ? styles.loading : ""} ${isDisabled ? styles.disabled : ""} ${gameOver && !won ? styles.gameOver : ""}`}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        role="textbox"
        aria-label="Увядзіце слова для здагадкі"
        aria-describedby={error ? "error-message" : undefined}
        tabIndex={0}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="none"
        inputMode="text"
        enterKeyHint="send"
        suppressContentEditableWarning
      />
      {error && (
        <div className={styles.error} id="error-message" role="alert">
          {errorWord && (
            <>
              <strong>«{errorWord}»</strong> —{" "}
            </>
          )}
          {error}
        </div>
      )}

      <div className={styles.hintContainer}>
        {!won && !gameOver && (
          <button
            className={styles.hintButton}
            onClick={onHint}
            disabled={loading}
            aria-label="Атрымаць падказку"
            aria-disabled={loading}
            type="button"
          >
            Падказка
          </button>
        )}
        {!won && guessCount >= 10 && !gameOver && (
          <button
            className={styles.giveUpButton}
            onClick={onGiveUp}
            disabled={loading}
            aria-label="Здацца і завяршыць гульню"
            aria-disabled={loading}
            type="button"
            data-testid="give-up-button"
          >
            Здацца
          </button>
        )}
      </div>
    </div>
  );
}

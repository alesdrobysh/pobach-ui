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
  return (
    <div className={styles.inputWrapper}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={`${styles.input} ${loading ? styles.loading : ""}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            won || gameOver ? "Гульня завершана!" : "Увядзіце слова..."
          }
          disabled={won || gameOver}
          autoComplete="off"
          aria-label="Увядзіце слова для здагадкі"
          aria-describedby={error ? "error-message" : undefined}
          enterKeyHint="send"
        />
      </form>
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

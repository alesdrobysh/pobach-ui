import { useEffect, useRef } from "react";

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
    <div>
      <div>
        {/* biome-ignore lint/a11y/useSemanticElements: contenteditable div used intentionally to suppress Chrome Android autofill bar */}
        <div
          ref={divRef}
          contentEditable={!isDisabled}
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
      </div>

      {error && (
        <div id="error-message" role="alert">
          {errorWord && (
            <>
              <strong>«{errorWord}»</strong> —{" "}
            </>
          )}
          {error}
        </div>
      )}

      <div>
        {!won && !gameOver && (
          <button
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

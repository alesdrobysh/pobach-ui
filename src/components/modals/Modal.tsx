"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string;
};

export default function Modal({ children, onClose, title }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only prevents overlay close */}
      <div role="document" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Закрыць" type="button">
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

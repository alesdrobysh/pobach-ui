"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import styles from "./Modal.module.css";

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
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Закрыць"
            className={styles.closeButton}
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}

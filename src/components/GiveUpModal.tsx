"use client";

import Modal from "./modals/Modal";
import styles from "./GiveUpModal.module.css";

type GiveUpModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function GiveUpModal({ onConfirm, onClose }: GiveUpModalProps) {
  return (
    <Modal onClose={onClose} title="Ўпэўнены?" data-testid="give-up-modal">
      <p className={styles.message}>
        Вы сапраўды хочаце здацца? Гэта скіне вашу бягучую серыю перамог.
      </p>

      <div className={styles.buttonContainer}>
        <button
          onClick={onConfirm}
          className={styles.confirmButton}
          type="button"
        >
          Здацца
        </button>

        <button onClick={onClose} className={styles.cancelButton} type="button">
          Не
        </button>
      </div>
    </Modal>
  );
}

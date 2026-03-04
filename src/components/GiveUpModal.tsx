"use client";

import Modal from "./modals/Modal";

type GiveUpModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function GiveUpModal({ onConfirm, onClose }: GiveUpModalProps) {
  return (
    <Modal onClose={onClose} title="Ўпэўнены?" data-testid="give-up-modal">
      <p>Вы сапраўды хочаце здацца? Гэта скіне вашу бягучую серыю перамог.</p>

      <div>
        <button onClick={onConfirm} type="button">
          Здацца
        </button>

        <button onClick={onClose} type="button">
          Не
        </button>
      </div>
    </Modal>
  );
}

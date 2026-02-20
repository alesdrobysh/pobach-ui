import confetti from "canvas-confetti";

/**
 * Triggers a confetti celebration effect
 */
export function triggerConfetti(): void {
  // Primary burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#7c3aed", "#a78bfa", "#c4b5fd", "#10b981"],
  });

  // Side bursts (delayed 250ms)
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, 250);
}

"use client";

import { useEffect, useState } from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";

export default function CookieBanner() {
  const { hasConsented, giveConsent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (hasConsented === false) {
      setIsVisible(true);
      setIsAnimating(true);
    }
  }, [hasConsented]);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      giveConsent();
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <section
      aria-label="Паведамленне пра cookies"
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="w-full bg-[var(--card)] border-t border-[var(--border)] px-5 py-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-muted)] flex-1">
          Мы выкарыстоўваем cookies, каб захоўваць ваш прагрэс і аналізаваць
          статыстыку гульні.
        </p>
        <button
          onClick={handleAccept}
          type="button"
          className="btn-primary shrink-0 text-sm px-4 py-2"
        >
          Зразумела
        </button>
      </div>
    </section>
  );
}

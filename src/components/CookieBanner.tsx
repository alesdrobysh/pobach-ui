"use client";

import { useEffect, useState } from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";

export default function CookieBanner() {
  const { hasConsented, giveConsent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Only show if consent has NOT been given yet
    if (hasConsented === false) {
      setIsVisible(true);
      setIsAnimating(true);
    }
  }, [hasConsented]);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      giveConsent(); // Use context action
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div>
      <div>
        <p>
          Мы выкарыстоўваем cookies, каб захоўваць ваш прагрэс і аналізаваць
          статыстыку гульні.
        </p>
        <button onClick={handleAccept} type="button">
          Зразумела
        </button>
      </div>
    </div>
  );
}

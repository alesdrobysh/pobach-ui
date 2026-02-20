"use client";

import { useEffect, useState } from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import styles from "./CookieBanner.module.css";

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
    <div
      className={`${styles.banner} ${isAnimating ? styles.show : styles.hide}`}
    >
      <div className={styles.content}>
        <p className={styles.text}>
          Мы выкарыстоўваем cookies, каб захоўваць ваш прагрэс і аналізаваць
          статыстыку гульні.
        </p>
        <button className={styles.button} onClick={handleAccept} type="button">
          Зразумела
        </button>
      </div>
    </div>
  );
}

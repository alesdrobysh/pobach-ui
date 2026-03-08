"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { useBannerSlot } from "@/contexts/BannerContext";
import { BottomBanner } from "./BottomBanner";

export default function CookieBanner() {
  const { hasConsented, giveConsent } = useAnalytics();
  const { isVisible, isPreempted, show, dismiss } = useBannerSlot("cookie", 1);

  useEffect(() => {
    if (hasConsented === false) show();
  }, [hasConsented, show]);

  return (
    <BottomBanner
      ariaLabel="Паведамленне пра cookies"
      message="Мы выкарыстоўваем cookies, каб захоўваць ваш прагрэс і аналізаваць статыстыку гульні."
      buttonLabel="Зразумела"
      onAction={() => {
        dismiss();
        giveConsent();
      }}
      isVisible={isVisible}
      instant={isPreempted}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-R3P3P44GWT";

type ConsentDetail = {
  status?: "accepted" | "declined";
};

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const applyStoredConsent = () => {
      setEnabled(localStorage.getItem("cookie-consent") === "accepted");
    };

    const handleConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentDetail>).detail;
      setEnabled(detail?.status === "accepted");
    };

    applyStoredConsent();
    window.addEventListener("cookie-consent-change", handleConsentChange);

    return () => {
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            send_page_view: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  );
}

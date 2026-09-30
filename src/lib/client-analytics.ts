export type AnalyticsEventParams = Record<string, string | number | boolean>;

type AnalyticsWindow = typeof window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

function hasAnalyticsConsent() {
  try {
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

function ensureAnalyticsQueue(analyticsWindow: AnalyticsWindow) {
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];

  if (!analyticsWindow.gtag) {
    analyticsWindow.gtag = function (..._args: unknown[]) {
      analyticsWindow.dataLayer?.push(arguments);
    };
  }

  return analyticsWindow.gtag;
}

export function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsEventParams = {}
) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  const analyticsWindow = window as AnalyticsWindow;
  const gtag = ensureAnalyticsQueue(analyticsWindow);

  gtag("event", eventName, params);
}

export type AnalyticsEventParams = Record<string, string | number | boolean>;

type AnalyticsWindow = typeof window & {
  gtag?: (
    command: "event",
    eventName: string,
    params?: Record<string, unknown>
  ) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsEventParams = {}
) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;

  if (analyticsWindow.gtag) {
    analyticsWindow.gtag("event", eventName, params);
    return;
  }

  if (analyticsWindow.dataLayer) {
    analyticsWindow.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

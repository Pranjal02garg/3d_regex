"use client";

import { useEffect } from "react";

export const trackEvent = (eventName: string, data: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, data);
  }
};

export function PixelEventTracker({ eventName, data }: { eventName: string; data?: Record<string, unknown> }) {
  useEffect(() => {
    trackEvent(eventName, data);
  }, [eventName, data]);

  return null;
}

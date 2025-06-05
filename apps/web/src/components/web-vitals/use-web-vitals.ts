"use client";

import { useReportWebVitals } from "next/web-vitals";

// Updated EVENTS with 2025 Core Web Vitals thresholds from Google official standards
const EVENTS = [
  {
    metric: "LCP",
    name: "largest-contentful-paint",
    thresholds: { good: 2500, needsImprovement: 4000 }, // ≤2.5s good, ≤4.0s needs improvement, >4.0s poor
    description: "Largest Contentful Paint",
    unit: "ms",
  },
  {
    metric: "INP",
    name: "interaction-to-next-paint",
    thresholds: { good: 200, needsImprovement: 500 }, // ≤200ms good, ≤500ms needs improvement, >500ms poor
    description: "Interaction to Next Paint",
    unit: "ms",
  },
  {
    metric: "CLS",
    name: "cumulative-layout-shift",
    thresholds: { good: 0.1, needsImprovement: 0.25 }, // ≤0.1 good, ≤0.25 needs improvement, >0.25 poor
    description: "Cumulative Layout Shift",
    unit: "",
  },
  {
    metric: "FCP",
    name: "first-contentful-paint",
    thresholds: { good: 1800, needsImprovement: 3000 }, // Google recommended thresholds
    description: "First Contentful Paint",
    unit: "ms",
  },
  {
    metric: "TTFB",
    name: "time-to-first-byte",
    thresholds: { good: 800, needsImprovement: 1800 }, // Standard server response thresholds
    description: "Time to First Byte",
    unit: "ms",
  },
  {
    metric: "Next.js-hydration",
    name: "next-js-hydration",
    thresholds: { good: 1000, needsImprovement: 2500 }, // Next.js specific performance targets
    description: "Next.js Hydration Time",
    unit: "ms",
  },
  {
    metric: "Next.js-route-change-to-render",
    name: "next-js-route-change",
    thresholds: { good: 300, needsImprovement: 800 }, // Client-side navigation targets
    description: "Next.js Route Change",
    unit: "ms",
  },
  {
    metric: "Next.js-render",
    name: "next-js-render",
    thresholds: { good: 200, needsImprovement: 500 }, // Component render performance
    description: "Next.js Render Time",
    unit: "ms",
  },
];

// Helper function to determine performance rating
function getPerformanceRating(
  metricName: string,
  value: number,
): "good" | "needs-improvement" | "poor" {
  const event = EVENTS.find((e) => e.metric === metricName);
  if (!event) return "poor";

  if (value <= event.thresholds.good) return "good";
  if (value <= event.thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}

// Helper function to get custom event name
function getEventName(metricName: string): string {
  const event = EVENTS.find((e) => e.metric === metricName);
  return event?.name || metricName.toLowerCase();
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Check if gtag is available
    if (typeof window !== "undefined" && window.gtag) {
      const rating = getPerformanceRating(metric.name, metric.value);
      const eventName = getEventName(metric.name);

      // Send the main metric event to GA
      window.gtag("event", eventName, {
        // CLS values should be multiplied by 1000 for GA
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        event_label: metric.id, // unique to current page load
        non_interaction: true, // avoids affecting bounce rate
        custom_map: {
          metric_rating: rating,
          metric_delta: metric.delta,
          navigation_type: metric.navigationType,
        },
      });

      // Send a separate event for performance rating tracking
      window.gtag("event", "web_vitals_rating", {
        event_category: "Web Vitals",
        event_label: `${metric.name}_${rating}`,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        non_interaction: true,
      });

      // Optional: Log to console for debugging
      if (process.env.NODE_ENV === "development") {
        console.log("Web Vital sent to GA:", {
          name: metric.name,
          value: metric.value,
          rating,
          id: metric.id,
          delta: metric.delta,
          navigationType: metric.navigationType,
        });
      }
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        "Google Analytics (gtag) not found. Make sure GA is properly initialized.",
      );
      console.log("Web Vital (not sent):", metric);
    }
  });

  return null;
}

// TypeScript declaration for gtag (add this to your global types if needed)
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: {
        [key: string]: any;
      },
    ) => void;
  }
}

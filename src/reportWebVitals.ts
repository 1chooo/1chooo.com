import { onCLS, onINP, onLCP } from 'web-vitals';

declare global {
  interface Window {
    gtag: (event: string, name: string, options: any) => void;
  }
}

function sendToGoogleAnalytics({ name, delta, value, id }: { name: string, delta: number, value: number, id: string }) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  window.gtag('event', name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/articles/debug-performance-in-the-field
    // metric_rating: 'good' | 'needs-improvement' | 'poor',
    // debug_info: '...',
    // ...
  });
}


export default function reportWebVitals() {
  onCLS(sendToGoogleAnalytics);
  onINP(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
}

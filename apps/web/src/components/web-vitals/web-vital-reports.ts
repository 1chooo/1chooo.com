import { NextWebVitalsMetric } from 'next/app'

export const sendToGA4 = (metric: NextWebVitalsMetric, GA_ID: string | undefined) => {
  let metricValue = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

  if (GA_ID && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: metricValue,
      event_label: metric.id,
      non_interaction: true,
    });
    console.log(`[GA4] Sent metric: ${metric.name}, value: ${metricValue}, id: ${metric.id}`);
  } else {
    console.warn('[GA4] gtag is not available or GA_ID is missing');
  }
};

export const logMetric = (metric: NextWebVitalsMetric) => {
  switch (metric.name) {
    case 'FCP':
    case 'LCP':
      console.log(`${metric.name}:`, metric.value);
      break;
    // Add other cases as needed
  }
};

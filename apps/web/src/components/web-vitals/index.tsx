'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { sendToGA4, sendToGTM, logMetric } from './web-vital-reports'

/**
 * @see https://github.com/madewithnovel/next.js/blob/80185c2dea73ed8a70fe03b75b43e950af3ef7a6/app/vitals.tsx
 */
export function WebVitals() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  useReportWebVitals((metric) => {
    sendToGA4(metric, GA_ID);
    sendToGTM(metric);
    logMetric(metric);
  });

  return null;
}

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  FCP: number | null;
  LCP: number | null;
  FID: number | null;
  CLS: number | null;
  TTFB: number | null;
}

export const usePerformanceMonitoring = (componentName: string) => {
  const metrics = useRef<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
  });

  useEffect(() => {
    // Mark component mount
    performance.mark(`${componentName}-mount-start`);

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.current.FCP = entry.startTime;
          console.log(`[Performance] FCP: ${entry.startTime}ms`);
        }
      });
    });
    paintObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.current.LCP = lastEntry.startTime;
      console.log(`[Performance] LCP: ${lastEntry.startTime}ms`);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        metrics.current.FID = entry.processingStart - entry.startTime;
        console.log(`[Performance] FID: ${metrics.current.FID}ms`);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsScore = 0;
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      metrics.current.CLS = clsScore;
      console.log(`[Performance] CLS: ${clsScore}`);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Time to First Byte
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        metrics.current.TTFB = entry.responseStart - entry.requestStart;
        console.log(`[Performance] TTFB: ${metrics.current.TTFB}ms`);
      });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

    return () => {
      // Cleanup observers
      paintObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      navigationObserver.disconnect();

      // Mark component unmount
      performance.mark(`${componentName}-unmount`);
      performance.measure(
        `${componentName}-lifecycle`,
        `${componentName}-mount-start`,
        `${componentName}-unmount`
      );
    };
  }, [componentName]);

  return metrics.current;
};

export const reportPerformanceMetrics = (metrics: PerformanceMetrics) => {
  // Here you would typically send metrics to your analytics service
  console.log('[Performance Report]', {
    FCP: metrics.FCP,
    LCP: metrics.LCP,
    FID: metrics.FID,
    CLS: metrics.CLS,
    TTFB: metrics.TTFB,
  });
};

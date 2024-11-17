import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  mountTime?: number;
  renderTime?: number;
  unmountTime?: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  const metrics = useRef<PerformanceMetrics>({});
  const startTime = useRef<number>(0);

  useEffect(() => {
    // Mount
    startTime.current = performance.now();
    performance.mark(`${componentName}-mount-start`);

    // First render complete
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          metrics.current = {
            ...metrics.current,
            [entry.name]: entry.duration
          };
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => {
      // Unmount
      const unmountTime = performance.now();
      performance.mark(`${componentName}-unmount`);
      
      performance.measure(
        `${componentName}-mount-duration`,
        `${componentName}-mount-start`,
        `${componentName}-unmount`
      );

      metrics.current.unmountTime = unmountTime - startTime.current;
      
      // Log performance metrics
      console.log(`Performance metrics for ${componentName}:`, {
        mountToUnmount: metrics.current.unmountTime,
        ...metrics.current
      });

      // Cleanup
      observer.disconnect();
    };
  }, [componentName]);

  return metrics.current;
};

import { useCallback, useRef, useEffect } from 'react';

type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
};

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): DebouncedFunction<T> {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise<ReturnType<T>>((resolve) => {
        timeoutRef.current = setTimeout(() => {
          resolve(callback(...args));
        }, delay);
      });
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return Object.assign(debouncedCallback, { cancel });
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T {
  const inThrottle = useRef(false);
  const lastArgs = useRef<any[]>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        inThrottle.current = true;
        lastArgs.current = args;
        const result = callback(...args);
        setTimeout(() => {
          inThrottle.current = false;
          if (lastArgs.current !== args) {
            callback(...lastArgs.current!);
          }
        }, limit);
        return result;
      }
      lastArgs.current = args;
    },
    [callback, limit]
  ) as T;
}

export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[]
): T {
  const ref = useRef<T>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback, ...dependencies]);

  return useCallback(
    (...args: Parameters<T>) => ref.current(...args),
    [ref]
  ) as T;
}

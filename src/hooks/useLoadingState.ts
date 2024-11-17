import { useState, useCallback } from 'react';

export interface LoadingState<T = unknown> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export interface UseLoadingStateOptions<T> {
  initialData?: T | null;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

export function useLoadingState<T = unknown>(
  options: UseLoadingStateOptions<T> = {}
) {
  const [state, setState] = useState<LoadingState<T>>({
    isLoading: false,
    error: null,
    data: options.initialData || null
  });

  const startLoading = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState(prev => ({ ...prev, isLoading: false, error }));
    options.onError?.(error);
  }, [options]);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, isLoading: false, data, error: null }));
    options.onSuccess?.(data);
  }, [options]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      data: options.initialData || null
    });
  }, [options.initialData]);

  const withLoading = useCallback(
    async <R extends T>(promise: Promise<R>) => {
      try {
        startLoading();
        const result = await promise;
        setData(result);
        return result;
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      }
    },
    [startLoading, setData, setError]
  );

  return {
    ...state,
    startLoading,
    setError,
    setData,
    reset,
    withLoading
  };
}

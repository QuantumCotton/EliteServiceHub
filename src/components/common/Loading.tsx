import React from 'react';
import { withErrorBoundary } from './ErrorBoundary';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

function LoadingComponent({
  size = 'md',
  fullScreen = false,
  message = 'Loading...'
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        className={`animate-spin text-indigo-600 ${sizes[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {message && (
        <span className="text-sm font-medium text-gray-700">{message}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
        {content}
      </div>
    );
  }

  return content;
}

export const Loading = withErrorBoundary(LoadingComponent);

// HOC to add loading state
export function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  loadingProps?: LoadingProps
) {
  return function WithLoadingComponent({
    isLoading,
    ...props
  }: P & { isLoading: boolean }) {
    if (isLoading) {
      return <Loading {...loadingProps} />;
    }

    return <WrappedComponent {...(props as P)} />;
  };
}

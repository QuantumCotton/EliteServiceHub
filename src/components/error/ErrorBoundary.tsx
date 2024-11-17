import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useBusinessConfig } from '../../context/BusinessContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Here you could send error reports to your error tracking service
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const { currentBusinessConfig: { theme } } = useBusinessConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[400px] flex items-center justify-center p-6"
      style={{ backgroundColor: theme.background }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mb-6 text-5xl"
        >
          😕
        </motion.div>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: theme.text }}
        >
          Oops! Something went wrong
        </h2>
        <p 
          className="text-sm mb-6"
          style={{ color: theme.textMuted }}
        >
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md transition-colors duration-200"
          style={{ 
            backgroundColor: theme.accent,
            color: theme.background
          }}
        >
          Refresh Page
        </button>
      </div>
    </motion.div>
  );
};

export const ErrorBoundary = ErrorBoundaryClass;

import React, { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';
import { useBusinessConfig } from '../../context/BusinessContext';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  const { currentBusinessConfig: { theme } } = useBusinessConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-8"
      style={{ backgroundColor: theme.background }}
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 mb-4 mx-auto"
          style={{ 
            borderRadius: '50%',
            border: `3px solid ${theme.accent}`,
            borderTopColor: 'transparent'
          }}
        />
        <p 
          className="text-sm"
          style={{ color: theme.textMuted }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
};

interface LazyLoadWrapperProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  component,
  fallback
}) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback || <Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

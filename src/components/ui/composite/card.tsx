import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glowEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
  glowEffect = false
}) => {
  const { state: { theme } } = useApp();

  const style = {
    backgroundColor: `${theme.background}40`,
    borderColor: `${theme.primary}20`,
    ...(glowEffect ? {
      boxShadow: `0 0 20px ${theme.primary}20`
    } : {})
  };

  return (
    <motion.div
      className={`
        relative rounded-2xl border backdrop-blur-lg
        p-6 transition-all duration-300 ease-in-out
        ${hover ? 'hover:bg-opacity-30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={style}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div 
        className="absolute inset-0 rounded-2xl opacity-10"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`
        }}
      />
    </motion.div>
  );
};

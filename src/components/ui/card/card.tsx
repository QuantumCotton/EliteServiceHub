import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../../contexts/AppContext';
import { cn } from '../../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glowEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  onClick,
  hover = true,
  glowEffect = false
}, ref) => {
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
      ref={ref}
      className={cn(
        'relative rounded-2xl border backdrop-blur-lg',
        'p-6 transition-all duration-300 ease-in-out',
        hover && 'hover:bg-opacity-30',
        onClick && 'cursor-pointer',
        className
      )}
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
});
Card.displayName = "Card";

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

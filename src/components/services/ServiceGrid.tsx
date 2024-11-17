import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../../types/business';
import { ServiceCard } from './ServiceCard';
import { useBusinessConfig } from '../../context/BusinessContext';
import { cn } from '../../lib/utils';

interface ServiceGridProps {
  services: Service[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services, className }) => {
  const { currentBusinessConfig: { theme } } = useBusinessConfig();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid gap-6 w-full",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      style={{ backgroundColor: theme.background }}
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
        />
      ))}
    </motion.div>
  );
};

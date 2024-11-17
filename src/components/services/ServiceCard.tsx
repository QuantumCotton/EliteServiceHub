import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Service } from '../../types/service';
import { useTheme } from '../../hooks/useTheme';
import { useServiceConfig } from '../../hooks/useServiceConfig';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  const theme = useTheme();
  const { calculatePrice } = useServiceConfig(service.id);

  const basePrice = calculatePrice({});

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl",
        "transform hover:-translate-y-1 bg-card"
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-foreground">
              {service.name}
            </h3>
            {service.type && (
              <Badge variant="outline">
                {service.type}
              </Badge>
            )}
          </div>
        </div>

        <p className="text-sm mb-4 text-muted-foreground">
          {service.description}
        </p>

        <div className="space-y-2 mb-4">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center text-sm text-muted-foreground"
            >
              <span className="mr-2 text-primary">•</span>
              {feature}
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="text-sm text-muted-foreground">
              +{service.features.length - 3} more features
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">
              From ${basePrice}
            </span>
            {service.duration && (
              <span className="text-sm text-muted-foreground">
                {service.duration} hour{service.duration > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <Link to={`/services/${service.id}`}>
            <Button variant="default">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

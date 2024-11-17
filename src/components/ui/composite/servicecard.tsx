import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useApp } from '../../contexts/AppContext';
import { Service } from '../../types/business';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { theme, setSelectedService } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 bg-opacity-10 backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-bold">{service.name}</h3>
        </div>
        <p className="text-sm opacity-80 mb-4">{service.description}</p>
        <div className="space-y-2 mb-4">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm">
              <span className="mr-2">•</span>
              {feature}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold" style={{ color: theme.primary }}>
            {service.price}
          </span>
          <Button
            onClick={() => setSelectedService(service)}
            style={{
              backgroundColor: theme.primary,
              color: 'white',
            }}
          >
            Book Now
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

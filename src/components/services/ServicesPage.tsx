import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBusinessConfig } from '../../context/BusinessContext';
import { ServiceGrid } from './ServiceGrid';
import { cn } from '../../lib/utils';

export const ServicesPage: React.FC = () => {
  const { currentBusinessConfig: { theme, services } } = useBusinessConfig();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: theme.text }}
          >
            Our Services
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: theme.textMuted }}
          >
            Discover our comprehensive range of professional services tailored to meet your needs
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-md",
                "focus:outline-none focus:ring-2",
                "transition-colors duration-200"
              )}
              style={{ 
                backgroundColor: theme.primaryMuted,
                color: theme.text,
                borderColor: theme.border,
              }}
            />
          </div>
        </motion.div>

        {filteredServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p 
              className="text-lg"
              style={{ color: theme.textMuted }}
            >
              No services found matching your search.
            </p>
          </motion.div>
        ) : (
          <ServiceGrid 
            services={filteredServices}
            className="mt-8" 
          />
        )}
      </div>
    </motion.div>
  );
};

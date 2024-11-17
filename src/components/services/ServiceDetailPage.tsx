import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBusinessConfig } from '../../context/BusinessContext';
import { cn } from '../../lib/utils';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentBusinessConfig: { theme, services } } = useBusinessConfig();

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div 
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundColor: theme.background }}
      >
        <h1 
          className="text-2xl font-bold mb-4"
          style={{ color: theme.text }}
        >
          Service Not Found
        </h1>
        <button
          onClick={() => navigate('/services')}
          className="px-4 py-2 rounded-md transition-colors duration-200"
          style={{ 
            backgroundColor: theme.accent,
            color: theme.background
          }}
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ backgroundColor: theme.primaryMuted }}
        >
          <div className="p-8">
            <div className="flex items-center mb-6">
              {service.icon && (
                <span 
                  className="text-4xl mr-4"
                  style={{ color: theme.accent }}
                >
                  {service.icon}
                </span>
              )}
              <h1 
                className="text-3xl font-bold"
                style={{ color: theme.text }}
              >
                {service.name}
              </h1>
            </div>

            <p 
              className="text-lg mb-8"
              style={{ color: theme.textMuted }}
            >
              {service.description}
            </p>

            <div className="space-y-6">
              <div>
                <h2 
                  className="text-xl font-semibold mb-4"
                  style={{ color: theme.text }}
                >
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "flex items-center p-3 rounded-md",
                        "transition-colors duration-200"
                      )}
                      style={{ backgroundColor: theme.background }}
                    >
                      <span 
                        className="text-xl mr-3"
                        style={{ color: theme.accent }}
                      >
                        •
                      </span>
                      <span style={{ color: theme.textMuted }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6" style={{ borderColor: theme.border }}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ color: theme.text }}
                    >
                      Price
                    </h3>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: theme.accent }}
                    >
                      {service.price}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className={cn(
                      "px-6 py-3 rounded-md text-lg font-semibold",
                      "transition-all duration-200 transform hover:scale-105"
                    )}
                    style={{ 
                      backgroundColor: theme.accent,
                      color: theme.background
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate('/services')}
            className={cn(
              "px-4 py-2 rounded-md",
              "transition-colors duration-200"
            )}
            style={{ 
              backgroundColor: theme.primaryMuted,
              color: theme.text
            }}
          >
            Back to Services
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

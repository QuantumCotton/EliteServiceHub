import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/core/button';
import { useApp } from '../../contexts/AppContext';

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { state: { theme, business } } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary}40 0%, transparent 70%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={item}
          style={{ color: theme.primary }}
        >
          {business.name}
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          variants={item}
          style={{ color: `${theme.primary}90` }}
        >
          Professional {business.type} services tailored to your needs. Experience excellence in every detail.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={item}
        >
          <Button
            size="lg"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
          <Button
            variant="secondary"
            size="lg"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Service areas */}
        {business.serviceAreas && business.serviceAreas.length > 0 && (
          <motion.div 
            className="mt-12"
            variants={item}
          >
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: `${theme.primary}80` }}
            >
              Serving
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {business.serviceAreas.map((area, index) => (
                <span
                  key={`${area}-${index}`}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${theme.primary}20`,
                    color: theme.primary
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-16 left-0 right-0 h-32 transform skew-y-3"
        style={{
          background: `linear-gradient(to right, ${theme.primary}10, ${theme.secondary}10)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  );
};

export default Hero;

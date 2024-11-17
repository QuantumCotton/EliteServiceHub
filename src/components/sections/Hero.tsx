import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';

const Hero: React.FC = () => {
  const { currentBusinessConfig, state } = useApp();
  const { theme } = state;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <span style={{ color: theme.primary }}>{currentBusinessConfig.name}</span>
          <br />
          <span className="text-white">Professional Services</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto"
        >
          {currentBusinessConfig.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            style={{ 
              backgroundColor: theme.background,
              color: theme.primary,
              borderColor: theme.primary
            }}
            className="px-8 py-3 rounded-xl border-2 font-medium text-lg hover:bg-opacity-50 transition-all"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors font-medium text-lg"
          >
            Get in Touch
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white/50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

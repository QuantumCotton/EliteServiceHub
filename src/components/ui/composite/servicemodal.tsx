import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../context/BusinessContext';
import { useApp } from '../../contexts/AppContext';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  selectedService
}) => {
  const { state, dispatch } = useApp();
  const { isModalOpen } = state;

  if (!isOpen || !selectedService) return null;

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeModal}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
            <div className="glass-morphism m-4 p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold neon-text mb-2">
                    {selectedService.name}
                  </h2>
                  <p className="text-white/70">
                    {selectedService.description}
                  </p>
                </div>
                
                <button
                  onClick={closeModal}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white/70">
                        <svg className="w-5 h-5 text-neon-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedService.price && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Pricing</h3>
                    <p className="text-neon-green font-medium">
                      Starting at {selectedService.price}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <button className="neon-glow px-6 py-2 rounded-xl bg-dark-bg text-neon-green font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;

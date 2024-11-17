import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../../../types/business';
import { useApp } from '../../../../contexts/AppContext';
import { Modal, ModalContent, ModalHeader, ModalFooter } from '../../modal';
import { Button } from '../../button';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

export const ServiceModal = React.forwardRef<HTMLDivElement, ServiceModalProps>(({
  isOpen,
  onClose,
  selectedService
}, ref) => {
  const { state: { theme } } = useApp();

  if (!isOpen || !selectedService) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={selectedService.name}>
      <ModalHeader>
        <div className="flex items-center gap-3">
          {selectedService.icon && (
            <span className="text-2xl" style={{ color: theme.primary }}>
              {selectedService.icon}
            </span>
          )}
          <div>
            <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>
              {selectedService.name}
            </h2>
            <p className="text-sm opacity-70">
              {selectedService.description}
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedService.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm">
                  <span className="mr-2" style={{ color: theme.primary }}>•</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <p className="text-xl font-bold" style={{ color: theme.primary }}>
              {selectedService.price}
            </p>
          </div>

          {selectedService.keywords && (
            <div className="flex flex-wrap gap-2">
              {selectedService.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-full text-xs"
                  style={{ 
                    backgroundColor: `${theme.primary}20`,
                    color: theme.primary 
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </ModalContent>

      <ModalFooter>
        <Button
          onClick={onClose}
          variant="outline"
          style={{ borderColor: theme.primary }}
        >
          Close
        </Button>
        <Button
          variant="default"
          style={{
            backgroundColor: theme.primary,
            color: theme.background,
          }}
        >
          Book Now
        </Button>
      </ModalFooter>
    </Modal>
  );
});

ServiceModal.displayName = "ServiceModal";

import React from 'react';
import { useBusinessConfig } from '../../context/BusinessContext';

export const Footer: React.FC = () => {
  const { currentBusinessConfig } = useBusinessConfig();

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{currentBusinessConfig.name}</h3>
            <p className="mb-4">{currentBusinessConfig.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>{currentBusinessConfig.contact.address}</p>
            <p>{currentBusinessConfig.contact.phone}</p>
            <p>{currentBusinessConfig.contact.email}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            {currentBusinessConfig.contact.hours.map((hour, index) => (
              <p key={index}>{hour}</p>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} {currentBusinessConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

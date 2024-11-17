import React, { createContext, useContext, useState } from 'react';
import { BusinessConfig, BusinessType, Service, Theme } from '../types/business';

interface BusinessContextType {
  currentBusinessConfig: BusinessConfig;
  setCurrentBusinessConfig: (config: BusinessConfig) => void;
}

const defaultTheme: Theme = {
  primary: 'hsl(210, 100%, 50%)',
  secondary: 'hsl(200, 100%, 45%)',
  accent: 'hsl(150, 100%, 50%)',
  background: 'hsl(0, 0%, 4%)',
  text: 'hsl(0, 0%, 100%)',
  textMuted: 'hsl(0, 0%, 70%)',
  primaryMuted: 'hsl(210, 50%, 30%)',
  secondaryMuted: 'hsl(200, 50%, 25%)'
};

const defaultConfig: BusinessConfig = {
  id: "default",
  name: "Elite Service Hub",
  type: BusinessType.CLEANING,
  theme: defaultTheme,
  services: [],
  contact: {
    phone: "(555) 123-4567",
    email: "contact@example.com",
    address: "123 Business St, City, ST 12345",
    hours: [
      "Monday - Friday: 9:00 AM - 5:00 PM",
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed"
    ]
  },
  serviceAreas: ["Local Area"],
  features: [
    {
      title: "Professional Service",
      description: "High-quality service delivered by experienced professionals"
    }
  ],
  seo: {
    title: "Elite Service Hub - Professional Services",
    description: "Professional services delivered with excellence",
    keywords: ["service", "professional", "quality"]
  }
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBusinessConfig, setCurrentBusinessConfig] = useState<BusinessConfig>(defaultConfig);

  return (
    <BusinessContext.Provider value={{ currentBusinessConfig, setCurrentBusinessConfig }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessConfig = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessConfig must be used within a BusinessProvider');
  }
  return context;
};

export type { BusinessConfig, Service, Theme, BusinessType };
export { BusinessType as BusinessTypes };

import { Theme } from './theme';

export enum BusinessType {
  CLEANING = 'cleaning-service',
  AUTO_DETAILING = 'auto-detailing',
  CHRISTMAS_LIGHTS = 'christmas-lights',
  CONSTRUCTION_CLEANUP = 'construction-cleanup',
  HVAC = 'hvac-service',
  LANDSCAPING = 'landscaping-service',
  POOL_SERVICE = 'pool-service',
  PEST_CONTROL = 'pest-control',
  TURF_SERVICE = 'turf-service'
}

export interface Service {
  id: string;
  name: string;
  type: BusinessType;
  description: string;
  price: string;
  features: string[];
  icon?: string;
  keywords: string[];
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
  hours: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface Business {
  config: BusinessConfig;
  type: BusinessType;
  theme: Theme;
}

export interface BusinessConfig {
  id: string;
  name: string;
  type: BusinessType;
  theme: Theme;
  description: string;
  services: Service[];
  contact: Contact;
  serviceAreas: string[];
  features: Feature[];
  seo: SEO;
  testimonials: Testimonial[];
}

export interface BusinessState {
  currentBusiness: BusinessType | null;
  currentBusinessConfig: BusinessConfig | null;
  business: Business | null;
  theme: Theme | null;
  selectedService: Service | null;
  selectedLocation: string | null;
  isModalOpen: boolean;
}

export type BusinessAction =
  | { type: 'SET_BUSINESS'; payload: BusinessType; config?: BusinessConfig }
  | { type: 'SET_SERVICE'; payload: Service | null }
  | { type: 'SET_LOCATION'; payload: string | null }
  | { type: 'TOGGLE_MODAL'; payload: boolean };

// Type guard for BusinessType
export const isBusinessType = (value: string): value is BusinessType => {
  return Object.values(BusinessType).includes(value as BusinessType);
};

// Service configuration type safety
export type ServiceConfigKey = keyof typeof BusinessType;
export const getServiceConfig = (type: string): BusinessConfig | undefined => {
  if (isBusinessType(type)) {
    return ServiceConfigs[type];
  }
  return undefined;
};

export type { Theme };

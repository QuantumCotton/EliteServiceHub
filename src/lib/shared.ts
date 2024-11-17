import { Theme } from '../types/theme';
import { BusinessConfig, BusinessType, Service, Contact, Feature } from '../types/business';

export function createBusinessConfig(
  id: string,
  name: string,
  type: BusinessType,
  theme: Theme,
  services: Service[],
  contact: Contact,
  serviceAreas: string[],
  features: Feature[] = [],
  seo = {
    title: name,
    description: `Professional ${name} services - Quality and reliability guaranteed.`,
    keywords: ['service', 'professional', 'quality', name.toLowerCase()]
  }
): BusinessConfig {
  return {
    id,
    name,
    type,
    theme,
    services,
    contact,
    serviceAreas,
    features,
    seo
  };
}

export const defaultContact: Contact = {
  phone: '(555) 123-4567',
  email: 'info@example.com',
  address: '123 Business St, City, ST 12345',
  hours: [
    'Monday-Friday: 8:00 AM - 6:00 PM',
    'Saturday: 9:00 AM - 4:00 PM',
    'Sunday: Closed'
  ]
};

export const defaultServiceAreas = [
  'Greater Metropolitan Area',
  'Surrounding Suburbs',
  'Neighboring Cities'
];

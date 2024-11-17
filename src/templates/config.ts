import { BusinessConfig, BusinessType } from '../types/business';
import { createTurfServiceSite } from './examples/turf-service';

type ServiceConfigs = {
  [K in BusinessType]: BusinessConfig;
};

export const serviceConfigs: ServiceConfigs = {
  [BusinessType.TURF_SERVICE]: createTurfServiceSite(),
  [BusinessType.AUTO_DETAILING]: {} as BusinessConfig, // To be implemented
  [BusinessType.CHRISTMAS_LIGHTS]: {} as BusinessConfig, // To be implemented
  [BusinessType.CLEANING]: {} as BusinessConfig, // To be implemented
  [BusinessType.CONSTRUCTION_CLEANUP]: {} as BusinessConfig, // To be implemented
  [BusinessType.HVAC]: {} as BusinessConfig, // To be implemented
  [BusinessType.LANDSCAPING]: {} as BusinessConfig, // To be implemented
  [BusinessType.PEST_CONTROL]: {} as BusinessConfig, // To be implemented
  [BusinessType.POOL_SERVICE]: {} as BusinessConfig // To be implemented
};

export const createBusinessConfig = (
  id: string,
  name: string,
  type: string,
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  },
  services: Array<{
    name: string;
    description: string;
    price: string;
    features: string[];
    type: string;
  }>,
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string[];
  },
  serviceAreas: string[]
): BusinessConfig => {
  // Generate a unique theme based on the business type and colors
  const theme = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background,
    fonts: {
      heading: 'Space Grotesk',
      body: 'Inter',
      accent: 'Audiowide'
    },
    spacing: {
      section: '6rem',
      component: '2rem',
      element: '1rem'
    }
  };

  // Create service objects with unique IDs
  const formattedServices = services.map((service, index) => ({
    id: `${id}-service-${index + 1}`,
    ...service,
    icon: `/icons/${type}/${service.name.toLowerCase().replace(/\s+/g, '-')}.svg`,
    title: service.name
  }));

  return {
    id,
    name,
    type,
    theme,
    services: formattedServices,
    contact,
    serviceAreas,
    features: [
      {
        title: 'Professional Service',
        description: 'Expert team with years of experience',
        icon: '/icons/common/professional.svg'
      },
      {
        title: 'Quality Guaranteed',
        description: '100% satisfaction guaranteed',
        icon: '/icons/common/quality.svg'
      },
      {
        title: 'Modern Technology',
        description: 'Using the latest industry technology',
        icon: '/icons/common/technology.svg'
      },
      {
        title: '24/7 Support',
        description: 'Always here when you need us',
        icon: '/icons/common/support.svg'
      }
    ],
    testimonials: [], // To be filled by the business
    gallery: [], // To be filled by the business
    meta: {
      title: `${name} - Professional ${type} Services`,
      description: `Professional ${type} services in ${serviceAreas.join(', ')}. Quality service guaranteed.`,
      keywords: `${type}, professional ${type}, ${type} service, ${serviceAreas.join(', ')}`
    }
  };
};

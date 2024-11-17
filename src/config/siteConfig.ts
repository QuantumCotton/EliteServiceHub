export type ServiceType = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  price: string;
};

export type LocationType = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceArea: string[];
};

export type BusinessType = {
  id: string;
  name: string;
  description: string;
  type: 'turf' | 'cleaning' | 'landscaping' | 'pool' | 'custom';
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  services: ServiceType[];
  locations: LocationType[];
};

// Example configuration for turf service
export const turfServiceConfig: BusinessType = {
  id: 'elite-turf',
  name: 'The Elite Service Hub - Turf',
  description: 'Premium turf maintenance and installation services',
  type: 'turf',
  theme: {
    primary: '#00ff9d',
    secondary: '#0066ff',
    accent: '#ff00ff',
    background: '#0a0a0a'
  },
  features: [
    {
      title: 'Expert Service',
      description: 'Professional and experienced team',
      icon: '/icons/expert.svg'
    },
    {
      title: 'Modern Technology',
      description: 'Latest equipment and techniques',
      icon: '/icons/tech.svg'
    }
  ],
  services: [
    {
      id: '1',
      title: 'Turf Maintenance',
      description: 'Regular maintenance to keep your turf in pristine condition year-round.',
      features: [
        'Weekly/bi-weekly maintenance',
        'Fertilization programs',
        'Weed control',
        'Disease prevention',
        'pH balance monitoring'
      ],
      icon: '/icons/maintenance.svg',
      price: '$199/month'
    },
    // ... other services
  ],
  locations: [
    {
      id: 'miami',
      name: 'Miami Branch',
      address: '123 Palm Avenue, Miami, FL 33101',
      phone: '(305) 555-0123',
      email: 'miami@eliteservicehub.com',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      },
      serviceArea: ['Miami Beach', 'Downtown Miami', 'Coral Gables']
    }
  ]
};

// Example configuration for cleaning service
export const cleaningServiceConfig: BusinessType = {
  id: 'elite-cleaning',
  name: 'The Elite Service Hub - Cleaning',
  description: 'Professional cleaning services for homes and businesses',
  type: 'cleaning',
  theme: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    background: '#0a0a0a'
  },
  features: [
    {
      title: 'Eco-Friendly',
      description: 'Environmentally conscious cleaning solutions',
      icon: '/icons/eco.svg'
    },
    {
      title: 'Certified Team',
      description: 'Fully trained and certified cleaners',
      icon: '/icons/certified.svg'
    }
  ],
  services: [
    {
      id: '1',
      title: 'Regular Cleaning',
      description: 'Comprehensive cleaning service for your space.',
      features: [
        'Deep cleaning',
        'Sanitization',
        'Dusting',
        'Vacuuming',
        'Surface cleaning'
      ],
      icon: '/icons/cleaning.svg',
      price: '$149/visit'
    }
  ],
  locations: [
    {
      id: 'orlando',
      name: 'Orlando Branch',
      address: '456 Orange Ave, Orlando, FL 32801',
      phone: '(407) 555-0123',
      email: 'orlando@eliteservicehub.com',
      coordinates: {
        lat: 28.5383,
        lng: -81.3792
      },
      serviceArea: ['Downtown Orlando', 'Winter Park', 'Lake Nona']
    }
  ]
};

// Add more service configurations as needed
export const serviceConfigs: Record<string, BusinessType> = {
  'elite-turf': turfServiceConfig,
  'elite-cleaning': cleaningServiceConfig
};

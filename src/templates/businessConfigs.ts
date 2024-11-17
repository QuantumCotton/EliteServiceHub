import { createBusinessConfig } from './config';

export const serviceConfigs = {
  'elite-turf': createBusinessConfig(
    'elite-turf',
    'Elite Turf',
    'Lawn Care',
    {
      primary: '#00ff9d',
      secondary: '#0066ff',
      accent: '#ff00ff',
      background: '#0a0a0a'
    },
    [
      {
        name: 'Lawn Maintenance',
        description: 'Regular lawn maintenance including mowing, edging, and cleanup',
        price: 'From $50',
        features: ['Weekly or bi-weekly service', 'Professional equipment', 'Detailed cleanup'],
        type: 'maintenance'
      },
      {
        name: 'Landscaping',
        description: 'Complete landscape design and installation services',
        price: 'Custom quote',
        features: ['Custom design', 'Professional installation', 'Quality materials'],
        type: 'landscaping'
      },
      {
        name: 'Irrigation',
        description: 'Irrigation system installation and maintenance',
        price: 'From $200',
        features: ['System design', 'Professional installation', 'Regular maintenance'],
        type: 'irrigation'
      }
    ],
    {
      phone: '(555) 123-4567',
      email: 'info@eliteturf.com',
      address: '123 Lawn Care Way, Green City, ST 12345',
      hours: ['Mon-Fri: 8am-6pm', 'Sat: 9am-4pm', 'Sun: Closed']
    },
    ['Green City', 'Meadowville', 'Grassland Heights']
  )
} as const;

export type BusinessType = keyof typeof serviceConfigs;

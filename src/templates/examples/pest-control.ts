import { BusinessConfig, BusinessType } from '../../types/business';

export const createPestControlSite = (): BusinessConfig => ({
  id: 'pest-control',
  name: 'Elite Pest Control',
  type: BusinessType.PEST_CONTROL,
  description: 'Professional pest control services for homes and businesses, using safe and effective methods.',
  theme: {
    primary: '#2c6e49',
    secondary: '#4c956c',
    accent: '#fefee3',
    background: '#ffffff',
    text: '#2c6e49',
    textMuted: '#4c956c',
    primaryMuted: '#84a98c',
    secondaryMuted: '#b7e4c7',
    border: '#84a98c'
  },
  services: [
    {
      id: 'residential',
      name: 'Residential Pest Control',
      type: BusinessType.PEST_CONTROL,
      description: 'Comprehensive pest control for homes and residential properties.',
      price: 'Starting at $129',
      features: [
        'Initial inspection',
        'Treatment plan',
        'Regular monitoring',
        'Prevention methods',
        'Safe for family and pets'
      ],
      icon: '🏠',
      keywords: ['residential', 'home', 'pest control', 'extermination']
    },
    {
      id: 'commercial',
      name: 'Commercial Pest Control',
      type: BusinessType.PEST_CONTROL,
      description: 'Professional pest management for businesses and commercial properties.',
      price: 'Starting at $299',
      features: [
        'Comprehensive inspection',
        'Custom treatment plans',
        'Regular service visits',
        'Documentation and reporting',
        'Health code compliance'
      ],
      icon: '🏢',
      keywords: ['commercial', 'business', 'pest management', 'prevention']
    }
  ],
  contact: {
    phone: '(555) 890-1234',
    email: 'info@elitepestcontrol.com',
    address: '567 Pest Free Road, Safety Town, ST 67890',
    hours: [
      'Monday-Friday: 7:00 AM - 6:00 PM',
      'Saturday: 8:00 AM - 2:00 PM',
      'Sunday: Emergency service only'
    ]
  },
  serviceAreas: [
    'Safety Town',
    'Clean Heights',
    'Pest Free Valley',
    'Protection Hills'
  ],
  features: [
    {
      title: 'Eco-Friendly Solutions',
      description: 'Using environmentally responsible pest control methods.',
      icon: '🌿'
    },
    {
      title: 'Licensed Technicians',
      description: 'State certified and professionally trained staff.',
      icon: '👨‍🔬'
    },
    {
      title: 'Guaranteed Results',
      description: 'Satisfaction guaranteed with our pest control services.',
      icon: '✅'
    }
  ],
  seo: {
    title: 'Elite Pest Control - Professional Pest Management Services',
    description: 'Expert pest control services for homes and businesses. Safe, effective, and eco-friendly pest management solutions.',
    keywords: [
      'pest control',
      'pest management',
      'exterminator',
      'pest prevention',
      'residential pest control',
      'commercial pest control'
    ]
  },
  testimonials: [
    {
      name: 'Robert Smith',
      text: 'Elite Pest Control completely eliminated our pest problem. Their service is professional and effective.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      text: 'Great service! They use safe products and their prevention methods really work.',
      rating: 5
    }
  ]
});

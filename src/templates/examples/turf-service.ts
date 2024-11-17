import { BusinessConfig, BusinessType } from '../../types/business';

export const createTurfServiceSite = (): BusinessConfig => ({
  id: 'turf-service',
  name: 'Elite Turf Solutions',
  type: BusinessType.TURF_SERVICE,
  description: 'Professional artificial turf installation and maintenance services for residential and commercial properties.',
  theme: {
    primary: '#2d6a4f',
    secondary: '#40916c',
    accent: '#b7e4c7',
    background: '#ffffff',
    text: '#1b4332',
    textMuted: '#52b788',
    primaryMuted: '#74c69d',
    secondaryMuted: '#95d5b2',
    border: '#d8f3dc'
  },
  services: [
    {
      id: 'installation',
      name: 'Turf Installation',
      type: BusinessType.TURF_SERVICE,
      description: 'Professional artificial turf installation for any space.',
      price: 'Starting at $8/sq ft',
      features: [
        'Site preparation',
        'Premium turf materials',
        'Professional installation',
        'Drainage system',
        'Infill application'
      ],
      icon: '🌱',
      keywords: ['turf installation', 'artificial grass', 'synthetic lawn', 'landscaping']
    },
    {
      id: 'maintenance',
      name: 'Turf Maintenance',
      type: BusinessType.TURF_SERVICE,
      description: 'Regular maintenance to keep your artificial turf looking perfect.',
      price: 'Starting at $199',
      features: [
        'Deep cleaning',
        'Debris removal',
        'Infill redistribution',
        'Seam repair',
        'Deodorizing treatment'
      ],
      icon: '🧹',
      keywords: ['turf maintenance', 'cleaning', 'repair', 'artificial grass maintenance']
    }
  ],
  contact: {
    phone: '(555) 345-6789',
    email: 'info@eliteturf.com',
    address: '890 Green Way, Lawn Valley, LV 34567',
    hours: [
      'Monday-Friday: 7:00 AM - 6:00 PM',
      'Saturday: 8:00 AM - 3:00 PM',
      'Sunday: Closed'
    ]
  },
  serviceAreas: [
    'Lawn Valley',
    'Green Heights',
    'Turf Town',
    'Grass Plains'
  ],
  features: [
    {
      title: 'Premium Materials',
      description: 'Using only the highest quality artificial turf products.',
      icon: '✨'
    },
    {
      title: 'Expert Installation',
      description: 'Professionally trained installation teams with years of experience.',
      icon: '👷'
    },
    {
      title: 'Warranty Coverage',
      description: 'Comprehensive warranty on both materials and installation.',
      icon: '📋'
    }
  ],
  seo: {
    title: 'Elite Turf Solutions - Professional Artificial Turf Installation & Maintenance',
    description: 'Expert artificial turf installation and maintenance services. Transform your space with beautiful, low-maintenance synthetic grass.',
    keywords: [
      'artificial turf',
      'synthetic grass',
      'turf installation',
      'turf maintenance',
      'artificial lawn',
      'synthetic turf'
    ]
  },
  testimonials: [
    {
      name: 'Michael Brown',
      text: 'Elite Turf transformed our backyard into a beautiful, maintenance-free space. The installation was flawless.',
      rating: 5
    },
    {
      name: 'Jennifer Lee',
      text: 'Great service and quality. Our artificial turf looks amazing and requires minimal upkeep.',
      rating: 5
    }
  ]
});

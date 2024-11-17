import { BusinessConfig, BusinessType } from '../../types/business';

export const createHVACServiceSite = (): BusinessConfig => ({
  id: 'hvac-service',
  name: 'Elite HVAC Service',
  type: BusinessType.HVAC,
  description: 'Professional heating, ventilation, and air conditioning services for residential and commercial properties.',
  theme: {
    primary: '#2d3142',
    secondary: '#4f5d75',
    accent: '#ef8354',
    background: '#ffffff',
    text: '#2d3142',
    textMuted: '#4f5d75',
    primaryMuted: '#bfc0c0',
    secondaryMuted: '#8d9db6',
    border: '#bfc0c0'
  },
  services: [
    {
      id: 'maintenance',
      name: 'HVAC Maintenance',
      type: BusinessType.HVAC,
      description: 'Regular maintenance to keep your HVAC system running efficiently.',
      price: 'Starting at $129',
      features: [
        'System inspection',
        'Filter replacement',
        'Cleaning and lubrication',
        'Performance testing',
        'Safety check'
      ],
      icon: '🔧',
      keywords: ['maintenance', 'tune-up', 'inspection', 'hvac']
    },
    {
      id: 'repair',
      name: 'HVAC Repair',
      type: BusinessType.HVAC,
      description: 'Expert repair services for all HVAC systems.',
      price: 'Starting at $199',
      features: [
        'Diagnostic service',
        'Parts replacement',
        'Emergency repairs',
        'System optimization',
        'Performance testing'
      ],
      icon: '🛠️',
      keywords: ['repair', 'fix', 'service', 'emergency']
    }
  ],
  contact: {
    phone: '(555) 567-8901',
    email: 'info@elitehvac.com',
    address: '234 Comfort Lane, Climate City, CC 34567',
    hours: [
      'Monday-Friday: 7:00 AM - 7:00 PM',
      'Saturday: 8:00 AM - 5:00 PM',
      'Sunday: Emergency service only'
    ]
  },
  serviceAreas: [
    'Climate City',
    'Comfort Zone',
    'Temperature Town',
    'HVAC Heights'
  ],
  features: [
    {
      title: '24/7 Emergency Service',
      description: 'Available for urgent HVAC issues any time, day or night.',
      icon: '🚨'
    },
    {
      title: 'Licensed Technicians',
      description: 'Fully licensed and certified HVAC professionals.',
      icon: '👨‍🔧'
    },
    {
      title: 'Energy Efficiency',
      description: 'Helping you save money with energy-efficient solutions.',
      icon: '💡'
    }
  ],
  seo: {
    title: 'Elite HVAC Service - Professional Heating & Cooling Solutions',
    description: 'Expert HVAC services including maintenance, repair, and installation. 24/7 emergency service available.',
    keywords: [
      'hvac service',
      'heating repair',
      'air conditioning',
      'hvac maintenance',
      'emergency hvac',
      'ac repair'
    ]
  },
  testimonials: [
    {
      name: 'Tom Wilson',
      text: 'Elite HVAC Service responded quickly to our emergency call and fixed our AC system in no time. Great service!',
      rating: 5
    },
    {
      name: 'Sarah Miller',
      text: 'Regular maintenance from Elite HVAC has kept our system running perfectly. Very professional team.',
      rating: 5
    }
  ]
});

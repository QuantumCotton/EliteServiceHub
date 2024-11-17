import { BusinessConfig, BusinessType } from '../../types/business';

export const createLandscapingServiceSite = (): BusinessConfig => ({
  id: 'landscaping-service',
  name: 'Elite Landscaping',
  type: BusinessType.LANDSCAPING,
  description: 'Professional landscaping and lawn care services for residential and commercial properties.',
  theme: {
    primary: '#2b9348',
    secondary: '#007f5f',
    accent: '#55a630',
    background: '#f8f9fa',
    text: '#1b4332',
    textMuted: '#52796f',
    primaryMuted: '#95d5b2',
    secondaryMuted: '#74c69d',
    border: '#52796f'
  },
  services: [
    {
      id: 'lawn-maintenance',
      name: 'Lawn Maintenance',
      type: BusinessType.LANDSCAPING,
      description: 'Regular lawn care services to keep your property looking pristine.',
      price: 'Starting at $49',
      features: [
        'Professional mowing',
        'Edging and trimming',
        'Debris cleanup',
        'Fertilization',
        'Weed control'
      ],
      icon: '🌱',
      keywords: ['lawn care', 'mowing', 'maintenance', 'grass']
    },
    {
      id: 'landscape-design',
      name: 'Landscape Design',
      type: BusinessType.LANDSCAPING,
      description: 'Custom landscape design and installation services.',
      price: 'Starting at $999',
      features: [
        'Professional design consultation',
        'Plant selection',
        'Hardscape integration',
        'Irrigation planning',
        'Lighting design'
      ],
      icon: '🎨',
      keywords: ['design', 'landscaping', 'custom', 'planning']
    }
  ],
  contact: {
    phone: '(555) 678-9012',
    email: 'info@elitelandscaping.com',
    address: '345 Garden Way, Green Valley, GV 45678',
    hours: [
      'Monday-Friday: 7:00 AM - 6:00 PM',
      'Saturday: 8:00 AM - 4:00 PM',
      'Sunday: By appointment only'
    ]
  },
  serviceAreas: [
    'Green Valley',
    'Garden Heights',
    'Lawn Acres',
    'Paradise Hills'
  ],
  features: [
    {
      title: 'Sustainable Practices',
      description: 'Eco-friendly landscaping methods and materials.',
      icon: '🌿'
    },
    {
      title: 'Expert Team',
      description: 'Certified landscaping professionals with years of experience.',
      icon: '👨‍🌾'
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored landscaping plans for your specific needs.',
      icon: '✨'
    }
  ],
  seo: {
    title: 'Elite Landscaping - Professional Lawn Care & Landscape Design',
    description: 'Expert landscaping services including lawn maintenance, design, and installation. Sustainable practices and custom solutions for your property.',
    keywords: [
      'landscaping',
      'lawn care',
      'landscape design',
      'garden maintenance',
      'professional landscaper',
      'sustainable landscaping'
    ]
  },
  testimonials: [
    {
      name: 'Linda Green',
      text: 'Elite Landscaping transformed our backyard into a beautiful oasis. Their attention to detail is amazing!',
      rating: 5
    },
    {
      name: 'James Park',
      text: 'The most reliable lawn care service we\'ve ever used. Always on time and thorough.',
      rating: 5
    }
  ]
});

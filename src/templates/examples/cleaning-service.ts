import { BusinessConfig, BusinessType } from '../../types/business';

export const createCleaningServiceSite = (): BusinessConfig => ({
  id: 'cleaning-service',
  name: 'Elite Cleaning Service',
  type: BusinessType.CLEANING,
  description: 'Professional cleaning services for homes and businesses.',
  theme: {
    primary: '#00b4d8',
    secondary: '#0077b6',
    accent: '#90e0ef',
    background: '#caf0f8',
    text: '#03045e',
    textMuted: '#0077b6',
    primaryMuted: '#90e0ef',
    secondaryMuted: '#caf0f8',
    border: '#0077b6'
  },
  services: [
    {
      id: 'residential',
      name: 'Residential Cleaning',
      type: BusinessType.CLEANING,
      description: 'Comprehensive home cleaning services.',
      price: 'Starting at $149',
      features: [
        'Deep cleaning of all rooms',
        'Kitchen and bathroom sanitization',
        'Dusting and vacuuming',
        'Window cleaning',
        'Eco-friendly products available'
      ],
      icon: '🏠',
      keywords: ['residential', 'home', 'house', 'cleaning']
    },
    {
      id: 'commercial',
      name: 'Commercial Cleaning',
      type: BusinessType.CLEANING,
      description: 'Professional cleaning for businesses and offices.',
      price: 'Starting at $299',
      features: [
        'Office space cleaning',
        'Restroom sanitization',
        'Break room cleaning',
        'Floor maintenance',
        'Window cleaning'
      ],
      icon: '🏢',
      keywords: ['commercial', 'office', 'business', 'cleaning']
    }
  ],
  contact: {
    phone: '(555) 345-6789',
    email: 'info@elitecleaningservice.com',
    address: '789 Clean Street, Sparkle City, SC 67890',
    hours: [
      'Monday-Friday: 7:00 AM - 7:00 PM',
      'Saturday: 8:00 AM - 5:00 PM',
      'Sunday: By appointment only'
    ]
  },
  serviceAreas: [
    'Sparkle City',
    'Cleanview',
    'Freshtown',
    'Brightville'
  ],
  features: [
    {
      title: 'Eco-Friendly Products',
      description: 'We use environmentally safe cleaning products.',
      icon: '🌿'
    },
    {
      title: 'Trained Professionals',
      description: 'Our staff is fully trained and background checked.',
      icon: '👥'
    },
    {
      title: 'Satisfaction Guaranteed',
      description: '100% satisfaction guarantee on all services.',
      icon: '✨'
    }
  ],
  seo: {
    title: 'Elite Cleaning Service - Professional Home & Office Cleaning',
    description: 'Professional cleaning services for homes and businesses. Eco-friendly products, trained staff, and satisfaction guaranteed.',
    keywords: [
      'cleaning service',
      'home cleaning',
      'office cleaning',
      'commercial cleaning',
      'eco-friendly cleaning',
      'professional cleaners'
    ]
  },
  testimonials: [
    {
      name: 'Emily Parker',
      text: 'Elite Cleaning Service has been cleaning my home for over a year now. They are always thorough and professional.',
      rating: 5
    },
    {
      name: 'David Thompson',
      text: 'Great commercial cleaning service! They keep our office spotless and are very reliable.',
      rating: 5
    }
  ]
});

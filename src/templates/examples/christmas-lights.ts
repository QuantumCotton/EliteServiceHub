import { BusinessConfig, BusinessType } from '../../types/business';

export const createChristmasLightsSite = (): BusinessConfig => ({
  id: 'christmas-lights',
  name: 'Elite Christmas Lights',
  type: BusinessType.CHRISTMAS_LIGHTS,
  description: 'Professional Christmas light installation services for homes and businesses.',
  theme: {
    primary: '#e63946',
    secondary: '#1d3557',
    accent: '#457b9d',
    background: '#f1faee',
    text: '#1d3557',
    textMuted: '#457b9d',
    primaryMuted: '#f4a5ac',
    secondaryMuted: '#a8dadc',
    border: '#457b9d'
  },
  services: [
    {
      id: 'residential',
      name: 'Residential Installation',
      type: BusinessType.CHRISTMAS_LIGHTS,
      description: 'Professional Christmas light installation for homes.',
      price: 'Starting at $299',
      features: [
        'Custom design consultation',
        'Professional installation',
        'Maintenance throughout season',
        'Post-season removal and storage',
        'High-quality commercial grade lights'
      ],
      icon: '🏠',
      keywords: ['residential', 'home', 'christmas lights', 'holiday lighting']
    },
    {
      id: 'commercial',
      name: 'Commercial Installation',
      type: BusinessType.CHRISTMAS_LIGHTS,
      description: 'Large-scale Christmas light installation for businesses.',
      price: 'Starting at $999',
      features: [
        'Commercial-grade lighting',
        'Custom design for your business',
        'Professional installation',
        'Regular maintenance',
        'Timely removal'
      ],
      icon: '🏢',
      keywords: ['commercial', 'business', 'christmas lights', 'holiday lighting']
    }
  ],
  contact: {
    phone: '(555) 123-4567',
    email: 'info@elitechristmaslights.com',
    address: '123 Holiday Lane, Christmas Town, CT 12345',
    hours: [
      'Monday-Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 4:00 PM',
      'Sunday: Closed'
    ]
  },
  serviceAreas: [
    'Christmas Town',
    'North Pole City',
    'Snowflake Valley',
    'Mistletoe Heights'
  ],
  features: [
    {
      title: 'Professional Installation',
      description: 'Our expert team handles everything from design to installation.',
      icon: '🎄'
    },
    {
      title: 'Premium Quality',
      description: 'We use only commercial-grade lights and materials.',
      icon: '⭐'
    },
    {
      title: 'Full Service',
      description: 'Installation, maintenance, and removal all included.',
      icon: '🔧'
    }
  ],
  seo: {
    title: 'Elite Christmas Lights - Professional Holiday Lighting Installation',
    description: 'Professional Christmas light installation services for homes and businesses. Custom designs, professional installation, and full-service maintenance.',
    keywords: [
      'christmas lights',
      'holiday lighting',
      'light installation',
      'professional christmas lights',
      'residential lighting',
      'commercial lighting'
    ]
  },
  testimonials: [
    {
      name: 'John Snow',
      text: 'Elite Christmas Lights transformed our home into a winter wonderland! The team was professional and the results were spectacular.',
      rating: 5
    },
    {
      name: 'Mary Frost',
      text: 'Best holiday lighting service in Christmas Town! They made our business stand out during the holiday season.',
      rating: 5
    }
  ]
});

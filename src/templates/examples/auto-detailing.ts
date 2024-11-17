import { BusinessConfig, BusinessType } from '../../types/business';

export const createAutoDetailingSite = (): BusinessConfig => ({
  id: 'auto-detailing',
  name: 'Elite Auto Detailing',
  type: BusinessType.AUTO_DETAILING,
  description: 'Professional auto detailing services for all types of vehicles.',
  theme: {
    primary: '#2b2d42',
    secondary: '#8d99ae',
    accent: '#ef233c',
    background: '#edf2f4',
    text: '#2b2d42',
    textMuted: '#8d99ae',
    primaryMuted: '#8d99ae',
    secondaryMuted: '#d3d5d9',
    border: '#8d99ae'
  },
  services: [
    {
      id: 'basic-detail',
      name: 'Basic Detail Package',
      type: BusinessType.AUTO_DETAILING,
      description: 'Essential detailing service for your vehicle.',
      price: 'Starting at $99',
      features: [
        'Exterior hand wash',
        'Interior vacuum',
        'Dashboard and console cleaning',
        'Tire and wheel cleaning',
        'Windows and mirrors'
      ],
      icon: '🚗',
      keywords: ['basic', 'car wash', 'detailing', 'cleaning']
    },
    {
      id: 'premium-detail',
      name: 'Premium Detail Package',
      type: BusinessType.AUTO_DETAILING,
      description: 'Comprehensive detailing service for the perfectionist.',
      price: 'Starting at $199',
      features: [
        'Everything in Basic Package',
        'Clay bar treatment',
        'Paint correction',
        'Interior deep cleaning',
        'Leather conditioning'
      ],
      icon: '✨',
      keywords: ['premium', 'full service', 'paint correction', 'deep cleaning']
    }
  ],
  contact: {
    phone: '(555) 234-5678',
    email: 'info@eliteautodetailing.com',
    address: '456 Auto Plaza Dr, Cartown, CT 54321',
    hours: [
      'Monday-Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 4:00 PM',
      'Sunday: By appointment only'
    ]
  },
  serviceAreas: [
    'Cartown',
    'Motorville',
    'Detailburg',
    'Auto Heights'
  ],
  features: [
    {
      title: 'Mobile Service',
      description: 'We come to your location for convenient detailing service.',
      icon: '🚘'
    },
    {
      title: 'Professional Equipment',
      description: 'Using only the best professional-grade products and equipment.',
      icon: '🛠️'
    },
    {
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority - guaranteed results.',
      icon: '✅'
    }
  ],
  seo: {
    title: 'Elite Auto Detailing - Professional Car Detailing Services',
    description: 'Professional auto detailing services for all types of vehicles. Mobile service available with satisfaction guaranteed.',
    keywords: [
      'auto detailing',
      'car detailing',
      'mobile detailing',
      'paint correction',
      'interior cleaning',
      'car wash'
    ]
  },
  testimonials: [
    {
      name: 'Mike Johnson',
      text: 'Best auto detailing service I\'ve ever used. My car looks better than when it was new!',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      text: 'Love their mobile service - so convenient and professional.',
      rating: 5
    }
  ]
});

import { BusinessConfig, BusinessType } from '../../types/business';

export const createMobileMechanicSite = (): BusinessConfig => ({
  id: 'mobile-mechanic',
  name: 'Elite Mobile Mechanic',
  type: BusinessType.AUTO_DETAILING, // Using AUTO_DETAILING as closest match
  description: 'Professional mobile mechanic services bringing expert auto repair to your location.',
  theme: {
    primary: '#d00000',
    secondary: '#1a1a1a',
    accent: '#ffba08',
    background: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#6c757d',
    primaryMuted: '#ef233c',
    secondaryMuted: '#495057',
    border: '#dee2e6'
  },
  services: [
    {
      id: 'diagnostic',
      name: 'Mobile Diagnostics',
      type: BusinessType.AUTO_DETAILING,
      description: 'Professional diagnostic services at your location.',
      price: 'Starting at $89',
      features: [
        'Computer diagnostics',
        'Engine performance check',
        'Electrical system testing',
        'Sensor verification',
        'Written report'
      ],
      icon: '🔍',
      keywords: ['diagnostics', 'check engine', 'troubleshooting', 'inspection']
    },
    {
      id: 'repair',
      name: 'Mobile Repairs',
      type: BusinessType.AUTO_DETAILING,
      description: 'On-site repair services for your vehicle.',
      price: 'Starting at $149',
      features: [
        'Brake service',
        'Battery replacement',
        'Oil changes',
        'Belt replacement',
        'General repairs'
      ],
      icon: '🔧',
      keywords: ['repair', 'service', 'maintenance', 'fix']
    }
  ],
  contact: {
    phone: '(555) 789-0123',
    email: 'info@elitemobilemechanic.com',
    address: '456 Service Road, Mechanic City, MC 56789',
    hours: [
      'Monday-Friday: 7:00 AM - 7:00 PM',
      'Saturday: 8:00 AM - 5:00 PM',
      'Sunday: Emergency service only'
    ]
  },
  serviceAreas: [
    'Mechanic City',
    'Auto District',
    'Service Valley',
    'Repair Heights'
  ],
  features: [
    {
      title: 'Mobile Service',
      description: 'We come to your home, office, or roadside location.',
      icon: '🚗'
    },
    {
      title: 'Certified Mechanics',
      description: 'ASE certified technicians with years of experience.',
      icon: '👨‍🔧'
    },
    {
      title: 'Quality Parts',
      description: 'Using only high-quality OEM and aftermarket parts.',
      icon: '⚙️'
    }
  ],
  seo: {
    title: 'Elite Mobile Mechanic - Professional Auto Repair at Your Location',
    description: 'Expert mobile mechanic services bringing professional auto repair to your location. ASE certified technicians and quality parts guaranteed.',
    keywords: [
      'mobile mechanic',
      'auto repair',
      'car service',
      'on-site repair',
      'emergency auto repair',
      'mobile car repair'
    ]
  },
  testimonials: [
    {
      name: 'Mark Rodriguez',
      text: 'Fantastic service! The mechanic came to my office and fixed my car while I was working. So convenient!',
      rating: 5
    },
    {
      name: 'Amanda Chen',
      text: 'Professional, punctual, and reasonably priced. They diagnosed and fixed my car\'s issues right in my driveway.',
      rating: 5
    }
  ]
});

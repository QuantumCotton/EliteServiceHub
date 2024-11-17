import { BusinessConfig, BusinessType } from '../../types/business';

export const createPoolServiceSite = (): BusinessConfig => ({
  id: 'pool-service',
  name: 'Elite Pool Service',
  type: BusinessType.POOL_SERVICE,
  description: 'Professional pool maintenance and repair services for residential and commercial pools.',
  theme: {
    primary: '#0077b6',
    secondary: '#00b4d8',
    accent: '#caf0f8',
    background: '#ffffff',
    text: '#023e8a',
    textMuted: '#0096c7',
    primaryMuted: '#48cae4',
    secondaryMuted: '#90e0ef',
    border: '#ade8f4'
  },
  services: [
    {
      id: 'maintenance',
      name: 'Regular Pool Maintenance',
      type: BusinessType.POOL_SERVICE,
      description: 'Comprehensive pool maintenance to keep your pool clean and balanced.',
      price: 'Starting at $149/month',
      features: [
        'Weekly chemical testing',
        'Filter cleaning',
        'Skimming and vacuuming',
        'Equipment inspection',
        'Water balancing'
      ],
      icon: '🏊‍♂️',
      keywords: ['pool maintenance', 'cleaning', 'chemical balance', 'weekly service']
    },
    {
      id: 'repair',
      name: 'Pool Repair Services',
      type: BusinessType.POOL_SERVICE,
      description: 'Expert pool repair services for all makes and models.',
      price: 'Starting at $199',
      features: [
        'Pump repair/replacement',
        'Filter system repair',
        'Heater servicing',
        'Leak detection',
        'Equipment upgrades'
      ],
      icon: '🔧',
      keywords: ['pool repair', 'equipment', 'pump', 'filter', 'heater']
    }
  ],
  contact: {
    phone: '(555) 234-5678',
    email: 'service@elitepools.com',
    address: '789 Pool Lane, Aqua Springs, AS 12345',
    hours: [
      'Monday-Friday: 8:00 AM - 5:00 PM',
      'Saturday: 9:00 AM - 2:00 PM',
      'Sunday: Emergency service only'
    ]
  },
  serviceAreas: [
    'Aqua Springs',
    'Crystal Lake',
    'Blue Bay',
    'Palm Harbor'
  ],
  features: [
    {
      title: 'Certified Technicians',
      description: 'Our team is certified and experienced in all aspects of pool maintenance.',
      icon: '👨‍🔧'
    },
    {
      title: 'Quality Equipment',
      description: 'We use professional-grade equipment and chemicals for optimal results.',
      icon: '⚙️'
    },
    {
      title: '24/7 Emergency Service',
      description: 'Available for urgent pool repairs and maintenance issues.',
      icon: '🚨'
    }
  ],
  seo: {
    title: 'Elite Pool Service - Professional Pool Maintenance & Repair',
    description: 'Expert pool maintenance, repair, and cleaning services. Keeping your pool crystal clear and perfectly balanced.',
    keywords: [
      'pool service',
      'pool maintenance',
      'pool repair',
      'pool cleaning',
      'swimming pool',
      'pool chemicals'
    ]
  },
  testimonials: [
    {
      name: 'David Wilson',
      text: 'Elite Pool Service keeps our pool in perfect condition year-round. Their service is reliable and professional.',
      rating: 5
    },
    {
      name: 'Sarah Thompson',
      text: 'The best pool service company in the area. They fixed our old pump and saved us thousands on replacement.',
      rating: 5
    }
  ]
});

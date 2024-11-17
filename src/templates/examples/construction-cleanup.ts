import { BusinessConfig, BusinessType } from '../../types/business';

export const createConstructionCleanupSite = (): BusinessConfig => ({
  id: 'construction-cleanup',
  name: 'Elite Construction Cleanup',
  type: BusinessType.CONSTRUCTION_CLEANUP,
  description: 'Professional post-construction cleaning services for residential and commercial projects.',
  theme: {
    primary: '#fca311',
    secondary: '#14213d',
    accent: '#e5e5e5',
    background: '#ffffff',
    text: '#000000',
    textMuted: '#6c757d',
    primaryMuted: '#ffd166',
    secondaryMuted: '#4a5568',
    border: '#dee2e6'
  },
  services: [
    {
      id: 'residential-cleanup',
      name: 'Residential Construction Cleanup',
      type: BusinessType.CONSTRUCTION_CLEANUP,
      description: 'Complete cleanup services for new home construction and renovations.',
      price: 'Starting at $499',
      features: [
        'Debris removal',
        'Deep cleaning of all surfaces',
        'Window and glass cleaning',
        'Floor cleaning and polishing',
        'HVAC duct cleaning'
      ],
      icon: '🏠',
      keywords: ['residential', 'construction', 'cleanup', 'post-construction']
    },
    {
      id: 'commercial-cleanup',
      name: 'Commercial Construction Cleanup',
      type: BusinessType.CONSTRUCTION_CLEANUP,
      description: 'Large-scale cleanup services for commercial construction projects.',
      price: 'Starting at $999',
      features: [
        'Heavy debris removal',
        'Industrial cleaning',
        'Surface restoration',
        'Environmental compliance',
        'Safety protocol adherence'
      ],
      icon: '🏗️',
      keywords: ['commercial', 'construction', 'industrial', 'cleanup']
    }
  ],
  contact: {
    phone: '(555) 456-7890',
    email: 'info@eliteconstructioncleanup.com',
    address: '101 Builder Way, Construction City, CC 89012',
    hours: [
      'Monday-Friday: 6:00 AM - 6:00 PM',
      'Saturday: 7:00 AM - 4:00 PM',
      'Sunday: By appointment only'
    ]
  },
  serviceAreas: [
    'Construction City',
    'Builder Heights',
    'Development District',
    'New Construction Zone'
  ],
  features: [
    {
      title: 'OSHA Compliant',
      description: 'All work performed following strict safety guidelines.',
      icon: '⚠️'
    },
    {
      title: 'Professional Equipment',
      description: 'Industrial-grade cleaning equipment and supplies.',
      icon: '🧰'
    },
    {
      title: 'Experienced Team',
      description: 'Trained professionals with construction site experience.',
      icon: '👷'
    }
  ],
  seo: {
    title: 'Elite Construction Cleanup - Professional Post-Construction Cleaning',
    description: 'Expert post-construction cleaning services for residential and commercial projects. OSHA compliant, fully insured, satisfaction guaranteed.',
    keywords: [
      'construction cleanup',
      'post-construction cleaning',
      'debris removal',
      'commercial cleanup',
      'residential cleanup',
      'construction site cleaning'
    ]
  },
  testimonials: [
    {
      name: 'Bob Builder',
      text: 'Elite Construction Cleanup is our go-to cleaning service. They handle our largest projects with professionalism and efficiency.',
      rating: 5
    },
    {
      name: 'Jane Developer',
      text: 'Excellent attention to detail and always meet our tight schedules. Highly recommended!',
      rating: 5
    }
  ]
});

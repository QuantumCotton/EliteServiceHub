import { BusinessConfig } from '../types/business';
import { createTurfServiceSite } from './examples/turf-service';
import { createCleaningServiceSite } from './examples/cleaning-service';

// Function to create a new service site
export const createNewSite = (
  type: 'turf' | 'cleaning' | 'custom',
  config: {
    id: string;
    name: string;
    contact: {
      phone: string;
      email: string;
      address: string;
      hours: string[];
    };
    serviceAreas: string[];
  }
): BusinessConfig => {
  switch (type) {
    case 'turf':
      return createTurfServiceSite(
        config.id,
        config.name,
        config.contact,
        config.serviceAreas
      );
    case 'cleaning':
      return createCleaningServiceSite(
        config.id,
        config.name,
        config.contact,
        config.serviceAreas
      );
    case 'custom':
      // Handle custom site creation
      throw new Error('Custom site creation not implemented yet');
    default:
      throw new Error(`Unknown site type: ${type}`);
  }
};

// Example usage:
/*
const newTurfSite = createNewSite('turf', {
  id: 'miami-turf',
  name: 'Miami Elite Turf Services',
  contact: {
    phone: '(305) 555-0123',
    email: 'info@miamieliteturf.com',
    address: '123 Palm Avenue, Miami, FL 33101',
    hours: [
      'Monday-Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 4:00 PM',
      'Sunday: Closed'
    ]
  },
  serviceAreas: ['Miami Beach', 'Downtown Miami', 'Coral Gables']
});
*/

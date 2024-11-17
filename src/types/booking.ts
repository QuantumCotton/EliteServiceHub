import { z } from 'zod';
import { Service, ServiceArea } from './service';

export interface BookingState {
  serviceId: string;
  date: Date | null;
  time: string | null;
  addons: string[];
  serviceArea: ServiceArea | null;
  notes: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const contactInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, 'Invalid phone number'),
  address: z.string().min(5, 'Please enter a valid address')
});

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Invalid date'
  }),
  time: z.string().min(1, 'Please select a time'),
  addons: z.array(z.string()),
  serviceArea: z.object({
    id: z.string(),
    name: z.string(),
    zipCode: z.string(),
    city: z.string(),
    state: z.string(),
    isActive: z.boolean(),
    surcharge: z.number().optional()
  }).nullable(),
  notes: z.string(),
  contactInfo: contactInfoSchema
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface BookingError {
  field: keyof BookingState | 'general';
  message: string;
}

export interface BookingConfirmation {
  bookingId: string;
  service: Service;
  date: Date;
  time: string;
  addons: string[];
  totalPrice: number;
  contactInfo: BookingState['contactInfo'];
  estimatedDuration: number;
}

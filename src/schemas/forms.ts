import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  service: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

// Booking form schema
export const bookingFormSchema = z.object({
  service: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive()
  }),
  date: z.string(),
  time: z.string(),
  customer: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  }),
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')
  }),
  notes: z.string().optional()
});

// User preferences schema
export const userPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    marketing: z.boolean()
  }),
  theme: z.enum(['light', 'dark']),
  language: z.enum(['en', 'es', 'fr']),
  timezone: z.string()
});

// Service configuration schema
export const serviceConfigSchema = z.object({
  name: z.string().min(2, 'Service name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string(),
  duration: z.number().positive('Duration must be positive'),
  price: z.number().positive('Price must be positive'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  availability: z.array(z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string(),
    endTime: z.string()
  }))
});

// Infer types from schemas
export type ContactForm = z.infer<typeof contactFormSchema>;
export type BookingForm = z.infer<typeof bookingFormSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type ServiceConfig = z.infer<typeof serviceConfigSchema>;

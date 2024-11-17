import { z } from 'zod';
import { BusinessType } from './business';

export interface ServiceArea {
  id: string;
  name: string;
  zipCode: string;
  city: string;
  state: string;
  isActive: boolean;
  surcharge?: number;
}

export interface PriceModifier {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  condition?: (options: ServiceOptions) => boolean;
}

export interface ServiceOptions {
  size?: number;
  addons?: string[];
  area?: ServiceArea;
  date?: Date;
  urgency?: 'normal' | 'urgent';
  frequency?: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: BusinessType;
  basePrice: number;
  image?: string;
  features: string[];
  priceModifiers: PriceModifier[];
  availableAddons: {
    id: string;
    name: string;
    price: number;
    description?: string;
  }[];
  availability: {
    schedule: {
      [key: string]: { start: string; end: string }[];
    };
    blackoutDates: Date[];
    serviceAreas: ServiceArea[];
  };
  minimumNotice: number; // in hours
  duration: number; // in hours
  maxBookingsPerDay?: number;
}

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  type: z.nativeEnum(BusinessType),
  basePrice: z.number().positive(),
  image: z.string().optional(),
  features: z.array(z.string()),
  priceModifiers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['percentage', 'fixed']),
    value: z.number()
  })),
  availableAddons: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional()
  })),
  availability: z.object({
    schedule: z.record(z.array(z.object({
      start: z.string(),
      end: z.string()
    }))),
    blackoutDates: z.array(z.date()),
    serviceAreas: z.array(z.object({
      id: z.string(),
      name: z.string(),
      zipCode: z.string(),
      city: z.string(),
      state: z.string(),
      isActive: z.boolean(),
      surcharge: z.number().optional()
    }))
  }),
  minimumNotice: z.number().min(0),
  duration: z.number().positive(),
  maxBookingsPerDay: z.number().positive().optional()
});

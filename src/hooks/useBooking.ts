import { useState } from 'react';
import { usePayment } from './usePayment';
import { emailService } from '../services/email';
import { BookingFormData, BookingConfirmation } from '../types/booking';

interface UseBookingReturn {
  submitBooking: (data: BookingFormData) => Promise<BookingConfirmation>;
  isLoading: boolean;
  error: Error | null;
}

export function useBooking(): UseBookingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { createPaymentIntent } = usePayment();

  const submitBooking = async (data: BookingFormData): Promise<BookingConfirmation> => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create the booking in your database
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const booking = await response.json();

      // 2. Create a payment intent
      const paymentIntent = await createPaymentIntent(data);

      // 3. Create the booking confirmation
      const confirmation: BookingConfirmation = {
        bookingId: booking.id,
        service: data.service,
        date: data.date,
        time: data.time,
        addons: data.addons,
        totalPrice: paymentIntent.amount / 100, // Convert from cents
        contactInfo: data.contactInfo,
        estimatedDuration: data.service.duration,
      };

      // 4. Send confirmation email
      await emailService.sendBookingConfirmation(confirmation);

      // 5. Schedule a reminder email (in production, this would be handled by a job queue)
      const reminderDate = new Date(data.date);
      reminderDate.setHours(reminderDate.getHours() - 24);
      
      if (reminderDate > new Date()) {
        setTimeout(() => {
          emailService.sendReminder(confirmation).catch(console.error);
        }, reminderDate.getTime() - Date.now());
      }

      return confirmation;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitBooking,
    isLoading,
    error,
  };
}

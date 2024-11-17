import { useState } from 'react';
import { BookingFormData } from '../types/booking';

interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

interface PaymentError {
  message: string;
  code?: string;
}

interface UsePaymentReturn {
  createPaymentIntent: (booking: BookingFormData) => Promise<PaymentIntent>;
  isLoading: boolean;
  error: PaymentError | null;
}

export function usePayment(): UsePaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PaymentError | null>(null);

  const createPaymentIntent = async (booking: BookingFormData): Promise<PaymentIntent> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking,
          currency: 'usd', // This should come from your app config
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      const data = await response.json();
      return {
        clientSecret: data.clientSecret,
        amount: data.amount,
        currency: data.currency,
      };
    } catch (err) {
      const error = err as Error;
      setError({
        message: error.message || 'An unexpected error occurred',
        code: 'payment_intent_creation_failed',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPaymentIntent,
    isLoading,
    error,
  };
}

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { BookingFormData } from '../../../types/booking';

// Initialize Stripe with your secret key (move to environment variable in production)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { booking, currency = 'usd' } = req.body as {
      booking: BookingFormData;
      currency: string;
    };

    // Calculate the total amount based on the booking data
    const amount = Math.round(booking.totalPrice * 100); // Convert to cents

    // Create a PaymentIntent with the calculated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: booking.serviceId, // Add relevant booking metadata
        customerEmail: booking.contactInfo.email,
        serviceName: booking.service.name,
      },
    });

    // Return the client secret and payment details
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (err) {
    const error = err as Error;
    console.error('Payment intent creation failed:', error);
    res.status(500).json({
      message: 'Failed to create payment intent',
      error: error.message,
    });
  }
}

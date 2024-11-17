import { BookingConfirmation } from '../types/booking';

// This would typically be handled by a proper email service like SendGrid, AWS SES, etc.
// For now, we'll create the interface and mock implementation
export interface EmailService {
  sendBookingConfirmation: (booking: BookingConfirmation) => Promise<void>;
  sendReminder: (booking: BookingConfirmation) => Promise<void>;
  sendCancellation: (bookingId: string) => Promise<void>;
}

class EmailServiceImpl implements EmailService {
  private async sendEmail(templateName: string, data: any): Promise<void> {
    // In production, this would send the actual email via your email provider
    console.log(`Sending ${templateName} email:`, data);
    
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: templateName,
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  }

  async sendBookingConfirmation(booking: BookingConfirmation): Promise<void> {
    const templateData = {
      bookingId: booking.bookingId,
      customerName: booking.contactInfo.name,
      serviceName: booking.service.name,
      date: booking.date,
      time: booking.time,
      price: booking.totalPrice,
      addons: booking.addons,
      address: booking.contactInfo.address,
    };

    await this.sendEmail('booking-confirmation', templateData);
  }

  async sendReminder(booking: BookingConfirmation): Promise<void> {
    const templateData = {
      bookingId: booking.bookingId,
      customerName: booking.contactInfo.name,
      serviceName: booking.service.name,
      date: booking.date,
      time: booking.time,
      address: booking.contactInfo.address,
    };

    await this.sendEmail('booking-reminder', templateData);
  }

  async sendCancellation(bookingId: string): Promise<void> {
    await this.sendEmail('booking-cancellation', { bookingId });
  }
}

// Export a singleton instance
export const emailService = new EmailServiceImpl();

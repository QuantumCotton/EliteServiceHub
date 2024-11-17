import { NextApiRequest, NextApiResponse } from 'next';
// import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
// In production, you would use a proper email service like AWS SES, SendGrid, etc.

// Initialize AWS SES client (commented out for now)
// const ses = new SESClient({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// Email templates (in production, these would be proper HTML templates)
const templates = {
  'booking-confirmation': (data: any) => `
    Dear ${data.customerName},

    Thank you for booking with Elite Service Hub!

    Booking Details:
    - Booking ID: ${data.bookingId}
    - Service: ${data.serviceName}
    - Date: ${new Date(data.date).toLocaleDateString()}
    - Time: ${data.time}
    - Price: $${data.price}
    ${data.addons.length > 0 ? `- Add-ons: ${data.addons.join(', ')}` : ''}
    - Address: ${data.address}

    What's Next:
    1. You'll receive a reminder 24 hours before your appointment
    2. Our service provider will arrive at the scheduled time
    3. Payment will be processed after service completion

    Need to make changes?
    - Visit our website to manage your booking
    - Contact our support team at support@eliteservicehub.com
    - Call us at 1-800-ELITE-HUB

    Thank you for choosing Elite Service Hub!
  `,

  'booking-reminder': (data: any) => `
    Dear ${data.customerName},

    This is a reminder for your upcoming service appointment:

    - Service: ${data.serviceName}
    - Date: ${new Date(data.date).toLocaleDateString()}
    - Time: ${data.time}
    - Address: ${data.address}

    Please ensure someone is available at the location to provide access.

    Need to reschedule?
    Contact us immediately at support@eliteservicehub.com

    Thank you for choosing Elite Service Hub!
  `,

  'booking-cancellation': (data: any) => `
    Booking ${data.bookingId} has been cancelled.

    If you did not request this cancellation, please contact us immediately.

    Thank you for choosing Elite Service Hub!
  `,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { template, data } = req.body;

    if (!templates[template as keyof typeof templates]) {
      return res.status(400).json({ message: 'Invalid template' });
    }

    const emailContent = templates[template as keyof typeof templates](data);

    // In production, you would send the actual email here
    // Example using AWS SES:
    // const command = new SendEmailCommand({
    //   Source: 'noreply@eliteservicehub.com',
    //   Destination: {
    //     ToAddresses: [data.customerEmail],
    //   },
    //   Message: {
    //     Subject: {
    //       Data: `Elite Service Hub - ${template.split('-').map(capitalize).join(' ')}`,
    //     },
    //     Body: {
    //       Text: { Data: emailContent },
    //     },
    //   },
    // });
    // await ses.send(command);

    // For development, just log the email
    console.log('Email sent:', {
      template,
      content: emailContent,
      to: data.customerEmail,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    const error = err as Error;
    console.error('Failed to send email:', error);
    res.status(500).json({
      message: 'Failed to send email',
      error: error.message,
    });
  }
}

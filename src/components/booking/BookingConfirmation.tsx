import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BookingConfirmation as BookingConfirmationType } from '../../types/booking';

interface BookingConfirmationProps {
  confirmation: BookingConfirmationType;
  onClose: () => void;
  onPrint?: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  confirmation,
  onClose,
  onPrint
}) => {
  const {
    bookingId,
    service,
    date,
    time,
    addons,
    totalPrice,
    contactInfo,
    estimatedDuration
  } = confirmation;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <Card className="w-full max-w-2xl overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Booking ID: {bookingId}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Service</h3>
                <p>{service.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p>
                  {format(date, 'MMMM d, yyyy')} at {time}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Duration</h3>
                <p>{estimatedDuration} minutes</p>
              </div>
              <div>
                <h3 className="font-medium">Total Price</h3>
                <p className="text-lg font-semibold">${totalPrice}</p>
              </div>
            </div>

            {addons.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Add-ons</h3>
                <ul className="list-disc list-inside space-y-1">
                  {addons.map((addon) => (
                    <li key={addon}>{addon}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="space-y-1">
                <p>{contactInfo.name}</p>
                <p>{contactInfo.email}</p>
                <p>{contactInfo.phone}</p>
                <p>{contactInfo.address}</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium mb-2">Important Information</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Please arrive 5-10 minutes before your appointment</li>
                <li>Cancellations must be made at least 24 hours in advance</li>
                <li>A confirmation email has been sent to {contactInfo.email}</li>
                <li>For any questions, please contact our support team</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={onPrint}
              disabled={!onPrint}
            >
              Print Confirmation
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { useTheme } from '../../hooks/useTheme';
import { useServiceConfig } from '../../hooks/useServiceConfig';
import { BookingFormData, bookingSchema } from '../../types/booking';
import { Service } from '../../types/service';

interface BookingFormProps {
  service: Service;
  onSubmit: (data: BookingFormData) => void;
  loading?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  service,
  onSubmit,
  loading = false
}) => {
  const theme = useTheme();
  const { calculatePrice, isAvailable, getServiceAreas, getAvailableAddons } = useServiceConfig(service.id);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: service.id,
      addons: [],
      notes: '',
      serviceArea: null
    }
  });

  const selectedDate = watch('date');
  const selectedArea = watch('serviceArea');
  const selectedAddons = watch('addons');

  // Calculate available time slots for the selected date
  const availableTimeSlots = React.useMemo(() => {
    if (!selectedDate) return [];
    
    const slots = [];
    const schedule = service.availability.schedule[format(selectedDate, 'EEEE').toLowerCase()];
    
    if (schedule) {
      for (const slot of schedule) {
        const [startHour] = slot.start.split(':').map(Number);
        const [endHour] = slot.end.split(':').map(Number);
        
        for (let hour = startHour; hour < endHour; hour++) {
          const time = `${hour.toString().padStart(2, '0')}:00`;
          slots.push({
            value: time,
            label: time,
            disabled: !isAvailable(selectedDate, selectedArea)
          });
        }
      }
    }
    
    return slots;
  }, [selectedDate, selectedArea, service.availability.schedule, isAvailable]);

  const totalPrice = React.useMemo(() => {
    return calculatePrice({
      addons: selectedAddons,
      area: selectedArea,
      date: selectedDate || undefined
    });
  }, [calculatePrice, selectedAddons, selectedArea, selectedDate]);

  const serviceAreas = React.useMemo(() => getServiceAreas(), [getServiceAreas]);
  const addons = React.useMemo(() => getAvailableAddons(), [getAvailableAddons]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.form
        className="space-y-6 p-6"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            placeholder="Your name"
            error={errors.contactInfo?.name?.message}
            {...register('contactInfo.name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            error={errors.contactInfo?.email?.message}
            {...register('contactInfo.email')}
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="Your phone number"
            error={errors.contactInfo?.phone?.message}
            {...register('contactInfo.phone')}
          />

          <Input
            label="Address"
            placeholder="Service address"
            error={errors.contactInfo?.address?.message}
            {...register('contactInfo.address')}
          />

          <Input
            label="Date"
            type="date"
            error={errors.date?.message}
            min={new Date().toISOString().split('T')[0]}
            {...register('date', {
              setValueAs: (value) => value ? new Date(value) : null
            })}
          />

          <Select
            label="Time"
            placeholder="Select a time"
            error={errors.time?.message}
            disabled={!selectedDate || availableTimeSlots.length === 0}
            {...register('time')}
          >
            {availableTimeSlots.map((slot) => (
              <Select.Option
                key={slot.value}
                value={slot.value}
                disabled={slot.disabled}
              >
                {slot.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            label="Service Area"
            placeholder="Select your area"
            error={errors.serviceArea?.message}
            {...register('serviceArea')}
          >
            {serviceAreas.map((area) => (
              <Select.Option
                key={area.id}
                value={area.id}
                disabled={!area.isActive}
              >
                {area.name} {area.surcharge ? `(+${area.surcharge * 100}%)` : ''}
              </Select.Option>
            ))}
          </Select>

          <div className="col-span-full">
            <label className="block text-sm font-medium mb-2">Add-ons</label>
            <div className="grid grid-cols-2 gap-4">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-accent/5"
                >
                  <input
                    type="checkbox"
                    value={addon.id}
                    {...register('addons')}
                    className="rounded border-input"
                  />
                  <div>
                    <div className="font-medium">{addon.name}</div>
                    <div className="text-sm text-muted-foreground">
                      +${addon.price}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          label="Additional Notes"
          placeholder="Any special requests or requirements?"
          error={errors.notes?.message}
          {...register('notes')}
        />

        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: ${totalPrice}
          </div>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </div>
      </motion.form>
    </Card>
  );
};

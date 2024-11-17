import { useCallback, useMemo } from 'react';
import { Service, ServiceOptions, PriceModifier } from '../types/service';
import { useBusinessContext } from '../contexts/BusinessContext';

export const useServiceConfig = (serviceId?: string) => {
  const { services } = useBusinessContext();

  const service = useMemo(() => {
    if (!serviceId) return null;
    return services.find(s => s.id === serviceId) || null;
  }, [serviceId, services]);

  const calculatePrice = useCallback((
    service: Service,
    options: ServiceOptions
  ): number => {
    if (!service) return 0;

    let totalPrice = service.basePrice;

    // Apply size-based modifiers
    if (options.size) {
      const sizeModifier = service.priceModifiers.find(
        mod => mod.type === 'percentage' && mod.condition?.(options)
      );
      if (sizeModifier) {
        totalPrice *= (1 + sizeModifier.value);
      }
    }

    // Apply frequency discounts
    if (options.frequency && options.frequency !== 'one-time') {
      const frequencyModifier = service.priceModifiers.find(
        mod => mod.name.toLowerCase().includes(options.frequency as string)
      );
      if (frequencyModifier) {
        if (frequencyModifier.type === 'percentage') {
          totalPrice *= (1 - frequencyModifier.value);
        } else {
          totalPrice -= frequencyModifier.value;
        }
      }
    }

    // Add urgency surcharge
    if (options.urgency === 'urgent') {
      const urgencyModifier = service.priceModifiers.find(
        mod => mod.name.toLowerCase().includes('urgent')
      );
      if (urgencyModifier) {
        if (urgencyModifier.type === 'percentage') {
          totalPrice *= (1 + urgencyModifier.value);
        } else {
          totalPrice += urgencyModifier.value;
        }
      }
    }

    // Add service area surcharge
    if (options.area?.surcharge) {
      totalPrice *= (1 + options.area.surcharge);
    }

    // Add selected addons
    if (options.addons?.length) {
      const addonPrices = options.addons.reduce((total, addonId) => {
        const addon = service.availableAddons.find(a => a.id === addonId);
        return total + (addon?.price || 0);
      }, 0);
      totalPrice += addonPrices;
    }

    return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
  }, []);

  const isAvailable = useCallback((
    service: Service,
    date: Date,
    area?: ServiceArea
  ): boolean => {
    if (!service) return false;

    // Check if date is blackout
    const isBlackout = service.availability.blackoutDates.some(
      blackoutDate => blackoutDate.toDateString() === date.toDateString()
    );
    if (isBlackout) return false;

    // Check if area is serviced
    if (area && !service.availability.serviceAreas.some(a => a.id === area.id)) {
      return false;
    }

    // Check if within schedule
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const timeSlots = service.availability.schedule[dayOfWeek];
    if (!timeSlots?.length) return false;

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const timeInMinutes = hour * 60 + minutes;

    return timeSlots.some(slot => {
      const [startHour, startMinute] = slot.start.split(':').map(Number);
      const [endHour, endMinute] = slot.end.split(':').map(Number);
      const slotStart = startHour * 60 + startMinute;
      const slotEnd = endHour * 60 + endMinute;
      return timeInMinutes >= slotStart && timeInMinutes <= slotEnd;
    });
  }, []);

  return {
    service,
    calculatePrice: useCallback(
      (options: ServiceOptions) => service ? calculatePrice(service, options) : 0,
      [service, calculatePrice]
    ),
    isAvailable: useCallback(
      (date: Date, area?: ServiceArea) => service ? isAvailable(service, date, area) : false,
      [service, isAvailable]
    ),
    getAvailableAddons: useCallback(
      () => service?.availableAddons || [],
      [service]
    ),
    getServiceAreas: useCallback(
      () => service?.availability.serviceAreas || [],
      [service]
    )
  };
};

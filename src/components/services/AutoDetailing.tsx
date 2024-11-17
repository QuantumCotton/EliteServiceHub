import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';

interface VehicleType {
  id: string;
  name: string;
  icon: string;
  basePrice: {
    interior: number;
    exterior: number;
    both: number;
    elite: number;
  };
}

const vehicles: VehicleType[] = [
  {
    id: 'coupe',
    name: 'Coupe',
    icon: '🚗',
    basePrice: { interior: 59, exterior: 59, both: 99, elite: 699 },
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: '🚙',
    basePrice: { interior: 69, exterior: 69, both: 119, elite: 749 },
  },
  {
    id: 'suv-small',
    name: 'Small SUV/Truck',
    icon: '🚐',
    basePrice: { interior: 79, exterior: 79, both: 139, elite: 799 },
  },
  {
    id: 'suv-large',
    name: 'Large SUV/Truck',
    icon: '🚛',
    basePrice: { interior: 89, exterior: 89, both: 159, elite: 899 },
  },
];

const addOns = [
  { id: 'headlight', name: 'Headlight Restoration', price: 79.99, icon: '💡' },
  { id: 'engine', name: 'Engine Bay Detailing', price: 89.99, icon: '⚙️' },
  { id: 'wheel', name: 'Wheel Ceramic Coating', price: 149.99, icon: '🛞' },
  { id: 'interior', name: 'Interior Ceramic Coating', price: 199.99, icon: '✨' },
  { id: 'pet', name: 'Pet Hair Deep Removal', price: 49.99, icon: '🐾' },
];

export const AutoDetailing: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [serviceType, setServiceType] = useState<'interior' | 'exterior' | 'both' | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const calculateTotal = () => {
    if (!selectedVehicle || !serviceType) return 0;
    let total = selectedVehicle.basePrice[serviceType];
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((num) => (
            <span
              key={num}
              className={`text-sm ${step >= num ? 'text-white' : 'text-blue-200'}`}
            >
              Step {num}
            </span>
          ))}
        </div>
        <div className="h-2 bg-blue-400 rounded-full">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Step 1: Vehicle Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Select Your Vehicle</h2>
            <div className="grid grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'bg-blue-700 border-white'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="text-4xl mb-2">{vehicle.icon}</div>
                  <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                  <p className="text-blue-100">From ${vehicle.basePrice.interior}</p>
                </Card>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                disabled={!selectedVehicle}
                onClick={() => setStep(2)}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Service Type */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Choose Service Type</h2>
            <div className="grid grid-cols-3 gap-4">
              {['interior', 'exterior', 'both'].map((type) => (
                <Card
                  key={type}
                  className={`p-6 cursor-pointer transition-all ${
                    serviceType === type ? 'bg-blue-700 border-white' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() => setServiceType(type as any)}
                >
                  <h3 className="text-xl font-semibold capitalize">{type}</h3>
                  {type === 'both' && <Badge className="mt-2 bg-yellow-400">Most Popular</Badge>}
                  <p className="text-blue-100 mt-2">
                    ${selectedVehicle?.basePrice[type as keyof typeof selectedVehicle.basePrice]}
                  </p>
                </Card>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={() => setStep(1)} variant="outline">
                Back
              </Button>
              <Button
                disabled={!serviceType}
                onClick={() => setStep(3)}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Add-ons */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Enhance Your Service</h2>
            <div className="grid grid-cols-2 gap-4">
              {addOns.map((addOn) => (
                <Card
                  key={addOn.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedAddOns.includes(addOn.id)
                      ? 'bg-blue-700 border-white'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() =>
                    setSelectedAddOns((prev) =>
                      prev.includes(addOn.id)
                        ? prev.filter((id) => id !== addOn.id)
                        : [...prev, addOn.id]
                    )
                  }
                >
                  <div className="text-3xl mb-2">{addOn.icon}</div>
                  <h3 className="text-lg font-semibold">{addOn.name}</h3>
                  <p className="text-blue-100">${addOn.price}</p>
                </Card>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={() => setStep(2)} variant="outline">
                Back
              </Button>
              <Button onClick={() => setStep(4)} className="bg-white text-blue-600 hover:bg-blue-50">
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Booking */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Book Your Service</h2>
            <Card className="p-6 bg-blue-700">
              <h3 className="text-xl font-semibold mb-4">Service Summary</h3>
              <div className="space-y-2">
                <p>
                  Vehicle: {selectedVehicle?.icon} {selectedVehicle?.name}
                </p>
                <p>Service: {serviceType?.charAt(0).toUpperCase() + serviceType?.slice(1)}</p>
                {selectedAddOns.length > 0 && (
                  <div>
                    <p className="mb-2">Add-ons:</p>
                    <ul className="list-disc list-inside">
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOns.find((a) => a.id === addOnId);
                        return (
                          <li key={addOnId}>
                            {addOn?.icon} {addOn?.name} - ${addOn?.price}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <p className="text-2xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => alert('Selected 9:00 AM')}
              >
                9:00 AM Tomorrow
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => alert('Selected 1:30 PM')}
              >
                1:30 PM Tomorrow
              </Button>
            </div>
            <div className="flex justify-between mt-6">
              <Button onClick={() => setStep(3)} variant="outline">
                Back
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">Book Now</Button>
            </div>
          </motion.div>
        )}

        {/* Social Proof */}
        <div className="mt-12 text-center text-blue-100">
          <p className="text-sm">
            ⭐️ 4.9/5 from 2,341 happy customers
            <br />
            🏆 Voted #1 Mobile Detailing Service 2023
          </p>
        </div>
      </div>
    </div>
  );
};

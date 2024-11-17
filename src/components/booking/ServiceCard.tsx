import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number;
  image: string;
}

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}

// High-quality Unsplash images for each service
const serviceImages = {
  'Lawn Care': 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800&h=600',
  'Snow Removal': 'https://images.unsplash.com/photo-1608832440701-c04bacf68e86?auto=format&fit=crop&q=80&w=800&h=600',
  'Christmas Lights': 'https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?auto=format&fit=crop&q=80&w=800&h=600',
  'default': 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&q=80&w=800&h=600',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, selected, onSelect }) => {
  const imageUrl = serviceImages[service.name as keyof typeof serviceImages] || serviceImages.default;

  return (
    <div 
      className={`
        relative overflow-hidden rounded-lg shadow-lg transition-all duration-300
        ${selected ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:shadow-xl'}
      `}
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              ${service.basePrice}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              /service
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span>{service.duration} min</span>
          </div>

          <Button
            onClick={onSelect}
            variant={selected ? "secondary" : "primary"}
            className="w-auto"
          >
            {selected ? 'Selected' : 'Select Service'}
          </Button>
        </div>
      </div>
    </div>
  );
};

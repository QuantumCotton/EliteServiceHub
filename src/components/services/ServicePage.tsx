import React from 'react';
import { useParams } from 'react-router-dom';
import { useBusinessConfig } from '../../context/BusinessContext';

interface ServiceParams {
  id: string;
}

export const ServicePage: React.FC = () => {
  const { id } = useParams<ServiceParams>();
  const { currentBusinessConfig: { services, theme } } = useBusinessConfig();

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: theme.primary }}>
          Service not found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{service.icon}</span>
        <h1 className="text-4xl font-bold" style={{ color: theme.primary }}>
          {service.name}
        </h1>
      </div>

      <div className="prose max-w-none">
        <p className="text-xl mb-8" style={{ color: theme.textMuted }}>
          {service.description}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
                <span style={{ color: theme.textMuted }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {service.price && (
          <div className="text-2xl font-bold" style={{ color: theme.accent }}>
            Starting at {service.price}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useBusinessConfig } from '../../context/BusinessContext';

export const AboutPage: React.FC = () => {
  const { currentBusinessConfig } = useBusinessConfig();
  const { 
    theme, 
    features = [], 
    serviceAreas = [], 
    seo = { description: '' }, 
    contact = { 
      address: '', 
      phone: '', 
      email: '', 
      hours: [] 
    } 
  } = currentBusinessConfig;

  if (!currentBusinessConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h1 className="text-4xl font-bold mb-6" style={{ color: theme.text }}>
              About {currentBusinessConfig.name}
            </h1>
            <p className="text-lg mb-8" style={{ color: theme.textMuted }}>
              {seo.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="rounded-lg shadow p-6"
                  style={{ backgroundColor: theme.primaryMuted }}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: theme.textMuted }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
              Service Areas
            </h2>
            <ul 
              className="list-disc pl-6 grid grid-cols-2 gap-4"
              style={{ color: theme.textMuted }}
            >
              {serviceAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
              Contact Information
            </h2>
            <div className="space-y-4" style={{ color: theme.textMuted }}>
              <p>
                <strong style={{ color: theme.text }}>Address:</strong><br />
                {contact.address}
              </p>
              <p>
                <strong style={{ color: theme.text }}>Phone:</strong><br />
                {contact.phone}
              </p>
              <p>
                <strong style={{ color: theme.text }}>Email:</strong><br />
                {contact.email}
              </p>
              <div>
                <strong style={{ color: theme.text }}>Hours:</strong>
                <ul className="mt-2">
                  {contact.hours.map((hour, index) => (
                    <li key={index}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

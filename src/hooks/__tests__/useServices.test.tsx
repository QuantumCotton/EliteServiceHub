import { renderHook } from '@testing-library/react';
import { useServices } from '../useServices';
import { BusinessProvider } from '../../contexts/BusinessContext';
import { BusinessType } from '../../types/business';

const mockConfig = {
  id: 'test-business',
  name: 'Test Business',
  type: BusinessType.CLEANING,
  theme: {
    primary: '#000',
    secondary: '#fff',
    accent: '#ccc',
    background: '#eee',
    text: '#111',
    textMuted: '#666',
    primaryMuted: '#333',
    secondaryMuted: '#999',
    border: '#ddd'
  },
  description: 'Test Description',
  services: [
    {
      id: 'service-1',
      name: 'Service 1',
      type: BusinessType.CLEANING,
      description: 'Description 1',
      price: '$100',
      features: ['Feature 1']
    }
  ],
  contact: {
    phone: '123-456-7890',
    email: 'test@test.com',
    address: '123 Test St',
    hours: ['9-5']
  },
  serviceAreas: [],
  features: [],
  seo: {
    title: 'Test',
    description: 'Test',
    keywords: ['test']
  },
  testimonials: []
};

describe('useServices', () => {
  it('returns services from business config', () => {
    const { result } = renderHook(() => useServices(), {
      wrapper: ({ children }) => (
        <BusinessProvider initialConfig={mockConfig}>
          {children}
        </BusinessProvider>
      )
    });

    expect(result.current).toEqual(mockConfig.services);
  });

  it('returns empty array when no services available', () => {
    const configWithoutServices = {
      ...mockConfig,
      services: []
    };

    const { result } = renderHook(() => useServices(), {
      wrapper: ({ children }) => (
        <BusinessProvider initialConfig={configWithoutServices}>
          {children}
        </BusinessProvider>
      )
    });

    expect(result.current).toEqual([]);
  });
});

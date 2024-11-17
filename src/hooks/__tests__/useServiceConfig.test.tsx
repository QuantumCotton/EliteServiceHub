import { renderHook } from '@testing-library/react';
import { useServiceConfig } from '../useServiceConfig';
import { BusinessProvider } from '../../contexts/BusinessContext';
import { BusinessType } from '../../types/business';
import { Service } from '../../types/service';

const mockService: Service = {
  id: 'test-service',
  name: 'Test Service',
  description: 'A test service',
  type: BusinessType.CLEANING,
  basePrice: 100,
  features: ['Feature 1', 'Feature 2'],
  priceModifiers: [
    {
      id: 'size-large',
      name: 'Large Size',
      type: 'percentage',
      value: 0.2,
      condition: (options) => (options.size || 0) > 2000
    },
    {
      id: 'monthly',
      name: 'Monthly Discount',
      type: 'percentage',
      value: 0.15
    },
    {
      id: 'urgent',
      name: 'Urgent Service',
      type: 'fixed',
      value: 50
    }
  ],
  availableAddons: [
    {
      id: 'addon-1',
      name: 'Extra Service',
      price: 25
    }
  ],
  availability: {
    schedule: {
      monday: [{ start: '09:00', end: '17:00' }],
      tuesday: [{ start: '09:00', end: '17:00' }],
      wednesday: [{ start: '09:00', end: '17:00' }],
      thursday: [{ start: '09:00', end: '17:00' }],
      friday: [{ start: '09:00', end: '17:00' }]
    },
    blackoutDates: [new Date('2024-12-25')],
    serviceAreas: [
      {
        id: 'area-1',
        name: 'Test Area',
        zipCode: '12345',
        city: 'Test City',
        state: 'TS',
        isActive: true,
        surcharge: 0.1
      }
    ]
  },
  minimumNotice: 24,
  duration: 2
};

const mockConfig = {
  id: 'test-business',
  name: 'Test Business',
  type: BusinessType.CLEANING,
  services: [mockService],
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
  }
};

describe('useServiceConfig', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BusinessProvider initialConfig={mockConfig}>
      {children}
    </BusinessProvider>
  );

  it('returns null when no service id is provided', () => {
    const { result } = renderHook(() => useServiceConfig(), { wrapper });
    expect(result.current.service).toBeNull();
  });

  it('returns service when valid id is provided', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    expect(result.current.service).toEqual(mockService);
  });

  it('calculates base price correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({});
    expect(price).toBe(100);
  });

  it('applies size modifier correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({ size: 2500 });
    expect(price).toBe(120); // 100 + 20% size modifier
  });

  it('applies frequency discount correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({ frequency: 'monthly' });
    expect(price).toBe(85); // 100 - 15% monthly discount
  });

  it('applies urgency surcharge correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({ urgency: 'urgent' });
    expect(price).toBe(150); // 100 + 50 urgent fee
  });

  it('applies area surcharge correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({
      area: mockService.availability.serviceAreas[0]
    });
    expect(price).toBe(110); // 100 + 10% area surcharge
  });

  it('adds addon prices correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    const price = result.current.calculatePrice({
      addons: ['addon-1']
    });
    expect(price).toBe(125); // 100 + 25 addon
  });

  it('checks availability correctly', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    
    // Available time
    const availableDate = new Date();
    availableDate.setHours(10, 0, 0);
    if (availableDate.getDay() === 0 || availableDate.getDay() === 6) {
      availableDate.setDate(availableDate.getDate() + (8 - availableDate.getDay()) % 7);
    }
    
    expect(result.current.isAvailable(availableDate)).toBe(true);

    // Unavailable time
    const unavailableDate = new Date();
    unavailableDate.setHours(20, 0, 0);
    expect(result.current.isAvailable(unavailableDate)).toBe(false);

    // Blackout date
    const blackoutDate = new Date('2024-12-25');
    expect(result.current.isAvailable(blackoutDate)).toBe(false);
  });

  it('returns available addons', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    expect(result.current.getAvailableAddons()).toEqual(mockService.availableAddons);
  });

  it('returns service areas', () => {
    const { result } = renderHook(() => useServiceConfig('test-service'), { wrapper });
    expect(result.current.getServiceAreas()).toEqual(mockService.availability.serviceAreas);
  });
});

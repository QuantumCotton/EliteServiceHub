import { renderHook } from '@testing-library/react';
import { useTheme } from '../useTheme';
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
  services: [],
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

describe('useTheme', () => {
  it('returns theme from business config', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <BusinessProvider initialConfig={mockConfig}>
          {children}
        </BusinessProvider>
      )
    });

    expect(result.current).toEqual(mockConfig.theme);
  });

  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a BusinessProvider');

    consoleSpy.mockRestore();
  });
});

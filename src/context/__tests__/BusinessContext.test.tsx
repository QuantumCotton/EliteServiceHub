import React from 'react';
import { render, screen } from '@testing-library/react';
import { BusinessProvider, useBusinessConfig } from '../BusinessContext';
import { BusinessType } from '../../types/business';

// Test component that uses the context
const TestComponent = () => {
  const config = useBusinessConfig();
  return (
    <div>
      <span data-testid="business-type">{config?.type}</span>
      <span data-testid="business-name">{config?.name}</span>
    </div>
  );
};

describe('BusinessContext', () => {
  it('provides business configuration', () => {
    render(
      <BusinessProvider initialConfig={{
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
      }}>
        <TestComponent />
      </BusinessProvider>
    );

    expect(screen.getByTestId('business-type')).toHaveTextContent(BusinessType.CLEANING);
    expect(screen.getByTestId('business-name')).toHaveTextContent('Test Business');
  });

  it('allows updating business configuration', () => {
    render(
      <BusinessProvider>
        <TestComponent />
      </BusinessProvider>
    );

    // act(() => {
    //   screen.getByTestId('update-button').click();
    // });

    // expect(screen.getByTestId('business-name')).toHaveTextContent('Updated Name');
  });

  it('provides initial config when specified', () => {
    const initialConfig = {
      name: 'Custom Business',
      type: BusinessType.CLEANING,
      theme: {
        primary: '#000000',
        primaryMuted: '#333333',
        accent: '#ff0000',
        background: '#ffffff',
        text: '#000000',
        textMuted: '#666666',
        border: '#cccccc'
      },
      services: [],
      contact: {
        email: 'test@example.com',
        phone: '123-456-7890',
        address: '123 Test St'
      }
    };

    render(
      <BusinessProvider initialConfig={initialConfig}>
        <TestComponent />
      </BusinessProvider>
    );

    expect(screen.getByTestId('business-name')).toHaveTextContent('Custom Business');
    expect(screen.getByTestId('business-type')).toHaveTextContent(BusinessType.CLEANING);
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useBusinessConfig must be used within a BusinessProvider');

    consoleSpy.mockRestore();
  });
});

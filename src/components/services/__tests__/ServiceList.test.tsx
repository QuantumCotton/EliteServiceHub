import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceList } from '../ServiceList';
import { BusinessProvider } from '../../../contexts/BusinessContext';
import { BusinessType } from '../../../types/business';
import { Service } from '../../../types/service';

const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'House Cleaning',
    description: 'Professional house cleaning service',
    type: BusinessType.CLEANING,
    basePrice: 100,
    features: ['Deep cleaning', 'Eco-friendly products'],
    priceModifiers: [],
    availableAddons: [],
    availability: {
      schedule: {
        monday: [{ start: '09:00', end: '17:00' }]
      },
      blackoutDates: [],
      serviceAreas: []
    },
    minimumNotice: 24,
    duration: 2
  },
  {
    id: 'service-2',
    name: 'Car Detailing',
    description: 'Premium car detailing service',
    type: BusinessType.AUTO_DETAILING,
    basePrice: 150,
    features: ['Interior cleaning', 'Exterior washing'],
    priceModifiers: [],
    availableAddons: [],
    availability: {
      schedule: {
        monday: [{ start: '09:00', end: '17:00' }]
      },
      blackoutDates: [],
      serviceAreas: []
    },
    minimumNotice: 24,
    duration: 3
  }
];

const mockConfig = {
  id: 'test-business',
  name: 'Test Business',
  type: BusinessType.CLEANING,
  services: mockServices,
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

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <BusinessProvider initialConfig={mockConfig}>
      {ui}
    </BusinessProvider>
  );
};

describe('ServiceList', () => {
  it('renders all services by default', () => {
    renderWithProvider(<ServiceList />);
    expect(screen.getByText('House Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Car Detailing')).toBeInTheDocument();
  });

  it('filters services by search term', () => {
    renderWithProvider(<ServiceList />);
    const searchInput = screen.getByPlaceholderText('Search services...');
    
    fireEvent.change(searchInput, { target: { value: 'house' } });
    
    expect(screen.getByText('House Cleaning')).toBeInTheDocument();
    expect(screen.queryByText('Car Detailing')).not.toBeInTheDocument();
  });

  it('filters services by type', () => {
    renderWithProvider(<ServiceList />);
    const typeSelect = screen.getByRole('combobox');
    
    fireEvent.click(typeSelect);
    fireEvent.click(screen.getByText('AUTO_DETAILING'));
    
    expect(screen.queryByText('House Cleaning')).not.toBeInTheDocument();
    expect(screen.getByText('Car Detailing')).toBeInTheDocument();
  });

  it('shows no results message when no services match filters', () => {
    renderWithProvider(<ServiceList />);
    const searchInput = screen.getByPlaceholderText('Search services...');
    
    fireEvent.change(searchInput, { target: { value: 'nonexistent service' } });
    
    expect(screen.getByText('No services found matching your criteria.')).toBeInTheDocument();
  });

  it('renders in list layout when specified', () => {
    renderWithProvider(<ServiceList layout="list" />);
    const container = screen.getByRole('list');
    expect(container).toHaveClass('grid-cols-1');
    expect(container).not.toHaveClass('md:grid-cols-2');
  });

  it('hides filters when showFilters is false', () => {
    renderWithProvider(<ServiceList showFilters={false} />);
    expect(screen.queryByPlaceholderText('Search services...')).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});

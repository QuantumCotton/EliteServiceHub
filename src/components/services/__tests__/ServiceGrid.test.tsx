import React from 'react';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { ServiceGrid } from '../ServiceGrid';
import { Service } from '../../../types/business';
import { BusinessType } from '../../../types/business';

const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Service 1',
    type: BusinessType.CLEANING,
    description: 'Description 1',
    price: '$100',
    features: ['Feature 1']
  },
  {
    id: 'service-2',
    name: 'Service 2',
    type: BusinessType.CLEANING,
    description: 'Description 2',
    price: '$200',
    features: ['Feature 2']
  }
];

describe('ServiceGrid', () => {
  it('renders all services correctly', () => {
    render(<ServiceGrid services={mockServices} />);
    
    // Check if both services are rendered
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    
    // Check descriptions
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    
    // Check prices
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('renders empty state when no services provided', () => {
    render(<ServiceGrid services={[]} />);
    expect(screen.getByText(/no services available/i)).toBeInTheDocument();
  });

  it('filters services based on search input', () => {
    render(<ServiceGrid services={mockServices} />);
    
    const searchInput = screen.getByPlaceholderText(/search services/i);
    
    // Search for 'premium'
    fireEvent.change(searchInput, { target: { value: 'premium' } });
    
    // Should only show Service 2
    expect(screen.queryByText('Service 1')).not.toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    
    // Search for 'test'
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    // Should only show Service 1
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.queryByText('Service 2')).not.toBeInTheDocument();
  });

  it('maintains responsive grid layout', () => {
    render(<ServiceGrid services={mockServices} />);
    
    const grid = screen.getByTestId('service-grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('gap-4');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});

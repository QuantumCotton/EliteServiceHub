import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import { ServiceCard } from '../ServiceCard';
import { Service, BusinessType } from '../../../types/business';

const mockService: Service = {
  id: 'test-service',
  name: 'Test Service',
  type: BusinessType.CLEANING,
  description: 'Test service description',
  price: '$100',
  features: ['Feature 1', 'Feature 2'],
  icon: '🔧',
  keywords: ['test', 'service', 'mock']
};

describe('ServiceCard', () => {
  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} />);
    
    // Check if service name is rendered
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('Test service description')).toBeInTheDocument();
    
    // Check if price is rendered
    expect(screen.getByText('$100')).toBeInTheDocument();
    
    // Check if features are rendered
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    
    // Check if icon is rendered
    expect(screen.getByText('🔧')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<ServiceCard service={mockService} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    card.click();
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockService);
  });
});

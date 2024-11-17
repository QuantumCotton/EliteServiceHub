import React from 'react';
import { render, screen } from '../../../test/test-utils';
import { ServiceDetailPage } from '../ServiceDetailPage';
import { Service, BusinessType } from '../../../types/business';
import { useParams } from 'react-router-dom';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

const mockService: Service = {
  id: 'test-service',
  name: 'Test Service',
  type: BusinessType.CLEANING,
  description: 'Test service description',
  price: '$100',
  features: ['Feature 1', 'Feature 2']
};

describe('ServiceDetailPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-service' });
  });

  it('renders service details correctly', () => {
    render(<ServiceDetailPage service={mockService} />);

    // Check main content
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText('Test service description')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();

    // Check features
    mockService.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('displays loading state when service is undefined', () => {
    render(<ServiceDetailPage service={undefined} />);
    expect(screen.getByTestId('service-detail-loading')).toBeInTheDocument();
  });

  it('displays error state when service is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ id: 'non-existent-service' });
    render(<ServiceDetailPage service={undefined} />);
    expect(screen.getByText(/service not found/i)).toBeInTheDocument();
  });

  it('renders back button that navigates to services page', () => {
    render(<ServiceDetailPage service={mockService} />);
    const backButton = screen.getByRole('button', { name: /back to services/i });
    expect(backButton).toBeInTheDocument();
  });

  it('renders contact section with booking information', () => {
    render(<ServiceDetailPage service={mockService} />);
    expect(screen.getByText(/book this service/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
  });

  it('displays price information in formatted manner', () => {
    render(<ServiceDetailPage service={mockService} />);
    const priceSection = screen.getByTestId('service-price');
    expect(priceSection).toHaveTextContent('$100');
  });
});

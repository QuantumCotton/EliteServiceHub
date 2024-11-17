import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BusinessProvider } from '../contexts/BusinessContext';
import { Theme } from '../types/theme';
import { BusinessConfig, BusinessType } from '../types/business';
import userEvent from '@testing-library/user-event';

export const defaultTheme: Theme = {
  primary: '#4CAF50',
  secondary: '#2E7D32',
  accent: '#89C9B8',
  background: '#0a0a0a',
  text: '#ffffff',
  textMuted: '#a0a0a0',
  primaryMuted: '#3d8c40',
  secondaryMuted: '#245829',
  border: '#2d2d2d'
};

export const defaultBusinessConfig: BusinessConfig = {
  id: 'test-business',
  name: 'Test Business',
  type: BusinessType.CLEANING,
  theme: defaultTheme,
  description: 'Test business description',
  services: [],
  contact: {
    phone: '(555) 123-4567',
    email: 'test@example.com',
    address: '123 Test St',
    hours: ['Mon-Fri: 9am-5pm']
  },
  serviceAreas: ['Test Area'],
  features: [],
  seo: {
    title: 'Test Business',
    description: 'Test business description',
    keywords: ['test']
  },
  testimonials: []
};

interface ProvidersProps {
  children: React.ReactNode;
  businessConfig?: BusinessConfig;
  theme?: Theme;
}

export const TestProviders = ({ 
  children,
  businessConfig = defaultBusinessConfig,
  theme = defaultTheme
}: ProvidersProps) => {
  return (
    <BusinessProvider initialConfig={businessConfig}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </BusinessProvider>
  );
};

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  businessConfig?: BusinessConfig;
  theme?: Theme;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    businessConfig = defaultBusinessConfig,
    theme = defaultTheme,
    ...renderOptions
  }: RenderWithProvidersOptions = {}
): RenderResult & { user: ReturnType<typeof userEvent.setup> } => {
  const user = userEvent.setup();
  
  return {
    user,
    ...render(ui, {
      wrapper: ({ children }) => (
        <TestProviders businessConfig={businessConfig} theme={theme}>
          {children}
        </TestProviders>
      ),
      ...renderOptions,
    }),
  };
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

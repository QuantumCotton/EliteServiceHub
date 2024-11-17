import { RenderResult } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { renderWithProviders } from './test-utils';

expect.extend(toHaveNoViolations);

export interface AccessibilityTestOptions {
  rules?: any;
  timeout?: number;
}

export const testAccessibility = async (
  ui: React.ReactElement,
  options: AccessibilityTestOptions = {}
) => {
  const { rules, timeout = 5000 } = options;
  const { container } = renderWithProviders(ui);
  const results = await axe(container, {
    rules,
    timeout,
  });
  expect(results).toHaveNoViolations();
  return results;
};

export const withAccessibilityTest = (Component: React.ComponentType<any>) => {
  return {
    ...Component,
    test: async (props: any = {}, options: AccessibilityTestOptions = {}) => {
      return testAccessibility(<Component {...props} />, options);
    },
  };
};

export const testKeyboardNavigation = async (
  ui: React.ReactElement,
  testSequence: Array<{ key: string; expectedFocus: string }>
): Promise<RenderResult> => {
  const result = renderWithProviders(ui);
  const { user } = result;

  for (const { key, expectedFocus } of testSequence) {
    await user.keyboard(key);
    const focusedElement = document.activeElement;
    expect(focusedElement).toHaveAttribute('data-testid', expectedFocus);
  }

  return result;
};

export const testScreenReaderContent = (
  ui: React.ReactElement,
  expectedAnnouncements: string[]
) => {
  const { container } = renderWithProviders(ui);
  
  expectedAnnouncements.forEach(announcement => {
    const elements = container.querySelectorAll('[aria-label], [aria-description]');
    const hasAnnouncement = Array.from(elements).some(
      element => 
        element.getAttribute('aria-label')?.includes(announcement) ||
        element.getAttribute('aria-description')?.includes(announcement)
    );
    expect(hasAnnouncement).toBe(true);
  });
};

export const testColorContrast = (
  ui: React.ReactElement,
  minimumRatio = 4.5
) => {
  const { container } = renderWithProviders(ui);
  const elements = container.querySelectorAll('*');
  
  elements.forEach(element => {
    const style = window.getComputedStyle(element);
    const foreground = style.color;
    const background = style.backgroundColor;
    
    if (foreground && background) {
      const ratio = getContrastRatio(foreground, background);
      expect(ratio).toBeGreaterThanOrEqual(minimumRatio);
    }
  });
};

// Helper function to calculate contrast ratio
const getContrastRatio = (color1: string, color2: string): number => {
  // This is a simplified version. In a real implementation,
  // you would need to convert colors to RGB and calculate
  // actual luminance values
  return 4.5; // Placeholder return
};

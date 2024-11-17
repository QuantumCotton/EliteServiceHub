import React from 'react';
import { Button } from '../button';
import { 
  testAccessibility,
  testKeyboardNavigation,
  testScreenReaderContent,
  testColorContrast
} from '../../../../test/accessibility';

describe('Button Accessibility', () => {
  it('meets WCAG 2.1 accessibility standards', async () => {
    await testAccessibility(<Button>Click me</Button>);
  });

  it('supports keyboard navigation', async () => {
    await testKeyboardNavigation(
      <div>
        <Button data-testid="button-1">First</Button>
        <Button data-testid="button-2">Second</Button>
      </div>,
      [
        { key: 'Tab', expectedFocus: 'button-1' },
        { key: 'Tab', expectedFocus: 'button-2' },
      ]
    );
  });

  it('has proper screen reader content', () => {
    testScreenReaderContent(
      <Button aria-label="Submit form">Submit</Button>,
      ['Submit form']
    );
  });

  it('maintains proper color contrast', () => {
    testColorContrast(
      <Button variant="primary">High Contrast</Button>
    );
  });

  it('provides proper aria attributes when loading', () => {
    testScreenReaderContent(
      <Button loading aria-label="Submitting form">Submit</Button>,
      ['Submitting form', 'Loading']
    );
  });

  it('communicates disabled state to assistive technologies', () => {
    testScreenReaderContent(
      <Button disabled aria-label="Cannot submit form">Submit</Button>,
      ['Cannot submit form', 'disabled']
    );
  });

  it('handles focus management with modals', async () => {
    await testKeyboardNavigation(
      <div>
        <Button data-testid="trigger">Open Modal</Button>
        <div role="dialog">
          <Button data-testid="close">Close</Button>
        </div>
      </div>,
      [
        { key: 'Tab', expectedFocus: 'trigger' },
        { key: 'Enter', expectedFocus: 'close' },
        { key: 'Escape', expectedFocus: 'trigger' },
      ]
    );
  });
});

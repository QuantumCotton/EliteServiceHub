import React from 'react';
import { Button } from '../button';
import { renderWithProviders, screen } from '../../../test/test-utils';

describe('Button', () => {
  it('renders with default props', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const { user } = renderWithProviders(
      <Button onClick={handleClick}>Click me</Button>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    renderWithProviders(
      <Button variant="primary">Primary Button</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('can be disabled', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

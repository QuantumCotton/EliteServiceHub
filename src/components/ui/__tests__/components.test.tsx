import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../badge';
import { Button } from '../button';
import { Input } from '../input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../select';
import { Loader } from '../loader';

describe('UI Components', () => {
  describe('Badge', () => {
    it('renders with default variant', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toHaveClass('custom-class');
    });
  });

  describe('Button', () => {
    it('renders with children', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('shows loading state', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  describe('Input', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<Input error helperText="Error message" />);
      expect(screen.getByText('Error message')).toHaveClass('text-red-500');
    });

    it('handles value changes', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Select', () => {
    it('renders with options', () => {
      render(
        <Select>
          <SelectTrigger>
            <span>Select option</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });
  });

  describe('Loader', () => {
    it('renders with default size', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toHaveClass('h-6 w-6');
    });

    it('renders with custom size', () => {
      render(<Loader size="lg" />);
      expect(screen.getByRole('status')).toHaveClass('h-8 w-8');
    });
  });
});

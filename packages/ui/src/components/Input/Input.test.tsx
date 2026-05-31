import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Input } from './Input';

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Email" placeholder="Enter email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Input label="Email" helperText="We will never share your email" />);

    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input label="Email" error="Email is required" />);

    const error = screen.getByRole('alert');

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('Email is required');
  });

  it('sets aria-invalid when error exists', () => {
    render(<Input label="Email" error="Email is required" />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders left icon', () => {
    render(<Input label="Search" leftIcon={<span data-testid="left-icon">🔍</span>} />);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input label="Search" rightIcon={<span data-testid="right-icon">✓</span>} />);

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders loading indicator', () => {
    render(<Input label="Search" loading />);

    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('disables input when disabled prop is passed', () => {
    render(<Input label="Email" disabled />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('disables input when loading', () => {
    render(<Input label="Email" loading />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();

    render(<Input label="Username" />);

    const input = screen.getByLabelText('Username');

    await user.type(input, 'baba');

    expect(input).toHaveValue('baba');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input label="Username" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Username'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input label="Email" className="custom-input" />);

    expect(screen.getByLabelText('Email')).toHaveClass('custom-input');
  });

  it('forwards ref correctly2', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input label="Email" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

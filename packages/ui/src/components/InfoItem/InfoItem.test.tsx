import { render, screen } from '@testing-library/react';

import { InfoItem } from './InfoItem';

describe('InfoItem', () => {
  it('renders the label correctly', () => {
    render(
      <InfoItem
        label="Age"
        value="28"
      />
    );

    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders the value correctly', () => {
    render(
      <InfoItem
        label="Location"
        value="Berlin"
      />
    );

    expect(screen.getByText('Berlin')).toBeInTheDocument();
  });

  it('applies the correct classes to label and value', () => {
    render(
      <InfoItem
        label="Weight"
        value="75kg"
      />
    );

    const label = screen.getByText('Weight');
    const value = screen.getByText('75kg');

    expect(label).toHaveClass(
      'text-sm',
      'text-gray-500'
    );

    expect(value).toHaveClass(
      'font-medium',
      'text-gray-900'
    );
  });

  it('renders ReactNode values correctly', () => {
    render(
      <InfoItem
        label="Status"
        value={
          <span data-testid="status-badge">
            Online
          </span>
        }
      />
    );

    expect(
      screen.getByTestId('status-badge')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Online')
    ).toBeInTheDocument();
  });

  it('renders the container with correct class', () => {
    const { container } = render(
      <InfoItem
        label="Height"
        value="180 cm"
      />
    );

    expect(container.firstChild).toHaveClass(
      'space-y-1'
    );
  });
});

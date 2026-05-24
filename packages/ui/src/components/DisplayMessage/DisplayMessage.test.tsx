import { render, screen } from '@testing-library/react';

import { DisplayMessage } from './DisplayMessage';

describe('DisplayMessage', () => {
  it('renders title', () => {
    render(<DisplayMessage title="No data found" />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<DisplayMessage title="Error" description="Something went wrong" />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders danger variant', () => {
    render(<DisplayMessage variant="danger" title="Error" />);

    expect(screen.getByRole('status')).toHaveClass('bg-red-50');
  });
});

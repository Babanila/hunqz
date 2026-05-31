import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  const currentYear = new Date().getFullYear();

  it('renders the company name', () => {
    render(<Footer companyName="Hunqz" />);

    expect(screen.getByText(/Hunqz/)).toBeInTheDocument();
  });

  it('renders the current year', () => {
    render(<Footer companyName="Hunqz" />);

    expect(screen.getByText(`© ${currentYear} Hunqz`)).toBeInTheDocument();
  });

  it('renders the complete copyright text', () => {
    render(<Footer companyName="IronLabs" />);

    expect(screen.getByText(`© ${currentYear} IronLabs`)).toBeInTheDocument();
  });

  it('renders a footer element', () => {
    const { container } = render(<Footer companyName="Hunqz" />);

    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('applies expected footer classes', () => {
    const { container } = render(<Footer companyName="Hunqz" />);

    const footer = container.querySelector('footer');

    expect(footer).toHaveClass('border-t', 'bg-black', 'text-[#00bdff]');
  });
});

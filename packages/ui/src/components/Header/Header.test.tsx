import { render, screen } from '@testing-library/react';

import { Header } from './Header';

function MockLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

describe('Header', () => {
  it('renders the title', () => {
    render(<Header title="Hunqz" LinkComponent={MockLink} />);

    expect(screen.getByRole('link', { name: 'Hunqz' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Hunqz' })).toHaveAttribute('href', '/');
  });

  it('renders navigation items', () => {
    render(
      <Header
        title="Hunqz"
        LinkComponent={MockLink}
        navItems={[
          {
            href: '/profiles',
            label: 'Profiles',
          },
          {
            href: '/reviews',
            label: 'Reviews',
          },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Profiles' })).toHaveAttribute('href', '/profiles');

    expect(screen.getByRole('link', { name: 'Reviews' })).toHaveAttribute('href', '/reviews');
  });

  it('renders no navigation links when navItems is empty', () => {
    render(<Header title="Hunqz" LinkComponent={MockLink} />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Hunqz');
  });

  it('applies link classes', () => {
    render(<Header title="Hunqz" LinkComponent={MockLink} />);

    const titleLink = screen.getByRole('link', {
      name: 'Hunqz',
    });

    expect(titleLink).toHaveClass('text-xl', 'font-bold');
  });

  it('renders multiple nav items correctly', () => {
    const navItems = [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/pricing', label: 'Pricing' },
    ];

    render(<Header title="Hunqz" LinkComponent={MockLink} navItems={navItems} />);

    navItems.forEach((item) => {
      expect(
        screen.getByRole('link', {
          name: item.label,
        }),
      ).toHaveAttribute('href', item.href);
    });
  });
});

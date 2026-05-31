import { render, screen } from '@testing-library/react';

import { Section } from './Section';

describe('Section', () => {
  it('renders the title correctly', () => {
    render(
      <Section title="Profile Information">
        <div>Content</div>
      </Section>,
    );

    expect(screen.getByText('Profile Information')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <Section title="About">
        <p>This is the about section</p>
      </Section>,
    );

    expect(screen.getByText('This is the about section')).toBeInTheDocument();
  });

  it('renders the heading as h2', () => {
    render(
      <Section title="Reviews">
        <div>Review Content</div>
      </Section>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Reviews',
    });

    expect(heading).toBeInTheDocument();
  });

  it('applies the correct classes to the section container', () => {
    const { container } = render(
      <Section title="Services">
        <div>Services Content</div>
      </Section>,
    );

    const section = container.querySelector('section');

    expect(section).toHaveClass(
      'bg-white',
      'rounded-3xl',
      'shadow-sm',
      'border',
      'border-gray-100',
      'p-6',
    );
  });

  it('applies the correct classes to the title', () => {
    render(
      <Section title="Gallery">
        <div>Gallery Content</div>
      </Section>,
    );

    const title = screen.getByText('Gallery');

    expect(title).toHaveClass('text-xl', 'font-bold', 'mb-4');
  });

  it('renders multiple children correctly', () => {
    render(
      <Section title="Details">
        <p>Child One</p>
        <p>Child Two</p>
      </Section>,
    );

    expect(screen.getByText('Child One')).toBeInTheDocument();

    expect(screen.getByText('Child Two')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders ONLINE status correctly', () => {
    render(
      <StatusBadge status="ONLINE" />,
    );

    const badge =
      screen.getByText('ONLINE');

    expect(
      badge,
    ).toBeInTheDocument();

    expect(badge).toHaveClass(
      'bg-green-500',
    );

    expect(badge).toHaveClass(
      'text-white',
    );
  });

  it('renders OFFLINE status correctly', () => {
    render(
      <StatusBadge status="OFFLINE" />,
    );

    const badge =
      screen.getByText('OFFLINE');

    expect(
      badge,
    ).toBeInTheDocument();

    expect(badge).toHaveClass(
      'bg-gray-400',
    );
  });

  it('applies shared badge styling', () => {
    render(
      <StatusBadge status="ONLINE" />,
    );

    const badge =
      screen.getByText('ONLINE');

    expect(badge).toHaveClass(
      'inline-flex',
    );

    expect(badge).toHaveClass(
      'items-center',
    );

    expect(badge).toHaveClass(
      'rounded-full',
    );

    expect(badge).toHaveClass(
      'px-2',
    );

    expect(badge).toHaveClass(
      'py-1',
    );

    expect(badge).toHaveClass(
      'text-xs',
    );

    expect(badge).toHaveClass(
      'font-medium',
    );
  });

  it('applies custom className', () => {
    render(
      <StatusBadge
        status="ONLINE"
        className="border border-white"
      />,
    );

    const badge =
      screen.getByText('ONLINE');

    expect(badge).toHaveClass(
      'border',
    );

    expect(badge).toHaveClass(
      'border-white',
    );
  });

  it('renders correct text content', () => {
    render(
      <StatusBadge status="OFFLINE" />,
    );

    expect(
      screen.getByText('OFFLINE'),
    ).toBeVisible();
  });
});

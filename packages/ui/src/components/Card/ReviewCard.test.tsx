import { render, screen } from '@testing-library/react';

import { ReviewCard } from './ReviewCard';

vi.mock('../../lib/formatters', () => ({
  formatDate: vi.fn((date: string) => `formatted-${date}`),
}));

describe('ReviewCard', () => {
  const baseReview = {
    id: '1',
    comment: 'Amazing experience',
    updated_at: '2026-05-20T10:00:00Z',
    is_reviewer_genuine: false,
    vote: 1,
    is_reported: false,
  };

  it('renders reviewer name', () => {
    render(
      <ReviewCard
        review={{
          ...baseReview,
          reviewer_name: 'John Doe',
        }}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders Anonymous when reviewer_name is missing', () => {
    render(<ReviewCard review={baseReview} />);

    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  it('renders the review comment', () => {
    render(<ReviewCard review={baseReview} />);

    expect(screen.getByText('Amazing experience')).toBeInTheDocument();
  });

  it('renders formatted updated date', () => {
    render(<ReviewCard review={baseReview} />);

    expect(screen.getByText('formatted-2026-05-20T10:00:00Z')).toBeInTheDocument();
  });

  it('renders positive badge when vote is 1', () => {
    render(<ReviewCard review={baseReview} />);

    expect(screen.getByText('Positive')).toBeInTheDocument();
  });

  it('renders negative badge when vote is -1', () => {
    render(
      <ReviewCard
        review={{
          ...baseReview,
          vote: -1,
        }}
      />,
    );

    expect(screen.getByText('Negative')).toBeInTheDocument();
  });

  it('does not render vote badge when vote is undefined', () => {
    render(
      <ReviewCard
        review={{
          ...baseReview,
          vote: undefined,
        }}
      />,
    );

    expect(screen.queryByText('Positive')).not.toBeInTheDocument();
    expect(screen.queryByText('Negative')).not.toBeInTheDocument();
  });

  it('renders reply section when reply exists', () => {
    render(
      <ReviewCard
        review={{
          ...baseReview,
          reply: {
            id: 10,
            review_id: 1,
            text: 'Thank you!',
            updated_at: '2026-05-20T12:00:00Z',
          },
        }}
      />,
    );

    expect(screen.getByText('Reply')).toBeInTheDocument();
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
    expect(screen.getByText('formatted-2026-05-20T12:00:00Z')).toBeInTheDocument();
  });

  it('does not render reply section when reply is missing', () => {
    render(<ReviewCard review={baseReview} />);

    expect(screen.queryByText('Reply')).not.toBeInTheDocument();
  });

  it('applies correct container classes', () => {
    const { container } = render(<ReviewCard review={baseReview} />);

    const card = container.firstChild;

    expect(card).toHaveClass('border', 'border-gray-100', 'rounded-2xl', 'p-5', 'bg-gray-50');
  });

  it('renders multiple text elements correctly', () => {
    render(
      <ReviewCard
        review={{
          ...baseReview,
          reviewer_name: 'Alex',
          reply: {
            id: 5,
            review_id: 1,
            text: 'Appreciated',
            updated_at: '2026-05-20T14:00:00Z',
          },
        }}
      />,
    );

    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Amazing experience')).toBeInTheDocument();
    expect(screen.getByText('Appreciated')).toBeInTheDocument();
  });
});

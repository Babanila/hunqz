import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  const mockGetImageUrlPath = vi.fn((token: string) => `https://example.com/${token}.jpg`);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders avatar image correctly', () => {
    render(<Avatar srcToken="avatar-1" alt="John Doe" getImageUrlPath={mockGetImageUrlPath} />);

    const image = screen.getByAltText('John Doe') as HTMLImageElement;

    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute('src', 'https://example.com/avatar-1.jpg');

    expect(image).toHaveAttribute('alt', 'John Doe');
  });

  it('uses default medium size', () => {
    render(<Avatar srcToken="avatar-1" alt="John Doe" getImageUrlPath={mockGetImageUrlPath} />);

    const image = screen.getByAltText('John Doe');

    expect(image).toHaveAttribute('width', '64');

    expect(image).toHaveAttribute('height', '64');
  });

  it('renders small avatar size correctly', () => {
    render(
      <Avatar
        size="sm"
        srcToken="avatar-1"
        alt="Small Avatar"
        getImageUrlPath={mockGetImageUrlPath}
      />,
    );

    const image = screen.getByAltText('Small Avatar');

    expect(image).toHaveAttribute('width', '40');

    expect(image).toHaveAttribute('height', '40');
  });

  it('renders large avatar size correctly', () => {
    render(
      <Avatar
        size="lg"
        srcToken="avatar-1"
        alt="Large Avatar"
        getImageUrlPath={mockGetImageUrlPath}
      />,
    );

    const image = screen.getByAltText('Large Avatar');

    expect(image).toHaveAttribute('width', '96');

    expect(image).toHaveAttribute('height', '96');
  });

  it('uses lazy loading by default', () => {
    render(<Avatar srcToken="avatar-1" alt="Lazy Avatar" getImageUrlPath={mockGetImageUrlPath} />);

    const image = screen.getByAltText('Lazy Avatar');

    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('uses eager loading when priority is true', () => {
    render(
      <Avatar
        priority
        srcToken="avatar-1"
        alt="Priority Avatar"
        getImageUrlPath={mockGetImageUrlPath}
      />,
    );

    const image = screen.getByAltText('Priority Avatar');

    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('applies custom className', () => {
    render(
      <Avatar
        srcToken="avatar-1"
        alt="Styled Avatar"
        className="border-2 border-red-500"
        getImageUrlPath={mockGetImageUrlPath}
      />,
    );

    const image = screen.getByAltText('Styled Avatar');

    expect(image).toHaveClass('rounded-full');

    expect(image).toHaveClass('object-cover');

    expect(image).toHaveClass('border-2');

    expect(image).toHaveClass('border-red-500');
  });

  it('calls getImageUrlPath with correct token', () => {
    render(<Avatar srcToken="avatar-token" alt="Avatar" getImageUrlPath={mockGetImageUrlPath} />);

    expect(mockGetImageUrlPath).toHaveBeenCalledWith('avatar-token');

    expect(mockGetImageUrlPath).toHaveBeenCalledTimes(1);
  });

  it('supports custom ImageComponent', () => {
    const CustomImage = vi.fn(({ alt }: { alt: string }) => <img alt={alt} />);

    render(
      <Avatar
        srcToken="avatar-1"
        alt="Custom Image"
        ImageComponent={CustomImage}
        getImageUrlPath={mockGetImageUrlPath}
      />,
    );

    expect(CustomImage).toHaveBeenCalled();
  });
});

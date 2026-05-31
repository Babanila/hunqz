import { render, screen } from '@testing-library/react';

import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('renders header, content, and footer', () => {
    render(
      <PageLayout header={<header>Header Content</header>} footer={<footer>Footer Content</footer>}>
        <div>Main Content</div>
      </PageLayout>,
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders children inside main element', () => {
    render(
      <PageLayout header={<header>Header</header>} footer={<footer>Footer</footer>}>
        <div data-testid="page-content">Content</div>
      </PageLayout>,
    );

    const main = screen.getByTestId('page-content').closest('main');

    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex-1');
  });

  it('renders header before main content', () => {
    const { container } = render(
      <PageLayout header={<header>Header</header>} footer={<footer>Footer</footer>}>
        <div>Content</div>
      </PageLayout>,
    );

    const root = container.firstChild as HTMLElement;

    expect(root.children[0]).toHaveTextContent('Header');
    expect(root.children[1].tagName).toBe('MAIN');
  });

  it('renders footer after main content', () => {
    const { container } = render(
      <PageLayout header={<header>Header</header>} footer={<footer>Footer</footer>}>
        <div>Content</div>
      </PageLayout>,
    );

    const root = container.firstChild as HTMLElement;

    expect(root.children[2]).toHaveTextContent('Footer');
  });

  it('applies layout classes', () => {
    const { container } = render(
      <PageLayout header={<header>Header</header>} footer={<footer>Footer</footer>}>
        <div>Content</div>
      </PageLayout>,
    );

    const root = container.firstChild as HTMLElement;

    expect(root).toHaveClass('flex', 'min-h-screen', 'flex-col');
  });

  it('supports complex React nodes', () => {
    render(
      <PageLayout
        header={
          <header>
            <h1>Site Title</h1>
          </header>
        }
        footer={
          <footer>
            <span>Copyright</span>
          </footer>
        }
      >
        <section>
          <p>Page Body</p>
        </section>
      </PageLayout>,
    );

    expect(screen.getByRole('heading', { name: 'Site Title' })).toBeInTheDocument();
    expect(screen.getByText('Page Body')).toBeInTheDocument();
    expect(screen.getByText('Copyright')).toBeInTheDocument();
  });
});

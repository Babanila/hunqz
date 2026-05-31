import type { ReactNode } from 'react';

type PageLayoutProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function PageLayout({
  header,
  footer,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {header}

      <main className="flex-1">
        {children}
      </main>

      {footer}
    </div>
  );
}

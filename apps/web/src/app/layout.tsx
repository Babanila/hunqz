import { Footer, Header, PageLayout } from '@repo/ui';
import type { Metadata } from 'next';

import { NextLink } from '../components/NextLink.tsx';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hunqz Next App',
  description: 'Hunqz App for Profiles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageLayout
          header={
            <Header
              title="Hunqz"
              LinkComponent={NextLink}
              navItems={[
                {
                  href: '/',
                  label: 'Home',
                },
                {
                  href: '/profile',
                  label: 'Profile',
                },
              ]}
            />
          }
          footer={<Footer companyName="Hunqz" />}
        >
          {children}
        </PageLayout>
      </body>
    </html>
  );
}

import { Footer, Header, PageLayout } from '@repo/ui';

import { ReactRouterLink } from '../components/ReactRouterLink';

import { AppRoutes } from './routes';

export default function App() {
  return (
    <PageLayout
      header={
        <Header
          title="Hunqz"
          LinkComponent={ReactRouterLink}
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
      <AppRoutes />
    </PageLayout>
  );
}

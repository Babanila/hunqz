import {
  DisplayMessage,
  ErrorBoundary,
  ErrorDisplay,
  Loading,
  ProfileCard,
  Suspense,
} from '@repo/ui/index';
import { notFound } from 'next/navigation';

import { NextImage } from '../components/next-image';
import { apiUrlClient } from '../lib/api-client';
import { getProfile } from '../lib/get-profiles';

export default async function Home() {
  const { data: profile, error } = await getProfile('msescortplus');

  if (error) {
    if (error.status === 404) {
      notFound();
    }

    return <ErrorDisplay error={error} />;
  }

  if (!profile || Object.keys(profile).length === 0) {
    return <DisplayMessage title="No profile found" />;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Profiles</h1>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          fallback={
            <DisplayMessage
              variant="danger"
              title="Failed to render profiles. Please try again."
            />
          }
        >
          <ProfileCard
            profile={profile}
            ImageComponent={NextImage}
            loadingType="eager"
            getImageUrlPath={apiUrlClient.getPictureUrl}
          />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}

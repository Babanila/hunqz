import { Suspense } from 'react';

import { getCachedProfile } from '../../features/profiles/cache/profile-cache';
import { ProfileContent } from '../../features/profiles/components/profile-content';
import { ProfileSearch } from '../../features/profiles/components/profile-search';
import { ProfileSkeleton } from '../../features/profiles/components/profile-skeleton';

export const revalidate = 300;

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata({ searchParams }: PageProps) {
  const { q = 'msescortplus' } = await searchParams;

  const { data } = await getCachedProfile(q);

  if (!data) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: `${data.name} | Hunqz`,
    description: data.headline ?? 'Profile information',
    openGraph: {
      title: data.name,
      description: data.headline ?? 'Profile information',
    },
  };
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const { q = 'msescortplus' } = await searchParams;

  return (
    <section className="mx-auto max-w-6xl p-6">
      <ProfileSearch defaultValue={q} />

      <Suspense key={q} fallback={<ProfileSkeleton />}>
        <ProfileContent username={q} />
      </Suspense>
    </section>
  );
}

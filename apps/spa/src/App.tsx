import { fetcher } from '@repo/shared';
import { DisplayMessage, Loading, ProfileCard, HtmlImage } from '@repo/ui';
import type { ProfileData } from '@repo/ui';
import { useEffect, useState } from 'react';

import { apiPathWithCors, apiUrlClient } from './lib/api-client';
import './App.css';

function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const url = `${apiPathWithCors}/msescortplus`;
        console.log("url", url);

        const data = await fetcher<ProfileData>(`${apiPathWithCors}/msescortplus`);

        setProfile(data);
      } catch (err) {
        console.error(err);

        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return <DisplayMessage variant="danger" title={error}/>;
  }

  if (!profile) {
    return <DisplayMessage title="No profile found"/>
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Profiles</h1>

      <ProfileCard
        profile={profile}
        ImageComponent={HtmlImage}
        loadingType="eager"
        getImageUrlPath={apiUrlClient.getPictureUrl}
      />
    </div>
  );
}

export default App;

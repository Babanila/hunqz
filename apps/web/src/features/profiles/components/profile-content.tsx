import { DisplayMessage, ErrorDisplay } from '@repo/ui';

import { getCachedProfile } from '../cache/profile-cache';

import { ProfileView } from './profile-view';

type ProfileContentProps = {
  username?: string;
};

export async function ProfileContent({ username }: ProfileContentProps) {
  if (!username || username.trim() === '') {
    return null;
  }

  const { data: profile, error } = await getCachedProfile(username);

  if (error) {
    if (error.status === 404) {
      return (
        <DisplayMessage
          title="Profile not found"
          description="No profile exists for this username."
        />
      );
    }

    return <ErrorDisplay error={error} />;
  }

  if (!profile || Object.keys(profile).length === 0) {
    return <DisplayMessage title="No profile found" />;
  }

  return <ProfileView profile={profile} />;
}

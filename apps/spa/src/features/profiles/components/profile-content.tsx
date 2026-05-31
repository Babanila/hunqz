import { DisplayMessage, HtmlImage, ProfileCard } from '@repo/ui';

import { apiUrlClient } from '../../../lib/api-client';
import { useProfile } from '../hooks/use-profile';

import { ProfileCardSkeleton } from './profile-card-skeleton';

type Props = {
  username: string;
};

export function ProfileContent({ username }: Props) {
  const { data, isLoading, error } = useProfile(username);

  if (!username.trim()) {
    return null;
  }

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return error.message.includes('404') ? (
      <DisplayMessage variant="info" title="Profile not found" />
    ) : (
      <DisplayMessage
        variant="danger"
        title={error instanceof Error ? error.message : 'Failed to load profile'}
      />
    );
  }

  if (!data) {
    return <DisplayMessage title="No profile found" />;
  }

  return (
    <ProfileCard
      profile={data}
      ImageComponent={HtmlImage}
      loadingType="eager"
      getImageUrlPath={apiUrlClient.getPictureUrl}
    />
  );
}

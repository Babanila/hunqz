import { ProfileCard, type ProfileData } from '@repo/ui';

import { NextImage } from '../../../components/next-image';
import { apiUrlClient } from '../../../lib/api-client';

type ProfileViewProps = {
  profile: ProfileData;
};

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <ProfileCard
      profile={profile}
      ImageComponent={NextImage}
      loadingType="eager"
      getImageUrlPath={apiUrlClient.getPictureUrl}
    />
  );
}

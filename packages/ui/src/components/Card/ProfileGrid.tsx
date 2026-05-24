import { ComponentType } from 'react';

import { LoadingType, ProfileData, SharedImageProps } from '../../types';

import { ProfileCard } from './ProfileCard';

export type ProfileGridProps = {
  profiles: ProfileData[];
  loadingType?: LoadingType;
  ImageComponent: ComponentType<SharedImageProps>;
  getImageUrlPath: (x: string) => string;
};

export const ProfileGrid = ({
  profiles,
  loadingType = 'lazy',
  ImageComponent,
  getImageUrlPath
}: ProfileGridProps) => {
  return (
    <div className="grid">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          loadingType={loadingType}
          ImageComponent={ImageComponent}
          getImageUrlPath={getImageUrlPath}
        />
      ))}
    </div>
  );
};

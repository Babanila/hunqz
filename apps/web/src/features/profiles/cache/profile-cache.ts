import { unstable_cache } from 'next/cache';

import { getProfile } from '../services/get-profile';

export const getCachedProfile = unstable_cache(
  async (username: string) => {
    return getProfile(username);
  },
  ['profiles'],
  {
    revalidate: 300,
    tags: ['profiles'],
  },
);

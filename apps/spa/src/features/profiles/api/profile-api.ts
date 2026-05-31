import { fetcher } from '@repo/shared';
import type { ProfileData } from '@repo/ui';

import { apiPathWithCors } from '../../../lib/api-client';

export async function fetchProfile(username: string, signal?: AbortSignal) {
  return fetcher<ProfileData>(`${apiPathWithCors}/${username}`, {
    signal,
  });
}

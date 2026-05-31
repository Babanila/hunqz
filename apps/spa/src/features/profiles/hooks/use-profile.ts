import { useQuery } from '@tanstack/react-query';

import { fetchProfile } from '../api/profile-api';
import { profileKeys } from '../query-keys';

export function useProfile(username: string) {
  return useQuery({
    queryKey: profileKeys.detail(username),
    queryFn: ({ signal }) => fetchProfile(username, signal),
    enabled: !!username.trim(),
  });
}

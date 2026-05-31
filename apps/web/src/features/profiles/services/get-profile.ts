import { fetcher, FetchError } from '@repo/shared/fetcher';
import { ProfileData } from '@repo/ui/server';

import { apiUrlClient } from '../../../lib/api-client';

export async function getProfile(id: string) {
  try {
    const profile = await fetcher<ProfileData>(apiUrlClient.getApiUrl(id), {
      next: { revalidate: 300, tags: ['hunqz-profiles'] },
    });

    return { data: profile, error: null };
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(`[${error.status}] ${error.url}:`, error.body);

      return {
        data: null,
        error: {
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          body: error.body,
        },
      };
    }

    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
        statusText: 'Internal Server Error',
      },
    };
  }
}

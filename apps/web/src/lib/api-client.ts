import { ApiClient } from '@repo/shared/index';

import { env } from '../env';

export const apiClient = new ApiClient({
  baseUrl: env.NEXT_PUBLIC_BASE_DOMAIN,
  apiPath: env.NEXT_PUBLIC_API_BASE_PATH,
  imgPath: env.NEXT_PUBLIC_API_IMAGE_PATH,
});

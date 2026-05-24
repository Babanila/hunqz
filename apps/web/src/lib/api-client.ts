import { createUrlBuilder } from '@repo/shared';

import { env } from '../env';

export const apiUrlClient = createUrlBuilder({
  baseUrl: env.NEXT_PUBLIC_BASE_DOMAIN,
  apiPath: env.NEXT_PUBLIC_API_BASE_PATH,
  imagePath: env.NEXT_PUBLIC_API_IMAGE_PATH,
});

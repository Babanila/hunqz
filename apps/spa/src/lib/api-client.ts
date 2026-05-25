import { createUrlBuilder } from '@repo/shared';

import { env } from '../env';

export const apiUrlClient = createUrlBuilder({
  baseUrl: env.VITE_BASE_DOMAIN,
  apiPath: env.VITE_API_BASE_PATH,
  imagePath: env.VITE_API_IMAGE_PATH,
});

export const apiPathWithCors = env.VITE_API_BASE_PATH;

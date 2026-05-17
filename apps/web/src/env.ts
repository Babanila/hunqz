import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_BASE_DOMAIN: z.string().url(),
  NEXT_PUBLIC_API_BASE_PATH: z.string().startsWith('/'),
  NEXT_PUBLIC_API_IMAGE_PATH: z.string().startsWith('/'),
});

export const env = envSchema.parse(process.env);

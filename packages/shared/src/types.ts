import z from 'zod';

export const PictureRatingSchema = z.enum(['NEUTRAL', 'EROTIC', 'APP_SAFE']);

export const PictureSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  url_token: z.string(),
  width: z.number(),
  height: z.number(),
  rating: PictureRatingSchema,
  comment: z.string().optional(),
  is_public: z.boolean(),
});

export type Picture = z.infer<typeof PictureSchema>;
export type PictureWithUrl<T extends Picture = Picture> = T & { url: string };
export interface UrlServiceConfig {
  baseUrl: string;
  apiPath: string;
  imagePath: string;
}

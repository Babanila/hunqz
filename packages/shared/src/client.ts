import axios, { AxiosInstance } from 'axios';

import { ProfileSchema } from './schema';
import type { Picture, Profile } from './types';

type ApiClientOptions = {
  baseUrl: string;
  apiPath: string;
  imgPath: string;
  timeout?: number;
};

export class ApiClient {
  private readonly client: AxiosInstance;
  private readonly imageBaseUrl: string;

  constructor({
    baseUrl,
    apiPath,
    imgPath,
    timeout = 10_000,
  }: ApiClientOptions) {
    const normalizedBaseDomain = baseUrl.replace(/\/+$/, '');
    const normalizedApiPath = apiPath.replace(/^\/?/, '/');
    const normalizedImagePath = imgPath.replace(/^\/?/, '/');

    this.imageBaseUrl = `${normalizedBaseDomain}${normalizedImagePath}`;
    this.client = axios.create({
      baseURL:`${normalizedBaseDomain}${normalizedApiPath}`,
      timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getPictureUrl(urlToken: string): string {
    const token = urlToken
      .replace(/^\/+/, '')
      .replace(/\.jpe?g$/i, '');

    return `${this.imageBaseUrl}/${token}.jpg`;
  }

  withPictureUrls(
    pictures: Picture[],
  ): Array<Picture & { url: string }> {
    return pictures.map((picture) => ({
      ...picture,
      url: this.getPictureUrl(picture.url_token),
    }));
  }

  async fetchProfile(id: string): Promise<Profile> {
    try {
      const response = await this.client.get(`/${id}`);

      return ProfileSchema.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        const message =
          error.response?.statusText ??
          error.message ??
          'Unknown network error';

        throw new Error(
          `Failed to fetch profile (${status ?? 'unknown'}): ${message}`,
        );
      }

      throw new Error(
        'Unexpected error occurred while fetching profile',
      );
    }
  }

  async fetchProfilePictures(id: string): Promise<Array<Picture & { url: string }>> {
    const profile = await this.fetchProfile(id);

    return this.withPictureUrls(profile.pictures);
  }
}

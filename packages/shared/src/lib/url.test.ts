import { describe, expect, it } from 'vitest';

import { Picture, UrlServiceConfig } from '../types';

import { createUrlBuilder } from './url';

const defaultConfig = {
  baseUrl: 'https://example.com',
  imagePath: '/img',
  apiPath: '/api',
};

const createConfig = (overrides: Partial<UrlServiceConfig>) => ({
  ...defaultConfig,
  ...overrides,
});

describe('createUrlBuilder', () => {
  it('throws when baseUrl is empty or whitespace only', () => {
    expect(() => createUrlBuilder(createConfig({ baseUrl: '   ' }))).toThrow(
      '[PictureUrlBuilder] "baseUrl" must be a non-empty string.',
    );
  });

  it('normalizes baseUrl, imagePath, and apiPath', () => {
    const builder = createUrlBuilder({
      baseUrl: 'https://cdn.example.com',
      imagePath: 'images/',
      apiPath: '/api/',
    } as UrlServiceConfig);

    expect(builder.imageBaseUrl).toBe('https://cdn.example.com/images');
    expect(builder.apiBaseUrl).toBe('https://cdn.example.com/api');
  });

  it('builds picture urls and normalizes the token', () => {
    const builder = createUrlBuilder({
      baseUrl: 'https://cdn.example.com',
      imagePath: '/images/',
      apiPath: '/api/',
    } as UrlServiceConfig);

    expect(builder.getPictureUrl('  /folder/photo.JPEG  ')).toBe(
      'https://cdn.example.com/images/folder/photo.jpg',
    );

    expect(builder.getPictureUrl('another/photo.jpeg')).toBe(
      'https://cdn.example.com/images/another/photo.jpg',
    );
  });

  it('throws when urlToken is empty', () => {
    const builder = createUrlBuilder({
      baseUrl: 'https://cdn.example.com',
      imagePath: '/images/',
      apiPath: '/api/',
    } as UrlServiceConfig);

    expect(() => builder.getPictureUrl('   ')).toThrow(
      '[getPictureUrl] "urlToken" must be a non-empty string.',
    );
  });

  it('builds api urls', () => {
    const builder = createUrlBuilder({
      baseUrl: 'https://cdn.example.com',
      imagePath: '/images',
      apiPath: '/api',
    } as UrlServiceConfig);

    expect(builder.getApiUrl()).toBe('https://cdn.example.com/api/');
    expect(builder.getApiUrl('/v1/pictures')).toBe('https://cdn.example.com/api/v1/pictures');
    expect(builder.getApiUrl('///v1/pictures')).toBe('https://cdn.example.com/api/v1/pictures');
  });

  it('adds urls to picture objects without mutating the originals', () => {
    const builder = createUrlBuilder({
      baseUrl: 'https://cdn.example.com/',
      imagePath: '/images/',
      apiPath: '/api/',
    } as UrlServiceConfig);

    const pictures = [
      {
        id: '1',
        owner_id: '41469841',
        url_token: '/folder/photo.jpeg',
        width: 366,
        height: 650,
        rating: 'NEUTRAL',
        comment: 'Adding a new caption123',
        is_public: true,
      },
      {
        id: '2',
        owner_id: '41469841',
        url_token: 'another/photo',
        width: 366,
        height: 650,
        rating: 'NEUTRAL',
        comment: 'Adding a new caption123',
        is_public: true,
      },
    ] as Picture[];

    const result = builder.withPictureUrls(pictures);

    expect(result).toEqual([
      {
        id: '1',
        owner_id: '41469841',
        url_token: '/folder/photo.jpeg',
        width: 366,
        height: 650,
        rating: 'NEUTRAL',
        comment: 'Adding a new caption123',
        is_public: true,
        url: 'https://cdn.example.com/images/folder/photo.jpg',
      },
      {
        id: '2',
        owner_id: '41469841',
        url_token: 'another/photo',
        width: 366,
        height: 650,
        rating: 'NEUTRAL',
        comment: 'Adding a new caption123',
        is_public: true,
        url: 'https://cdn.example.com/images/another/photo.jpg',
      },
    ]);

    expect(result).not.toBe(pictures);
    expect(result[0]).not.toBe(pictures[0]);
    expect(pictures[0]).not.toHaveProperty('url');
  });
});

import type { Picture, PictureWithUrl, UrlServiceConfig } from '../types';

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

function normalizePath(path?: string): string {
  if (!path) return '';
  return path.replace(/^\/?/, '/').replace(/\/+$/, '');
}

function buildUrl(baseUrl: string, path?: string): string {
  return `${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`;
}

function normalizeToken(urlToken: string): string {
  return urlToken
    .trim()
    .replace(/^\/+/, '')
    .replace(/\.jpe?g$/i, '');
}

export function createUrlBuilder(config: UrlServiceConfig) {
  if (!config.baseUrl || !config.baseUrl.trim()) {
    throw new Error('[PictureUrlBuilder] "baseUrl" must be a non-empty string.');
  }

  const imageBaseUrl = buildUrl(config.baseUrl, config.imagePath);
  const apiBaseUrl = buildUrl(config.baseUrl, config.apiPath);

  function getPictureUrl(urlToken: string): string {
    if (!urlToken || !urlToken.trim()) {
      throw new Error('[getPictureUrl] "urlToken" must be a non-empty string.');
    }

    return `${imageBaseUrl}/${normalizeToken(urlToken)}.jpg`;
  }

  function getApiUrl(endpoint = ''): string {
    const normalizedEndpoint = endpoint ? endpoint.replace(/^\/+/, '') : '';

    return `${apiBaseUrl}/${normalizedEndpoint}`;
  }

  function withPictureUrls<T extends Picture>(pictures: readonly T[]): PictureWithUrl<T>[] {
    return pictures.map((picture) => ({
      ...picture,
      url: getPictureUrl(picture.url_token),
    }));
  }

  return {
    apiBaseUrl,
    imageBaseUrl,
    getApiUrl,
    getPictureUrl,
    withPictureUrls,
  } as const;
}

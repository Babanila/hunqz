import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FetchError, fetcher } from './fetcher';

describe('fetcher', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('returns parsed JSON when the request succeeds', async () => {
    const data = { id: 1, name: 'John' };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(data),
    });

    const result = await fetcher<typeof data>('https://api.example.com/users/1');

    expect(result).toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/users/1',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  });

  it('merges custom headers with the default content-type header', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ success: true }),
    });

    await fetcher('https://api.example.com/users', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
      },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        },
      }),
    );
  });

  it('throws FetchError with JSON error body when response is not ok', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: vi.fn().mockResolvedValueOnce({ message: 'User not found' }),
      text: vi.fn(),
    });

    try {
      await fetcher('https://api.example.com/users/999');
      throw new Error('Expected fetcher to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);

      const err = error as FetchError;
      expect(err.message).toBe('Fetch failed: 404 Not Found');
      expect(err.status).toBe(404);
      expect(err.statusText).toBe('Not Found');
      expect(err.url).toBe('https://api.example.com/users/999');
      expect(err.body).toEqual({ message: 'User not found' });
      expect(err.name).toBe('FetchError');
    }
  });

  it('falls back to response text when response.json() fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      text: vi.fn().mockResolvedValueOnce('Something went wrong'),
    });

    try {
      await fetcher('https://api.example.com/users');
      throw new Error('Expected fetcher to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);

      const err = error as FetchError;
      expect(err.status).toBe(500);
      expect(err.body).toBe('Something went wrong');
    }
  });

  it('throws when the url is not ok and text() also fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 502,
      statusText: 'Bad Gateway',
      json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      text: vi.fn().mockRejectedValueOnce(new Error('Text failed')),
    });

    try {
      await fetcher('https://api.example.com/users');
      throw new Error('Expected fetcher to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);

      const err = error as FetchError;
      expect(err.body).toBeNull();
    }
  });
});

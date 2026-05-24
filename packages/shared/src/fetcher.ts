export type FetchOptions = RequestInit & {
  next?: { revalidate?: number; tags?: string[]; cache?: RequestCache };
};

export class FetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export async function fetcher<T>(url: string, options?: FetchOptions): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let errorBody: unknown;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = await res.text().catch(() => null);
    }

    throw new FetchError(
      `Fetch failed: ${res.status} ${res.statusText}`,
      res.status,
      res.statusText,
      url,
      errorBody,
    );
  }

  return res.json();
}

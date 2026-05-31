'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            Something went wrong
          </h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorDisplay({
  error,
}: {
  error: { message: string; status?: number; statusText?: string };
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="w-full">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Unable to Load Profiles
          </h1>

          <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error Details
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error.message}</p>
                  {error.status && error.statusText && (
                    <p className="mt-2 text-xs opacity-80">
                      Status: {error.status} {error.statusText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              We're having trouble loading the profiles. Please try again in a few minutes.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Go Home
              </a>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

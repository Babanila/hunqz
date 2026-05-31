import { DisplayMessage } from '@repo/ui';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <DisplayMessage
      variant="danger"
      title="Something went wrong"
      description="Please try again."
      action={
        <button onClick={resetErrorBoundary} className="rounded-md border px-4 py-2">
          Retry
        </button>
      }
    />
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('React Error Boundary', error, info);
        // Send to Sentry, Datadog, New Relic, etc.
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

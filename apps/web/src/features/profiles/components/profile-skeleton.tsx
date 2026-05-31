export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 rounded-xl bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
    </div>
  );
}

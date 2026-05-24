export function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="w-full space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg bg-gray-200 p-4 dark:bg-gray-700">
              <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
            </div>
          ))}
        </div>
    </div>
  );
}

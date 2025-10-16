export function LoadingSkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-live="polite" aria-label="Loading">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-live="polite" aria-label="Loading chart">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    </div>
  );
}


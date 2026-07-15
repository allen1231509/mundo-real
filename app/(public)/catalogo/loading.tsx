import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>

      <Skeleton className="mb-8 h-10 w-full max-w-md" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

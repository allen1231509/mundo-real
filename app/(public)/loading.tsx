import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="aspect-4/3 w-full rounded-3xl" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

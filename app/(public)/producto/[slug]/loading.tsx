import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Skeleton className="mb-6 h-5 w-40" />
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-11 w-48" />
        </div>
      </div>
    </div>
  );
}

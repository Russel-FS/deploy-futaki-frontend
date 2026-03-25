import { cn } from "@/shared/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-system-gray-6", className)}
    />
  );
};

export const TableRowSkeleton = ({
  columns,
  rows = 5,
}: {
  columns: number;
  rows?: number;
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border/5">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="px-8 py-4">
              <Skeleton
                className={cn(
                  "h-4",
                  j === 0
                    ? "w-40"
                    : j === columns - 1
                      ? "w-16 ml-auto"
                      : "w-24",
                )}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

/** Product-specific skeleton row (thumbnail + name + category + price + stock + actions) */
export const ProductRowSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border/5">
          {/* Product cell */}
          <td className="px-8 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          </td>
          {/* Category */}
          <td className="px-8 py-4">
            <Skeleton className="h-5 w-20 rounded-full" />
          </td>
          {/* Price */}
          <td className="px-8 py-4 text-right">
            <Skeleton className="h-4 w-16 ml-auto" />
          </td>
          {/* Stock */}
          <td className="px-8 py-4">
            <Skeleton className="h-4 w-12" />
          </td>
          {/* Actions */}
          <td className="px-8 py-4">
            <Skeleton className="h-4 w-14 ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
};

/** Category-specific skeleton row (image + name + description + actions) */
export const CategoryRowSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border/5">
          {/* Image */}
          <td className="px-8 py-4">
            <Skeleton className="h-10 w-14 rounded-xl" />
          </td>
          {/* Name */}
          <td className="px-8 py-4">
            <Skeleton className="h-4 w-32" />
          </td>
          {/* Description */}
          <td className="px-8 py-4">
            <Skeleton className="h-3.5 w-64" />
          </td>
          {/* Actions */}
          <td className="px-8 py-4">
            <Skeleton className="h-4 w-14 ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
};

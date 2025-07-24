import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circular" | "rectangular";
  size?: "sm" | "md" | "lg" | "xl";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      width,
      height,
      animation = "pulse",
      ...props
    },
    ref
  ) => {
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-4";
        case "md":
          return "h-6";
        case "lg":
          return "h-8";
        case "xl":
          return "h-12";
        default:
          return "h-6";
      }
    };

    const getVariantClasses = () => {
      switch (variant) {
        case "text":
          return "rounded";
        case "circular":
          return "rounded-full";
        case "rectangular":
          return "rounded-md";
        default:
          return "rounded-md";
      }
    };

    const getAnimationClasses = () => {
      switch (animation) {
        case "pulse":
          return "animate-pulse";
        case "wave":
          return "animate-pulse";
        case "none":
          return "";
        default:
          return "animate-pulse";
      }
    };

    const style: React.CSSProperties = {
      width: width,
      height: height,
    };

    return (
      <div
        className={cn(
          "bg-muted",
          getSizeClasses(),
          getVariantClasses(),
          getAnimationClasses(),
          className
        )}
        style={style}
        ref={ref}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Predefined skeleton components for common use cases
export const SkeletonText = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant">
>(({ className, ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="text"
    className={cn("w-full", className)}
    {...props}
  />
));
SkeletonText.displayName = "SkeletonText";

export const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant">
>(({ className, size = "md", ...props }, ref) => (
  <Skeleton
    ref={ref}
    variant="circular"
    size={size}
    className={cn("aspect-square", className)}
    {...props}
  />
));
SkeletonAvatar.displayName = "SkeletonAvatar";

export const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card space-y-4 rounded-lg border p-6", className)}
    {...props}
  >
    <div className="flex items-center space-x-4">
      <SkeletonAvatar size="md" />
      <div className="flex-1 space-y-2">
        <SkeletonText className="h-4 w-3/4" />
        <SkeletonText className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonText className="h-4 w-full" />
      <SkeletonText className="h-4 w-5/6" />
      <SkeletonText className="h-4 w-4/6" />
    </div>
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

export const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant"> & {
    rows?: number;
    columns?: number;
  }
>(({ className, rows = 5, columns = 4, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {/* Header */}
    <div className="flex space-x-2">
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonText key={`header-${index}`} className="h-6 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex space-x-2">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonText
            key={`cell-${rowIndex}-${colIndex}`}
            className="h-4 flex-1"
          />
        ))}
      </div>
    ))}
  </div>
));
SkeletonTable.displayName = "SkeletonTable";

export const SkeletonList = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "variant"> & {
    items?: number;
  }
>(({ className, items = 3, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-3", className)} {...props}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        <SkeletonAvatar size="sm" />
        <div className="flex-1 space-y-2">
          <SkeletonText className="h-4 w-3/4" />
          <SkeletonText className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
));
SkeletonList.displayName = "SkeletonList";

export { Skeleton };

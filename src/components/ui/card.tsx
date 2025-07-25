import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import { CloseRoundedIcon, DragHandleDotsIcon } from "./icons";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-200 bg-neutral-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    const isDragging = false;
    return (
      <div
        ref={ref}
        className={cn("border-b border-neutral-200 px-3 py-3.5", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isDragging && (
                <button className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px]">
                  <DragHandleDotsIcon />
                </button>
              )}
              <Typography variant="body-01" className="text-text-primary">
                {title}
              </Typography>
            </div>
            {subtitle && (
              <Typography variant="body-02" className="mt-1 text-neutral-400">
                {subtitle}
              </Typography>
            )}
          </div>
          {isDragging && (
            <button className="rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 text-[13px]">
              <CloseRoundedIcon className="size-5" />
            </button>
          )}
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, padding = "md", ...props }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    };

    return (
      <div
        ref={ref}
        className={cn(paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-t border-neutral-200 px-3 py-3.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };

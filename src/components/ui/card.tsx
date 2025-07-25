import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import { CloseRoundedIcon, DragHandleDotsIcon } from "./icons";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cardId?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  cardId?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, cardId, ...props }, ref) => {
    const { isEditMode } = useDashboardLayout();

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-neutral-200 bg-neutral-50 transition-all duration-200",
          isEditMode && "cursor-move hover:border-blue-300 hover:shadow-lg",
          className
        )}
        data-draggable={isEditMode}
        data-card-id={cardId}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, cardId, ...props }, ref) => {
    const { isEditMode, deleteCard } = useDashboardLayout();

    const handleDelete = () => {
      if (cardId) {
        deleteCard(cardId);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("border-b border-neutral-200 px-3 py-3.5", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {isEditMode && (
                <button
                  className="cursor-grab rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px] transition-colors hover:bg-neutral-100 active:cursor-grabbing"
                  onMouseDown={(e) => e.stopPropagation()}
                >
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
          <div className="flex items-center gap-2">
            {action && <div className="flex items-center gap-2">{action}</div>}
            {isEditMode && (
              <button
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 text-[13px] transition-colors hover:border-red-200 hover:bg-red-50"
                onClick={handleDelete}
                title="Delete card"
              >
                <CloseRoundedIcon className="size-5 text-red-500" />
              </button>
            )}
          </div>
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

import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import { CloseRoundedIcon, DragHandleDotsIcon } from "./icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDashboardLayout } from "@/contexts/DashboardLayoutContext";

const CardDragContext = React.createContext<{
  attributes?: Record<string, any>;
  listeners?: Record<string, any>;
} | null>(null);

const useCardDrag = () => {
  const context = React.useContext(CardDragContext);
  return context || { attributes: {}, listeners: {} };
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cardId?: string;
  rowId?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  cardId?: string;
  rowId?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, cardId, rowId: _rowId, ...props }, ref) => {
    const { state } = useDashboardLayout();

    // Only make draggable if we have cardId and are in edit mode
    const shouldBeDraggable = cardId && state.isEditMode;

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: cardId || "default",
      disabled: !shouldBeDraggable,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const combinedRef = (node: HTMLDivElement) => {
      setNodeRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <CardDragContext.Provider value={{ attributes, listeners }}>
        <div
          ref={combinedRef}
          className={cn(
            "rounded-lg border border-neutral-200 bg-neutral-50",
            className
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      </CardDragContext.Provider>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    { className, title, subtitle, action, children, cardId, rowId, ...props },
    ref
  ) => {
    const { state, deleteCard } = useDashboardLayout();
    const { attributes, listeners } = useCardDrag();

    const handleDelete = () => {
      if (cardId && rowId) {
        deleteCard(cardId, rowId);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("border-b border-neutral-200 px-3 py-3.5", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              {state.isEditMode && (
                <button
                  className="cursor-grab rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px] active:cursor-grabbing"
                  {...attributes}
                  {...listeners}
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
            {state.isEditMode && cardId && rowId && (
              <button
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 text-[13px] hover:border-red-200 hover:bg-red-50"
                onClick={handleDelete}
              >
                <CloseRoundedIcon className="size-5" />
              </button>
            )}
            {action && <div>{action}</div>}
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

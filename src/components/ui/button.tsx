import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "icon"
  | "navigation"
  | "pagination"
  | "danger"
  | "ghost";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const BUTTON_STYLES: Record<
  ButtonVariant,
  {
    base: string;
    sizes: Record<ButtonSize, string>;
  }
> = {
  primary: {
    base: "rounded-lg border border-neutral-200 bg-neutral-50 text-[13px] transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "px-2 py-1",
      sm: "px-2.5 py-1.5",
      md: "px-3 py-2",
      lg: "px-4 py-3",
    },
  },
  secondary: {
    base: "rounded-lg border border-neutral-200 bg-white text-[13px] transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "px-2 py-1",
      sm: "px-2.5 py-1.5",
      md: "px-3 py-2",
      lg: "px-4 py-3",
    },
  },
  icon: {
    base: "text-text-primary cursor-pointer rounded-lg transition-colors hover:bg-neutral-500 hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "p-3",
    },
  },
  navigation: {
    base: "text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 text-[13px] transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "px-3 py-2",
    },
  },
  pagination: {
    base: "rounded transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "px-1.5 py-0.5 text-xs",
      sm: "px-2 py-1 text-sm",
      md: "px-2.5 py-1.5 text-[13px]",
      lg: "px-3 py-2 text-[13px]",
    },
  },
  danger: {
    base: "rounded-lg border border-neutral-200 bg-neutral-50 text-[13px] transition-colors hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "px-3 py-2",
    },
  },
  ghost: {
    base: "text-text-primary flex items-center gap-3 rounded-md border border-neutral-200 text-[13px] transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    sizes: {
      xs: "px-1.5 py-1",
      sm: "px-2 py-1.5",
      md: "px-2 py-2",
      lg: "px-3 py-2.5",
    },
  },
};

const PAGINATION_ACTIVE_STYLES = "bg-primary text-primary-foreground";
const PAGINATION_INACTIVE_STYLES = "text-text-primary hover:bg-neutral-100";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  asChild,
  ...props
}) => {
  const styleConfig = BUTTON_STYLES[variant];
  const baseClasses = styleConfig.base;
  const sizeClasses = styleConfig.sizes[size];

  // Special handling for pagination variant with active/inactive states
  if (variant === "pagination") {
    // For pagination, we'll add data attributes to handle active state
    // The consuming code should add the appropriate active classes
    const paginationClasses = cn(
      baseClasses,
      sizeClasses,
      PAGINATION_INACTIVE_STYLES,
      className
    );

    return (
      <button className={paginationClasses} {...props}>
        {children}
      </button>
    );
  }

  const finalClasses = cn(baseClasses, sizeClasses, className);

  if (asChild) {
    // This would typically require a Slot component from Radix UI
    // For now, we'll just render the button normally
    return (
      <button className={finalClasses} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};

// Helper function for pagination active state
export const getPaginationActiveClasses = () => PAGINATION_ACTIVE_STYLES;
export const getPaginationInactiveClasses = () => PAGINATION_INACTIVE_STYLES;

export default Button;

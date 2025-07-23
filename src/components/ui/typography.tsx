import React from "react";
import { cn } from "@/lib/utils";

// Typography Variants
export type TypographyVariant =
  | "display"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body"
  | "caption"
  | "caption-small";

// Typography Props
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

// Complete typography styles mapping object
const TYPOGRAPHY_STYLES: Record<
  TypographyVariant,
  {
    element: React.ElementType;
    classes: string;
  }
> = {
  display: {
    element: "h1",
    classes: "font-geist text-3xl",
  },
  "heading-1": {
    element: "h1",
    classes: "font-inter text-2xl",
  },
  "heading-2": {
    element: "h1",
    classes: "font-inter text-xl",
  },
  "heading-3": {
    element: "h1",
    classes: "font-inter text-lg",
  },
  body: {
    element: "p",
    classes: "font-geist text-base",
  },
  caption: {
    element: "span",
    classes: "font-geist text-sm",
  },
  "caption-small": {
    element: "span",
    classes: "font-geist text-xs",
  },
};

// Typography Component
export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  as,
  children,
  className,
  ...props
}) => {
  const style = TYPOGRAPHY_STYLES[variant];
  const Element = as || style.element;

  return (
    <Element
      className={cn("leading-tight", style.classes, className)}
      {...props}
    >
      {children}
    </Element>
  );
};

export const Display: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="display" {...props} />
);

export const Heading1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="heading-1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="heading-2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="heading-3" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="caption" {...props} />
);

export const CaptionSmall: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="caption-small" {...props} />;

export default Typography;

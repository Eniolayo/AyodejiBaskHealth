import React from "react";
import { cn } from "@/lib/utils";

export type TypographyVariant =
  | "heading-01"
  | "heading-02"
  | "heading-03"
  | "heading-04"
  | "body-01"
  | "body-02"
  | "body-03";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const TYPOGRAPHY_STYLES: Record<
  TypographyVariant,
  {
    element: React.ElementType;
    classes: string;
    styles: React.CSSProperties;
  }
> = {
  "heading-01": {
    element: "h1",
    classes: "font-geist font-normal",
    styles: {
      fontSize: "39px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "heading-02": {
    element: "h2",
    classes: "font-inter font-normal",
    styles: {
      fontSize: "31px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "heading-03": {
    element: "h3",
    classes: "font-inter font-normal",
    styles: {
      fontSize: "25px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "heading-04": {
    element: "h4",
    classes: "font-inter font-normal",
    styles: {
      fontSize: "20px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "body-01": {
    element: "p",
    classes: "font-geist font-normal",
    styles: {
      fontSize: "16px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "body-02": {
    element: "p",
    classes: "font-geist font-normal",
    styles: {
      fontSize: "13px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
  "body-03": {
    element: "p",
    classes: "font-geist font-normal",
    styles: {
      fontSize: "10px",
      lineHeight: "120%",
      letterSpacing: "0%",
    },
  },
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body-01",
  as,
  children,
  className,
  style,
  ...props
}) => {
  const styleConfig = TYPOGRAPHY_STYLES[variant];
  const Element = as || styleConfig.element;

  return (
    <Element
      className={cn(styleConfig.classes, className)}
      style={{ ...styleConfig.styles, ...style }}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography;

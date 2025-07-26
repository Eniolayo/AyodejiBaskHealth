import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders with default props", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("renders with custom className", () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("custom-skeleton");
  });

  it("renders with custom width", () => {
    render(<Skeleton className="w-32" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("w-32");
  });

  it("renders with custom height", () => {
    render(<Skeleton className="h-8" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-8");
  });

  it("renders with custom dimensions", () => {
    render(<Skeleton className="h-16 w-64" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("w-64", "h-16");
  });

  it("renders with rounded corners", () => {
    render(<Skeleton className="rounded-full" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("renders with custom background color", () => {
    render(<Skeleton className="bg-gray-300" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("bg-gray-300");
  });

  it("renders with animation", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("renders with multiple custom classes", () => {
    render(
      <Skeleton
        className="h-12 w-48 rounded-lg bg-blue-200"
        data-testid="skeleton"
      />
    );

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("w-48", "h-12", "rounded-lg", "bg-blue-200");
  });

  it("renders with no additional classes", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("renders with custom data attributes", () => {
    render(<Skeleton data-testid="custom-skeleton" />);

    const skeleton = screen.getByTestId("custom-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with aria attributes", () => {
    render(<Skeleton aria-label="Loading content" />);

    const skeleton = screen.getByLabelText("Loading content");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with role attribute", () => {
    render(<Skeleton role="status" />);

    const skeleton = screen.getByRole("status");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders without children (self-closing)", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.children).toHaveLength(0);
  });

  it("renders with different variants", () => {
    const { rerender } = render(
      <Skeleton variant="text" data-testid="skeleton" />
    );
    let skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded");

    rerender(<Skeleton variant="circular" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-full");

    rerender(<Skeleton variant="rectangular" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Skeleton size="sm" data-testid="skeleton" />);
    let skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-4");

    rerender(<Skeleton size="md" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-6");

    rerender(<Skeleton size="lg" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-8");

    rerender(<Skeleton size="xl" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-12");
  });

  it("renders with different animations", () => {
    const { rerender } = render(
      <Skeleton animation="pulse" data-testid="skeleton" />
    );
    let skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");

    rerender(<Skeleton animation="wave" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse");

    rerender(<Skeleton animation="none" data-testid="skeleton" />);
    skeleton = screen.getByTestId("skeleton");
    expect(skeleton).not.toHaveClass("animate-pulse");
  });

  it("renders with custom width and height props", () => {
    render(<Skeleton width="200px" height="100px" data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ width: "200px", height: "100px" });
  });

  it("renders with numeric width and height props", () => {
    render(<Skeleton width={200} height={100} data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveStyle({ width: "200px", height: "100px" });
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} data-testid="skeleton" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards additional props", () => {
    render(<Skeleton id="test-skeleton" data-custom="value" />);

    const skeleton = document.querySelector('[id="test-skeleton"]');
    expect(skeleton).toHaveAttribute("id", "test-skeleton");
    expect(skeleton).toHaveAttribute("data-custom", "value");
  });
});

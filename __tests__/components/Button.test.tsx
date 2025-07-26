import { render, screen, fireEvent } from "@testing-library/react";
import {
  Button,
  getPaginationActiveClasses,
  getPaginationInactiveClasses,
} from "@/components/ui/button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Button>Default Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Default Button");
    });

    it("should render with primary variant by default", () => {
      render(<Button>Primary Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("border-neutral-200");
      expect(button.className).toContain("bg-neutral-50");
      expect(button.className).toContain("rounded-lg");
    });

    it("should render with secondary variant", () => {
      render(<Button variant="secondary">Secondary Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-white");
      expect(button.className).toContain("border-neutral-200");
    });

    it("should render with icon variant", () => {
      render(<Button variant="icon">Icon</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("text-text-primary");
      expect(button.className).toContain("cursor-pointer");
      expect(button.className).toContain("hover:bg-neutral-500");
    });

    it("should render with navigation variant", () => {
      render(<Button variant="navigation">Nav Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("flex");
      expect(button.className).toContain("items-center");
      expect(button.className).toContain("gap-2");
    });

    it("should render with pagination variant", () => {
      render(<Button variant="pagination">1</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("rounded");
      expect(button.className).toContain("text-text-primary");
      expect(button.className).toContain("hover:bg-neutral-100");
    });

    it("should render with danger variant", () => {
      render(<Button variant="danger">Delete</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("hover:border-red-200");
      expect(button.className).toContain("hover:bg-red-50");
    });

    it("should render with ghost variant", () => {
      render(<Button variant="ghost">Ghost Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("border-neutral-200");
      expect(button.className).toContain("hover:bg-neutral-200");
    });
  });

  describe("Sizes", () => {
    it("should render with xs size", () => {
      render(<Button size="xs">XS Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("px-2");
      expect(button.className).toContain("py-1");
    });

    it("should render with sm size", () => {
      render(<Button size="sm">SM Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("px-2.5");
      expect(button.className).toContain("py-1.5");
    });

    it("should render with md size by default", () => {
      render(<Button>MD Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("px-3");
      expect(button.className).toContain("py-2");
    });

    it("should render with lg size", () => {
      render(<Button size="lg">LG Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("px-4");
      expect(button.className).toContain("py-3");
    });
  });

  describe("States", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button.className).toContain("disabled:cursor-not-allowed");
      expect(button.className).toContain("disabled:opacity-50");
    });

    it("should handle click events", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable Button</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Custom styling", () => {
    it("should accept custom className", () => {
      render(<Button className="custom-class">Custom Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
    });

    it("should forward additional props", () => {
      render(
        <Button data-testid="custom-button" type="submit">
          Submit Button
        </Button>
      );

      const button = screen.getByTestId("custom-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Helper functions", () => {
    it("should provide pagination active classes", () => {
      const activeClasses = getPaginationActiveClasses();
      expect(activeClasses).toBe("bg-primary text-primary-foreground");
    });

    it("should provide pagination inactive classes", () => {
      const inactiveClasses = getPaginationInactiveClasses();
      expect(inactiveClasses).toBe("text-text-primary hover:bg-neutral-100");
    });
  });

  describe("Accessibility", () => {
    it("should have proper focus styles", () => {
      render(<Button>Focus Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("focus:outline-none");
      expect(button.className).toContain("focus:ring-2");
      expect(button.className).toContain("focus:ring-neutral-200");
    });

    it("should be keyboard navigable", () => {
      render(<Button>Keyboard Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(document.activeElement).toBe(button);
    });
  });
});

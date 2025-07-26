import { render, screen } from "@testing-library/react";
import Typography from "@/components/ui/typography";

describe("Typography Component", () => {
  it("renders with default variant and element", () => {
    render(<Typography>Test content</Typography>);

    const element = screen.getByText("Test content");
    expect(element).toBeDefined();
    expect(element.tagName.toLowerCase()).toBe("p"); // Default element for body-01
  });

  it("renders with specified variant", () => {
    render(<Typography variant="heading-01">Main heading</Typography>);

    const heading = screen.getByText("Main heading");
    expect(heading).toBeDefined();
    expect(heading.tagName.toLowerCase()).toBe("h1");
  });

  it("renders with custom element via as prop", () => {
    render(
      <Typography variant="body-01" as="span">
        Span content
      </Typography>
    );

    const span = screen.getByText("Span content");
    expect(span).toBeDefined();
    expect(span.tagName.toLowerCase()).toBe("span");
  });

  it("applies custom className", () => {
    render(
      <Typography className="custom-class">Custom styled text</Typography>
    );

    const element = screen.getByText("Custom styled text");
    expect(element.className).toContain("custom-class");
  });

  it("forwards additional props", () => {
    render(
      <Typography data-testid="typography-element" role="banner">
        Accessible content
      </Typography>
    );

    const element = screen.getByTestId("typography-element");
    expect(element).toBeDefined();
    expect(element.getAttribute("role")).toBe("banner");
  });

  describe("Typography variants", () => {
    const variants = [
      { variant: "heading-01", expectedTag: "h1" },
      { variant: "heading-02", expectedTag: "h2" },
      { variant: "heading-03", expectedTag: "h3" },
      { variant: "heading-04", expectedTag: "h4" },
      { variant: "body-01", expectedTag: "p" },
      { variant: "body-02", expectedTag: "p" },
      { variant: "body-03", expectedTag: "p" },
    ] as const;

    it.each(variants)(
      "renders $variant with correct element",
      ({ variant, expectedTag }) => {
        render(<Typography variant={variant}>Test content</Typography>);

        const element = screen.getByText("Test content");
        expect(element.tagName.toLowerCase()).toBe(expectedTag);
      }
    );
  });
});

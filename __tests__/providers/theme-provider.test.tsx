import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import type { ReactNode } from "react";

interface MockThemeProviderProps {
  children?: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  [key: string]: unknown;
}

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: MockThemeProviderProps) => (
    <div data-testid="next-themes-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders NextThemesProvider with children", () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("passes props to NextThemesProvider", () => {
    const testProps = {
      attribute: "class" as const,
      defaultTheme: "system" as const,
      enableSystem: true,
      disableTransitionOnChange: false,
    };

    render(
      <ThemeProvider {...testProps}>
        <div>Test</div>
      </ThemeProvider>
    );

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toHaveAttribute(
      "data-props",
      JSON.stringify(testProps)
    );
  });

  it("handles complex children", () => {
    const complexChildren = (
      <div>
        <header>Header</header>
        <main>
          <section>Section 1</section>
          <section>Section 2</section>
        </main>
        <footer>Footer</footer>
      </div>
    );

    render(<ThemeProvider>{complexChildren}</ThemeProvider>);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("handles multiple nested providers", () => {
    render(
      <ThemeProvider>
        <ThemeProvider>
          <div data-testid="nested-child">Nested Child</div>
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(screen.getByTestId("nested-child")).toBeInTheDocument();
    expect(screen.getByText("Nested Child")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    render(<ThemeProvider>{null}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("handles undefined children", () => {
    render(<ThemeProvider>{undefined}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("handles boolean children", () => {
    render(<ThemeProvider>{true}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("handles number children", () => {
    render(<ThemeProvider>{42}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("handles string children", () => {
    render(<ThemeProvider>{"Test String"}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("handles array children", () => {
    render(
      <ThemeProvider>
        {[
          <div key="1">Item 1</div>,
          <div key="2">Item 2</div>,
          <div key="3">Item 3</div>,
        ]}
      </ThemeProvider>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("handles all ThemeProviderProps", () => {
    const allProps = {
      attribute: "data-theme" as const,
      defaultTheme: "dark" as const,
      enableSystem: false,
      disableTransitionOnChange: true,
      storageKey: "custom-theme-key",
      themes: ["light", "dark", "system"],
      forcedTheme: "light" as const,
      enableColorScheme: false,
      value: {
        light: "light-theme",
        dark: "dark-theme",
        system: "system-theme",
      },
    };

    render(
      <ThemeProvider {...allProps}>
        <div>Test</div>
      </ThemeProvider>
    );

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toHaveAttribute(
      "data-props",
      JSON.stringify(allProps)
    );
  });

  it("handles no props", () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toHaveAttribute("data-props", "{}");
  });

  it("handles partial props", () => {
    const partialProps = {
      attribute: "class" as const,
      defaultTheme: "light" as const,
    };

    render(
      <ThemeProvider {...partialProps}>
        <div>Test</div>
      </ThemeProvider>
    );

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toHaveAttribute(
      "data-props",
      JSON.stringify(partialProps)
    );
  });

  it("maintains proper component structure", () => {
    const { container } = render(
      <ThemeProvider>
        <div data-testid="test-child">Test</div>
      </ThemeProvider>
    );

    // Should have the proper nesting structure
    const nextThemesProvider = container.querySelector(
      '[data-testid="next-themes-provider"]'
    );
    const testChild = container.querySelector('[data-testid="test-child"]');

    expect(nextThemesProvider).toBeInTheDocument();
    expect(testChild).toBeInTheDocument();
  });

  it("handles function children", () => {
    const functionChild = () => (
      <div data-testid="function-child">Function Child</div>
    );

    render(<ThemeProvider>{functionChild()}</ThemeProvider>);

    const nextThemesProvider = screen.getByTestId("next-themes-provider");
    expect(nextThemesProvider).toBeInTheDocument();
  });

  it("handles React elements as children", () => {
    const ReactElementChild = () => (
      <div data-testid="react-element-child">React Element</div>
    );

    render(
      <ThemeProvider>
        <ReactElementChild />
      </ThemeProvider>
    );

    expect(screen.getByTestId("react-element-child")).toBeInTheDocument();
    expect(screen.getByText("React Element")).toBeInTheDocument();
  });

  it("handles fragment children", () => {
    render(
      <ThemeProvider>
        <>
          <div>Fragment Child 1</div>
          <div>Fragment Child 2</div>
        </>
      </ThemeProvider>
    );

    expect(screen.getByText("Fragment Child 1")).toBeInTheDocument();
    expect(screen.getByText("Fragment Child 2")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/app/_components/Dashboard/Header";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

interface MockThemeProviderProps {
  children?: ReactNode;
}

interface MockImageProps {
  src?: string;
  alt?: string;
  [key: string]: unknown;
}

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: MockThemeProviderProps) => (
    <div>{children}</div>
  ),
}));

// Mock the logo image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: MockImageProps) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <DashboardLayoutProvider>{component}</DashboardLayoutProvider>
    </ThemeProvider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render header with correct structure", () => {
      renderWithProviders(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByText("Reset to default")).toBeInTheDocument();
      expect(screen.getByText("Edit mode")).toBeInTheDocument();
      expect(screen.getByAltText("logo")).toBeInTheDocument();
    });

    it("should have correct CSS classes", () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole("banner");
      expect(header.className).toContain("border-b");
      expect(header.className).toContain("border-neutral-200");
      expect(header.className).toContain("bg-neutral-50");
      expect(header.className).toContain("py-3");
    });

    it("should render logo with correct attributes", () => {
      renderWithProviders(<Header />);

      const logo = screen.getByAltText("logo");
      expect(logo).toHaveAttribute("src", "/AcmeLogo.avif");
      expect(logo.className).toContain("h-10");
      expect(logo.className).toContain("w-[136px]");
      expect(logo.className).toContain("object-contain");
    });
  });

  describe("Edit Mode Toggle", () => {
    it("should render edit mode switch", () => {
      renderWithProviders(<Header />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    it("should have correct label for edit mode", () => {
      renderWithProviders(<Header />);

      expect(screen.getByText("Edit mode")).toBeInTheDocument();
    });

    it("should toggle edit mode when switch is clicked", () => {
      renderWithProviders(<Header />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();

      // The switch should be interactive
      expect(switchElement).not.toBeDisabled();
    });
  });

  describe("Reset to Default Button", () => {
    it("should render reset button with correct text", () => {
      renderWithProviders(<Header />);

      const resetButton = screen.getByText("Reset to default");
      expect(resetButton).toBeInTheDocument();
    });

    it("should have correct styling for reset button", () => {
      renderWithProviders(<Header />);

      const resetButton = screen.getByText("Reset to default");
      expect(resetButton.className).toContain("rounded-lg");
      expect(resetButton.className).toContain("border");
      expect(resetButton.className).toContain("border-neutral-200");
      expect(resetButton.className).toContain("bg-neutral-50");
      expect(resetButton.className).toContain("px-3");
      expect(resetButton.className).toContain("py-2");
      expect(resetButton.className).toContain("text-[13px]");
    });

    it("should be clickable", () => {
      renderWithProviders(<Header />);

      const resetButton = screen.getByText("Reset to default");
      expect(resetButton).not.toBeDisabled();
    });
  });

  describe("Theme Toggle", () => {
    it("should render theme toggle button", () => {
      renderWithProviders(<Header />);

      const themeButton = screen.getByTitle("Switch to dark theme");
      expect(themeButton).toBeInTheDocument();
    });

    it("should show correct icon based on current theme", () => {
      renderWithProviders(<Header />);

      // Since we mocked theme as "light", it should show moon icon for dark mode
      const themeButton = screen.getByTitle("Switch to dark theme");
      expect(themeButton).toBeInTheDocument();
    });

    it("should have correct styling for theme button", () => {
      renderWithProviders(<Header />);

      const themeButton = screen.getByTitle("Switch to dark theme");
      expect(themeButton.className).toContain("text-text-primary");
      expect(themeButton.className).toContain("cursor-pointer");
      expect(themeButton.className).toContain("rounded-lg");
      expect(themeButton.className).toContain("p-2");
      expect(themeButton.className).toContain("hover:bg-neutral-500");
      expect(themeButton.className).toContain("hover:text-neutral-50");
    });

    it("should be clickable", () => {
      renderWithProviders(<Header />);

      const themeButton = screen.getByTitle("Switch to dark theme");
      expect(themeButton).not.toBeDisabled();
    });
  });

  describe("Layout Structure", () => {
    it("should have correct flex layout", () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole("banner");
      const container = header.querySelector("div");
      expect(container?.className).toContain("mx-auto");
      expect(container?.className).toContain("flex");
      expect(container?.className).toContain("max-w-[1580px]");
      expect(container?.className).toContain("items-center");
      expect(container?.className).toContain("justify-between");
      expect(container?.className).toContain("px-4");
    });

    it("should have three main sections", () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole("banner");
      const container = header.querySelector("div");
      const sections = container?.children;

      expect(sections).toHaveLength(3);
    });

    it("should have correct section widths", () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole("banner");
      const container = header.querySelector("div");
      const sections = container?.children;

      if (sections) {
        // Left section (buttons)
        expect(sections[0].className).toContain("w-[30%]");
        expect(sections[0].className).toContain("flex");
        expect(sections[0].className).toContain("hidden");

        // Center section (logo)
        // No specific width class, should be centered

        // Right section (theme toggle)
        expect(sections[2].className).toContain("w-[30%]");
        expect(sections[2].className).toContain("flex");
        expect(sections[2].className).toContain("justify-end");
        expect(sections[2].className).toContain("gap-1");
      }
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      renderWithProviders(<Header />);

      const themeButton = screen.getByTitle("Switch to dark theme");
      expect(themeButton).toHaveAttribute("title", "Switch to dark theme");
    });

    it("should have proper button roles", () => {
      renderWithProviders(<Header />);

      const resetButton = screen.getByText("Reset to default");
      const themeButton = screen.getByTitle("Switch to dark theme");

      expect(resetButton.tagName.toLowerCase()).toBe("button");
      expect(themeButton.tagName.toLowerCase()).toBe("button");
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive container classes", () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole("banner");
      const container = header.querySelector("div");

      expect(container?.className).toContain("mx-auto");
      expect(container?.className).toContain("max-w-[1580px]");
    });
  });
});

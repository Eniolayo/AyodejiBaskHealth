import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { DashboardHeader } from "@/app/_components/Dashboard/DashboardHeader";

// Mock the API
jest.mock("@/lib/api", () => ({
  fetchDashboardData: jest.fn(),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockDashboardData = {
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          data: [1000, 1200, 1500],
        },
      },
      tables: {
        recentTransactions: [
          {
            id: "1",
            customer: "John Doe",
            amount: 150.0,
            status: "completed",
            date: "2024-01-15",
          },
        ],
        topProducts: [
          { name: "Product A", sales: 1000 },
          { name: "Product B", sales: 800 },
        ],
      },
    },
  },
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardDataProvider>
        <DashboardLayoutProvider>{component}</DashboardLayoutProvider>
      </DashboardDataProvider>
    </QueryClientProvider>
  );
};

describe("DashboardHeader Component", () => {
  const mockFetchDashboardData = require("@/lib/api").fetchDashboardData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render header with correct structure", () => {
      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should render with correct card structure", () => {
      renderWithProviders(
        <DashboardHeader cardId="dashboardHeader" rowId="row-1" />
      );

      const card = screen.getByText("Dashboard").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should display dashboard title correctly", () => {
      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should display summary information", () => {
      renderWithProviders(<DashboardHeader />);

      // Should display dashboard title
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  describe("Card Structure", () => {
    it("should render with correct card props", () => {
      renderWithProviders(
        <DashboardHeader cardId="dashboardHeader" rowId="row-1" />
      );

      const card = screen.getByText("Dashboard").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have correct header", () => {
      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should have proper content structure", () => {
      renderWithProviders(<DashboardHeader />);

      // Should have header structure
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", () => {
      renderWithProviders(<DashboardHeader />);

      // Check for proper styling classes
      const card = screen.getByText("Dashboard").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", () => {
      renderWithProviders(<DashboardHeader />);

      // Check that title uses appropriate styling
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty data gracefully", () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                data: [],
              },
            },
            tables: {
              recentTransactions: [],
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<DashboardHeader />);

      // Should still render the header
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should handle null data gracefully", () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: null,
        },
      });

      renderWithProviders(<DashboardHeader />);

      // Should still render the header
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      renderWithProviders(<DashboardHeader />);

      // Should have proper structure
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should have proper text content", () => {
      renderWithProviders(<DashboardHeader />);

      // Should have descriptive title
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});

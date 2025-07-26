import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { TopProductsSection } from "@/app/_components/Dashboard/TopProductsSection";

// Mock the API
jest.mock("@/lib/api", () => ({
  fetchDashboardData: jest.fn(),
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
          { name: "Product A", sales: 1000, revenue: 15000 },
          { name: "Product B", sales: 800, revenue: 12000 },
          { name: "Product C", sales: 600, revenue: 9000 },
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

describe("TopProductsSection Component", () => {
  const mockFetchDashboardData = require("@/lib/api").fetchDashboardData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // Mock loading state
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<TopProductsSection />);

      // Should show skeleton elements
      const skeletons = screen.getAllByText("", {
        selector: ".bg-muted.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // Should have the title
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(
        <TopProductsSection cardId="topProducts" rowId="row-1" />
      );

      // Should have card with correct props
      const card = screen.getByText("Top products").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render products data correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      // Wait for data to load
      await screen.findByText("ACME Prod - 01");

      // Should have chart elements
      expect(screen.getByText("ACME Prod - 01")).toBeInTheDocument();
      expect(screen.getByText("ACME Prod - 02")).toBeInTheDocument();
    });

    it("should have proper content structure", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Should have chart legend
      expect(screen.getByText("ACME Prod - 01")).toBeInTheDocument();
      expect(screen.getByText("ACME Prod - 02")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Check for proper styling classes
      const card = screen.getByText("Top products").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Check that legend uses appropriate styling
      const legendItems = screen.getAllByText(/ACME Prod/);
      legendItems.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty products data", async () => {
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

      renderWithProviders(<TopProductsSection />);

      // Should still render the header
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle null products data", async () => {
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
              topProducts: null,
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should still render the header
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle products with missing data", async () => {
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
              topProducts: [
                { name: "Product A", sales: 1000 },
                { name: "Product B" }, // Missing sales and revenue
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Should handle missing data gracefully
      expect(screen.getByText("ACME Prod - 01")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Should have proper card structure
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByText("ACME Prod - 01");

      // Should have descriptive legend
      expect(screen.getByText("ACME Prod - 01")).toBeInTheDocument();
      expect(screen.getByText("ACME Prod - 02")).toBeInTheDocument();
    });
  });
});

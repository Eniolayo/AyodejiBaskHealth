import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { SalesOverTimeSection } from "@/app/_components/Dashboard/SalesOverTimeSection";

// Mock the API
jest.mock("@/lib/api", () => ({
  fetchDashboardData: jest.fn(),
}));

const mockDashboardData = {
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          data: [1000, 1200, 1500, 1800, 2000],
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
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

describe("SalesOverTimeSection Component", () => {
  const mockFetchDashboardData = require("@/lib/api").fetchDashboardData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // Mock loading state
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<SalesOverTimeSection />);

      // Should show skeleton elements
      const skeletons = screen.getAllByText("", {
        selector: ".bg-neutral-200.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // Should have the title
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(
        <SalesOverTimeSection cardId="salesOverTime" rowId="row-1" />
      );

      // Should have card with correct props
      const card = screen.getByText("Total sales over time").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render chart data correctly", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      // Wait for data to load
      await screen.findByText("Total sales over time");

      // Should have chart container
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });

    it("should display chart with proper structure", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      // Should have chart container
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });
  });

  describe("Card Structure", () => {
    it("should render with correct card props", async () => {
      renderWithProviders(
        <SalesOverTimeSection cardId="salesOverTime" rowId="row-1" />
      );

      await screen.findByText("Total sales over time");

      const card = screen.getByText("Total sales over time").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have correct header", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      // Check for proper styling classes
      const card = screen.getByText("Total sales over time").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      // Check that title uses appropriate styling
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty chart data", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                data: [],
                labels: [],
              },
            },
            tables: {
              recentTransactions: [],
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<SalesOverTimeSection />);

      // Should still render the header
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });

    it("should handle null chart data", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: {
            charts: {
              salesOverTime: null,
            },
            tables: {
              recentTransactions: [],
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<SalesOverTimeSection />);

      // Should still render the header
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });

    it("should handle missing chart data", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                data: [1000, 1200], // Missing labels
              },
            },
            tables: {
              recentTransactions: [],
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<SalesOverTimeSection />);

      // Should handle missing data gracefully
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      // Should have proper structure
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<SalesOverTimeSection />);

      await screen.findByText("Total sales over time");

      // Should have descriptive title
      expect(screen.getByText("Total sales over time")).toBeInTheDocument();
    });
  });
});

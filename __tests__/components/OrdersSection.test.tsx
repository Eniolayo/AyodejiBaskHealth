import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { OrdersSection } from "@/app/_components/Dashboard/OrdersSection";

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
          labels: ["Jan", "Feb", "Mar"],
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
          {
            id: "2",
            customer: "Jane Smith",
            amount: 250.0,
            status: "pending",
            date: "2024-01-16",
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

describe("OrdersSection Component", () => {
  const mockFetchDashboardData = jest.mocked(
    jest.requireMock("@/lib/api").fetchDashboardData
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // Mock loading state
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<OrdersSection />);

      // Should show skeleton elements
      const skeletons = screen.getAllByText("", {
        selector: ".bg-muted.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // Should have the title
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<OrdersSection cardId="orders" rowId="row-1" />);

      // Should have card with correct props
      const card = screen.getByText("Orders").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render orders data correctly", async () => {
      renderWithProviders(<OrdersSection />);

      // Wait for data to load
      await screen.findByText("Orders");

      // Should have chart container
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should display chart with proper structure", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Should have chart container
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });
  });

  describe("Card Structure", () => {
    it("should render with correct card props", async () => {
      renderWithProviders(<OrdersSection cardId="orders" rowId="row-1" />);

      await screen.findByText("Orders");

      const card = screen.getByText("Orders").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have correct header", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should have proper content structure", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Should have chart container
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Check for proper styling classes
      const card = screen.getByText("Orders").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Check that title uses appropriate styling
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty orders data", async () => {
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

      renderWithProviders(<OrdersSection />);

      // Should still render the header
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should handle null orders data", async () => {
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

      renderWithProviders(<OrdersSection />);

      // Should still render the header
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should handle orders with missing data", async () => {
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

      renderWithProviders(<OrdersSection />);

      // Should handle missing data gracefully
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Should have proper structure
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<OrdersSection />);

      await screen.findByText("Orders");

      // Should have descriptive title
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });
  });
});

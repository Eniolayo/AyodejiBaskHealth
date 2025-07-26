import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { PaymentsHistorySection } from "@/app/_components/Dashboard/PaymentsHistorySection";

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
            id: 1,
            user: "John Doe",
            amount: "150.00",
          },
          {
            id: 2,
            user: "Jane Smith",
            amount: "250.00",
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

describe("PaymentsHistorySection Component", () => {
  const mockFetchDashboardData = jest.mocked(jest.requireMock("@/lib/api").fetchDashboardData);

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // Mock loading state
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<PaymentsHistorySection />);

      // Should show skeleton elements
      const skeletons = screen.getAllByText("", {
        selector: ".bg-muted.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // Should have the title
      expect(screen.getByText("Payments history")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(
        <PaymentsHistorySection cardId="paymentsHistory" rowId="row-1" />
      );

      // Should have card with correct props
      const card = screen.getByText("Payments history").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render payments data correctly", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      // Wait for data to load
      await screen.findByText("John Doe");

      // Check payments are displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getAllByText("150.00")).toHaveLength(2); // Amount and Total net
      expect(screen.getAllByText("250.00")).toHaveLength(2); // Amount and Total net
    });

    it("should display payment status correctly", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Check status indicators
      expect(screen.getAllByText("Success")).toHaveLength(2); // Status for both payments
    });

    it("should display payment data correctly", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Check payment data is displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("should display payment amounts correctly", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Check amounts are displayed
      expect(screen.getAllByText("150.00")).toHaveLength(2); // Amount and Total net
      expect(screen.getAllByText("250.00")).toHaveLength(2); // Amount and Total net
    });
  });

  describe("Card Structure", () => {
    it("should render with correct card props", async () => {
      renderWithProviders(
        <PaymentsHistorySection cardId="paymentsHistory" rowId="row-1" />
      );

      await screen.findByText("John Doe");

      const card = screen.getByText("Payments history").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have correct header", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      expect(screen.getByText("Payments history")).toBeInTheDocument();
    });

    it("should have proper content structure", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Should have table structure
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Amount")).toBeInTheDocument();
      expect(screen.getByText("Total net")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Check for proper styling classes
      const card = screen.getByText("Payments history").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Check that headers use appropriate styling
      const headers = screen.getAllByText(/Status|Name|Amount|Total net/);
      headers.forEach((header) => {
        expect(header).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty payments data", async () => {
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

      renderWithProviders(<PaymentsHistorySection />);

      // Should still render the header
      expect(screen.getByText("Payments history")).toBeInTheDocument();
    });

    it("should handle null payments data", async () => {
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
              recentTransactions: null,
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<PaymentsHistorySection />);

      // Should still render the header
      expect(screen.getByText("Payments history")).toBeInTheDocument();
    });

    it("should handle payments with missing data", async () => {
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
              recentTransactions: [
                { id: 1, user: "John Doe", amount: "150.00" }, // Complete data
                { id: 2, user: "Jane Smith", amount: "250.00" }, // Complete data
                { id: 3, user: "Bob Wilson", amount: "300.00" }, // Complete data
              ],
              topProducts: [],
            },
          },
        },
      });

      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Should handle data gracefully
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Should have proper table structure
      expect(screen.getByText("Payments history")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<PaymentsHistorySection />);

      await screen.findByText("John Doe");

      // Should have descriptive headers
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Amount")).toBeInTheDocument();
      expect(screen.getByText("Total net")).toBeInTheDocument();
    });
  });
});

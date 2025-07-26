import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  DashboardDataProvider,
  useDashboardDataContext,
} from "@/contexts/DashboardDataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the API module
jest.mock("@/lib/api", () => ({
  fetchDashboardData: jest.fn(),
}));

// Mock data for testing
const mockDashboardData = {
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          data: [1000, 1200, 1500, 1800, 2000],
        },
      },
      tables: {
        recentTransactions: [
          { id: 1, amount: 100 },
          { id: 2, amount: 200 },
          { id: 3, amount: 300 },
        ],
        topProducts: [
          { name: "Product A", sales: 500 },
          { name: "Product B", sales: 300 },
        ],
      },
    },
  },
};

// Test component to access context
const TestComponent = () => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    manualRefresh,
    pauseAutoRefresh,
    resumeAutoRefresh,
    toggleAutoRefresh,
    isAutoRefetchEnabled,
    refetchInterval,
    summary,
  } = useDashboardDataContext();

  return (
    <div>
      <div data-testid="is-loading">{isLoading ? "loading" : "loaded"}</div>
      <div data-testid="is-fetching">{isFetching ? "fetching" : "idle"}</div>
      <div data-testid="is-error">{isError ? "error" : "no-error"}</div>
      <div data-testid="is-success">
        {isSuccess ? "success" : "not-success"}
      </div>
      <div data-testid="auto-refresh-enabled">
        {isAutoRefetchEnabled ? "enabled" : "disabled"}
      </div>
      <div data-testid="refetch-interval">{refetchInterval}</div>

      {summary && (
        <div>
          <div data-testid="total-sales">{summary.totalSales}</div>
          <div data-testid="total-orders">{summary.totalOrders}</div>
          <div data-testid="gross-profit">{summary.grossProfit}</div>
          <div data-testid="total-expenses">{summary.totalExpenses}</div>
        </div>
      )}

      {data && data.data && data.data.dashboardData && (
        <div data-testid="data-loaded">
          <div data-testid="transactions-count">
            {data.data.dashboardData.tables?.recentTransactions?.length || 0}
          </div>
          <div data-testid="products-count">
            {data.data.dashboardData.tables?.topProducts?.length || 0}
          </div>
        </div>
      )}

      <button data-testid="manual-refresh" onClick={manualRefresh}>
        Refresh
      </button>
      <button data-testid="pause-refresh" onClick={pauseAutoRefresh}>
        Pause
      </button>
      <button data-testid="resume-refresh" onClick={resumeAutoRefresh}>
        Resume
      </button>
      <button data-testid="toggle-refresh" onClick={toggleAutoRefresh}>
        Toggle
      </button>
    </div>
  );
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
      <DashboardDataProvider>{component}</DashboardDataProvider>
    </QueryClientProvider>
  );
};

describe("DashboardDataContext", () => {
  const mockFetchDashboardData = require("@/lib/api").fetchDashboardData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial State", () => {
    it("should initialize with loading state", () => {
      renderWithProviders(<TestComponent />);

      expect(screen.getByTestId("is-loading")).toHaveTextContent("loading");
      expect(screen.getByTestId("is-fetching")).toHaveTextContent("fetching");
    });

    it("should have default auto-refresh settings", () => {
      renderWithProviders(<TestComponent />);

      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "enabled"
      );
      expect(screen.getByTestId("refetch-interval")).toHaveTextContent("5000");
    });
  });

  describe("Data Loading", () => {
    it("should load data successfully", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-loading")).toHaveTextContent("loaded");
      });

      await waitFor(() => {
        expect(screen.getByTestId("is-success")).toHaveTextContent("success");
      });

      expect(screen.getByTestId("data-loaded")).toBeInTheDocument();
      expect(screen.getByTestId("transactions-count")).toHaveTextContent("3");
      expect(screen.getByTestId("products-count")).toHaveTextContent("2");
    });

    it("should handle API errors", async () => {
      mockFetchDashboardData.mockRejectedValue(new Error("API Error"));

      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-error")).toHaveTextContent("error");
      });
    });
  });

  describe("Summary Calculations", () => {
    it("should calculate summary correctly", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("total-sales")).toBeInTheDocument();
      });

      // Total sales should be sum of salesOverTime data
      expect(screen.getByTestId("total-sales")).toHaveTextContent("7500");

      // Total orders should be count of transactions
      expect(screen.getByTestId("total-orders")).toHaveTextContent("3");

      // Should have calculated expenses and profit
      expect(screen.getByTestId("total-expenses")).toBeInTheDocument();
      expect(screen.getByTestId("gross-profit")).toBeInTheDocument();
    });

    it("should handle empty data gracefully", async () => {
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

      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-success")).toHaveTextContent("success");
      });

      // Should not have summary when no data
      expect(screen.queryByTestId("total-sales")).not.toBeInTheDocument();
    });
  });

  describe("Auto-Refresh Controls", () => {
    it("should pause auto-refresh", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
          "enabled"
        );
      });

      fireEvent.click(screen.getByTestId("pause-refresh"));

      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "disabled"
      );
    });

    it("should resume auto-refresh", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
          "enabled"
        );
      });

      // Pause first
      fireEvent.click(screen.getByTestId("pause-refresh"));
      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "disabled"
      );

      // Then resume
      fireEvent.click(screen.getByTestId("resume-refresh"));
      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "enabled"
      );
    });

    it("should toggle auto-refresh", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
          "enabled"
        );
      });

      // Toggle off
      fireEvent.click(screen.getByTestId("toggle-refresh"));
      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "disabled"
      );

      // Toggle on
      fireEvent.click(screen.getByTestId("toggle-refresh"));
      expect(screen.getByTestId("auto-refresh-enabled")).toHaveTextContent(
        "enabled"
      );
    });
  });

  describe("Manual Refresh", () => {
    it("should trigger manual refresh", async () => {
      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-success")).toHaveTextContent("success");
      });

      // Clear mock to verify it's called again
      mockFetchDashboardData.mockClear();

      fireEvent.click(screen.getByTestId("manual-refresh"));

      await waitFor(() => {
        expect(mockFetchDashboardData).toHaveBeenCalled();
      });
    });
  });

  describe("Custom Configuration", () => {
    it("should accept custom refetch interval", () => {
      const CustomTestComponent = () => {
        const { refetchInterval } = useDashboardDataContext();
        return <div data-testid="custom-interval">{refetchInterval}</div>;
      };

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <DashboardDataProvider refetchInterval={10000}>
            <CustomTestComponent />
          </DashboardDataProvider>
        </QueryClientProvider>
      );

      expect(screen.getByTestId("custom-interval")).toHaveTextContent("10000");
    });

    it("should accept custom auto-refetch setting", () => {
      const CustomTestComponent = () => {
        const { isAutoRefetchEnabled } = useDashboardDataContext();
        return (
          <div data-testid="custom-auto-refresh">
            {isAutoRefetchEnabled ? "enabled" : "disabled"}
          </div>
        );
      };

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      render(
        <QueryClientProvider client={queryClient}>
          <DashboardDataProvider enableAutoRefetch={false}>
            <CustomTestComponent />
          </DashboardDataProvider>
        </QueryClientProvider>
      );

      expect(screen.getByTestId("custom-auto-refresh")).toHaveTextContent(
        "disabled"
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      mockFetchDashboardData.mockRejectedValue(new Error("Network error"));

      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-error")).toHaveTextContent("error");
      });

      expect(screen.getByTestId("is-loading")).toHaveTextContent("loading");
    });

    it("should handle malformed data", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: null,
      });

      renderWithProviders(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId("is-success")).toHaveTextContent("success");
      });

      // Should not have summary when data is malformed
      expect(screen.queryByTestId("total-sales")).not.toBeInTheDocument();
    });
  });
});

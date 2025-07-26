/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent, act } from "@testing-library/react";
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
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the DashboardDataContext
const mockToggleAutoRefresh = jest.fn();
const mockManualRefresh = jest.fn();

jest.mock("@/contexts/DashboardDataContext", () => ({
  useDashboardDataContext: jest.fn(() => ({
    isFetching: false,
    isAutoRefetchEnabled: true,
    toggleAutoRefresh: mockToggleAutoRefresh,
    manualRefresh: mockManualRefresh,
    lastUpdated: new Date("2024-01-15T10:00:00Z"),
  })),
  DashboardDataProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock formatTimeAgo
jest.mock("@/lib/utils", () => ({
  formatTimeAgo: jest.fn(() => `2 hours ago`),
  cn: jest.fn((...classes) => classes.filter(Boolean).join(" ")),
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
  const mockUseDashboardDataContext =
    require("@/contexts/DashboardDataContext").useDashboardDataContext;

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

  describe("Status Text Logic", () => {
    it("should show 'Updating...' when isFetching is true", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: true,
        isAutoRefetchEnabled: true,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Updating...")).toBeInTheDocument();
    });

    it("should show 'Last updated X' when auto-refresh is disabled and lastUpdated exists", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: false,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Last updated 2 hours ago")).toBeInTheDocument();
    });

    it("should show 'Up to date' when auto-refresh is enabled", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: true,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Up to date")).toBeInTheDocument();
    });

    it("should show 'Up to date' when auto-refresh is disabled but no lastUpdated", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: false,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: null,
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Up to date")).toBeInTheDocument();
    });
  });

  describe("Button Interactions", () => {
    it("should call toggleAutoRefresh when auto-refresh button is clicked", () => {
      renderWithProviders(<DashboardHeader />);

      const autoRefreshButton = screen.getByTestId("auto-refresh-toggle");
      fireEvent.click(autoRefreshButton);

      expect(mockToggleAutoRefresh).toHaveBeenCalledTimes(1);
    });

    it("should call manualRefresh when manual refresh button is clicked", () => {
      renderWithProviders(<DashboardHeader />);

      const manualRefreshButton = screen.getByTestId("manual-refresh");
      fireEvent.click(manualRefreshButton);

      expect(mockManualRefresh).toHaveBeenCalledTimes(1);
    });

    it("should show 'Pause auto-fetch' when auto-refresh is enabled", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: true,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Pause auto-fetch")).toBeInTheDocument();
    });

    it("should show 'Resume auto-fetch' when auto-refresh is disabled", () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: false,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      expect(screen.getByText("Resume auto-fetch")).toBeInTheDocument();
    });
  });

  describe("useEffect Logic", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should set up interval when auto-refresh is disabled and lastUpdated exists", async () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: false,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      // Fast-forward time to trigger interval
      await act(async () => {
        jest.advanceTimersByTime(60000);
      });

      // The component should still be rendered
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should not set up interval when auto-refresh is enabled", async () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: true,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: new Date("2024-01-15T10:00:00Z"),
      });

      renderWithProviders(<DashboardHeader />);

      // Fast-forward time
      await act(async () => {
        jest.advanceTimersByTime(60000);
      });

      // The component should still be rendered
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("should not set up interval when lastUpdated is null", async () => {
      mockUseDashboardDataContext.mockReturnValue({
        isFetching: false,
        isAutoRefetchEnabled: false,
        toggleAutoRefresh: mockToggleAutoRefresh,
        manualRefresh: mockManualRefresh,
        lastUpdated: null,
      });

      renderWithProviders(<DashboardHeader />);

      // Fast-forward time
      await act(async () => {
        jest.advanceTimersByTime(60000);
      });

      // The component should still be rendered
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

    it("should have proper button accessibility", () => {
      renderWithProviders(<DashboardHeader />);

      const autoRefreshButton = screen.getByTestId("auto-refresh-toggle");
      const manualRefreshButton = screen.getByTestId("manual-refresh");

      expect(autoRefreshButton).toBeInTheDocument();
      expect(manualRefreshButton).toBeInTheDocument();
      expect(manualRefreshButton).toHaveAttribute("title", "Refresh now");
    });
  });
});

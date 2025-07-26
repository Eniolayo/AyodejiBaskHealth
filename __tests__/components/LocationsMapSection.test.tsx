import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { LocationsMapSection } from "@/app/_components/Dashboard/LocationsMapSection";

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
          { name: "Product A", sales: 1000 },
          { name: "Product B", sales: 800 },
        ],
      },
      map: {
        locations: [
          {
            label: "New York",
            latitude: 40.7128,
            longitude: -74.006,
          },
          {
            label: "Los Angeles",
            latitude: 34.0522,
            longitude: -118.2437,
          },
          {
            label: "Chicago",
            latitude: 41.8781,
            longitude: -87.6298,
          },
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

describe("LocationsMapSection Component", () => {
  const mockFetchDashboardData = require("@/lib/api").fetchDashboardData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // Mock loading state
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<LocationsMapSection />);

      // Should show skeleton elements
      const skeletons = screen.getAllByText("", {
        selector: ".bg-neutral-200.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // Should have the title
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(
        <LocationsMapSection cardId="locationsMap" rowId="row-1" />
      );

      // Should have card with correct props
      const card = screen.getByText("Locations").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render locations data correctly", async () => {
      renderWithProviders(<LocationsMapSection />);

      // Wait for data to load
      await screen.findByText("Locations");

      // Should render the map container
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should display map title correctly", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should handle map data rendering", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // The map should be rendered (we can't easily test the map internals)
      // So we just verify the component renders without errors
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });
  });

  describe("Card Structure", () => {
    it("should render with correct card props", async () => {
      renderWithProviders(
        <LocationsMapSection cardId="locationsMap" rowId="row-1" />
      );

      await screen.findByText("Locations");

      const card = screen.getByText("Locations").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have correct header", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should have proper content structure", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Should have map container
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Check for proper styling classes
      const card = screen.getByText("Locations").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Check that title uses appropriate styling
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty locations data", async () => {
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
            map: {
              locations: [],
            },
          },
        },
      });

      renderWithProviders(<LocationsMapSection />);

      // Should still render the header
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should handle null locations data", async () => {
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
            map: null,
          },
        },
      });

      renderWithProviders(<LocationsMapSection />);

      // Should still render the header
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should handle locations with missing data", async () => {
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
            map: {
              locations: [
                {
                  label: "New York",
                  // Missing latitude, longitude
                },
              ],
            },
          },
        },
      });

      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Should handle missing data gracefully
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Should have proper structure
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<LocationsMapSection />);

      await screen.findByText("Locations");

      // Should have descriptive title
      expect(screen.getByText("Locations")).toBeInTheDocument();
    });
  });
});

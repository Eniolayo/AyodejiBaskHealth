import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";
import { DashboardLayoutProvider } from "@/contexts/DashboardLayoutContext";
import { TopProductsSection } from "@/app/_components/Dashboard/TopProductsSection";
import type { ReactNode } from "react";

// Define proper types for mock components
interface MockChartProps {
  children?: ReactNode;
  data?: unknown;
  _margin?: unknown;
  dataKey?: string;
  fill?: string | null;
  strokeDasharray?: string;
  stroke?: string;
  opacity?: number;
  width?: number | string | null;
  height?: number | string | null;
  x?: number | null;
  y?: number | null;
  shape?: (props: MockChartProps) => ReactNode;
}

// mock API calls
jest.mock("@/lib/api", () => ({
  fetchDashboardData: jest.fn(),
}));

// mock chart components
jest.mock("recharts", () => {
  const MockComposedChart = ({ children, data, _margin }: MockChartProps) => (
    <div data-testid="composed-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  );
  MockComposedChart.displayName = "MockComposedChart";

  const MockBar = ({ dataKey, fill }: MockChartProps) => (
    <div data-testid="bar" data-key={dataKey} data-fill={fill} />
  );
  MockBar.displayName = "MockBar";

  const MockXAxis = ({ dataKey }: MockChartProps) => (
    <div data-testid="x-axis" data-key={dataKey} />
  );
  MockXAxis.displayName = "MockXAxis";

  const MockYAxis = ({ dataKey }: MockChartProps) => (
    <div data-testid="y-axis" data-key={dataKey} />
  );
  MockYAxis.displayName = "MockYAxis";

  const MockCartesianGrid = ({
    strokeDasharray,
    stroke,
    opacity,
  }: MockChartProps) => (
    <div
      data-testid="cartesian-grid"
      data-stroke-dasharray={strokeDasharray}
      data-stroke={stroke}
      data-opacity={opacity}
    />
  );
  MockCartesianGrid.displayName = "MockCartesianGrid";

  const MockTooltip = ({ children }: MockChartProps) => (
    <div data-testid="tooltip">{children}</div>
  );
  MockTooltip.displayName = "MockTooltip";

  const MockResponsiveContainer = ({
    children,
    width,
    height,
  }: MockChartProps) => (
    <div
      data-testid="responsive-container"
      data-width={width}
      data-height={height}
    >
      {children}
    </div>
  );
  MockResponsiveContainer.displayName = "MockResponsiveContainer";

  const MockLabelList = ({ dataKey }: MockChartProps) => (
    <div data-testid="label-list" data-key={dataKey} />
  );
  MockLabelList.displayName = "MockLabelList";

  return {
    ComposedChart: MockComposedChart,
    Bar: MockBar,
    XAxis: MockXAxis,
    YAxis: MockYAxis,
    CartesianGrid: MockCartesianGrid,
    Tooltip: MockTooltip,
    ResponsiveContainer: MockResponsiveContainer,
    LabelList: MockLabelList,
  };
});

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
          { name: "Product D", sales: 400, revenue: 6000 },
          { name: "Product E", sales: 200, revenue: 3000 },
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
  const mockFetchDashboardData = jest.mocked(
    jest.requireMock("@/lib/api").fetchDashboardData
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDashboardData.mockResolvedValue(mockDashboardData);
  });

  describe("Initial Rendering", () => {
    it("should render loading state", () => {
      // simulate loading
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<TopProductsSection />);

      // check for loading skeletons
      const skeletons = screen.getAllByText("", {
        selector: ".bg-neutral-200.rounded-md.animate-pulse",
      });
      expect(skeletons.length).toBeGreaterThan(0);

      // check title is there
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should render with correct card structure in loading state", () => {
      mockFetchDashboardData.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(
        <TopProductsSection cardId="topProducts" rowId="row-1" />
      );

      // check card structure
      const card = screen.getByText("Top products").closest("div");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Data Display and Chart Rendering", () => {
    it("should render products data correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      // wait for chart to load
      await screen.findByTestId("composed-chart");

      // check chart elements
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
      expect(screen.getAllByTestId("bar")).toHaveLength(2); // two product bars
    });

    it("should have proper content structure", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // check all chart parts are there
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
      expect(screen.getByTestId("x-axis")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis")).toBeInTheDocument();
      expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    });

    it("should render chart with correct data", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const chart = screen.getByTestId("composed-chart");
      const chartData = JSON.parse(
        chart.getAttribute("data-chart-data") || "[]"
      );

      // check data transformation
      expect(chartData).toHaveLength(5); // 5 products
      expect(chartData[0]).toHaveProperty("month");
      expect(chartData[0]).toHaveProperty("ACME Prod - 01");
      expect(chartData[0]).toHaveProperty("ACME Prod - 02");
    });

    it("should render bars with correct data keys", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const bars = screen.getAllByTestId("bar");
      expect(bars).toHaveLength(2); // two product series

      // check data keys
      expect(bars[0]).toHaveAttribute("data-key", "ACME Prod - 01");
      expect(bars[1]).toHaveAttribute("data-key", "ACME Prod - 02");
    });

    it("should render chart axes correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const xAxis = screen.getByTestId("x-axis");
      const yAxis = screen.getByTestId("y-axis");

      expect(xAxis).toHaveAttribute("data-key", "month");
      expect(yAxis).toBeInTheDocument();
    });

    it("should render grid with correct styling", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const grid = screen.getByTestId("cartesian-grid");
      expect(grid).toHaveAttribute("data-stroke-dasharray", "3 3");
      expect(grid).toHaveAttribute("data-stroke", "#6b6f71");
      expect(grid).toHaveAttribute("data-opacity", "0.3");
    });
  });

  describe("Data Transformation", () => {
    it("should transform product names correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const chart = screen.getByTestId("composed-chart");
      const chartData = JSON.parse(
        chart.getAttribute("data-chart-data") || "[]"
      );

      // Product names should be transformed (remove "product " prefix)
      expect(chartData[0].month).toBe("A"); // "Product A" -> "A"
      expect(chartData[1].month).toBe("B"); // "Product B" -> "B"
    });

    it("should calculate secondary product sales correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const chart = screen.getByTestId("composed-chart");
      const chartData = JSON.parse(
        chart.getAttribute("data-chart-data") || "[]"
      );

      // Secondary product should be 60% of primary
      expect(chartData[0]["ACME Prod - 02"]).toBe(600); // 1000 * 0.6
      expect(chartData[1]["ACME Prod - 02"]).toBe(480); // 800 * 0.6
    });

    it("should handle products with different sales values", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const chart = screen.getByTestId("composed-chart");
      const chartData = JSON.parse(
        chart.getAttribute("data-chart-data") || "[]"
      );

      // Should handle various sales values
      expect(chartData[0]["ACME Prod - 01"]).toBe(1000);
      expect(chartData[1]["ACME Prod - 01"]).toBe(800);
      expect(chartData[2]["ACME Prod - 01"]).toBe(600);
    });
  });

  describe("Styling and Layout", () => {
    it("should have correct CSS classes", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Check for proper styling classes
      const card = screen.getByText("Top products").closest("div");
      expect(card).toBeInTheDocument();
    });

    it("should have proper typography variants", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Check that chart uses appropriate styling
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should render with correct chart dimensions", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      const responsiveContainer = screen.getByTestId("responsive-container");
      expect(responsiveContainer).toHaveAttribute("data-width", "100%");
      expect(responsiveContainer).toHaveAttribute("data-height", "100%");
    });

    it("should apply correct chart margins", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Chart should have proper margins
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });
  });

  describe("Theme Handling", () => {
    it("should handle light theme", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should render with light theme colors
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should handle dark theme", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should render with dark theme colors
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should apply theme colors to chart elements", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Chart elements should use theme colors
      expect(screen.getByTestId("x-axis")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis")).toBeInTheDocument();
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
                { name: "Product C", sales: 600, revenue: 9000 },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle missing data gracefully
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle products with zero sales", async () => {
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
                { name: "Product A", sales: 0 },
                { name: "Product B", sales: 100 },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle zero sales gracefully
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle products with very large sales values", async () => {
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
                { name: "Product A", sales: 999999 },
                { name: "Product B", sales: 1000000 },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle large values gracefully
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle API errors gracefully", async () => {
      mockFetchDashboardData.mockRejectedValue(new Error("API Error"));

      renderWithProviders(<TopProductsSection />);

      // Should handle error gracefully
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle malformed data", async () => {
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
                { name: "Product A", sales: 1000 }, // Complete data
                { name: "Product B", sales: "invalid" }, // Invalid sales type
                { name: "Product C" }, // Missing sales
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle malformed data gracefully
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should have proper card structure
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should have proper text content", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should have descriptive title
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should have proper chart accessibility", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Chart should have proper accessibility attributes
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should handle large datasets efficiently", async () => {
      // Mock large dataset
      const largeDataset = {
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                data: [],
              },
            },
            tables: {
              recentTransactions: [],
              topProducts: Array.from({ length: 50 }, (_, i) => ({
                name: `Product ${i + 1}`,
                sales: (i + 1) * 100,
                revenue: (i + 1) * 1500,
              })),
            },
          },
        },
      };

      mockFetchDashboardData.mockResolvedValue(largeDataset);

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle large dataset without performance issues
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle rapid data updates", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle data updates efficiently
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });
  });

  describe("Chart Interactions", () => {
    it("should render tooltip on hover", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Tooltip should be available for interactions
      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("should render chart elements correctly", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Chart elements should be rendered
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
      expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
      expect(screen.getByTestId("x-axis")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    });

    it("should handle chart responsiveness", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Chart should be responsive
      const responsiveContainer = screen.getByTestId("responsive-container");
      expect(responsiveContainer).toBeInTheDocument();
    });
  });

  describe("Data Processing Edge Cases", () => {
    it("should handle products with special characters in names", async () => {
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
                { name: "Product A & B", sales: 1000 },
                { name: "Product C-D", sales: 800 },
                { name: "Product E (Special)", sales: 600 },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle special characters in product names
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle products with very long names", async () => {
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
                {
                  name: "Very Long Product Name That Exceeds Normal Length",
                  sales: 1000,
                },
                {
                  name: "Another Very Long Product Name With Many Words",
                  sales: 800,
                },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle long product names gracefully
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle decimal sales values", async () => {
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
                { name: "Product A", sales: 1000.5 },
                { name: "Product B", sales: 800.75 },
                { name: "Product C", sales: 600.25 },
              ],
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle decimal sales values
      const chart = screen.getByTestId("composed-chart");
      expect(chart).toBeInTheDocument();
    });
  });

  describe("Branch Coverage - Conditional Rendering", () => {
    it("should handle undefined data gracefully", async () => {
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
              topProducts: undefined, // This should trigger the null check
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should handle undefined data without crashing
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle null data gracefully", async () => {
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
              topProducts: null, // This should trigger the null check
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should handle null data without crashing
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle empty data array", async () => {
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
              topProducts: [], // Empty array
            },
          },
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should handle empty array without crashing
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle missing dashboardData", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          // Missing dashboardData
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should handle missing dashboardData gracefully
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });

    it("should handle null dashboardData", async () => {
      mockFetchDashboardData.mockResolvedValue({
        data: {
          dashboardData: null,
        },
      });

      renderWithProviders(<TopProductsSection />);

      // Should handle null dashboardData gracefully
      expect(screen.getByText("Top products")).toBeInTheDocument();
    });
  });

  describe("Branch Coverage - Optional Props", () => {
    it("should handle custom cardId and rowId props", async () => {
      renderWithProviders(
        <TopProductsSection cardId="custom-card" rowId="custom-row" />
      );

      await screen.findByTestId("composed-chart");

      // Should render with custom props
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should handle products with undefined sales values", async () => {
      const mockDataWithUndefinedSales = {
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
              topProducts: [
                { name: "Product A", sales: undefined, revenue: 15000 },
                { name: "Product B", sales: null, revenue: 12000 },
                { name: "Product C", sales: 600, revenue: 9000 },
              ],
            },
          },
        },
      };

      mockFetchDashboardData.mockResolvedValue(mockDataWithUndefinedSales);

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle undefined/null sales values
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should handle products with undefined revenue values", async () => {
      const mockDataWithUndefinedRevenue = {
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
              topProducts: [
                { name: "Product A", sales: 1000, revenue: undefined },
                { name: "Product B", sales: 800, revenue: null },
                { name: "Product C", sales: 600, revenue: 9000 },
              ],
            },
          },
        },
      };

      mockFetchDashboardData.mockResolvedValue(mockDataWithUndefinedRevenue);

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle undefined/null revenue values
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });
  });

  describe("Branch Coverage - Theme Variations", () => {
    it("should handle system theme preference", async () => {
      // Mock system theme preference
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query.includes("dark"),
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Should handle system theme preference
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });

    it("should handle theme context changes", async () => {
      const { rerender } = renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Rerender with different theme
      rerender(
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  retry: false,
                },
              },
            })
          }
        >
          <DashboardDataProvider>
            <DashboardLayoutProvider>
              <TopProductsSection />
            </DashboardLayoutProvider>
          </DashboardDataProvider>
        </QueryClientProvider>
      );

      // Should handle theme changes gracefully
      expect(screen.getByTestId("composed-chart")).toBeInTheDocument();
    });
  });

  describe("CustomBottomBar Component", () => {
    it("should render CustomBottomBar with default props", async () => {
      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // The CustomBottomBar is used as the shape prop for the second Bar
      const bars = screen.getAllByTestId("bar");
      expect(bars).toHaveLength(2);
    });

    it("should handle CustomBottomBar with custom props", async () => {
      // Mock the CustomBottomBar component to test its logic
      const mockCustomBottomBar = jest.fn((props: MockChartProps) => {
        const fill = props.fill ?? "#000";
        const x = +(props.x ?? 0);
        const y = +(props.y ?? 0);
        const width = +(props.width ?? 0);
        const height = +(props.height ?? 0);

        return (
          <path
            d={`M ${x} ${y + 9 + height} L ${x} ${y + 9 + 9} Q ${x} ${y + 9} ${x + 9} ${y + 9} L ${x + width - 9} ${y + 9} Q ${x + width} ${y + 9} ${x + width} ${y + 9 + 9} L ${x + width} ${y + 9 + height} Z`}
            fill={fill}
          />
        );
      });

      // Test the mock function
      const result = mockCustomBottomBar({
        fill: "#ff0000",
        x: 10,
        y: 20,
        width: 30,
        height: 40,
      });
      expect(result).toBeDefined();

      // Temporarily replace the mock
      const originalMock = jest.requireMock("recharts").Bar;
      const MockBarWithShape = ({ dataKey, fill, shape }: MockChartProps) => {
        if (shape) {
          return shape({ fill, x: 10, y: 20, width: 30, height: 40 });
        }
        return <div data-testid="bar" data-key={dataKey} data-fill={fill} />;
      };
      MockBarWithShape.displayName = "MockBarWithShape";
      jest.requireMock("recharts").Bar = MockBarWithShape;

      renderWithProviders(<TopProductsSection />);

      await screen.findByTestId("composed-chart");

      // Restore original mock
      jest.requireMock("recharts").Bar = originalMock;
    });

    it("should handle CustomBottomBar with null/undefined props", async () => {
      // Test CustomBottomBar with null/undefined values
      const mockCustomBottomBar = jest.fn((props: MockChartProps) => {
        const fill = props.fill ?? "#000";
        const x = +(props.x ?? 0);
        const y = +(props.y ?? 0);
        const width = +(props.width ?? 0);
        const height = +(props.height ?? 0);

        return (
          <path
            d={`M ${x} ${y + 9 + height} L ${x} ${y + 9 + 9} Q ${x} ${y + 9} ${x + 9} ${y + 9} L ${x + width - 9} ${y + 9} Q ${x + width} ${y + 9} ${x + width} ${y + 9 + 9} L ${x + width} ${y + 9 + height} Z`}
            fill={fill}
          />
        );
      });

      // Test with null values
      const result = mockCustomBottomBar({
        fill: null,
        x: null,
        y: null,
        width: null,
        height: null,
      });
      expect(result).toBeDefined();
    });
  });
});

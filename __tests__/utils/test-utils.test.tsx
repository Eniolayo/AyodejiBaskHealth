import { render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import {
  renderWithProviders,
  mockDashboardData,
  waitForLoadingToFinish,
  mockIntersectionObserver,
  mockResizeObserver,
} from "@/utils/test-utils";

// Test component to verify renderWithProviders works
const TestComponent = () => (
  <div data-testid="test-component">Test Content</div>
);

describe("Test Utils", () => {
  describe("renderWithProviders", () => {
    it("should render component with default query client", () => {
      renderWithProviders(<TestComponent />);

      const component = screen.getByTestId("test-component");
      expect(component).toBeInTheDocument();
      expect(component).toHaveTextContent("Test Content");
    });

    it("should render component with custom query client", () => {
      const customQueryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000,
            gcTime: 1000,
          },
        },
      });

      renderWithProviders(<TestComponent />, {
        queryClient: customQueryClient,
      });

      const component = screen.getByTestId("test-component");
      expect(component).toBeInTheDocument();
    });

    it("should pass through render options", () => {
      const { container } = renderWithProviders(<TestComponent />);

      expect(container).toBeInTheDocument();
    });

    it("should work with components that use React Query", () => {
      const ComponentWithQuery = () => {
        return (
          <div data-testid="query-component">
            <TestComponent />
          </div>
        );
      };

      renderWithProviders(<ComponentWithQuery />);

      const queryComponent = screen.getByTestId("query-component");
      const testComponent = screen.getByTestId("test-component");

      expect(queryComponent).toBeInTheDocument();
      expect(testComponent).toBeInTheDocument();
    });
  });

  describe("mockDashboardData", () => {
    it("should have correct sales data structure", () => {
      expect(mockDashboardData.sales).toEqual({
        total: 125000,
        growth: 12.5,
        data: [
          { month: "Jan", value: 10000 },
          { month: "Feb", value: 12000 },
          { month: "Mar", value: 15000 },
        ],
      });
    });

    it("should have correct orders data structure", () => {
      expect(mockDashboardData.orders).toEqual({
        total: 1250,
        pending: 45,
        completed: 1205,
      });
    });

    it("should have correct locations data structure", () => {
      expect(mockDashboardData.locations).toEqual([
        { id: 1, name: "New York", lat: 40.7128, lng: -74.006, orders: 150 },
        {
          id: 2,
          name: "Los Angeles",
          lat: 34.0522,
          lng: -118.2437,
          orders: 120,
        },
      ]);
    });

    it("should have valid sales data", () => {
      expect(mockDashboardData.sales.total).toBeGreaterThan(0);
      expect(mockDashboardData.sales.growth).toBeGreaterThan(0);
      expect(mockDashboardData.sales.data).toHaveLength(3);

      mockDashboardData.sales.data.forEach((item) => {
        expect(item.month).toBeDefined();
        expect(item.value).toBeGreaterThan(0);
      });
    });

    it("should have valid orders data", () => {
      expect(mockDashboardData.orders.total).toBeGreaterThan(0);
      expect(mockDashboardData.orders.pending).toBeGreaterThanOrEqual(0);
      expect(mockDashboardData.orders.completed).toBeGreaterThan(0);
      expect(
        mockDashboardData.orders.pending + mockDashboardData.orders.completed
      ).toBe(mockDashboardData.orders.total);
    });

    it("should have valid locations data", () => {
      expect(mockDashboardData.locations).toHaveLength(2);

      mockDashboardData.locations.forEach((location) => {
        expect(location.id).toBeGreaterThan(0);
        expect(location.name).toBeDefined();
        expect(location.lat).toBeDefined();
        expect(location.lng).toBeDefined();
        expect(location.orders).toBeGreaterThan(0);
      });
    });
  });

  describe("waitForLoadingToFinish", () => {
    it("should wait for specified time", async () => {
      const startTime = Date.now();
      await waitForLoadingToFinish();
      const endTime = Date.now();

      // Should wait at least 100ms
      expect(endTime - startTime).toBeGreaterThanOrEqual(90);
    });

    it("should resolve without throwing", async () => {
      await expect(waitForLoadingToFinish()).resolves.toBeUndefined();
    });
  });

  describe("mockIntersectionObserver", () => {
    beforeEach(() => {
      // Reset global IntersectionObserver
      delete (global as any).IntersectionObserver;
    });

    it("should mock IntersectionObserver with correct methods", () => {
      mockIntersectionObserver();

      expect(global.IntersectionObserver).toBeDefined();

      const mockObserver = new (global.IntersectionObserver as any)();
      expect(mockObserver.observe).toBeDefined();
      expect(mockObserver.unobserve).toBeDefined();
      expect(mockObserver.disconnect).toBeDefined();
    });

    it("should provide mock implementation for all methods", () => {
      mockIntersectionObserver();

      const mockObserver = new (global.IntersectionObserver as any)();
      expect(typeof mockObserver.observe).toBe("function");
      expect(typeof mockObserver.unobserve).toBe("function");
      expect(typeof mockObserver.disconnect).toBe("function");
    });
  });

  describe("mockResizeObserver", () => {
    beforeEach(() => {
      // Reset global ResizeObserver
      delete (global as any).ResizeObserver;
    });

    it("should mock ResizeObserver with correct methods", () => {
      mockResizeObserver();

      expect(global.ResizeObserver).toBeDefined();

      const mockObserver = new (global.ResizeObserver as any)();
      expect(mockObserver.observe).toBeDefined();
      expect(mockObserver.unobserve).toBeDefined();
      expect(mockObserver.disconnect).toBeDefined();
    });

    it("should provide mock implementation for all methods", () => {
      mockResizeObserver();

      const mockObserver = new (global.ResizeObserver as any)();
      expect(typeof mockObserver.observe).toBe("function");
      expect(typeof mockObserver.unobserve).toBe("function");
      expect(typeof mockObserver.disconnect).toBe("function");
    });
  });

  describe("Integration", () => {
    it("should work together with all utilities", async () => {
      // Mock observers
      mockIntersectionObserver();
      mockResizeObserver();

      // Render with providers
      renderWithProviders(<TestComponent />);

      // Wait for loading
      await waitForLoadingToFinish();

      // Verify component rendered
      expect(screen.getByTestId("test-component")).toBeInTheDocument();

      // Verify observers are mocked
      expect(global.IntersectionObserver).toBeDefined();
      expect(global.ResizeObserver).toBeDefined();
    });

    it("should handle multiple renders with different query clients", () => {
      const queryClient1 = new QueryClient();
      const queryClient2 = new QueryClient();

      const { unmount: unmount1 } = renderWithProviders(<TestComponent />, {
        queryClient: queryClient1,
      });

      expect(screen.getByTestId("test-component")).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = renderWithProviders(<TestComponent />, {
        queryClient: queryClient2,
      });

      expect(screen.getByTestId("test-component")).toBeInTheDocument();
      unmount2();
    });
  });
});

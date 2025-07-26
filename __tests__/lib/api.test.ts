import { fetchDashboardData } from "@/lib/api";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("API Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchDashboardData", () => {
    it("should fetch dashboard data successfully", async () => {
      const mockResponse = {
        success: true,
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01"],
                data: [1000, 1200, 1500],
              },
              userEngagement: {
                labels: ["Week 1", "Week 2", "Week 3"],
                data: [80, 85, 90],
              },
            },
            tables: {
              recentTransactions: [
                {
                  id: 1,
                  user: "John Doe",
                  amount: "$150.00",
                  date: "2024-01-15",
                },
              ],
              topProducts: [
                { id: "A1", name: "Product A", sales: 1000 },
                { id: "B2", name: "Product B", sales: 800 },
              ],
            },
            map: {
              locations: [
                {
                  latitude: 40.7128,
                  longitude: -74.006,
                  label: "New York",
                  activity: 150,
                },
              ],
            },
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDashboardData();

      expect(mockFetch).toHaveBeenCalledWith("/api/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
        cache: "no-store",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle API errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(fetchDashboardData()).rejects.toThrow(
        "HTTP 500: Internal Server Error"
      );
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchDashboardData()).rejects.toThrow(
        "Network or parsing error: Network error"
      );
    });

    it("should handle malformed JSON response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(fetchDashboardData()).rejects.toThrow(
        "Network or parsing error: Invalid JSON"
      );
    });

    it("should handle empty response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await expect(fetchDashboardData()).rejects.toThrow(
        "Invalid API response format"
      );
    });

    it("should handle null response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });

      await expect(fetchDashboardData()).rejects.toThrow(
        "Invalid API response format"
      );
    });

    it("should handle partial data response", async () => {
      const mockResponse = {
        success: true,
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                labels: ["2024-01-01"],
                data: [1000],
              },
              userEngagement: {
                labels: ["Week 1"],
                data: [80],
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
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDashboardData();
      expect(result).toEqual(mockResponse);
    });

    it("should handle response with empty arrays", async () => {
      const mockResponse = {
        success: true,
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                labels: [],
                data: [],
              },
              userEngagement: {
                labels: [],
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
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDashboardData();
      expect(result).toEqual(mockResponse);
    });

    it("should handle response with null values", async () => {
      const mockResponse = {
        success: true,
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                labels: ["2024-01-01"],
                data: [1000],
              },
              userEngagement: {
                labels: ["Week 1"],
                data: [80],
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
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDashboardData();
      expect(result).toEqual(mockResponse);
    });

    it("should handle 404 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetchDashboardData()).rejects.toThrow("HTTP 404: Not Found");
    });

    it("should handle 403 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: "Forbidden",
      });

      await expect(fetchDashboardData()).rejects.toThrow("HTTP 403: Forbidden");
    });

    it("should handle timeout scenarios", async () => {
      mockFetch.mockImplementationOnce(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), 100)
          )
      );

      await expect(fetchDashboardData()).rejects.toThrow(
        "Network or parsing error: Request timeout"
      );
    });

    it("should handle successful response with complex data structure", async () => {
      const mockResponse = {
        success: true,
        data: {
          dashboardData: {
            charts: {
              salesOverTime: {
                labels: [
                  "2024-01-01",
                  "2024-02-01",
                  "2024-03-01",
                  "2024-04-01",
                  "2024-05-01",
                ],
                data: [1000, 1200, 1500, 1800, 2000],
              },
              userEngagement: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
                data: [80, 85, 90, 88, 92],
              },
            },
            tables: {
              recentTransactions: [
                {
                  id: 1,
                  user: "John Doe",
                  amount: "$150.00",
                  date: "2024-01-15",
                },
                {
                  id: 2,
                  user: "Jane Smith",
                  amount: "$250.00",
                  date: "2024-01-16",
                },
              ],
              topProducts: [
                { id: "A1", name: "Product A", sales: 1000 },
                { id: "B2", name: "Product B", sales: 800 },
                { id: "C3", name: "Product C", sales: 600 },
              ],
            },
            map: {
              locations: [
                {
                  latitude: 40.7128,
                  longitude: -74.006,
                  label: "New York",
                  activity: 150,
                },
                {
                  latitude: 34.0522,
                  longitude: -118.2437,
                  label: "Los Angeles",
                  activity: 120,
                },
              ],
            },
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchDashboardData();
      expect(result).toEqual(mockResponse);
    });
  });
});

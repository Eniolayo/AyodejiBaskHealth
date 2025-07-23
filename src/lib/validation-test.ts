import { DashboardApiResponseSchema } from "@/types/dashboard";

// Test the Zod schema validation
const testValidData = {
  success: true,
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          labels: ["2025-07-23", "2025-07-22"],
          data: [122, 168],
        },
        userEngagement: {
          labels: ["Week 1", "Week 2"],
          data: [522, 494],
        },
      },
      tables: {
        recentTransactions: [
          {
            id: 1,
            user: "John Doe",
            amount: "$192",
            date: "2023-09-28",
          },
        ],
        topProducts: [
          {
            id: "A1",
            name: "Product A",
            sales: 1097,
          },
        ],
      },
      map: {
        locations: [
          {
            latitude: 40.7128,
            longitude: -74.006,
            label: "New York",
            activity: 555,
          },
        ],
      },
    },
  },
};

const testInvalidData = {
  success: "true", // Should be boolean, not string
  data: {
    dashboardData: {
      charts: {
        salesOverTime: {
          labels: "invalid", // Should be array, not string
          data: [122, 168],
        },
      },
    },
  },
};

// These tests would be run in a test environment
console.log(
  "Valid data test:",
  DashboardApiResponseSchema.safeParse(testValidData).success
); // Should be true
console.log(
  "Invalid data test:",
  DashboardApiResponseSchema.safeParse(testInvalidData).success
); // Should be false

export {}; // Make this a module

import { z } from "zod";

// Chart schemas
const SalesOverTimeChartSchema = z.object({
  labels: z.array(z.string()), // dates in YYYY-MM-DD format
  data: z.array(z.number()), // sales numbers
});

const UserEngagementChartSchema = z.object({
  labels: z.array(z.string()), // week labels like "Week 1", "Week 2"
  data: z.array(z.number()), // engagement metrics
});

const ChartsSchema = z.object({
  salesOverTime: SalesOverTimeChartSchema,
  userEngagement: UserEngagementChartSchema,
});

// Table schemas
const TransactionSchema = z.object({
  id: z.number(),
  user: z.string(),
  amount: z.string(), // currency format like "$192"
  date: z.string(), // YYYY-MM-DD format
});

const ProductSchema = z.object({
  id: z.string(), // product IDs like "A1", "B2"
  name: z.string(), // product name
  sales: z.number(), // sales count
});

const TablesSchema = z.object({
  recentTransactions: z.array(TransactionSchema),
  topProducts: z.array(ProductSchema),
});

// Map schemas
const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  label: z.string(), // city name
  activity: z.number(), // activity count
});

const MapDataSchema = z.object({
  locations: z.array(LocationSchema),
});

// Main dashboard schema
const DashboardDataSchema = z.object({
  charts: ChartsSchema,
  tables: TablesSchema,
  map: MapDataSchema,
});

// API response schema
const DashboardApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    dashboardData: DashboardDataSchema,
  }),
});

// TypeScript types from schemas
export type SalesOverTimeChart = z.infer<typeof SalesOverTimeChartSchema>;
export type UserEngagementChart = z.infer<typeof UserEngagementChartSchema>;
export type Charts = z.infer<typeof ChartsSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Tables = z.infer<typeof TablesSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type MapData = z.infer<typeof MapDataSchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;
export type DashboardApiResponse = z.infer<typeof DashboardApiResponseSchema>;

// Additional type safety: API response types
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export type DashboardApiResponseType = ApiResponse<{
  dashboardData: DashboardData;
}>;

// Export schemas for validation
export {
  SalesOverTimeChartSchema,
  UserEngagementChartSchema,
  ChartsSchema,
  TransactionSchema,
  ProductSchema,
  TablesSchema,
  LocationSchema,
  MapDataSchema,
  DashboardDataSchema,
  DashboardApiResponseSchema,
};

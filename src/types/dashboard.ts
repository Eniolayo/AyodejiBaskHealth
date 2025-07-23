import { z } from "zod";

// Chart data schemas
const SalesOverTimeChartSchema = z.object({
  labels: z.array(z.string()), // Date strings in YYYY-MM-DD format
  data: z.array(z.number()), // Sales values
});

const UserEngagementChartSchema = z.object({
  labels: z.array(z.string()), // Week labels like "Week 1", "Week 2", etc.
  data: z.array(z.number()), // Engagement values
});

const ChartsSchema = z.object({
  salesOverTime: SalesOverTimeChartSchema,
  userEngagement: UserEngagementChartSchema,
});

// Table data schemas
const TransactionSchema = z.object({
  id: z.number(),
  user: z.string(),
  amount: z.string(), // Formatted as currency string like "$192"
  date: z.string(), // Date string in YYYY-MM-DD format
});

const ProductSchema = z.object({
  id: z.string(), // Product ID like "A1", "B2", etc.
  name: z.string(), // Product name
  sales: z.number(), // Sales count
});

const TablesSchema = z.object({
  recentTransactions: z.array(TransactionSchema),
  topProducts: z.array(ProductSchema),
});

// Map data schemas
const LocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  label: z.string(), // City name
  activity: z.number(), // Activity level/count
});

const MapDataSchema = z.object({
  locations: z.array(LocationSchema),
});

// Main dashboard data schema
const DashboardDataSchema = z.object({
  charts: ChartsSchema,
  tables: TablesSchema,
  map: MapDataSchema,
});

// Root API response schema
const DashboardApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    dashboardData: DashboardDataSchema,
  }),
});

// Infer TypeScript types from schemas
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

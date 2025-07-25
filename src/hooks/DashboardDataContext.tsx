"use client";

import {
  createContext,
  useContext,
  useState,
  useReducer,
  type ReactNode,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";
import { DashboardApiResponse } from "@/types/dashboard";

// Types
interface DashboardDataContextProps {
  data: DashboardApiResponse | undefined;
  error: unknown;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  manualRefresh: () => void;
  pauseAutoRefresh: () => void;
  resumeAutoRefresh: () => void;
  toggleAutoRefresh: () => void;
  isAutoRefetchEnabled: boolean;
  refetchInterval: number;
  // Example derived/calculated state
  summary: DashboardSummary | null;
}

interface DashboardDataProviderProps {
  children: ReactNode;
  refetchInterval?: number;
  enableAutoRefetch?: boolean;
}

// Example: Derived summary state
interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  grossProfit: number;
  totalExpenses: number;
}

const DashboardDataContext = createContext<
  DashboardDataContextProps | undefined
>(undefined);

function summaryReducer(
  state: DashboardSummary | null,
  action: { type: "set"; payload: DashboardApiResponse | undefined }
): DashboardSummary | null {
  if (!action.payload?.data?.dashboardData) return null;
  const d = action.payload.data.dashboardData;
  return {
    totalSales: d.charts.salesOverTime.data.reduce(
      (a: number, b: number) => a + b,
      0
    ),
    totalOrders: d.tables.recentTransactions.length,
    totalExpenses: 12500, // Placeholder
    grossProfit:
      d.charts.salesOverTime.data.reduce((a: number, b: number) => a + b, 0) -
      12500,
  };
}

export function DashboardDataProvider({
  children,
  refetchInterval = 5000,
  enableAutoRefetch = true,
}: DashboardDataProviderProps) {
  const [isAutoRefetchEnabled, setIsAutoRefetchEnabled] =
    useState(enableAutoRefetch);

  const { data, error, isLoading, isFetching, isError, refetch, isSuccess } =
    useQuery<DashboardApiResponse>({
      queryKey: ["dashboard-data"],
      queryFn: fetchDashboardData,
      refetchInterval: isAutoRefetchEnabled ? refetchInterval : false,
      refetchIntervalInBackground: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000,
      gcTime: 60000,
    });

  // Derived/calculated state using useReducer
  const [summary, dispatchSummary] = useReducer(summaryReducer, null);

  useEffect(() => {
    dispatchSummary({ type: "set", payload: data });
  }, [data]);

  // Manual refresh function
  const manualRefresh = () => {
    refetch();
  };

  // Pause auto-refresh
  const pauseAutoRefresh = () => {
    setIsAutoRefetchEnabled(false);
  };

  // Resume auto-refresh
  const resumeAutoRefresh = () => {
    setIsAutoRefetchEnabled(true);
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setIsAutoRefetchEnabled((prev) => !prev);
  };

  return (
    <DashboardDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardDataContext() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error(
      "useDashboardDataContext must be used within a DashboardDataProvider"
    );
  }
  return ctx;
}

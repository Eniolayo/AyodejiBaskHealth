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

type DashboardDataContextProps = {
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
  summary: DashboardSummary | null;
};

type DashboardDataProviderProps = {
  children: ReactNode;
  refetchInterval?: number;
  enableAutoRefetch?: boolean;
};

type DashboardSummary = {
  totalSales: number;
  totalOrders: number;
  grossProfit: number;
  totalExpenses: number;
};

const DashboardDataContext = createContext<
  DashboardDataContextProps | undefined
>(undefined);

function summaryReducer(
  state: DashboardSummary | null,
  action: { type: "set"; payload: DashboardApiResponse | undefined }
): DashboardSummary | null {
  if (!action.payload?.data?.dashboardData) return null;
  const d = action.payload.data.dashboardData;

  const totalSales = d.charts.salesOverTime.data.reduce(
    (a: number, b: number) => a + b,
    0
  );

  // Dynamically calculate expenses using 3 averaged methods: % of sales, per transaction, and per product sold
  const calculateExpenses = (): number => {
    const expensePercentage = 0.35; // 35% of sales
    const percentageBasedExpenses = totalSales * expensePercentage;

    const totalTransactions = d.tables.recentTransactions.length;
    const avgTransactionValue = totalSales / totalTransactions || 0;
    const transactionBasedExpenses =
      totalTransactions * (avgTransactionValue * 0.4); // 40% per transaction

    const totalProductSales = d.tables.topProducts.reduce(
      (sum, product) => sum + product.sales,
      0
    );
    const productBasedExpenses = totalProductSales * 25; // $25 per product sold

    const calculatedExpenses = Math.round(
      (percentageBasedExpenses +
        transactionBasedExpenses +
        productBasedExpenses) /
        3
    );

    return Math.max(
      Math.min(calculatedExpenses, totalSales * 0.8),
      totalSales * 0.2
    ); // clamp between 20–80% of sales
  };

  const totalExpenses = calculateExpenses();

  return {
    totalSales,
    totalOrders: d.tables.recentTransactions.length,
    totalExpenses,
    grossProfit: totalSales - totalExpenses,
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

  const [summary, dispatchSummary] = useReducer(summaryReducer, null);

  useEffect(() => {
    dispatchSummary({ type: "set", payload: data });
  }, [data]);

  const manualRefresh = () => {
    refetch();
  };

  const pauseAutoRefresh = () => {
    setIsAutoRefetchEnabled(false);
  };

  const resumeAutoRefresh = () => {
    setIsAutoRefetchEnabled(true);
  };

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

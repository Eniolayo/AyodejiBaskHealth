"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";
import { DashboardApiResponse } from "@/types/dashboard";
import { useState } from "react";

interface UseDashboardDataProps {
  refetchInterval?: number;
  enableAutoRefetch?: boolean;
}

export function useDashboardData({
  refetchInterval = 5000,
  enableAutoRefetch = true,
}: UseDashboardDataProps = {}) {
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
      staleTime: 1000, // Data is stale after 1 second to ensure fresh data
      gcTime: 60000, // Keep data in cache for 1 minute
    });

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
    setIsAutoRefetchEnabled(!isAutoRefetchEnabled);
  };

  return {
    // Data
    data,
    error,

    // Loading states
    isLoading, // Initial loading
    isFetching, // Any fetch in progress (including background refetches)
    isError,
    isSuccess,

    // Controls
    manualRefresh,
    pauseAutoRefresh,
    resumeAutoRefresh,
    toggleAutoRefresh,

    // State
    isAutoRefetchEnabled,
    refetchInterval,
  };
}

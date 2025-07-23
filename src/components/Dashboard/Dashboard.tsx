"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";

export function Dashboard() {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    manualRefresh,
    toggleAutoRefresh,
    isAutoRefetchEnabled,
    refetchInterval,
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">
            Error loading dashboard: {error?.message || "Unknown error"}
          </p>
          <Button onClick={manualRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">
                Health Dashboard
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isFetching ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span>{isFetching ? "Updating..." : "Up to date"}</span>
                </div>
                {isAutoRefetchEnabled && (
                  <span className="text-xs">
                    (Auto-refresh: {refetchInterval / 1000}s)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Data Controls */}
              <Button
                onClick={toggleAutoRefresh}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                {isAutoRefetchEnabled ? (
                  <>
                    <Pause className="h-3 w-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    <span>Resume</span>
                  </>
                )}
              </Button>

              <Button
                onClick={manualRefresh}
                variant="outline"
                size="sm"
                disabled={isFetching}
                className="flex items-center space-x-1"
              >
                <RefreshCw
                  className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </Button>

              {/* Theme Switcher */}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {data ? (
          <div className="space-y-8">
            {/* Data Preview */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                Dashboard Data Preview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-muted-foreground mb-2">
                    Charts
                  </h3>
                  <p className="text-2xl font-bold text-foreground">
                    {data.data.dashboardData.charts ? 2 : 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sales & Engagement
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-muted-foreground mb-2">
                    Tables
                  </h3>
                  <p className="text-2xl font-bold text-foreground">
                    {data.data.dashboardData.tables ? 2 : 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transactions & Products
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-medium text-muted-foreground mb-2">
                    Map Locations
                  </h3>
                  <p className="text-2xl font-bold text-foreground">
                    {data.data.dashboardData.map?.locations?.length || 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active Cities
                  </p>
                </div>
              </div>
            </div>

            {/* Raw Data Display */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                Raw API Response
              </h2>
              <pre className="bg-muted rounded-lg p-4 overflow-auto text-sm text-muted-foreground">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </main>
    </div>
  );
}

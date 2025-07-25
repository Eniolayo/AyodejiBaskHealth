"use client";

import React, { useEffect, useState, useRef } from "react";
import Typography from "@/components/ui/typography";
import { PlayIcon, ReplayIcon } from "@/components/ui/icons";
import { Pause } from "lucide-react";
import { useDashboardDataContext } from "@/contexts/DashboardDataContext";

export const DashboardHeader = () => {
  const {
    isFetching,
    isAutoRefetchEnabled,
    refetchInterval,
    toggleAutoRefresh,
    manualRefresh,
  } = useDashboardDataContext();

  const [countdown, setCountdown] = useState(refetchInterval / 1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset countdown on refetchInterval or when auto-refresh is toggled
  useEffect(() => {
    setCountdown(refetchInterval / 1000);
  }, [refetchInterval, isAutoRefetchEnabled]);

  // Countdown effect
  useEffect(() => {
    if (!isAutoRefetchEnabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return refetchInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoRefetchEnabled, refetchInterval]);

  // Reset countdown on manual refresh
  const handleManualRefresh = () => {
    setCountdown(refetchInterval / 1000);
    manualRefresh();
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <Typography variant="heading-03" className="text-text-primary">
        Dashboard
      </Typography>
      <div className="flex items-center gap-2">
        <Typography variant="body-02" className="text-neutral-400">
          {isFetching ? "Updating..." : "Up to date"}
        </Typography>
        <button
          className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[13px]"
          onClick={toggleAutoRefresh}
        >
          {isAutoRefetchEnabled ? (
            <>
              <Pause className="text-text-primary size-3" /> Pause auto-fetch
            </>
          ) : (
            <>
              <PlayIcon className="text-text-primary size-3" /> Resume
              auto-fetch
            </>
          )}
        </button>
        <button
          className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px]"
          onClick={handleManualRefresh}
          title="Refresh now"
        >
          <ReplayIcon className="text-text-primary size-5 scale-x-[-1] transform" />
        </button>
        {isAutoRefetchEnabled && (
          <Typography variant="body-02" className="ml-2 text-neutral-400">
            (Auto-refresh: {countdown}s)
          </Typography>
        )}
      </div>
    </div>
  );
};

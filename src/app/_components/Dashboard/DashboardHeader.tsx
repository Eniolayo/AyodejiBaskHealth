"use client";

import React, { useEffect, useState } from "react";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PlayIcon, ReplayIcon } from "@/components/ui/icons";
import { Pause } from "lucide-react";
import { useDashboardDataContext } from "@/contexts/DashboardDataContext";
import { formatTimeAgo } from "@/lib/utils";

interface DashboardHeaderProps {
  cardId?: string;
  rowId?: string;
}

export const DashboardHeader = ({
  cardId: _cardId,
  rowId: _rowId,
}: DashboardHeaderProps = {}) => {
  const {
    isFetching,
    isAutoRefetchEnabled,
    toggleAutoRefresh,
    manualRefresh,
    lastUpdated,
  } = useDashboardDataContext();

  // Force re-render every minute to update "time ago" text
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Only set up interval when auto-refresh is paused and we have a last updated time
    if (!isAutoRefetchEnabled && lastUpdated) {
      const interval = setInterval(() => {
        forceUpdate({});
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [isAutoRefetchEnabled, lastUpdated]);

  // Reset countdown on manual refresh
  const handleManualRefresh = () => {
    manualRefresh();
  };

  const getStatusText = () => {
    if (isFetching) {
      return "Updating...";
    }

    if (!isAutoRefetchEnabled && lastUpdated) {
      return `Last updated ${formatTimeAgo(lastUpdated)}`;
    }

    return "Up to date";
  };

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
      <Typography variant="heading-03" className="text-text-primary">
        Dashboard
      </Typography>
      <div className="flex items-center justify-between gap-2 md:justify-baseline">
        <Typography variant="body-02" className="text-neutral-400">
          {getStatusText()}
        </Typography>
        <div className="flex gap-2">
          <Button variant="navigation" size="lg" onClick={toggleAutoRefresh}>
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
          </Button>
          <Button
            variant="navigation"
            onClick={handleManualRefresh}
            title="Refresh now"
          >
            <ReplayIcon className="text-text-primary size-5 scale-x-[-1] transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/contexts/DashboardDataContext";

type Location = {
  id: string;
  name: string;
  coordinates: [number, number];
  orders: number;
  revenue: number;
};

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-neutral-100 p-4">
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" variant="rectangular" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  ),
});

export const LocationsMapSection = () => {
  const { data, isLoading } = useDashboardDataContext();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  let locationData;
  if (data?.data?.dashboardData) {
    const d = data.data.dashboardData;
    locationData = d.map.locations.map((loc: any, i: number) => ({
      id: String(i + 1),
      name: loc.label,
      coordinates: [loc.latitude, loc.longitude] as [number, number],
      orders: loc.activity,
      revenue: loc.activity * 100, // Placeholder
    }));
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Locations" />
        <CardContent>
          <div className="relative h-[600px] p-3">
            <Skeleton
              className="h-64 w-full rounded-lg"
              variant="rectangular"
            />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="px-3 pb-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!locationData) return null;

  return (
    <Card>
      <CardHeader title="Locations" />
      <CardContent>
        <div className="relative h-[600px] p-3">
          {isClient ? (
            <MapComponent
              locationData={locationData}
              onLocationClick={handleLocationClick}
              selectedLocation={selectedLocation}
              onCloseLocation={() => setSelectedLocation(null)}
            />
          ) : (
            <div className="h-full w-full bg-neutral-100 p-4">
              <div className="space-y-4">
                <Skeleton
                  className="h-64 w-full rounded-lg"
                  variant="rectangular"
                />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="px-3 pb-4">
          <Typography variant="body-02" className="text-text-primary">
            {locationData.length} active locations
          </Typography>
          <Typography variant="body-02" className="text-neutral-400">
            Click markers for details
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

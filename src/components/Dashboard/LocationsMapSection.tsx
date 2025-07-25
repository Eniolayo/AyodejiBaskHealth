"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";

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

type Location = {
  id: string;
  name: string;
  coordinates: [number, number];
  orders: number;
  revenue: number;
};

const locationData: Location[] = [
  {
    id: "1",
    name: "Chicago, IL",
    coordinates: [41.8781, -87.6298],
    orders: 450,
    revenue: 125000,
  },
  {
    id: "2",
    name: "Washington, DC",
    coordinates: [38.9072, -77.0369],
    orders: 320,
    revenue: 89000,
  },
  {
    id: "3",
    name: "Philadelphia, PA",
    coordinates: [39.9526, -75.1652],
    orders: 280,
    revenue: 76000,
  },
  {
    id: "4",
    name: "New York, NY",
    coordinates: [40.7128, -74.006],
    orders: 520,
    revenue: 145000,
  },
];

export const LocationsMapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

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

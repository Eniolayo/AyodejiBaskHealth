"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

import Typography from "@/components/ui/typography";

// Fix for default markers
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  orders: number;
  revenue: number;
}

interface MapComponentProps {
  locationData: Location[];
  onLocationClick: (location: Location) => void;
  selectedLocation: Location | null;
  onCloseLocation: () => void;
}

// Custom marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: #0d72a5;
      border: 3px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Map event handler component
function MapEvents() {
  useMapEvents({
    click: () => {
      // Handle map click events if needed
    },
  });
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({
  locationData,
  onLocationClick,
  selectedLocation,
  onCloseLocation,
}) => {
  return (
    <>
      <MapContainer
        center={[40, -80]}
        zoom={5}
        className="h-full w-full"
        style={{ background: "#3e4244" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents />

        {locationData.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={createCustomIcon()}
            eventHandlers={{
              click: () => onLocationClick(location),
            }}
          >
            <Popup className="location-popup">
              <div className="p-2">
                <Typography variant="body-01" className="mb-1 font-medium">
                  {location.name}
                </Typography>
                <Typography variant="body-02" className="mb-1 text-neutral-400">
                  Orders: {location.orders}
                </Typography>
                <Typography variant="body-02" className="text-neutral-400">
                  Revenue: ${location.revenue.toLocaleString()}
                </Typography>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Location Details Panel */}
      {selectedLocation && (
        <div className="absolute right-3 bottom-3 left-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <Typography
              variant="body-01"
              className="text-text-primary font-medium"
            >
              {selectedLocation.name}
            </Typography>
            <button
              onClick={onCloseLocation}
              className="text-neutral-400 hover:text-neutral-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Typography variant="body-02" className="text-neutral-400">
                Orders
              </Typography>
              <Typography
                variant="body-01"
                className="text-text-primary font-medium"
              >
                {selectedLocation.orders}
              </Typography>
            </div>
            <div>
              <Typography variant="body-02" className="text-neutral-400">
                Revenue
              </Typography>
              <Typography
                variant="body-01"
                className="text-text-primary font-medium"
              >
                ${selectedLocation.revenue.toLocaleString()}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;

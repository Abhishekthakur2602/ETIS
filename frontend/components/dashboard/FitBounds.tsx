"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitBounds({ incidents }: { incidents: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !incidents?.length) return;

    const points = incidents
      .map((item) => [Number(item.latitude), Number(item.longitude)])
      .filter(
        ([lat, lng]) =>
          !isNaN(lat) &&
          !isNaN(lng) &&
          lat >= -90 &&
          lat <= 90 &&
          lng >= -180 &&
          lng <= 180,
      );

    if (points.length === 0) return;

    const bounds = L.latLngBounds(points as [number, number][]);

    setTimeout(() => {
      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }, 100);
  }, [incidents, map]);

  return null;
}

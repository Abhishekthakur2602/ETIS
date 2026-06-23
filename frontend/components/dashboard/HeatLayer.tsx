"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

export default function HeatLayer({ incidents }: { incidents: any[] }) {
  const map = useMap();

  useEffect(() => {
    if (!incidents || incidents.length === 0) return;

    const points = incidents.map((item) => [
      Number(item.latitude),
      Number(item.longitude),
      1,
    ]);

    const heatLayer = (L as any).heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 17,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [incidents, map]);

  return null;
}

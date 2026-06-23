"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FitBounds from "@/components/dashboard/FitBounds";
import HeatLayer from "./HeatLayer";



import { getMapIncidents } from "@/lib/mapApi";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);

const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

// MARKERS

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function getMarkerIcon(severity: string) {
  switch (severity) {
    case "Critical":
      return redIcon;

    case "High":
      return orangeIcon;

    case "Medium":
      return yellowIcon;

    default:
      return greenIcon;
  }
}

export default function LiveMap() {
  const [incidents, setIncidents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const data = await getMapIncidents();

      setIncidents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const validIncidents = incidents.filter(
    (item) => item.latitude !== null && item.longitude !== null,
  );

  const defaultCenter: [number, number] =
    validIncidents.length > 0
      ? [
          Number(validIncidents[0].latitude),
          Number(validIncidents[0].longitude),
        ]
      : [28.6139, 77.209];

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* HEADER */}

      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Live Incident Map</h2>

          <p className="text-sm text-slate-400">Real-Time ETIS Monitoring</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-xl text-sm font-semibold">
            {validIncidents.length} Active
          </div>

          <div className="text-green-400 text-sm">● LIVE</div>
        </div>
      </div>

      {/* LEGEND */}

      <div className="flex gap-4 px-4 py-2 text-xs border-b border-slate-800">
        <div className="flex items-center gap-1">🔴 Critical</div>

        <div className="flex items-center gap-1">🟠 High</div>

        <div className="flex items-center gap-1">🟡 Medium</div>

        <div className="flex items-center gap-1">🟢 Low</div>
      </div>

      {/* MAP */}

      <div className="h-[420px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            Loading Map...
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={11}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <FitBounds incidents={validIncidents} />
            <HeatLayer incidents={validIncidents}/>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {validIncidents.map((incident) => (
              <Marker
                key={incident.id}
                icon={getMarkerIcon(incident.severity)}
                position={[
                  Number(incident.latitude),
                  Number(incident.longitude),
                ]}
              >
                <Popup>
                  <div className="min-w-[180px] space-y-2">
                    <h3 className="font-bold text-lg capitalize">
                      {incident.event_cause}
                    </h3>

                    <p>Severity: {incident.severity}</p>

                    <p>Incident ID: #{incident.id}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

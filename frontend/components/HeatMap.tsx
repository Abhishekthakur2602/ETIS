"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker
} from "react-leaflet";

const center: [number, number] = [
  13.0,
  77.58
];

const points: [number, number][] = [

  [13.04, 77.51],

  [12.95, 77.58],

  [13.02, 77.60]
];

export default function HeatMap() {

  return (

    <MapContainer
      center={center}
      zoom={11}
      style={{
        height: "600px",
        width: "100%"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((point, index) => (

        <CircleMarker
          key={index}
          center={point}
          radius={8}
        />

      ))}

    </MapContainer>
  );
}
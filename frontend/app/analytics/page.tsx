"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { zone: "Central", events: 623 },
  { zone: "West", events: 433 },
  { zone: "North", events: 413 },
  { zone: "South", events: 354 },
];

export default function Analytics() {

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">

        ETIS Analytics

      </h1>

      <BarChart
        width={700}
        height={400}
        data={data}
      >

        <XAxis dataKey="zone" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="events" />

      </BarChart>

    </main>
  );
}
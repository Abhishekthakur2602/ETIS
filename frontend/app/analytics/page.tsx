"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { zone: "Central", events: 623 },
  { zone: "West", events: 433 },
  { zone: "North", events: 413 },
  { zone: "South", events: 354 },
];

export default function Analytics() {
  const totalEvents = data.reduce((sum, item) => sum + item.events, 0);

  const highestZone = data.reduce((a, b) => (a.events > b.events ? a : b));

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">ETIS Analytics Dashboard</h1>

          <p className="text-slate-400 mt-2">
            Traffic Event Intelligence & Insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Total Events</h3>

            <p className="text-4xl font-bold mt-2 text-cyan-400">
              {totalEvents}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Highest Activity Zone</h3>

            <p className="text-3xl font-bold mt-2 text-green-400">
              {highestZone.zone}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Average Events</h3>

            <p className="text-4xl font-bold mt-2 text-yellow-400">
              {Math.round(totalEvents / data.length)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Events by Zone</h2>

          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="zone" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="events" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Table */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Zone Statistics</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3">Zone</th>

                <th className="text-left py-3">Events</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.zone} className="border-b border-slate-800">
                  <td className="py-3">{item.zone}</td>

                  <td className="py-3">{item.events}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

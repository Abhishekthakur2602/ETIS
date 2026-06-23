"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ResourceChart({ result }: any) {
  const data = [
    {
      name: "Constables",
      value: result?.constables || 0,
    },
    {
      name: "ASI",
      value: result?.asi || 0,
    },
    {
      name: "Inspector",
      value: result?.inspector || 0,
    },
    {
      name: "Barricades",
      value: result?.barricades || 0,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Resource Deployment Forecast</h2>

        <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm">
          AI Generated
        </span>
      </div>

      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

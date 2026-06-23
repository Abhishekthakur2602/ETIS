"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import { getAnalytics } from "@/lib/dashboardApi";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6"];

export default function AnalyticsChart() {
  const [severityData, setSeverityData] = useState<any[]>([]);
  const [zoneData, setZoneData] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const analytics = await getAnalytics();

      setSeverityData(
        analytics?.severity_distribution?.map(([name, value]: any) => ({
          name,
          value,
        })) || [],
      );

      setZoneData(
        analytics?.top_zones?.map(([zone, count]: any) => ({
          zone,
          count,
        })) || [],
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Severity Distribution</h2>

        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={severityData} dataKey="value" outerRadius={100}>
                {severityData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Top Zones</h2>

        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneData}>
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

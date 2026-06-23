"use client";

import { useEffect, useState } from "react";

import { getAdminDashboard, getLiveAssignments } from "@/lib/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const dashboard = await getAdminDashboard();

      const liveAssignments = await getLiveAssignments();

      setStats(dashboard);
      setAssignments(liveAssignments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Command Center</h1>

          <p className="text-slate-400 mt-2">
            Real-Time Traffic Operations Monitoring
          </p>
        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400">Total Incidents</p>

            <h2 className="text-4xl font-bold mt-2">{stats.total_incidents}</h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-red-300">Critical Incidents</p>

            <h2 className="text-4xl font-bold mt-2 text-red-400">
              {stats.critical_incidents}
            </h2>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <p className="text-green-300">Resolved</p>

            <h2 className="text-4xl font-bold mt-2 text-green-400">
              {stats.resolved_incidents}
            </h2>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
            <p className="text-blue-300">Active Officers</p>

            <h2 className="text-4xl font-bold mt-2 text-blue-400">
              {stats.active_officers}
            </h2>
          </div>
        </div>

        {/* System Status */}

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">System Status</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
              ● AI ONLINE
            </div>

            <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl">
              ● LIVE DATA
            </div>

            <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl">
              ● DISPATCH ACTIVE
            </div>
          </div>

          {/* Live Assignments */}

          <div className="border-t border-slate-800 pt-6">
            <h2 className="text-xl font-bold mb-4">Live Assignments</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-800">
                    <th className="pb-3">Incident</th>

                    <th className="pb-3">Officer</th>

                    <th className="pb-3">Severity</th>

                    <th className="pb-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-center text-slate-500"
                      >
                        No Assignments Found
                      </td>
                    </tr>
                  )}

                  {assignments.map((item: any) => (
                    <tr
                      key={item.assignment_id}
                      className="border-b border-slate-800"
                    >
                      <td className="py-3 capitalize">{item.event_cause}</td>

                      <td className="py-3">{item.officer}</td>

                      <td className="py-3">{item.severity}</td>

                      <td className="py-3">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

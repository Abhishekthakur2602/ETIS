"use client";

import { useEffect, useState } from "react";

import { getAssignments, updateStatus } from "@/lib/officerApi";

export default function OfficerDashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const officerId = Number(localStorage.getItem("user_id"));

      const data = await getAssignments(officerId);

      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatus(id: number, status: string) {
    try {
      await updateStatus(id, status);

      load();
    } catch (err) {
      console.error(err);
    }
  }

  function severityColor(severity: string) {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400";

      case "High":
        return "bg-orange-500/20 text-orange-400";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-green-500/20 text-green-400";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Assignments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Officer Dashboard</h1>

          <p className="text-slate-400 mt-2">Manage Assigned Incidents</p>
        </div>

        <div className="grid gap-5">
          {assignments.length === 0 && (
            <div className="bg-slate-900 p-8 rounded-2xl text-center text-slate-400">
              No Assignments Found
            </div>
          )}

          {assignments.map((item) => (
            <div
              key={item.assignment_id}
              className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold capitalize">
                    {item.event_cause}
                  </h2>

                  <p className="text-slate-400 mt-1">{item.zone}</p>
                </div>

                <span
                  className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      ${severityColor(item.severity)}
                    `}
                >
                  {item.severity}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm">Congestion</p>

                  <h3 className="text-2xl font-bold mt-1">
                    {item.congestion_score}%
                  </h3>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm">Status</p>

                  <h3 className="text-xl font-bold mt-1">{item.status}</h3>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm">Assignment</p>

                  <h3 className="text-xl font-bold mt-1">
                    #{item.assignment_id}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => handleStatus(item.assignment_id, "Accepted")}
                  className="
                      bg-blue-600
                      hover:bg-blue-700
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                    "
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatus(item.assignment_id, "En Route")}
                  className="
                      bg-yellow-600
                      hover:bg-yellow-700
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                    "
                >
                  En Route
                </button>

                <button
                  onClick={() => handleStatus(item.assignment_id, "Resolved")}
                  className="
                      bg-green-600
                      hover:bg-green-700
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                    "
                >
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

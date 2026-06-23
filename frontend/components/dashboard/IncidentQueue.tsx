"use client";

import { useEffect, useState } from "react";
import { getIncidents } from "@/lib/incidentsApi";

export default function IncidentQueue() {
  const [incidents, setIncidents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const data = await getIncidents();

      setIncidents(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }

  function getSeverityStyles(severity: string) {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

      default:
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  }

  function timeAgo(timestamp: string) {
    const diff = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 1000,
    );

    const mins = Math.floor(diff / 60);

    if (mins < 1) return "Just now";

    if (mins < 60) return `${mins} min ago`;

    const hrs = Math.floor(mins / 60);

    return `${hrs} hr ago`;
  }

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        Loading incidents...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl h-full">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold">Live Incident Feed</h2>

          <p className="text-xs text-slate-400">Real-time event monitoring</p>
        </div>

        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          LIVE
        </div>
      </div>

      {/* FEED */}

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {incidents.length === 0 && (
          <div className="text-slate-400">No incidents available</div>
        )}

        {incidents.map((item) => (
          <div
            key={item.id}
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-4
              hover:border-blue-500
              transition
            "
          >
            {/* TOP */}

            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold capitalize text-white">
                  {item.event_cause}
                </h3>

                <p className="text-xs text-slate-400 mt-1">{item.zone}</p>
              </div>

              <span
                className={`
                  px-3 py-1
                  rounded-full
                  text-xs
                  border
                  ${getSeverityStyles(item.severity)}
                `}
              >
                {item.severity}
              </span>
            </div>

            {/* CONGESTION */}

            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Congestion</span>

                <span className="text-white">{item.congestion_score}%</span>
              </div>

              <div className="h-2 bg-slate-700 rounded-full">
                <div
                  className="h-2 bg-red-500 rounded-full"
                  style={{
                    width: `${Math.min(item.congestion_score, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-between mt-4 text-xs">
              <span className="text-slate-500">Incident #{item.id}</span>

              <span className="text-slate-400">{timeAgo(item.created_at)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

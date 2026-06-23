"use client";

import { useEffect, useState } from "react";
import { getAvailableOfficers } from "@/lib/officersApi";

export default function Dispatch() {
  const [officers, setOfficers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const data = await getAvailableOfficers();
      setOfficers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dispatch Centre</h1>

          <p className="text-slate-400 mt-2">Real-Time Officer Availability</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400">
              Loading Officers...
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4 text-left">Officer</th>
                  <th className="p-4 text-left">Rank</th>
                  <th className="p-4 text-left">Distance</th>
                  <th className="p-4 text-left">ETA</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {officers.map((officer) => (
                  <tr key={officer.id} className="border-t border-slate-800">
                    <td className="p-4">{officer.name}</td>

                    <td className="p-4">{officer.rank}</td>

                    <td className="p-4">{officer.distance_km} km</td>

                    <td className="p-4">{officer.eta_minutes} mins</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          officer.status === "Available"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {officer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

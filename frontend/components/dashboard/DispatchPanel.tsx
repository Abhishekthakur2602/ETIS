"use client";

import { useEffect, useState } from "react";

import { Shield, Clock, MapPin, Users, Siren } from "lucide-react";

import { getAvailableOfficers } from "@/lib/officersApi";

export default function DispatchPanel() {
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

      const sorted = [...data].sort((a, b) => a.eta_minutes - b.eta_minutes);

      setOfficers(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const recommended = officers[0];

  return (
    <div
      className="
      bg-slate-900
      rounded-3xl
      border
      border-slate-800
      p-5
      shadow-xl
      h-full
    "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold">Dispatch Control</h2>

          <p className="text-xs text-slate-400">AI Recommended Response Team</p>
        </div>

        <div
          className="
          flex
          items-center
          gap-2
          px-3
          py-1
          rounded-full
          bg-green-500/10
          border
          border-green-500/20
        "
        >
          <Users size={14} className="text-green-400" />

          <span className="text-green-400 text-sm font-semibold">
            {officers.length}
          </span>
        </div>
      </div>

      {/* Recommended Officer */}

      {recommended && (
        <div
          className="
          mb-5
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/10
          p-4
        "
        >
          <div className="flex items-center gap-2 mb-2">
            <Siren size={18} className="text-cyan-400" />

            <span className="font-semibold text-cyan-400">
              Recommended Officer
            </span>
          </div>

          <h3 className="text-lg font-bold">{recommended.name}</h3>

          <p className="text-sm text-slate-400">{recommended.rank}</p>

          <div className="flex gap-5 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {recommended.distance_km} km
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} />
              {recommended.eta_minutes} mins
            </div>
          </div>
        </div>
      )}

      {/* Officers List */}

      <div className="space-y-3 max-h-[330px] overflow-y-auto">
        {loading && <div className="text-slate-400">Loading Officers...</div>}

        {!loading && officers.length === 0 && (
          <div className="text-slate-400">No Officers Available</div>
        )}

        {officers.map((officer) => (
          <div
            key={officer.id}
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-2xl
              p-4
              hover:border-cyan-500
              transition
            "
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{officer.name}</h3>

                <p className="text-xs text-slate-400">{officer.rank}</p>
              </div>

              <span
                className={
                  officer.status === "Available"
                    ? `
                      px-2
                      py-1
                      rounded-full
                      bg-green-500/20
                      text-green-400
                      text-xs
                    `
                    : `
                      px-2
                      py-1
                      rounded-full
                      bg-yellow-500/20
                      text-yellow-400
                      text-xs
                    `
                }
              >
                {officer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div
                className="
                  bg-slate-900
                  rounded-xl
                  p-2
                "
              >
                <p className="text-xs text-slate-500">Distance</p>

                <p className="font-semibold">{officer.distance_km} km</p>
              </div>

              <div
                className="
                  bg-slate-900
                  rounded-xl
                  p-2
                "
              >
                <p className="text-xs text-slate-500">ETA</p>

                <p className="font-semibold">{officer.eta_minutes} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <button
        className="
          mt-5
          w-full
          bg-cyan-600
          hover:bg-cyan-700
          transition
          rounded-2xl
          py-3
          font-semibold
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <Shield size={18} />
        Dispatch Recommended Team
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { getLatestPrediction } from "@/lib/latestPredictionApi";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

import KPISection from "@/components/dashboard/KPISection";
import IncidentQueue from "@/components/dashboard/IncidentQueue";
import DispatchPanel from "@/components/dashboard/DispatchPanel";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";

import AIRecommendation from "@/components/dashboard/AIRecommendation";
import HistoricalCard from "@/components/dashboard/HistoricalCard";
import ResourceChart from "@/components/dashboard/ResourceChart";
import AIOperationsBrief from "@/components/dashboard/AIOperationsBrief";
import QuickIncidentReport from "@/components/dashboard/QuickIncidentReport";

const LiveMap = dynamic(
  () => import("@/components/dashboard/LiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] rounded-3xl bg-slate-900 flex items-center justify-center text-slate-400">
        Loading Incident Map...
      </div>
    ),
  }
);

export default function Dashboard() {
 const [result, setResult] = useState<any>(null);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const data = await getLatestPrediction();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!result || Object.keys(result).length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div>
            <p className="text-red-400 text-sm uppercase tracking-widest">
              Active Incident
            </p>

            <h1 className="text-4xl font-bold mt-2 capitalize">
              {result?.event_cause || "Traffic Incident"}
            </h1>

            <p className="text-slate-400 mt-3">
              Zone: {result?.zone || "Central Zone"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-slate-500 text-xs">Severity</p>
              <p className="text-red-400 font-bold text-xl">
                {result?.severity || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-xs">Congestion</p>
              <p className="font-bold text-xl">{result?.congestion_score || 0}%</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs">Constables</p>
              <p className="font-bold text-xl">{result?.constables || 0}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs">Diversion</p>
              <p className="text-cyan-400 font-bold text-xl">
                {result ?.diversion || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#050816] via-slate-950 to-[#081120] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="max-w-[1800px] mx-auto px-5 py-4 space-y-4">
          {/* Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-white">
                  Traffic Operations Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                  Event-driven congestion forecasting and response management
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                <span className="text-slate-300">System Operational</span>
              </div>
            </div>
          </div>

          {/* High Impact Event Banner */}

          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold text-red-400">
                  High Impact Event Detected
                </h2>

                <p className="mt-2 text-slate-300 capitalize">
                  {result.event_cause || "Traffic Incident"}
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  Predicted traffic disruption requires operational response.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-slate-500">Severity</p>

                  <p className="font-semibold text-red-400">
                    {result.severity}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Congestion</p>

                  <p className="font-semibold">{result.congestion_score}%</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Officers</p>

                  <p className="font-semibold">{result.constables}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Diversion</p>

                  <p className="font-semibold text-cyan-400">
                    {result.diversion}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Section */}
          <KPISection />
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-2xl font-bold">
                  Bengaluru Traffic Challenges
                </h2>

                <p className="text-slate-400">
                  Real-world congestion drivers monitored by ETIS
                </p>
              </div>

              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
                LIVE MONITORING
              </span>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <h3 className="font-semibold text-red-400">
                  Construction Diversions
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Metro expansion and road widening activities.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
                <h3 className="font-semibold text-yellow-400">
                  Peak Hour Congestion
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Office corridor traffic spikes.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">
                <h3 className="font-semibold text-purple-400">Public Events</h3>
                <p className="text-slate-400 text-sm mt-2">
                  Stadiums, rallies and festivals.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
                <h3 className="font-semibold text-cyan-400">
                  Emergency Corridors
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Ambulance route monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Map + Incident Intelligence */}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <LiveMap />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <AIOperationsBrief data={result} />
            </div>
          </div>

          {/* Decision Support Layer */}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-4">
              <AIRecommendation data={result} />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <IncidentQueue />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <QuickIncidentReport />
            </div>
          </div>

          {/* Resource Planning */}

          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 xl:col-span-8">
              <ResourceChart result={result} />
            </div>

            <div className="col-span-10 xl:col-span-4">
              <div className="sticky top-24">
                <DispatchPanel />
              </div>
            </div>
          </div>

          {/* Historical Learning */}

          <HistoricalCard history={result?.historical_summary || []} />
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-5">ETIS Incident Summary</h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-slate-500 text-sm">Event Cause</p>

                <p className="font-semibold capitalize">{result.event_cause}</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Severity</p>

                <p className="text-red-400 font-semibold">{result.severity}</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Congestion Score</p>

                <p className="font-semibold">{result.congestion_score}%</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Diversion</p>

                <p className="text-cyan-400 font-semibold">
                  {result.diversion}
                </p>
              </div>
            </div>
          </div>

          {/* Analytics */}

          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}
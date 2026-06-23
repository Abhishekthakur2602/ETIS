"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface RiskGaugeProps {
  score?: number;
  severity?: string;
  diversion?: string;

  eventCause?: string;
  zone?: string;
  incidentId?: number;

  criticalCount?: number;
}

export default function RiskGauge({
  score = 0,
  severity = "Unknown",
  diversion = "None",

  eventCause = "Unknown Event",
  zone = "Unknown Zone",
  incidentId,

  criticalCount = 0,
}: RiskGaugeProps) {
  const riskLevel =
    score >= 80
      ? "CRITICAL"
      : score >= 60
        ? "HIGH"
        : score >= 40
          ? "MEDIUM"
          : "LOW";

  const ringColor =
    score >= 80
      ? "#ef4444"
      : score >= 60
        ? "#f97316"
        : score >= 40
          ? "#eab308"
          : "#22c55e";

  const badgeClass =
    score >= 80
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : score >= 60
        ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
        : score >= 40
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-green-500/20 text-green-400 border-green-500/30";

  return (
    <div className="h-full rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white">ETIS Risk Index</h2>

          <p className="text-xs text-slate-400 mt-1">
            AI-Powered Congestion Forecast
          </p>
        </div>

        <div className="text-right">
          <div
            className={`px-3 py-1 rounded-full border text-xs font-bold ${badgeClass}`}
          >
            {riskLevel}
          </div>

          <div className="mt-2 text-xs text-red-400 font-semibold">
            🚨 {criticalCount} Critical Alerts
          </div>
        </div>
      </div>

      {/* Current Incident */}
      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/40 p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Current Incident
            </p>

            <h3 className="text-lg font-bold text-white mt-1 capitalize">
              {eventCause}
            </h3>

            <p className="text-sm text-slate-400">{zone}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Incident ID</p>

            <p className="font-bold text-cyan-400">#{incidentId}</p>
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div className="relative h-[280px] w-full min-w-0 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            barSize={18}
            data={[
              {
                value: score,
                fill: ringColor,
              },
            ]}
          >
            <RadialBar dataKey="value" cornerRadius={12} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white">{score}</h1>

          <span className="text-sm text-slate-400">Risk Score (%)</span>

          <div
            className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {riskLevel}
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="mt-4">
        <h3 className="font-semibold text-white mb-3">AI Decision Factors</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Event Cause</span>

            <span className="text-white capitalize">{eventCause}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Severity</span>

            <span className="text-red-400">{severity}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Zone</span>

            <span className="text-white">{zone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Diversion</span>

            <span className="text-orange-400">{diversion}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-800 pt-4">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Prediction Confidence</span>

          <span className="font-semibold text-cyan-400">96.8%</span>
        </div>
      </div>
    </div>
  );
}

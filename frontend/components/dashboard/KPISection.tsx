"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/dashboardApi";

import { AlertTriangle, Activity, Shield, TrendingUp } from "lucide-react";

export default function KPISection() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    getAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-3xl bg-slate-900 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Events",
      value: analytics.total_events,
      icon: Activity,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "Critical Events",
      value: analytics.critical_events,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "from-red-500/10 to-orange-500/10",
    },
    {
      title: "Avg Congestion",
      value: `${analytics.average_congestion}%`,
      icon: TrendingUp,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-orange-500/10",
    },
    {
      title: "System Status",
      value: "ACTIVE",
      icon: Shield,
      color: "text-green-400",
      bg: "from-green-500/10 to-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              rounded-3xl
              border
              border-slate-800
              bg-gradient-to-br
              ${card.bg}
              backdrop-blur-xl
              p-5
              shadow-xl
              hover:scale-[1.02]
              transition-all
              duration-300
            `}
          >
            <div className="flex items-center justify-between">
              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-slate-800
                flex
                items-center
                justify-center
              "
              >
                <Icon className={card.color} size={22} />
              </div>

              <div
                className="
                text-xs
                font-semibold
                text-green-400
                px-2
                py-1
                rounded-full
                bg-green-500/10
              "
              >
                LIVE
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-slate-400">{card.title}</p>

              <h2
                className={`
                text-4xl
                font-extrabold
                mt-2
                ${card.color}
              `}
              >
                {card.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

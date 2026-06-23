"use client";

import { useEffect, useState } from "react";
import { Bell, Activity, Clock3 } from "lucide-react";
import { getAnalytics } from "@/lib/analyticsApi";

export default function Navbar() {
  const [criticalCount, setCriticalCount] = useState(0);

  const [currentTime, setCurrentTime] = useState("");

  const [userName, setUserName] = useState("Operator");

  const [userRole, setUserRole] = useState("User");

  useEffect(() => {
    loadAnalytics();

    const analyticsInterval = setInterval(loadAnalytics, 10000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const storedName = localStorage.getItem("user_name");

    const storedRole = localStorage.getItem("role");

    if (storedName) {
      setUserName(storedName);
    }

    if (storedRole) {
      setUserRole(storedRole);
    }

    return () => {
      clearInterval(analyticsInterval);
      clearInterval(clockInterval);
    };
  }, []);

  async function loadAnalytics() {
    try {
      const data = await getAnalytics();

      setCriticalCount(data.critical_events || 0);
    } catch (err) {
      console.error(err);
    }
  }

  function getRoleColor() {
    switch (userRole.toLowerCase()) {
      case "admin":
        return "text-red-400";

      case "officer":
        return "text-cyan-400";

      default:
        return "text-green-400";
    }
  }

  return (
    <header
      className="
      h-20
      bg-slate-900/95
      backdrop-blur-xl
      border-b
      border-slate-800
      px-8
      flex
      items-center
      justify-between
      sticky
      top-0
      z-50
    "
    >
      {/* LEFT */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          ETIS Traffic Intelligence
        </h1>

        <p className="text-sm text-slate-400">
          Real-Time Event Monitoring & Prediction
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">
        {/* AI STATUS */}

        <div
          className="
          hidden md:flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-green-500/10
          border
          border-green-500/20
        "
        >
          <Activity size={16} className="text-green-400" />

          <span className="text-green-400 text-sm font-medium">AI Online</span>
        </div>

        {/* CLOCK */}

        <div
          className="
          hidden lg:flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-slate-800
          border
          border-slate-700
        "
        >
          <Clock3 size={16} className="text-slate-400" />

          <span className="text-sm text-white">{currentTime}</span>
        </div>

        {/* ALERTS */}

        <div
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-red-500/10
          border
          border-red-500/20
        "
        >
          <Bell size={18} className="text-red-400" />

          <span className="text-red-400 font-semibold">{criticalCount}</span>

          <span className="text-red-300 text-sm">Critical Alerts</span>
        </div>

        {/* USER */}

        <div className="flex items-center gap-3">
          <div
            className="
            w-11
            h-11
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex
            items-center
            justify-center
            font-bold
            text-white
            shadow-lg
          "
          >
            {userName?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-white">{userName}</p>

            <p className={`text-xs ${getRoleColor()}`}>
              {userRole.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

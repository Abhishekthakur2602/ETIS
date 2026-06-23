"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import { getNotifications } from "@/lib/notificationsApi";

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const data = await getNotifications();

      setNotifications(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-3xl
      p-5
    "
    >
      <div className="flex items-center gap-2 mb-4">
        <Bell size={18} className="text-cyan-400" />

        <h2 className="font-bold">Citizen Reports</h2>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="
              bg-slate-800
              rounded-xl
              p-3
            "
          >
            <div className="font-medium capitalize">{item.event_cause}</div>

            <div className="text-xs text-slate-400">{item.zone}</div>

            <div className="text-xs text-cyan-400 mt-1">{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

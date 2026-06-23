"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  AlertTriangle,
  BarChart3,
  Shield,
  LogOut,
  Activity,
} from "lucide-react";

function logout() {
  localStorage.clear();

  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  window.location.href = "/login";
}

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Event Analysis",
      href: "/events",
      icon: AlertTriangle,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Dispatch",
      href: "/dispatch",
      icon: Shield,
    },
  ];

  return (
    <aside className="w-72 bg-[#050816] border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center">
            <Activity size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">ETIS</h1>

            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Traffic Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="p-5">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-emerald-400 font-medium">Operational</span>
          </div>

          <p className="text-xs text-slate-500 mt-2">ETIS monitoring active</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  transition-all duration-200
                  ${
                    active
                      ? "bg-slate-800 border border-slate-700 text-white"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            py-3
            text-slate-300
            hover:bg-slate-800
            transition
          "
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

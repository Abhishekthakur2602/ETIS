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
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Logo */}

      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Activity size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-white">ETIS</h1>

            <p className="text-slate-400 text-sm">Command Center</p>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="p-5">
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

            <span className="text-green-400 font-semibold">System Online</span>
          </div>

          <p className="text-xs text-slate-400 mt-2">ETIS AI Engine Active</p>
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
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">{item.name}</span>
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
            bg-red-500/10
            hover:bg-red-500/20
            border
            border-red-500/20
            text-red-400
            py-3
            rounded-xl
            transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

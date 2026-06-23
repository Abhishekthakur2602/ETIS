"use client";

import { useEffect, useState } from "react";

import { getTimeline } from "@/lib/timelineApi";

import { CheckCircle2, Clock3 } from "lucide-react";

interface Props {
  predictionId: number;
}

export default function Timeline({ predictionId }: Props) {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, [predictionId]);

  async function load() {
    try {
      const data = await getTimeline(predictionId);

      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="
      bg-slate-900
      rounded-3xl
      border
      border-slate-800
      p-5
      shadow-xl
      min-h-[420px]
    "
    >
      <div className="mb-5">
        <h2 className="text-lg font-bold">Incident Timeline</h2>

        <p className="text-xs text-slate-400">Full Incident Lifecycle</p>
      </div>

      <div className="space-y-5 max-h-[400px] overflow-y-auto">
        {logs.length === 0 && (
          <div className="text-slate-400">No Activity Found</div>
        )}

        {logs.map((log, index) => (
          <div key={log.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <CheckCircle2 size={18} className="text-cyan-400" />

              {index !== logs.length - 1 && (
                <div
                  className="
                    w-[2px]
                    h-12
                    bg-slate-700
                    mt-2
                  "
                />
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium">{log.message}</div>

              <div
                className="
                  text-xs
                  text-slate-500
                  flex
                  items-center
                  gap-2
                  mt-1
                "
              >
                <Clock3 size={12} />

                {new Date(log.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

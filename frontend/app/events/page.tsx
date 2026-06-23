"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function EventsPage() {

  const [form, setForm] = useState({
    event_type: "unplanned",
    event_cause: "accident",
    priority: "High",
    requires_road_closure: true,

    zone: "Central Zone 2",
    police_station: "MG Road",

    latitude: 28.6139,
    longitude: 77.2090,

    hour: 18,
    day: 4,

    description: ""
  });

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function analyze() {

    setLoading(true);

    try {

      const response =
        await api.post(
          "/full-analysis",
          form
        );

      setResult(
        response.data
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          ETIS Event Analysis
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {/* FORM */}

          <div className="bg-slate-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold mb-6">
              Incident Details
            </h2>

            <div className="space-y-4">

              <input
                className="w-full p-3 rounded bg-slate-800"
                placeholder="Event Cause"
                value={form.event_cause}
                onChange={(e)=>
                  setForm({
                    ...form,
                    event_cause:
                      e.target.value
                  })
                }
              />

              <input
                className="w-full p-3 rounded bg-slate-800"
                placeholder="Zone"
                value={form.zone}
                onChange={(e)=>
                  setForm({
                    ...form,
                    zone:
                      e.target.value
                  })
                }
              />

              <textarea
                className="w-full p-3 rounded bg-slate-800"
                placeholder="Description"
                rows={5}
                value={
                  form.description
                }
                onChange={(e)=>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }
              />

              <button
                onClick={analyze}
                disabled={loading}
                className="w-full bg-blue-600 p-3 rounded-lg font-bold"
              >
                {
                  loading
                    ? "Analyzing..."
                    : "Analyze Event"
                }
              </button>

            </div>

          </div>

          {/* RESULT */}

          <div className="bg-slate-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold mb-6">
              AI Prediction
            </h2>

            {result && (

              <div className="space-y-4">

                <div>
                  Severity:
                  {" "}
                  {result.severity}
                </div>

                <div>
                  Congestion:
                  {" "}
                  {result.congestion_score}
                </div>

                <div>
                  Resource Score:
                  {" "}
                  {result.resource_score}
                </div>

                <div>
                  Constables:
                  {" "}
                  {result.constables}
                </div>

                <div>
                  Barricades:
                  {" "}
                  {result.barricades}
                </div>

                <div>
                  Diversion:
                  {" "}
                  {result.diversion}
                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}
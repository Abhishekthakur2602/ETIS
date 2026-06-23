"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function QuickIncidentReport() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    event_type: "unplanned",
    event_cause: "",
    priority: "High",

    zone: "",
    description: "",

    latitude: "",
    longitude: "",
  });

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,

          latitude: position.coords.latitude.toString(),

          longitude: position.coords.longitude.toString(),
        }));
      },

      (error) => {
        console.error(error);

        alert("Unable to fetch location");
      },
    );
  }

  async function submitIncident() {
    try {
      setLoading(true);

      setMessage("");

      await api.post("/user-report", {
        ...form,

        latitude: Number(form.latitude),

        longitude: Number(form.longitude),
      });

      setMessage("✅ Incident Submitted Successfully");

      setForm({
        event_type: "unplanned",
        event_cause: "",
        priority: "High",

        zone: "",
        description: "",

        latitude: "",
        longitude: "",
      });
    } catch (err) {
      console.error(err);

      setMessage("❌ Failed To Submit Incident");
    } finally {
      setLoading(false);
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
      shadow-xl
      min-h-[420px]
    "
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">Report Incident</h2>

        <p className="text-sm text-slate-400">
          Submit traffic issues directly to ETIS
        </p>
      </div>

      <div className="space-y-3">
        <input
          placeholder="Issue Type (Accident, Rally, Construction)"
          className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
          value={form.event_cause}
          onChange={(e) =>
            setForm({
              ...form,
              event_cause: e.target.value,
            })
          }
        />

        <input
          placeholder="Zone"
          className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
          value={form.zone}
          onChange={(e) =>
            setForm({
              ...form,
              zone: e.target.value,
            })
          }
        />

        <select
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          value={form.priority}
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value,
            })
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Latitude"
            className="p-3 rounded-xl bg-slate-800 text-white"
            value={form.latitude}
            onChange={(e) =>
              setForm({
                ...form,
                latitude: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Longitude"
            className="p-3 rounded-xl bg-slate-800 text-white"
            value={form.longitude}
            onChange={(e) =>
              setForm({
                ...form,
                longitude: e.target.value,
              })
            }
          />
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="
            w-full
            bg-cyan-600
            hover:bg-cyan-700
            transition
            p-3
            rounded-xl
            font-semibold
          "
        >
          📍 Use Current Location
        </button>

        <textarea
          rows={4}
          placeholder="Describe the issue..."
          className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button
          onClick={submitIncident}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition
            rounded-xl
            p-3
            font-semibold
          "
        >
          {loading ? "Submitting..." : "Submit Incident"}
        </button>

        {message && (
          <div
            className="
            text-center
            text-sm
            text-slate-300
            mt-2
          "
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

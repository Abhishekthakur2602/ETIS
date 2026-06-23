"use client";

import { useState } from "react";
import { login } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const res = await login({
        email,
        password,
      });

      console.log("Login Response:", res);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user_id", String(res.user_id));
      localStorage.setItem("role", res.role);
      localStorage.setItem("name", res.name);
      localStorage.setItem("user_name", res.name);

      document.cookie = `token=${res.token}; path=/`;

      if (res.role === "admin") {
        router.push("/admin/dashboard");
      } else if (res.role === "officer") {
        router.push("/officer/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);
      console.error("SERVER RESPONSE:", err?.response?.data);

      setError(err?.response?.data?.detail || err?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">ETIS</h1>

          <p className="text-slate-400 mt-2">
            Event Traffic Intelligence System
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4 outline-none border border-slate-700 focus:border-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-6 outline-none border border-slate-700 focus:border-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-xl font-semibold disabled:opacity-50 text-white"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          Don't have an account?
          <Link
            href="/signup"
            className="text-blue-400 ml-2 hover:text-blue-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

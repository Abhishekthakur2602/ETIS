"use client";

import { useState } from "react";
import { signup } from "@/lib/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSignup() {
    
try {

  setLoading(true);
  setError("");

  await signup({
    name,
    email,
    password,
    role,
  });

  alert(
    "Account Created Successfully"
  );

  router.push(
    "/login"
  );

} catch (err: any) {

  setError(
    err?.response?.data?.detail ||
    "Signup Failed"
  );

} finally {

  setLoading(false);

}
;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">ETIS</h1>

          <p className="text-slate-400 mt-2">Create Your Account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <input
          placeholder="Full Name"
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-6 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
        >
          <option value="user">Citizen</option>

          <option value="officer">Officer</option>

          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-semibold"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          Already have an account?
          <Link
            href="/login"
            className="text-green-400 ml-2 hover:text-green-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

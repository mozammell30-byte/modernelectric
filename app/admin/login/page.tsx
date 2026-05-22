"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string; retryAfterSec?: number };
      if (data.retryAfterSec) {
        const mins = Math.ceil(data.retryAfterSec / 60);
        setError(`${data.error ?? "Login blocked."} Try again in about ${mins} minute(s).`);
      } else {
        setError(data.error ?? "Incorrect password.");
      }
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="container-shell flex min-h-screen items-center justify-center py-10">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0b0b0b] p-6">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-[#9aa0a8]">Enter password to access admin panel.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-4 h-11 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-sm"
          />
          {error && <p className="mt-2 text-sm text-[#FF8585]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-[#00FF99] px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

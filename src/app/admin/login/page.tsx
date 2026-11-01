"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, KeyRound, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect passcode.");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f8fafc] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5722]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md card-glass rounded-3xl p-6 sm:p-10 relative z-10 border border-white/[0.1] shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#ff5722]/15 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722] mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">Inquiry Dashboard</h1>
          <p className="text-xs text-[#94a3b8] mt-1.5">
            Enter your secret passcode to access incoming messages &amp; mobile numbers.
          </p>
        </div>

        {error && (
          <div className="mb-5 sm:mb-6 p-3 sm:p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono text-[#e3e2e6] uppercase tracking-wider">
                Admin Passcode
              </label>
              <span className="text-[10px] text-[#ffb5a0] font-mono">
                (admin123 or abhi7890)
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] placeholder-[#475569] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-ember py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Passcode...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] text-center">
          <Link
            href="/"
            className="text-xs text-[#94a3b8] hover:text-[#ff5722] transition-colors"
          >
            ← Back to Portfolio Website
          </Link>
        </div>
      </div>
    </div>
  );
}

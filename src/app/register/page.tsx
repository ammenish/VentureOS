"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { VentureMark } from "@/components/ui/dot-matrix";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
        return;
      }

      // Route directly to the 6-step Onboarding wizard
      router.push("/onboarding");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-bg flex relative overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[30%] w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[80px]" />
      </div>

      {/* Left panel — Value proposition */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16 max-w-xl">
        <Link href="/" className="flex items-center gap-2.5 mb-12 group">
          <VentureMark className="w-8 h-8" />
          <span className="text-xl font-bold text-white/90 tracking-tight">VentureOS</span>
        </Link>

        <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
          From Day 1 Idea to
          <br />
          Institutional Scale.
        </h2>
        <p className="mt-4 text-white/40 text-base leading-relaxed">
          Create your intelligent startup workspace. Join thousands of founders leveraging context-aware AI, automated grant matching, and operational clarity.
        </p>

        <div className="mt-10 space-y-4">
          {[
            "Personalized startup roadmap & milestone engine",
            "Curated Indian grants & SISFS scheme discovery",
            "Deterministic cash runway & burn rate analytics",
            "Contextual AI co-pilot with approved action execution",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-white/50 hover:text-white/70 transition-colors duration-200">
              <CheckCircle2 className="w-4 h-4 text-white/30 flex-shrink-0" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 glass-card-dark p-5">
          <p className="text-xs text-white/40 leading-relaxed italic">
            &ldquo;VentureOS eliminated our chaotic spreadsheet sprawl and surfaced the exact SISFS grant incubator that gave us ₹20L in seed funding.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold text-white/60">
            — HealthTech Founder, Bengaluru
          </p>
        </div>
      </div>

      {/* Right panel — Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in">
          <div className="glass-card-dark p-8 sm:p-10">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <VentureMark className="w-7 h-7" />
              <span className="text-base font-bold text-white/90 tracking-tight">VentureOS</span>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create your startup account
              </h1>
              <p className="mt-2 text-sm text-white/40">
                Already have an account?{" "}
                <Link href="/login" className="text-white font-semibold hover:text-white/80 transition-colors underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="px-4 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">
                  {error}
                </div>
              )}

              {/* Name field */}
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors pointer-events-none z-10" />
                <input
                  id="name"
                  type="text"
                  placeholder="Founder Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-dark w-full h-12 pl-12 pr-5 text-sm font-medium"
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors pointer-events-none z-10" />
                <input
                  id="email"
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-dark w-full h-12 pl-12 pr-5 text-sm font-medium"
                  required
                />
              </div>

              {/* Password field */}
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors pointer-events-none z-10" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dark w-full h-12 pl-12 pr-12 text-sm font-medium"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-white/[0.08] hover:bg-white/[0.14] active:bg-white/[0.18] border border-white/[0.08] hover:border-white/[0.15] text-white text-sm font-bold uppercase tracking-[0.15em] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Start 6-Step Onboarding
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-white/25 mt-4 leading-relaxed">
                By continuing, you agree to our Terms of Service and Privacy Policy. Light mode workspace is ready out-of-the-box.
              </p>
            </form>
          </div>

          {/* Bottom dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/15" />
            <div className="w-2 h-2 rounded-full bg-white/08" />
          </div>
        </div>
      </div>
    </div>
  );
}

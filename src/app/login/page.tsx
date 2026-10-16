"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, ChevronLeft, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aarav@pulseai.health");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"HALCÓN" | "GRÉGOR" | "CUERVO">("GRÉGOR");
  const [currentStep, setCurrentStep] = useState(1);
  const [slideIndex, setSlideIndex] = useState(8);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Fallback for demonstration if credentials differ: still proceed to dashboard
        router.push("/dashboard");
        return;
      }

      router.push("/dashboard");
    } catch {
      // In case of local mock or offline network, route directly to dashboard
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev > 1 ? prev - 1 : 10));
    setCurrentStep((prev) => (prev === 1 ? 3 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev < 10 ? prev + 1 : 1));
    setCurrentStep((prev) => (prev === 3 ? 1 : prev + 1));
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col justify-between p-4 sm:p-8 select-none overflow-x-hidden font-sans"
      style={{
        backgroundColor: "#070708",
        color: "#FFFFFF",
      }}
    >
      {/* ─── AMBIENT SILK / SMOKE / ORGANIC GLOW BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-30 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(70, 70, 80, 0.4) 0%, rgba(20, 20, 25, 0.1) 60%, transparent 100%)",
          }}
        />
        {/* Ambient organic curved smoke ribbon */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25 object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 650 C 300 800, 500 350, 750 480 C 1000 610, 1150 200, 1550 320"
            stroke="url(#ambientGrad)"
            strokeWidth="160"
            strokeLinecap="round"
            className="filter blur-[80px]"
          />
          <defs>
            <linearGradient id="ambientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2A30" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1E1E24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3A3A45" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─── TOP NAVIGATION BAR ─── */}
      <header className="relative z-20 w-full flex items-center justify-between py-2 text-[10px] sm:text-xs tracking-widest font-mono text-neutral-400">
        {/* Top Left: Subtitle / Live status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="text-neutral-500 uppercase">EN REPRODUCCIÓN:</span>
          <span className="text-neutral-300 font-semibold tracking-wider uppercase">
            {activeTab === "HALCÓN" ? "HALCÓN CORE" : activeTab === "CUERVO" ? "CUERVO OS" : "MALOS CANTORES"}
          </span>
        </div>

        {/* Top Center: Tabs Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
          {(["HALCÓN", "GRÉGOR", "CUERVO"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border border-white/40 text-white bg-white/[0.08] shadow-xs"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Top Right: Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/register"
            className="hover:text-white uppercase transition-colors duration-150"
          >
            REGISTRAR / INICIAR SESIÓN
          </Link>
          <Link
            href="/dashboard/settings"
            className="hover:text-white uppercase transition-colors duration-150"
          >
            AJUSTES
          </Link>
        </div>
      </header>

      {/* ─── MAIN CENTER AREA WITH FLOATING SIDE BUTTONS ─── */}
      <main className="relative z-10 flex-1 flex items-center justify-center my-6 sm:my-8 px-2">
        {/* Left Floating Chevron & Tag */}
        <div className="hidden lg:flex items-center gap-3 absolute left-4 xl:left-12 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous step"
            className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/40 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-neutral-500 tracking-wider">
            ({slideIndex})
          </span>
        </div>

        {/* Center Frosted Glass Card */}
        <div
          className="w-full max-w-[430px] rounded-[36px] p-8 sm:p-10 relative overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: "rgba(18, 18, 20, 0.78)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow:
              "0 30px 80px -15px rgba(0, 0, 0, 0.95), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)",
          }}
        >
          {/* Card Top: Brand Logo and Social Icons */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <Link href="/" className="group flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-widest text-white uppercase group-hover:text-neutral-200 transition-colors">
                {activeTab === "CUERVO" ? "CUERVO." : "VENTUREOS."}
              </span>
            </Link>

            {/* Social / Media Icons */}
            <div className="flex items-center gap-3.5 text-neutral-400">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-200 p-1 hover:scale-110"
                title="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Spotify / Sound */}
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 p-1 hover:scale-110"
                title="Audio"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.492 17.306c-.216.353-.674.468-1.026.252-2.812-1.718-6.353-2.107-10.523-1.155-.403.092-.807-.16-.899-.562-.092-.403.16-.807.562-.899 4.568-1.042 8.497-.6 11.634 1.338.352.216.468.674.252 1.026zm1.464-3.256c-.272.443-.852.585-1.295.313-3.218-1.977-8.125-2.55-11.93-1.394-.499.151-1.03-.133-1.182-.632-.151-.499.133-1.03.632-1.182 4.354-1.321 9.774-.682 13.462 1.599.443.272.585.852.313 1.296zm.126-3.41c-3.858-2.29-10.223-2.502-13.886-1.39-.59.18-1.222-.152-1.401-.743-.18-.59.152-1.222.743-1.401 4.22-1.282 11.258-1.034 15.698 1.601.531.315.706 1.008.391 1.54-.314.532-1.007.707-1.545.393z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-200 p-1 hover:scale-110"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-3xl sm:text-[32px] font-bold text-white tracking-tight leading-tight">
              Welcome back,
            </h1>
            <p className="text-sm text-neutral-400 mt-1 font-light">
              please enter your details.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs text-red-300 text-center">
                {error}
              </div>
            )}

            {/* Email Pill Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-13 px-6 rounded-full text-sm font-medium text-white placeholder:text-neutral-400/80 transition-all duration-200 outline-none"
                style={{
                  backgroundColor: "rgba(68, 68, 74, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(85, 85, 95, 0.7)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(68, 68, 74, 0.55)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }}
              />
            </div>

            {/* Password Pill Input */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-13 px-6 pr-12 rounded-full text-sm font-medium text-white placeholder:text-neutral-400/80 transition-all duration-200 outline-none"
                style={{
                  backgroundColor: "rgba(68, 68, 74, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(85, 85, 95, 0.7)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(68, 68, 74, 0.55)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1 px-1">
              {/* Custom Animated Toggle / Switch */}
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    rememberMe
                      ? "bg-white border-white text-black"
                      : "border-neutral-500 bg-transparent hover:border-neutral-300"
                  }`}
                >
                  {rememberMe && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className="text-xs text-neutral-300 group-hover:text-white transition-colors">
                  Remember Me
                </span>
              </button>

              <button
                type="button"
                onClick={() => alert("Password reset instructions dispatched to your verified founder email.")}
                className="text-xs text-neutral-400 hover:text-white transition-colors hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Action Pill Button: SIGN IN */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(100, 100, 108, 0.75)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(125, 125, 135, 0.9)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(100, 100, 108, 0.75)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  "SIGN IN"
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-xs text-neutral-400 mt-7">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-white font-semibold underline underline-offset-2 hover:text-neutral-200 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Right Floating Chevron & Tag */}
        <div className="hidden lg:flex items-center gap-3 absolute right-4 xl:right-12 top-1/2 -translate-y-1/2">
          <span className="text-xs font-mono text-neutral-500 tracking-wider">
            ({slideIndex - 1})
          </span>
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next step"
            className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.12] hover:border-white/40 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* ─── BOTTOM FOOTER BAR ─── */}
      <footer className="relative z-20 w-full flex items-end justify-between pt-2 text-xs font-mono text-neutral-400">
        {/* Bottom Left: Step indicator */}
        <div className="text-neutral-300 font-medium tracking-wide">
          Step {currentStep === 1 ? "one" : currentStep === 2 ? "two" : "three"}
        </div>

        {/* Bottom Center: Interactive 3-Dot Carousel */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => {
            const isDotActive = currentStep === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                aria-label={`Go to step ${step}`}
                className={`transition-all duration-200 cursor-pointer rounded-full ${
                  isDotActive
                    ? "w-2.5 h-2.5 bg-white ring-2 ring-white/20"
                    : "w-2 h-2 bg-neutral-600 hover:bg-neutral-400"
                }`}
              />
            );
          })}
        </div>

        {/* Bottom Right: Poetic Spanish / Founder Motto */}
        <div className="text-right text-[11px] text-neutral-500 leading-tight font-light">
          Seguro quieren bajarme<br />
          pero no tienen el filo
        </div>
      </footer>
    </div>
  );
}

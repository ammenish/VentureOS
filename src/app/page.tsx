"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DotMatrixText,
  DotBadgeIcon,
  VentureMark,
} from "@/components/ui/dot-matrix";
import { HalftoneCloud } from "@/components/ui/halftone-cloud";
import { SchematicHeroDiagram } from "@/components/landing/schematic-hero";
import {
  ArrowRight,
  ChevronDown,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Landmark,
  Bot,
  PieChart,
  Target,
  FileCheck2,
  ExternalLink,
  Layers,
  Activity,
  Menu,
  X,
} from "lucide-react";

/* ─────────────────── Minimalist Navbar ─────────────────── */
function MinimalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdown, setPlatformDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E5E5E0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo (Geometric mark + crisp text) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <VentureMark className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105" />
            <span className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900">
              VentureOS
            </span>
          </Link>

          {/* Center Navigation Links (Swiss / PlayerZero Minimalist Style) */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-600">
            <div
              className="relative"
              onMouseEnter={() => setPlatformDropdown(true)}
              onMouseLeave={() => setPlatformDropdown(false)}
            >
              <button className="flex items-center gap-1 hover:text-neutral-900 transition-colors py-2">
                <span>Platform</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Dropdown Menu */}
              {platformDropdown && (
                <div className="absolute top-full left-0 w-64 p-3 bg-white border border-[#E5E5E0] rounded-2xl shadow-xl shadow-black/5 animate-slide-down flex flex-col gap-1 z-50">
                  <a
                    href="#intelligence"
                    className="p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Venture Core-1</div>
                      <div className="text-[11px] text-neutral-500">Autonomous startup co-pilot</div>
                    </div>
                  </a>
                  <a
                    href="#modules"
                    className="p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <PieChart className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Runway Engine</div>
                      <div className="text-[11px] text-neutral-500">Deterministic cash forecasting</div>
                    </div>
                  </a>
                  <a
                    href="#modules"
                    className="p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Landmark className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Indian Schemes</div>
                      <div className="text-[11px] text-neutral-500">SISFS, BIRAC & MeitY grants</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a href="#intelligence" className="hover:text-neutral-900 transition-colors">
              Intelligence
            </a>
            <a href="#modules" className="hover:text-neutral-900 transition-colors">
              Modules
            </a>
            <a href="#comparison" className="hover:text-neutral-900 transition-colors">
              Why VentureOS
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-2 py-1"
            >
              Log In
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 rounded-full bg-[#111110] text-white hover:bg-neutral-800 text-xs font-semibold transition-all shadow-sm flex items-center gap-2">
                <span>Request Demo</span>
              </button>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F7F5] border-b border-[#E5E5E0] px-4 py-6 space-y-4">
          <a
            href="#intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800"
          >
            Intelligence
          </a>
          <a
            href="#modules"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800"
          >
            Modules
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800"
          >
            Why VentureOS
          </a>
          <div className="pt-4 border-t border-[#E5E5E0] flex flex-col gap-2">
            <Link href="/login" className="w-full">
              <button className="w-full py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-800">
                Log In
              </button>
            </Link>
            <Link href="/register" className="w-full">
              <button className="w-full py-2.5 rounded-full bg-[#111110] text-white text-xs font-medium">
                Request Demo
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────── Hero Section (Inspired by PlayerZero) ─────────────────── */
function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-10 sm:pb-14 text-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Dot-Matrix Headline: "BUILD. VALIDATE." */}
        <div className="mb-1 sm:mb-2 flex justify-center">
          <DotMatrixText
            text="BUILD. VALIDATE."
            size="hero"
            dotColor="#111110"
            ghostColor="rgba(17, 17, 16, 0.05)"
          />
        </div>

        {/* Central Schematic Node Diagram */}
        <SchematicHeroDiagram />

        {/* Bottom Dot-Matrix Headline: "SCALE." */}
        <div className="mt-1 sm:mt-2 mb-4 sm:mb-6 flex justify-center">
          <DotMatrixText
            text="SCALE."
            size="hero"
            dotColor="#111110"
            ghostColor="rgba(17, 17, 16, 0.05)"
          />
        </div>

        {/* Concise, Clear Subheadline */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mb-6">
          VentureOS brings AI to a new era of startup development beyond fragmented
          spreadsheets and disconnected tools.
        </p>

        {/* Primary CTA (Signature button with coral dot badge) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register">
            <button className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#111110] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-md group">
              <DotBadgeIcon variant="coral" size="sm" />
              <span>Request a Demo</span>
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E5E5E0] text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 text-xs sm:text-sm font-medium transition-all">
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── 3-Column Proof & Metrics Bar ─────────────────── */
function ProofMetricsBar() {
  return (
    <section className="py-4 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="card-player p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-center">
          
          {/* Column 1: Speed to Validation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase font-mono">
              <Activity className="w-3.5 h-3.5 text-neutral-900" />
              <span>KEYDATA / EARLY STAGE</span>
            </div>
            <div className="py-1">
              <DotMatrixText text="3x" size="lg" dotColor="#111110" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
              Faster milestone resolution time from ideation to verified customer signals.
            </p>
          </div>

          {/* Column 2: Grant Qualification */}
          <div className="space-y-3 md:border-l md:border-neutral-200/80 md:pl-8">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase font-mono">
              <Landmark className="w-3.5 h-3.5 text-neutral-900" />
              <span>CAYUSE / GOVT GRANTS</span>
            </div>
            <div className="py-1">
              <DotMatrixText text="90%" size="lg" dotColor="#111110" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
              DPIIT & SISFS non-dilutive eligibility match accuracy before grant submission.
            </p>
          </div>

          {/* Column 3: Stack Callout & Sign up */}
          <div className="space-y-4 md:border-l md:border-neutral-200/80 md:pl-8 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              Connect your startup stack. Our models analyze, forecast, and simulate across
              large venture datasets in real-time.
            </p>
            <div>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111110] text-white hover:bg-neutral-800 text-xs font-medium transition-all">
                  <DotBadgeIcon variant="white" size="sm" />
                  <span>Sign up</span>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────── "Introducing Venture Core-1" Section ─────────────────── */
function VentureCoreSection() {
  return (
    <section id="intelligence" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-normal text-neutral-900 tracking-tight leading-[1.2]">
              Introducing Venture Core-1
            </h2>
            <div className="text-2xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.2]">
              <span className="text-neutral-400 font-normal">Our smartest models</span>
              <br />
              <span className="text-neutral-400 font-normal">capable of </span>
              <span className="font-semibold text-neutral-900">
                simulating how ventures run
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl font-normal">
            A new category of models built to understand and predict how early-stage
            ventures behave in complex, real-world fundraising and growth scenarios.
          </p>

          <div>
            <Link href="/dashboard/ai">
              <button className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111110] text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-all shadow-sm">
                <DotBadgeIcon variant="white" size="sm" />
                <span>Explore AI Engine</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Generative Halftone Mesh Illustration directly on canvas */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-md relative select-none">
            <HalftoneCloud className="w-full" width={420} height={320} />
          </div>

          <p className="text-[11px] sm:text-xs text-neutral-500 max-w-xs mt-3 text-left lg:text-right leading-relaxed font-normal">
            The first-of-its-kind agentic system that can understand and predict state in
            distributed startup operations.
          </p>
        </div>

      </div>

      {/* Follow-up statement mirroring the bottom of reference image */}
      <div className="mt-20 sm:mt-28 max-w-2xl pt-10 border-t border-neutral-200/80">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-neutral-900 tracking-tight leading-snug">
          Debug any problem down to a{" "}
          <span className="font-semibold text-neutral-900">single operational metric</span>,{" "}
          <span className="text-neutral-400">and make sure it never happens again.</span>
        </h3>
      </div>
    </section>
  );
}

/* ─────────────────── Interactive Venture Architecture Explorer ─────────────────── */
/* Ensures the platform is crystal clear and completely simple to understand */
function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const modules = [
    {
      id: "runway",
      tabTitle: "01. Runway Radar",
      headline: "Deterministic Burn & Cash Runway",
      desc: "No fuzzy estimates. VentureOS calculates your real cash runway from every recorded transaction using Cash / Monthly Burn. When your runway dips below 6 months, an automated alarm activates with concrete cost-reduction and grant options.",
      metrics: [
        { label: "Cash Balance", value: "₹42,50,000" },
        { label: "Net Monthly Burn", value: "₹3,10,000" },
        { label: "True Runway", value: "13.7 Months" },
        { label: "Health Status", value: "SAFE (>12m)" },
      ],
      link: "/dashboard/finance",
      linkText: "Open Finance Engine",
    },
    {
      id: "schemes",
      tabTitle: "02. Indian Govt Schemes",
      headline: "Automated Non-Dilutive Grant Matcher",
      desc: "Stop hunting through PDFs and disjointed portals. VentureOS matches your startup stage, industry, and registration against Startup India (SISFS ₹50L), BIRAC BIG, MeitY TIDE 2.0, and NIDHI-PRAYAS with direct eligibility checklists.",
      metrics: [
        { label: "SISFS Seed Fund", value: "₹50L Seed Match (94%)" },
        { label: "BIRAC Biotechnology", value: "₹50L Research Grant" },
        { label: "MeitY TIDE 2.0", value: "₹7L Ideation Support" },
        { label: "DPIIT Recognition", value: "Pre-verified Ready" },
      ],
      link: "/dashboard/opportunities",
      linkText: "Discover Matched Grants",
    },
    {
      id: "ai-copilot",
      tabTitle: "03. Agentic Co-pilot",
      headline: "Action Proposals, Not Just Text",
      desc: "Unlike standard chatbots that only give advice, the VentureOS AI Manager drafts actionable proposals — like creating sprint tasks, generating financial forecasts, or writing an investor memo — that you approve and execute in 1 click.",
      metrics: [
        { label: "Action Execution", value: "1-Click Approvals" },
        { label: "Context Window", value: "Full Startup Profile" },
        { label: "Output Format", value: "Structured Data & Tasks" },
        { label: "Autonomous Tasks", value: "4 proposals pending" },
      ],
      link: "/dashboard/ai",
      linkText: "Try AI Manager",
    },
    {
      id: "diligence",
      tabTitle: "04. Investor Diligence",
      headline: "Institutional Diligence & Pitch Deck",
      desc: "Prepare for institutional checks before talking to VCs. The 8-pillar diligence checklist evaluates your cap table, financials, IP, legal compliance, and traction, automatically assembling a 12-slide institutional pitch deck.",
      metrics: [
        { label: "Readiness Score", value: "88 / 100 Institutional" },
        { label: "Diligence Pillars", value: "8 of 8 Audited" },
        { label: "Pitch Deck Outline", value: "12 Slides Generated" },
        { label: "Data Room", value: "Pre-categorized" },
      ],
      link: "/dashboard/funding",
      linkText: "Inspect Diligence Score",
    },
  ];

  const current = modules[activeTab];

  return (
    <section id="modules" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-mono uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5 text-neutral-800" />
          <span>Core Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
          Four interconnected engines. Zero complexity.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal">
          Click any module to inspect how VentureOS replaces disjointed tools with unified,
          foolproof intelligence.
        </p>
      </div>

      {/* Minimal Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E5E0] pb-4 mb-8">
        {modules.map((mod, idx) => (
          <button
            key={mod.id}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              activeTab === idx
                ? "bg-[#111110] text-white shadow-sm"
                : "bg-white/80 text-neutral-600 hover:text-neutral-900 hover:bg-white border border-[#E5E5E0]"
            }`}
          >
            {mod.tabTitle}
          </button>
        ))}
      </div>

      {/* Tab Content Card */}
      <div className="card-player p-6 sm:p-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left detail description */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 tracking-tight">
              {current.headline}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              {current.desc}
            </p>
            <div className="pt-2">
              <Link href={current.link}>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs font-medium transition-all group">
                  <span>{current.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right live preview metric grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0]">
            {current.metrics.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-white border border-[#E5E5E0] space-y-1">
                <div className="text-[10px] font-mono uppercase text-neutral-400">
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Straightforward Comparison: Old vs VentureOS ─────────────────── */
function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-left mb-10">
        <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
          Why founders choose VentureOS
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          The difference between managing chaos and running an intelligent venture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Fragmented Tools */}
        <div className="card-player p-6 sm:p-8 bg-neutral-50/50 border border-neutral-200">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4">
            The Traditional Way
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Disconnected SaaS & Spreadsheets
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span>Spreadsheets break when modeling runway with variable hires.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span>Founders miss out on ₹50L non-dilutive government schemes due to lack of discovery.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span>AI chatbots hallucinate advice without knowing your actual company stage or burn.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              <span>Scrambling to assemble data room files 48 hours before an investor pitch.</span>
            </li>
          </ul>
        </div>

        {/* VentureOS Unified */}
        <div className="card-player p-6 sm:p-8 bg-white border border-[#111110]/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4F00]/5 rounded-bl-full pointer-events-none" />
          <div className="text-xs font-mono text-[#FF4F00] font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]" />
            With VentureOS
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            One Cohesive Startup Kernel
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-800">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#FF4F00] mt-0.5 flex-shrink-0" />
              <span>Deterministic runway radar based on real transaction ledgers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#FF4F00] mt-0.5 flex-shrink-0" />
              <span>Instant matching for SISFS, BIRAC BIG, MeitY TIDE, and NIDHI-PRAYAS grants.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#FF4F00] mt-0.5 flex-shrink-0" />
              <span>Agentic AI proposes executable tasks and updates with 1-click approvals.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#FF4F00] mt-0.5 flex-shrink-0" />
              <span>Continuous 8-pillar diligence checklist and auto-generated 12-slide pitch decks.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────── Final Minimalist CTA ─────────────────── */
function FinalCallToAction() {
  return (
    <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="card-player p-8 sm:p-16 bg-[#111110] text-white relative overflow-hidden">
        
        {/* Subtle halftone aura in the card */}
        <div className="absolute -top-12 -right-12 opacity-15 pointer-events-none">
          <HalftoneCloud width={320} height={260} />
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <VentureMark className="w-10 h-10 mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
            Build smarter. Grow faster.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
            Join founders operating their businesses on VentureOS. Experience unified financial
            modeling, government scheme discovery, and autonomous AI management.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <button className="px-6 py-3 rounded-full bg-white text-[#111110] hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-all">
                Create Your Free Workspace
              </button>
            </Link>
            <Link href="/login">
              <button className="px-5 py-3 rounded-full bg-transparent border border-neutral-700 text-white hover:border-neutral-500 text-xs sm:text-sm font-medium transition-all">
                Sign In with Demo Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Swiss Minimalist Footer ─────────────────── */
function MinimalFooter() {
  return (
    <footer className="border-t border-[#E5E5E0] bg-[#F7F7F5] py-12 text-xs text-neutral-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <VentureMark className="w-5 h-5" />
          <span className="font-semibold text-neutral-900 tracking-tight">VentureOS</span>
          <span className="text-neutral-400 font-mono text-[11px]">v2.4 (Turbopack)</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <a href="#intelligence" className="hover:text-neutral-900 transition-colors">
            Intelligence
          </a>
          <a href="#modules" className="hover:text-neutral-900 transition-colors">
            Modules
          </a>
          <a href="#comparison" className="hover:text-neutral-900 transition-colors">
            Comparison
          </a>
          <Link href="/login" className="hover:text-neutral-900 transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
        </div>

        <div className="text-[11px] text-neutral-400 font-mono">
          © 2026 VentureOS Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────── Main Landing Page ─────────────────── */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#111110]">
      <MinimalNavbar />
      <HeroSection />
      <ProofMetricsBar />
      <VentureCoreSection />
      <ArchitectureExplorer />
      <ComparisonSection />
      <FinalCallToAction />
      <MinimalFooter />
    </main>
  );
}

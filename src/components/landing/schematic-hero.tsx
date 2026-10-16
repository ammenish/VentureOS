"use client";

import React, { useState } from "react";
import { VentureMark } from "@/components/ui/dot-matrix";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  desc: string;
  side: "left" | "right";
  badge?: string;
}

export function SchematicHeroDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>("core");

  const nodesInfo: Record<string, { title: string; detail: string; metric: string }> = {
    core: {
      title: "VentureOS Kernel",
      detail: "Unified startup operating engine that links idea validation, deterministic finance, Indian government schemes, and investor readiness.",
      metric: "18 Autonomous Modules Active",
    },
    founder: {
      title: "Founder & Team Inputs",
      detail: "Captures founder profile, equity cap table, background skills, and initial problem statements.",
      metric: "Stage: Idea to Pre-Seed",
    },
    signals: {
      title: "Market & Customer Signals",
      detail: "Aggregates interview notes, prototype feedback, waitlist conversions, and unit economics.",
      metric: "Validation Confidence: 88%",
    },
    runway: {
      title: "Runway & Burn Radar",
      detail: "Calculates precise runway (Cash / Monthly Burn) with zero hallucinations and alerts when runway dips below 6 months.",
      metric: "Deterministic Math (100% Exact)",
    },
    schemes: {
      title: "Govt Schemes & Grants Matcher",
      detail: "Real-time eligibility evaluation for SISFS (₹50L), BIRAC BIG, MeitY TIDE, and NIDHI-PRAYAS non-dilutive capital.",
      metric: "₹50L Non-Dilutive Match",
    },
  };

  const current = nodesInfo[activeNode || "core"];

  return (
    <div className="relative w-full max-w-4xl mx-auto my-3 sm:my-5 select-none">
      {/* Schematic canvas container */}
      <div className="relative w-full aspect-[2.6/1] min-h-[220px] sm:min-h-[280px] flex items-center justify-center">
        {/* SVG schematic hairline traces with animated circuit pulses */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 440"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="traceGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4D4D8" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#A1A1AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#18181B" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="traceGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18181B" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#A1A1AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.3" />
            </linearGradient>

            {/* Glowing animated pulse filter */}
            <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ─── Top Left Line (Founder -> Center) ─── */}
          <path
            d="M 120 110 L 320 110 C 390 110, 410 190, 450 210"
            stroke="url(#traceGradLeft)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          {/* Terminal Dots */}
          <circle cx="120" cy="110" r="3.5" fill="#111110" />
          <circle cx="320" cy="110" r="3" fill="#111110" />

          {/* ─── Bottom Left Line (Signals -> Center) ─── */}
          <path
            d="M 100 330 L 250 330 L 340 330 C 400 330, 410 250, 450 230"
            stroke="url(#traceGradLeft)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx="100" cy="330" r="3.5" fill="#111110" />
          <circle cx="250" cy="330" r="3" fill="#111110" />
          <circle cx="340" cy="330" r="3" fill="#111110" />

          {/* ─── Top Right Line (Center -> Runway) ─── */}
          <path
            d="M 550 210 C 590 190, 610 110, 680 110 L 880 110"
            stroke="url(#traceGradRight)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx="680" cy="110" r="3" fill="#111110" />
          <circle cx="880" cy="110" r="3.5" fill="#111110" />

          {/* ─── Bottom Right Line (Center -> Schemes & Investors) ─── */}
          <path
            d="M 550 230 C 590 250, 600 330, 670 330 L 760 330 L 830 330 L 900 330"
            stroke="url(#traceGradRight)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx="670" cy="330" r="3" fill="#111110" />
          <circle cx="760" cy="330" r="3" fill="#111110" />
          <circle cx="830" cy="330" r="3" fill="#111110" />
          <circle cx="900" cy="330" r="3.5" fill="#111110" />

          {/* Animated data packets pulsing through circuits */}
          <circle r="3" fill="#FF4F00" filter="url(#pulseGlow)">
            <animateMotion
              path="M 120 110 L 320 110 C 390 110, 410 190, 450 210"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#FF4F00" filter="url(#pulseGlow)">
            <animateMotion
              path="M 100 330 L 250 330 L 340 330 C 400 330, 410 250, 450 230"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#111110" filter="url(#pulseGlow)">
            <animateMotion
              path="M 550 210 C 590 190, 610 110, 680 110 L 880 110"
              dur="3s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#111110" filter="url(#pulseGlow)">
            <animateMotion
              path="M 550 230 C 590 250, 600 330, 670 330 L 900 330"
              dur="3.6s"
              begin="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* ─── Center Hub Tile ─── */}
        <div
          onClick={() => setActiveNode("core")}
          className="relative z-20 group cursor-pointer"
        >
          {/* Subtle outer diffuse aura */}
          <div className="absolute inset-0 bg-neutral-200/50 rounded-[28px] blur-md group-hover:bg-neutral-300/60 transition-all duration-300" />

          {/* Squircle frame */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-gradient-to-b from-[#ECECE8] to-[#E2E2DC] p-2.5 sm:p-3 shadow-[0_6px_20px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] border border-white/80 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105">
            {/* Inner recess */}
            <div className="w-full h-full rounded-[18px] bg-[#EFEFEA] border border-[#D5D5CE]/60 flex items-center justify-center shadow-inner relative overflow-hidden">
              <VentureMark className="w-10 h-10 sm:w-11 sm:h-11" />
              
              {/* Subtle scanning reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* ─── Node Badges Overlay (Clean, legible pill labels) ─── */}

        {/* Top Left: Founders */}
        <div
          onClick={() => setActiveNode("founder")}
          className="absolute top-[18%] left-[18%] sm:left-[22%] z-20 cursor-pointer"
        >
          <div className="px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[11px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            Founders
          </div>
        </div>

        {/* Bottom Left: Customer & Signals */}
        <div
          onClick={() => setActiveNode("signals")}
          className="absolute bottom-[18%] left-[12%] sm:left-[16%] z-20 cursor-pointer flex items-center gap-2"
        >
          <div className="px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[11px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150">
            Customer
          </div>
          <div className="px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[11px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150">
            Signals
          </div>
        </div>

        {/* Top Right: Runway */}
        <div
          onClick={() => setActiveNode("runway")}
          className="absolute top-[18%] right-[18%] sm:right-[22%] z-20 cursor-pointer"
        >
          <div className="px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[11px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]" />
            Cash Runway
          </div>
        </div>

        {/* Bottom Right: Schemes, Diligence, Round */}
        <div
          onClick={() => setActiveNode("schemes")}
          className="absolute bottom-[18%] right-[8%] sm:right-[12%] z-20 cursor-pointer flex items-center gap-1.5 sm:gap-2"
        >
          <div className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[10px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150">
            Govt Grants
          </div>
          <div className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[10px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150">
            Diligence
          </div>
          <div className="hidden sm:block px-2.5 sm:px-3 py-1 rounded-full bg-white/95 border border-neutral-300/70 text-[10px] sm:text-xs font-medium text-neutral-800 shadow-sm hover:border-neutral-900 transition-all duration-150">
            Seed Round
          </div>
        </div>
      </div>

      {/* Interactive Node Drawer / Explainer Card below diagram */}
      <div className="max-w-xl mx-auto -mt-2 p-3 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E5E5E0] shadow-sm flex items-center justify-between gap-3 text-left transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0">
            <Sparkles className="w-4 h-4 text-[#FF4F00]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-900 tracking-tight">
                {current.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono">
                {current.metric}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
              {current.detail}
            </p>
          </div>
        </div>
        <div className="text-[10px] text-neutral-400 font-mono flex-shrink-0 hidden sm:block">
          Click nodes to inspect
        </div>
      </div>
    </div>
  );
}

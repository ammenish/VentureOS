"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Search,
  Plus,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DashboardData } from "@/lib/types";

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/v1/startups/org_pulseai/dashboard");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#111110] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400 font-medium">Synchronizing VentureOS workspace...</span>
      </div>
    );
  }

  const { startup, metrics, recentTasks, upcomingMilestones, goals, aiInsights, recommendedOpportunities } = data;

  // Chart data for revenue and burn trend
  const chartData = [
    { month: "Jan", revenue: 210000, expenses: 195000 },
    { month: "Feb", revenue: 280000, expenses: 210000 },
    { month: "Mar", revenue: 350000, expenses: 235000 },
    { month: "Apr", revenue: metrics.revenue || 420000, expenses: metrics.expenses || 241500 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111110] tracking-tight">
              Good morning, Aarav
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#111110] text-white uppercase tracking-wider">
              {startup.stage} Stage
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            {startup.name} • {startup.industry} • Live Clinic Operations in India
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/tasks">
            <button className="h-9 px-4 rounded-xl bg-white border border-[#E5E5E0] text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Task
            </button>
          </Link>
          <Link href="/dashboard/ai">
            <button className="h-9 px-4 rounded-xl bg-[#111110] text-white text-xs font-medium hover:bg-neutral-800 transition-all flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI Co-Pilot
            </button>
          </Link>
        </div>
      </div>

      {/* ─── KEY METRICS CARDS (Deterministic calculations) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Revenue */}
        <div className="dash-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Monthly Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111110]">
              ₹{(metrics.revenue || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +20%
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1.5">14 polyclinics active SaaS contracts</p>
        </div>

        {/* Cash Runway */}
        <div className="dash-card p-5 bg-[#111110]/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Cash Runway
            </span>
            <div className="w-8 h-8 rounded-xl bg-neutral-100 text-[#111110] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111110]">
              {metrics.cashRunway !== null ? `${metrics.cashRunway} Mo` : "18+ Mo"}
            </span>
            <span className="text-[11px] font-medium text-neutral-400">Available</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1.5">
            ₹{(metrics.cashBalance || 3200000).toLocaleString("en-IN")} reserve / ₹1.8L net burn
          </p>
        </div>

        {/* Customer Base */}
        <div className="dash-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Active Clinics
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#111110]/[0.05] text-[#111110] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111110]">{metrics.customerCount || 14}</span>
            <span className="text-[11px] font-semibold text-emerald-600">100% retention</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1.5">Avg turnaround: 8 mins/patient</p>
        </div>

        {/* Task Velocity */}
        <div className="dash-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Execution Velocity
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#111110]">
              {metrics.completedTasks} / {metrics.taskCount}
            </span>
            <span className="text-[11px] font-medium text-neutral-400">Tasks closed</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1.5">{metrics.overdueTasks} urgent items pending</p>
        </div>
      </div>

      {/* ─── AI ACTIONABLE INSIGHTS ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF4F00]" />
            <h2 className="text-base font-bold text-[#111110]">Grounded AI Strategic Insights</h2>
          </div>
          <Link href="/dashboard/ai" className="text-xs text-[#111110] font-semibold hover:text-neutral-600 flex items-center transition-colors">
            Open AI Workspace <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((ins) => (
            <div
              key={ins.id}
              className="dash-card p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 px-2 py-0.5 rounded-full bg-neutral-100">
                    {ins.category}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#111110] leading-snug">{ins.observation}</h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{ins.whyItMatters}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E5E0]/50 flex items-center justify-between">
                <span className="text-[11px] font-medium text-neutral-600 truncate mr-2">
                  {ins.suggestedAction}
                </span>
                {ins.moduleLink && (
                  <Link href={ins.moduleLink}>
                    <button className="text-xs font-semibold text-[#111110] hover:text-[#FF4F00] transition-colors px-2 py-1">
                      Action
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CHARTS & ROADMAP SPLIT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Revenue vs Burn Trends */}
        <div className="lg:col-span-2 space-y-4">
          <div className="dash-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#111110]">Revenue & Expense Trajectory</h3>
                <p className="text-[11px] text-neutral-400">Monthly recurring income vs infrastructure & payroll burn</p>
              </div>
              <Link href="/dashboard/finance">
                <button className="text-xs font-semibold text-[#111110] hover:text-[#FF4F00] flex items-center gap-1 transition-colors">
                  Full Ledger <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111110" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#111110" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A1A1AA" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#A1A1AA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E0" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#A1A1AA", fontSize: 12 }}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip
                    formatter={(val: unknown) => [
                      `₹${typeof val === "number" ? val.toLocaleString("en-IN") : val}`,
                      "",
                    ]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #E5E5E0", fontSize: "12px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#111110"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#A1A1AA"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorExp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Tasks Table */}
          <div className="dash-card overflow-hidden">
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111110]">Upcoming Action Items</h3>
                <p className="text-[11px] text-neutral-400">High impact tasks queued across engineering & compliance</p>
              </div>
              <Link href="/dashboard/tasks">
                <button className="text-xs font-semibold text-[#111110] hover:text-[#FF4F00] flex items-center gap-1 transition-colors">
                  Kanban Board <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
            <div className="divide-y divide-[#E5E5E0]/50">
              {recentTasks.map((t) => (
                <div key={t.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-black/[0.015] transition-colors">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        t.status === "COMPLETED"
                          ? "bg-emerald-500"
                          : t.status === "IN_PROGRESS"
                          ? "bg-[#111110]"
                          : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#111110] block">{t.title}</span>
                      <span className="text-[11px] text-neutral-400">
                        {t.project?.name || "General"} • Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "Flexible"}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.priority === "URGENT"
                        ? "bg-red-100 text-red-700"
                        : t.priority === "HIGH"
                        ? "bg-[#111110] text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Opportunities & Goals */}
        <div className="space-y-5">
          {/* Top Opportunities Card */}
          <div className="dash-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#111110]">Recommended Schemes</h3>
                <p className="text-[11px] text-neutral-400">Matched Indian grants & incubator programs</p>
              </div>
              <Link href="/dashboard/opportunities">
                <button className="text-xs font-semibold text-[#111110] hover:text-[#FF4F00] transition-colors">
                  All
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedOpportunities.map((match) => (
                <div
                  key={match.opportunity.id}
                  className="p-3.5 rounded-xl border border-[#E5E5E0]/60 bg-black/[0.015] hover:bg-black/[0.025] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#111110] line-clamp-1">
                      {match.opportunity.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111110] text-white flex-shrink-0">
                      {match.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                    {match.opportunity.benefits?.[0] || match.opportunity.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-[#E5E5E0]/40">
                    <span>{match.opportunity.category.replace(/_/g, " ")}</span>
                    <Link
                      href="/dashboard/opportunities"
                      className="text-[#111110] font-semibold hover:text-[#FF4F00] transition-colors"
                    >
                      Check Criteria →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Goals Progress */}
          <div className="dash-card p-5">
            <div className="mb-4">
              <h3 className="text-base font-bold text-[#111110]">Strategic Goals</h3>
              <p className="text-[11px] text-neutral-400">Quarterly progress tracking</p>
            </div>
            <div className="space-y-4">
              {goals.map((g) => (
                <div key={g.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#111110] line-clamp-1">{g.title}</span>
                    <span className="font-bold text-[#111110]">{g.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#111110] to-neutral-500 rounded-full transition-all"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StartupStage, Milestone } from "@/lib/types";

const STAGES: { stage: StartupStage; name: string; focus: string; tips: string[] }[] = [
  {
    stage: "IDEA",
    name: "1. Idea Stage",
    focus: "Problem definition & founder thesis",
    tips: ["Conduct 20+ unbiased problem discovery interviews", "Formulate clear value hypothesis"],
  },
  {
    stage: "VALIDATION",
    name: "2. Validation Stage",
    focus: "Demand testing & Willingness to Pay",
    tips: ["Test prototype mockups with target buyers", "Secure letters of intent (LOIs)"],
  },
  {
    stage: "MVP",
    name: "3. MVP Stage",
    focus: "Product build & pilot reliability",
    tips: ["Ship core loop within 6-8 weeks", "Gather weekly user qualitative feedback"],
  },
  {
    stage: "LAUNCH",
    name: "4. Launch Stage",
    focus: "Go-to-market rollout & initial traction",
    tips: ["Execute targeted founder-led sales outreach", "Track user activation funnel drop-offs"],
  },
  {
    stage: "TRACTION",
    name: "5. Traction Stage",
    focus: "Consistent retention & revenue run-rate",
    tips: ["Optimize unit economics (CAC < LTV / 3)", "Apply for non-dilutive grants (SISFS)"],
  },
  {
    stage: "GROWTH",
    name: "6. Growth Stage",
    focus: "Repeatable channels & team scale",
    tips: ["Formalize field sales playbooks", "Hire specialized domain leaders"],
  },
  {
    stage: "FUNDING",
    name: "7. Funding Stage",
    focus: "Data room & institutional Seed/Series A",
    tips: ["Prepare 12-slide investor pitch deck", "Engage aligned sector VCs"],
  },
  {
    stage: "SCALE",
    name: "8. Scale Stage",
    focus: "Multi-market expansion & governance",
    tips: ["International distribution channels", "Institutional audit & board governance"],
  },
];

export default function RoadmapPage() {
  const [currentStage, setCurrentStage] = useState<StartupStage>("TRACTION");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const res = await fetch("/api/v1/startups/org_pulseai/dashboard");
        const json = await res.json();
        if (json.success) {
          const all = [
            ...(json.data.completedMilestones || []),
            ...(json.data.upcomingMilestones || []),
          ];
          setMilestones(all);
          setCurrentStage(json.data.startup.stage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRoadmap();
  }, []);

  const handleToggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isCompleted: !m.isCompleted } : m
      )
    );
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM: Milestone = {
      id: `mls_${Date.now()}`,
      orgId: "org_pulseai",
      title: newTitle,
      description: newDesc,
      stage: currentStage,
      isCompleted: false,
      order: milestones.length + 1,
      createdAt: new Date().toISOString(),
    };

    setMilestones([...milestones, newM]);
    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  };

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Startup Lifecycle Engine
            </h1>
            <Badge variant="primary" className="text-xs">
              {currentStage}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track stage-by-stage progression from early idea validation through institutional scaling.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl text-xs shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Milestone
        </Button>
      </div>

      {/* Progress Summary Card */}
      <Card className="border-[#E5E5E0] bg-white/80 backdrop-blur-md shadow-xs">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Overall Roadmap Velocity
              </span>
              <div className="text-2xl font-bold text-[#111110] mt-1">
                {completedCount} of {milestones.length} Milestones Achieved ({progressPercent}%)
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Current active focus: Scaling outpatient clinic adoption to ₹10L MRR
              </p>
            </div>
            <div className="w-full sm:w-64">
              <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#111110] to-neutral-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Selector Grid */}
      <div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
          LIFECYCLE STAGE TIMELINE
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STAGES.map((s) => {
            const isCurrent = currentStage === s.stage;
            return (
              <button
                key={s.stage}
                onClick={() => setCurrentStage(s.stage)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? "border-[#111110] bg-[#111110]/[0.06] shadow-xs"
                    : "border-[#E5E5E0] bg-white/70 hover:border-neutral-300"
                }`}
              >
                <div className="text-[10px] font-bold text-[#111110] mb-0.5">{s.stage}</div>
                <div className="text-xs font-bold text-[#111110] truncate">{s.name.split(". ")[1]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Details & Milestones Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Milestones List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-slate-200 shadow-xs">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Milestones for {currentStage}
                </CardTitle>
                <p className="text-xs text-slate-400">
                  Check off items as your team achieves tangible verification milestones
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#E5E5E0]/60">
                {milestones
                  .filter((m) => m.stage === currentStage || !m.stage)
                  .map((m) => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(m.id)}
                      className="p-4 flex items-start gap-3.5 hover:bg-black/[0.02] transition-colors cursor-pointer"
                    >
                      <button className="mt-0.5 flex-shrink-0 text-[#111110]">
                        {m.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Circle className="w-5 h-5 text-neutral-300 hover:text-neutral-500" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-semibold ${
                            m.isCompleted ? "line-through text-neutral-400" : "text-[#111110]"
                          }`}
                        >
                          {m.title}
                        </div>
                        {m.description && (
                          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                            {m.description}
                          </p>
                        )}
                        {m.completedAt && (
                          <div className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed on {new Date(m.completedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                {milestones.filter((m) => m.stage === currentStage).length === 0 && (
                  <div className="p-8 text-center text-neutral-400 text-xs">
                    No custom milestones added for this stage yet. Click &quot;Add Milestone&quot; above to create one.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Stage Specific Strategy & Playbook */}
        <div className="space-y-4">
          <Card className="border-[#E5E5E0] shadow-xs bg-white/80">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF4F00]" />
                <CardTitle className="text-sm font-bold text-[#111110]">
                  {currentStage} Stage Playbook
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {STAGES.find((s) => s.stage === currentStage)?.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111110] mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#E5E5E0] shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-[#111110]">
                Grant & Capital Alignment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-neutral-500 space-y-2 pt-0">
              <p>
                In the <strong>{currentStage}</strong> stage, your entity qualifies for commercialization schemes like <strong>Startup India Seed Fund (SISFS)</strong> and debt assistance through partner incubators.
              </p>
              <Link href="/dashboard/opportunities" className="text-[#111110] font-semibold hover:underline block pt-1">
                View matching opportunities →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-[#111110]">Add Lifecycle Milestone</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Add a concrete verifiable target to your {currentStage} roadmap.
            </p>

            <form onSubmit={handleAddMilestone} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conduct 15 doctor validation trials"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E5E5E0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#111110]/15"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1">
                  Success Criteria / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What evidence confirms this milestone is accomplished?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E5E5E0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#111110]/15"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl">
                  Save Milestone
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

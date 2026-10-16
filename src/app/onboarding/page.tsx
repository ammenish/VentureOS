"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Building2,
  Target,
  BarChart3,
  Lightbulb,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StartupStage } from "@/lib/types";

const STAGES: { stage: StartupStage; title: string; desc: string }[] = [
  { stage: "IDEA", title: "Exploring an Idea", desc: "Formulating problem statement & conducting initial research" },
  { stage: "VALIDATION", title: "Validating the Problem", desc: "User interviews, demand tests & customer willingness to pay" },
  { stage: "MVP", title: "Building an MVP", desc: "Developing initial core prototype for pilot feedback" },
  { stage: "LAUNCH", title: "Preparing to Launch", desc: "Go-to-market preparation, early beta users, marketing launch" },
  { stage: "TRACTION", title: "Generating Revenue / Traction", desc: "First paying customers, measurable cohort retention" },
  { stage: "GROWTH", title: "Growing Business", desc: "Scaling acquisition channels, expanding team & operations" },
  { stage: "FUNDING", title: "Preparing for Fundraising", desc: "Building investor data room, pitch deck & targeting VCs" },
  { stage: "SCALE", title: "Scaling Domestically & Globally", desc: "Multi-market expansion & institutional governance" },
];

const GOAL_OPTIONS = [
  "Validate my idea with real customer interviews",
  "Build and launch a functional MVP",
  "Acquire my first 10-50 paying customers",
  "Discover government schemes & grants (SISFS, BIRAC)",
  "Prepare for Angel or Seed fundraising",
  "Extend cash runway & optimize burn rate",
  "Recruit co-founders or key early hires",
];

export default function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Founder Profile
  const [founderName, setFounderName] = useState("Aarav Sharma");
  const [founderRole, setFounderRole] = useState("Founder & CEO");
  const [founderExp, setFounderExp] = useState("7+ years in HealthTech engineering & product");
  const [founderLocation, setFounderLocation] = useState("Bengaluru, India");

  // Step 2: Startup Profile
  const [startupName, setStartupName] = useState("PulseAI Health");
  const [industry, setIndustry] = useState("HealthTech / AI");
  const [description, setDescription] = useState(
    "AI-assisted clinical triage and diagnostic workflow automation platform for outpatient polyclinics."
  );
  const [businessModel, setBusinessModel] = useState("B2B SaaS (Monthly recurring subscriptions)");
  const [targetCustomers, setTargetCustomers] = useState("Tier 1 & Tier 2 polyclinics and diagnostic chains");
  const [geographicMarket, setGeographicMarket] = useState("India & Southeast Asia");

  // Step 3: Startup Stage
  const [selectedStage, setSelectedStage] = useState<StartupStage>("TRACTION");

  // Step 4: Business Status
  const [teamSize, setTeamSize] = useState("5");
  const [productStatus, setProductStatus] = useState("Live MVP with active clinic pilot deployments");
  const [monthlyRevenue, setMonthlyRevenue] = useState("420000");
  const [isRegistered, setIsRegistered] = useState(true);
  const [customerCount, setCustomerCount] = useState("14");

  // Step 5: Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Acquire my first 10-50 paying customers",
    "Discover government schemes & grants (SISFS, BIRAC)",
    "Prepare for Angel or Seed fundraising",
  ]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleFinishOnboarding = async () => {
    setIsGenerating(true);

    try {
      // Create new startup workspace via backend API
      const res = await fetch("/api/v1/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: startupName,
          industry,
          description,
          businessModel,
          targetCustomers,
          geographicMarket,
          stage: selectedStage,
          teamSize: parseInt(teamSize) || 1,
          revenue: parseFloat(monthlyRevenue) || 0,
          customerCount: parseInt(customerCount) || 0,
          isRegistered,
          goals: selectedGoals,
        }),
      });

      if (!res.ok) {
        console.error("Failed to persist startup during onboarding");
      }

      // Small delay for generation animation feedback
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8 border-b border-[#E5E5E0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111110] text-white flex items-center justify-center shadow-xs">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-[#111110] tracking-tight">
              Venture<span className="text-[#FF4F00]">OS</span>
            </span>
            <span className="text-xs text-neutral-400 block">Workspace Setup Wizard</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                s === currentStep
                  ? "bg-[#111110] text-white shadow-xs"
                  : s < currentStep
                  ? "bg-[#111110]/[0.08] text-[#111110]"
                  : "bg-neutral-200/70 text-neutral-400"
              }`}
            >
              {s < currentStep ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto w-full my-8 bg-white/80 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xs p-8 sm:p-10 animate-fade-in">
        {/* STEP 1: Founder Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 1 of 6
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">Tell us about yourself</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Your role, experience, and background help the AI tailor recommendations to your domain strengths.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fname">Your Name</Label>
                <Input
                  id="fname"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="frole">Role in Startup</Label>
                <Input
                  id="frole"
                  value={founderRole}
                  onChange={(e) => setFounderRole(e.target.value)}
                  placeholder="e.g. Founder & CEO"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="floc">Location / Operational Base</Label>
              <Input
                id="floc"
                value={founderLocation}
                onChange={(e) => setFounderLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fexp">Professional Experience & Domain Expertise</Label>
              <Textarea
                id="fexp"
                value={founderExp}
                onChange={(e) => setFounderExp(e.target.value)}
                rows={3}
                placeholder="Brief summary of your technical, clinical, or operational background..."
              />
            </div>
          </div>
        )}

        {/* STEP 2: Startup Profile */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 2 of 6
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">Define your startup</h2>
              <p className="text-sm text-neutral-500 mt-1">
                What problem are you solving and who are your target customers?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="sname">Startup Name</Label>
                <Input
                  id="sname"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="e.g. PulseAI Health"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sind">Industry / Sector</Label>
                <Input
                  id="sind"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. HealthTech / AI"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sdesc">Business Description (One-liner)</Label>
              <Textarea
                id="sdesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="What does your product do and what bottleneck does it solve?"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="smodel">Business Model</Label>
                <Input
                  id="smodel"
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  placeholder="e.g. B2B SaaS Subscriptions"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="smarket">Geographic Market</Label>
                <Input
                  id="smarket"
                  value={geographicMarket}
                  onChange={(e) => setGeographicMarket(e.target.value)}
                  placeholder="e.g. India & Southeast Asia"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="scust">Target Customers (ICP)</Label>
              <Input
                id="scust"
                value={targetCustomers}
                onChange={(e) => setTargetCustomers(e.target.value)}
                placeholder="e.g. Polyclinics and diagnostic centers"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Startup Stage */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 3 of 6
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">What is your current lifecycle stage?</h2>
              <p className="text-sm text-neutral-500 mt-1">
                VentureOS configures stage-specific templates, roadmap milestones, and grant eligibility filters based on this selection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {STAGES.map((s) => {
                const isSelected = selectedStage === s.stage;
                return (
                  <div
                    key={s.stage}
                    onClick={() => setSelectedStage(s.stage)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#111110] bg-[#111110]/[0.05] shadow-xs"
                        : "border-[#E5E5E0] hover:border-neutral-300 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#111110]">{s.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#111110]" />}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Business Status */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 4 of 6
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">Current business status</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Real metrics help calculate authentic runway, unit economics, and official grant qualifications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="team">Core Team Size</Label>
                <Input
                  id="team"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cust">Paying or Active Pilot Customers</Label>
                <Input
                  id="cust"
                  type="number"
                  value={customerCount}
                  onChange={(e) => setCustomerCount(e.target.value)}
                  placeholder="14"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="mrev">Monthly Revenue (in ₹ INR)</Label>
                <Input
                  id="mrev"
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  placeholder="420000"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Corporate Entity Status</Label>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-sm text-[#111110] cursor-pointer">
                    <input
                      type="radio"
                      checked={isRegistered}
                      onChange={() => setIsRegistered(true)}
                      className="accent-[#111110]"
                    />
                    Registered (Pvt Ltd / LLP)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#111110] cursor-pointer">
                    <input
                      type="radio"
                      checked={!isRegistered}
                      onChange={() => setIsRegistered(false)}
                      className="accent-[#111110]"
                    />
                    Unincorporated
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pstatus">Product / MVP Status</Label>
              <Input
                id="pstatus"
                value={productStatus}
                onChange={(e) => setProductStatus(e.target.value)}
                placeholder="e.g. Live in 8 clinics with sub-2s latency"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Goals */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 5 of 6
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">What are your top priorities right now?</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Select the goals you want VentureOS to prioritize in your initial roadmap.
              </p>
            </div>

            <div className="space-y-3">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = selectedGoals.includes(g);
                return (
                  <div
                    key={g}
                    onClick={() => toggleGoal(g)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#111110] bg-[#111110]/[0.05] text-[#111110] font-medium"
                        : "border-[#E5E5E0] hover:border-neutral-300 text-neutral-700 bg-white/70"
                    }`}
                  >
                    <span className="text-sm">{g}</span>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-[#111110] border-[#111110] text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Workspace Generation & Review */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111110]/[0.06] text-[#111110] text-xs font-semibold mb-2">
                Step 6 of 6 — Review & Launch
              </div>
              <h2 className="text-2xl font-bold text-[#111110]">Ready to synthesize your workspace</h2>
              <p className="text-sm text-neutral-500 mt-1">
                VentureOS will initialize your lifecycle roadmap, financial tracking ledger, opportunity matches, and AI context.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E0] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Startup</span>
                  <p className="text-base font-bold text-[#111110]">{startupName}</p>
                </div>
                <Badge variant="primary">{selectedStage} Stage</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-[#E5E5E0]">
                <div>
                  <span className="text-neutral-400 block">Founder & Role</span>
                  <span className="font-semibold text-neutral-700">{founderName} ({founderRole})</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Industry</span>
                  <span className="font-semibold text-neutral-700">{industry}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Current Runway / Revenue</span>
                  <span className="font-semibold text-emerald-600">₹{(parseFloat(monthlyRevenue) || 0).toLocaleString("en-IN")}/mo</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Selected Goals</span>
                  <span className="font-semibold text-neutral-700">{selectedGoals.length} goals defined</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#111110]/[0.03] border border-[#E5E5E0] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#FF4F00] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#111110] leading-relaxed">
                <span className="font-semibold block mb-0.5">AI Generation Ready:</span>
                Your personalized lifecycle milestones, matching Indian grants (SISFS & BIRAC), and runway analytics will be automatically primed and fully editable in your dashboard.
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-[#E5E5E0] mt-8">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isGenerating}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleFinishOnboarding}
              disabled={isGenerating}
              className="bg-[#111110] hover:bg-neutral-800 text-white shadow-xs rounded-xl"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Generating Workspace...
                </>
              ) : (
                <>
                  Launch VentureOS Workspace
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="text-center text-xs text-neutral-400">
        VentureOS Enterprise Startup Operating System • Light Mode Design System
      </div>
    </div>
  );
}

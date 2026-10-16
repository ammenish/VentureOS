"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  Plus,
  Mail,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FundingReadiness, Investor, InvestorStage } from "@/lib/types";
import { PitchDeckSlide } from "@/lib/funding-engine";

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState<"readiness" | "deck" | "pipeline">("readiness");
  const [readiness, setReadiness] = useState<FundingReadiness | null>(null);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [pitchSlides, setPitchSlides] = useState<PitchDeckSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Investor modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [invName, setInvName] = useState("");
  const [invFirm, setInvFirm] = useState("");
  const [invStage, setInvStage] = useState("Seed");
  const [invTicket, setInvTicket] = useState("$300K - $750K");
  const [invEmail, setInvEmail] = useState("");
  const [invDealStage, setInvDealStage] = useState<InvestorStage>("IDENTIFIED");
  const [invNotes, setInvNotes] = useState("");

  const loadFundingData = async () => {
    try {
      const res = await fetch("/api/v1/funding?orgId=org_pulseai");
      const json = await res.json();
      if (json.success) {
        setReadiness(json.data.readiness);
        setInvestors(json.data.investors);
        setPitchSlides(json.data.pitchSlides);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFundingData();
  }, []);

  const handleCreateInvestor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName.trim()) return;

    try {
      const res = await fetch("/api/v1/funding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_investor",
          orgId: "org_pulseai",
          name: invName,
          firm: invFirm,
          stage: invStage,
          ticketSize: invTicket,
          contactEmail: invEmail,
          dealStage: invDealStage,
          notes: invNotes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setInvestors((prev) => [json.data, ...prev]);
        setShowAddModal(false);
        setInvName("");
        setInvFirm("");
        setInvNotes("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !readiness) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#111110] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400">Loading funding data room...</span>
      </div>
    );
  }

  const readyCategoriesCount = readiness.categories.filter((c) => c.status === "READY").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E5E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111110] tracking-tight">
            Funding Readiness & Investor Pipeline
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            8-pillar institutional diligence checklist, verified 12-slide pitch deck draft, and investor CRM.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-[#F7F7F5] border border-[#E5E5E0] rounded-xl p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab("readiness")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "readiness"
                ? "bg-[#111110] text-white shadow-xs"
                : "text-neutral-600 hover:text-[#111110]"
            }`}
          >
            Diligence Readiness ({readyCategoriesCount}/8)
          </button>
          <button
            onClick={() => setActiveTab("deck")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "deck"
                ? "bg-[#111110] text-white shadow-xs"
                : "text-neutral-600 hover:text-[#111110]"
            }`}
          >
            Pitch Deck Outline (12 Slides)
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "pipeline"
                ? "bg-[#111110] text-white shadow-xs"
                : "text-neutral-600 hover:text-[#111110]"
            }`}
          >
            Investor CRM ({investors.length})
          </button>
        </div>
      </div>

      {/* ─── TAB 1: 8-CATEGORY DILIGENCE CHECKLIST ─── */}
      {activeTab === "readiness" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#111110]/[0.03] border border-[#E5E5E0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#FF4F00] flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#111110]">
                  Seed Institutional Diligence Status
                </span>
                <p className="text-[11px] text-neutral-500">
                  {readyCategoriesCount} of 8 core categories have verified operational evidence ready for data room inspection.
                </p>
              </div>
            </div>
            <Badge variant="primary" className="text-xs bg-[#111110] text-white">
              {Math.round((readyCategoriesCount / 8) * 100)}% Ready
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readiness.categories.map((cat) => (
              <Card key={cat.name} className="border-slate-200 shadow-xs">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900">{cat.name}</CardTitle>
                  <Badge
                    variant={
                      cat.status === "READY"
                        ? "primary"
                        : cat.status === "PARTIAL"
                        ? "outline"
                        : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {cat.status === "READY" ? "Verified Ready" : cat.status === "PARTIAL" ? "In Progress" : "Missing Evidence"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {/* Completed */}
                  {cat.completedItems.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Verified Evidence
                      </span>
                      {cat.completedItems.map((item, i) => (
                        <div key={i} className="text-xs text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Missing */}
                  {cat.missingItems.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                        Action Required
                      </span>
                      {cat.missingItems.map((item, i) => (
                        <div key={i} className="text-xs text-slate-500 flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 2: 12-SLIDE PITCH DECK ASSISTANCE ─── */}
      {activeTab === "deck" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                12-Slide Standard Seed Pitch Deck Outline
              </h2>
              <p className="text-xs text-slate-500">
                Grounded strictly in your verified business metrics without hallucinated numbers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pitchSlides.map((slide) => (
              <div
                key={slide.slideNumber}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                    <span>SLIDE {slide.slideNumber}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {slide.title}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {slide.headline}
                  </h3>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {slide.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#111110] font-bold">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
                  💡 Visual: {slide.visualGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: INVESTOR PIPELINE CRM ─── */}
      {activeTab === "pipeline" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Institutional Investor Pipeline</h2>
              <p className="text-xs text-slate-500">
                Track sector-aligned venture funds, angels, and syndicate meeting stages.
              </p>
            </div>

            <Button
              onClick={() => setShowAddModal(true)}
              size="sm"
              className="bg-[#111110] hover:bg-[#27272A] text-white text-xs shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Investor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investors.map((inv) => (
              <div
                key={inv.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{inv.name}</h3>
                      <p className="text-xs text-slate-500">
                        {inv.firm || "Angel"} • {inv.stage || "Seed"}
                      </p>
                    </div>

                    <Badge
                      variant={
                        inv.dealStage === "MEETING_SCHEDULED"
                          ? "primary"
                          : inv.dealStage === "IN_DISCUSSION"
                          ? "outline"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {inv.dealStage.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">TICKET SIZE</span>
                      <span className="font-bold text-slate-800">{inv.ticketSize || "TBD"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">SECTORS</span>
                      <span className="truncate block font-medium">
                        {inv.sectors?.join(", ") || "HealthTech, AI"}
                      </span>
                    </div>
                  </div>

                  {inv.notes && (
                    <p className="text-xs text-slate-600 mt-3 italic leading-relaxed">
                      &ldquo;{inv.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {inv.contactEmail || "Contact via intro"}
                  </span>
                  {inv.nextFollowUpDate && (
                    <span className="text-[#111110] font-semibold text-[11px] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Follow-up: {new Date(inv.nextFollowUpDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── ADD INVESTOR MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-slate-900">Add Investor to CRM</h2>
            <p className="text-xs text-slate-500 mt-1">Track diligence conversations and deal stages.</p>

            <form onSubmit={handleCreateInvestor} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Investor Name
                  </label>
                  <Input
                    required
                    placeholder="e.g. Rohini Varma"
                    value={invName}
                    onChange={(e) => setInvName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Firm / Syndicate
                  </label>
                  <Input
                    placeholder="e.g. HealthX Capital"
                    value={invFirm}
                    onChange={(e) => setInvFirm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Deal Stage
                  </label>
                  <select
                    value={invDealStage}
                    onChange={(e) => setInvDealStage(e.target.value as InvestorStage)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="IDENTIFIED">Identified</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
                    <option value="IN_DISCUSSION">In Discussion</option>
                    <option value="TERM_SHEET">Term Sheet</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Check Size
                  </label>
                  <Input
                    placeholder="e.g. $500K"
                    value={invTicket}
                    onChange={(e) => setInvTicket(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Contact Email
                </label>
                <Input
                  type="email"
                  placeholder="rohini@healthx.vc"
                  value={invEmail}
                  onChange={(e) => setInvEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Interaction Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Key questions raised, clinic traction feedback..."
                  value={invNotes}
                  onChange={(e) => setInvNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111110]/15"
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
                <Button type="submit" size="sm" className="bg-[#111110] hover:bg-[#27272A] text-white">
                  Save Investor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

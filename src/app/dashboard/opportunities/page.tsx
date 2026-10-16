"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Bookmark,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Opportunity, OpportunityMatch, OpportunityCategory } from "@/lib/types";

const CATEGORIES: { key: string; label: string }[] = [
  { key: "ALL", label: "All Categories" },
  { key: "GOVERNMENT_SCHEME", label: "Govt Schemes" },
  { key: "GRANT", label: "Grants & Subsidies" },
  { key: "STARTUP_PROGRAM", label: "Tech Programs" },
  { key: "ACCELERATOR", label: "Accelerators" },
  { key: "SUBSIDY", label: "Compute & Vouchers" },
];

export default function OpportunitiesPage() {
  const [matches, setMatches] = useState<OpportunityMatch[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeModalMatch, setActiveModalMatch] = useState<OpportunityMatch | null>(null);
  const [savedOppIds, setSavedOppIds] = useState<string[]>(["opp_sisfs"]);

  useEffect(() => {
    async function loadOpportunities() {
      try {
        const url = `/api/v1/opportunities?orgId=org_pulseai&category=${selectedCategory}&q=${encodeURIComponent(
          searchQuery
        )}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setMatches(json.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadOpportunities();
  }, [selectedCategory, searchQuery]);

  const toggleSave = (id: string) => {
    setSavedOppIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E5E0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111110] tracking-tight">
              Government Schemes & Opportunities Engine
            </h1>
            <Badge variant="outline" className="text-xs text-[#111110] border-[#111110]/20 bg-[#111110]/[0.05]">
              India Focus
            </Badge>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Curated, source-verified central and state government grants, SISFS incubators, and compute subsidies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white/70 border border-[#E5E5E0] px-3.5 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>DPIIT & MCA Matching Active</span>
        </div>
      </div>

      {/* ─── Search & Category Filters ─── */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes by name or provider..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#111110] text-white shadow-xs"
                  : "bg-white/80 border border-[#E5E5E0] text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Scheme Cards Grid ─── */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#111110] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matches.map((match) => {
            const opp = match.opportunity;
            const isSaved = savedOppIds.includes(opp.id);

            return (
              <div
                key={opp.id}
                className="bg-white/80 backdrop-blur-md border border-[#E5E5E0] rounded-2xl p-5 shadow-xs hover:border-neutral-400 hover:bg-white/95 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] text-neutral-600 border-[#E5E5E0]">
                      {opp.category.replace(/_/g, " ")}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111110] bg-[#111110]/[0.06] px-2 py-0.5 rounded-full">
                        {match.matchScore}% Match
                      </span>
                      <button
                        onClick={() => toggleSave(opp.id)}
                        className="text-neutral-300 hover:text-[#111110] transition-colors cursor-pointer"
                        title={isSaved ? "Remove from saved" : "Save opportunity"}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isSaved ? "fill-[#FF4F00] text-[#FF4F00]" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#111110] leading-snug line-clamp-2">
                    {opp.name}
                  </h3>
                  <div className="text-[11px] text-neutral-400 font-medium mt-1">
                    {opp.provider}
                  </div>

                  <p className="text-xs text-neutral-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Benefits Tag */}
                  {opp.benefits && opp.benefits.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-800">
                      <strong>Funding:</strong> {opp.benefits[0]}
                    </div>
                  )}

                  {/* Strategic Alignment Note */}
                  <div className="mt-3 flex items-start gap-1.5 text-[11px] text-neutral-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4F00] flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{match.explanation}</span>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 pt-3 border-t border-[#E5E5E0] flex items-center justify-between">
                  <div className="text-[10px] text-neutral-400">
                    Verified: {opp.lastVerifiedDate || "Current"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setActiveModalMatch(match)}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                    >
                      Diligence Criteria
                    </Button>
                    {opp.officialSourceUrl && (
                      <a
                        href={opp.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-[#111110] hover:bg-neutral-100 transition-colors"
                        title="Official Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── ELIGIBILITY DILIGENCE MODAL ─── */}
      {activeModalMatch && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E5E0]">
              <div>
                <span className="text-[11px] font-bold text-[#111110] uppercase tracking-wider">
                  {activeModalMatch.opportunity.category.replace(/_/g, " ")} • {activeModalMatch.matchScore}% Match
                </span>
                <h2 className="text-lg font-bold text-[#111110] mt-0.5">
                  {activeModalMatch.opportunity.name}
                </h2>
                <p className="text-xs text-neutral-500">{activeModalMatch.opportunity.provider}</p>
              </div>
              <button
                onClick={() => setActiveModalMatch(null)}
                className="text-neutral-400 hover:text-[#111110] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-5">
              {/* Strategic Explanation */}
              <div className="p-3.5 rounded-xl bg-[#111110]/[0.03] border border-[#E5E5E0] text-xs text-[#111110] leading-relaxed">
                <strong>Matching Engine Diagnosis:</strong> {activeModalMatch.explanation}
              </div>

              {/* Satisfied Criteria */}
              <div>
                <h4 className="text-xs font-bold text-[#111110] flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Criteria Satisfied by Your Startup ({activeModalMatch.satisfiedCriteria.length})
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-600">
                  {activeModalMatch.satisfiedCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Criteria */}
              {activeModalMatch.missingCriteria.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#111110] flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Points Needing Clarification ({activeModalMatch.missingCriteria.length})
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-600">
                    {activeModalMatch.missingCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Documents */}
              {activeModalMatch.opportunity.requiredDocuments && (
                <div>
                  <h4 className="text-xs font-bold text-[#111110] flex items-center gap-1.5 mb-2">
                    <FileText className="w-4 h-4 text-neutral-600" />
                    Required Application Dossier Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                    {activeModalMatch.opportunity.requiredDocuments.map((doc, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#F7F7F5] border border-[#E5E5E0]">
                        📄 {doc}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Official Source: {activeModalMatch.opportunity.officialSourceUrl}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveModalMatch(null)}>
                  Close
                </Button>
                {activeModalMatch.opportunity.officialSourceUrl && (
                  <a
                    href={activeModalMatch.opportunity.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="sm" className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl text-xs">
                      Open Official Application Portal
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

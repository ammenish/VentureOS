"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Key,
  Shield,
  Users,
  CheckCircle2,
  Save,
  Server,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Organization } from "@/lib/types";

export default function SettingsPage() {
  const [startup, setStartup] = useState<Organization | null>(null);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [geographicMarket, setGeographicMarket] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [deterministicMode, setDeterministicMode] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrg() {
      try {
        const res = await fetch("/api/v1/startups/org_pulseai");
        const json = await res.json();
        if (json.success) {
          setStartup(json.data);
          setName(json.data.name);
          setIndustry(json.data.industry);
          setDescription(json.data.description || "");
          setGeographicMarket(json.data.geographicMarket || "");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadOrg();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/startups/org_pulseai", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          industry,
          description,
          geographicMarket,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#111110] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="pb-3 border-b border-[#E5E5E0]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111110] tracking-tight">
          Workspace Settings & Integrations
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Configure corporate identity, AI model API keys, storage adapters, and access control.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          Settings successfully updated!
        </div>
      )}

      {/* ─── STARTUP PROFILE SECTION ─── */}
      <Card className="border-[#E5E5E0] shadow-xs">
        <CardHeader className="pb-3 border-b border-[#E5E5E0]/60">
          <CardTitle className="text-base font-bold text-[#111110] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111110]/[0.06] flex items-center justify-center text-[#111110]">
              <Building2 className="w-4 h-4" />
            </div>
            Corporate Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1.5">
                  Startup Legal / Trading Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1.5">
                  Industry / Category
                </label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#111110] block mb-1.5">
                Executive Description
              </label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#111110] block mb-1.5">
                Geographic Market
              </label>
              <Input
                value={geographicMarket}
                onChange={(e) => setGeographicMarket(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="sm"
                className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl px-5 h-9"
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ─── AI MODEL & EXTERNAL API INTEGRATIONS ─── */}
      <Card className="border-[#E5E5E0] shadow-xs">
        <CardHeader className="pb-3 border-b border-[#E5E5E0]/60">
          <CardTitle className="text-base font-bold text-[#111110] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111110]/[0.06] flex items-center justify-center text-[#111110]">
              <Key className="w-4 h-4" />
            </div>
            AI & Cloud Model Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <p className="text-xs text-neutral-500 leading-relaxed">
            By default, VentureOS runs on a deterministic contextual engine with zero external API dependencies. If an OpenAI or Gemini API key is configured, live LLM completions are used seamlessly.
          </p>

          <div>
            <label className="text-xs font-semibold text-[#111110] block mb-1.5">
              OpenAI API Key (Optional)
            </label>
            <Input
              type="password"
              placeholder="sk-proj-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <span className="text-[11px] text-neutral-400 mt-1 block">
              Leave blank to use the built-in verified startup intelligence co-pilot.
            </span>
          </div>

          {/* Interactive Toggle Switch for Deterministic Engine */}
          <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0] flex items-center justify-between transition-all hover:bg-[#F2F2F0]">
            <div>
              <span className="text-xs font-bold text-[#111110] block">
                Deterministic Financial Simulator Engine
              </span>
              <span className="text-[11px] text-neutral-500">
                Guarantees zero mathematical hallucination on runway & burn analytics.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDeterministicMode(!deterministicMode)}
              className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 ${
                  deterministicMode ? "bg-[#111110]" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                    deterministicMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Interactive Toggle Switch for Email Alerts */}
          <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0] flex items-center justify-between transition-all hover:bg-[#F2F2F0]">
            <div>
              <span className="text-xs font-bold text-[#111110] block">
                Automatic Scheme & Grant Matching Alerts
              </span>
              <span className="text-[11px] text-neutral-500">
                Notify founders when SISFS or state incubator rounds open for your sector.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 ${
                  emailAlerts ? "bg-[#111110]" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                    emailAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#111110] block">
                Local Zero-Config Storage Adapter
              </span>
              <span className="text-[11px] text-neutral-500">
                Private encrypted JSON database in <code>.data/ventureos_db.json</code>
              </span>
            </div>
            <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50 border-emerald-300">
              Active & Persisted
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ─── TEAM MEMBERS & ACCESS CONTROL ─── */}
      <Card className="border-[#E5E5E0] shadow-xs">
        <CardHeader className="pb-3 border-b border-[#E5E5E0]/60">
          <CardTitle className="text-base font-bold text-[#111110] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111110]/[0.06] flex items-center justify-center text-[#111110]">
              <Users className="w-4 h-4" />
            </div>
            Team Members & Roles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E0]/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111110] text-white flex items-center justify-center text-xs font-bold">
                AS
              </div>
              <div>
                <span className="text-xs font-bold text-[#111110] block">Aarav Sharma</span>
                <span className="text-[11px] text-neutral-400">aarav@pulseai.health</span>
              </div>
            </div>
            <Badge variant="primary" className="text-[10px] bg-[#111110] text-white">
              Workspace Owner
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

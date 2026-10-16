"use client";

import { useState, useRef, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Send,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
  Zap,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIActionProposal } from "@/lib/types";
import { FormattedMessage } from "@/components/ui/formatted-message";

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  actionProposals?: AIActionProposal[];
  latencyMs?: number;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  "What should I prioritize this week?",
  "Find relevant government schemes",
  "Analyze my business performance & burn",
  "Help me prepare for funding & Seed pitch",
];

export default function AIManagerPage() {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "msg_init",
      role: "assistant",
      content: `### Hello Aarav! I am your VentureOS AI Co-Pilot.

I have synchronized with your **PulseAI Health** workspace:
- **Current Stage:** TRACTION
- **Customer Base:** 14 active polyclinics
- **Runway:** ~17.8 months (₹32L reserve / ₹1.8L net burn)
- **Open Priority:** Selection of partner incubator for the Startup India Seed Fund Scheme (SISFS)

Select a suggested prompt below or type any question to begin.`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [executingProposalId, setExecutingProposalId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: MessageItem = {
      id: `msg_u_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          orgId: "org_pulseai",
          userId: "usr_founder_1",
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const json = await res.json();
      if (json.success) {
        const assistantMsg: MessageItem = {
          id: `msg_a_${Date.now()}`,
          role: "assistant",
          content: json.data.content,
          actionProposals: json.data.actionProposals,
          latencyMs: json.data.latencyMs,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          role: "assistant",
          content: "Sorry, I encountered an issue connecting to the AI service. Please verify server connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = async (proposalId: string) => {
    setExecutingProposalId(proposalId);
    try {
      const res = await fetch("/api/v1/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "execute_action",
          proposalId,
          orgId: "org_pulseai",
        }),
      });
      const json = await res.json();
      if (json.success) {
        // Update proposal in UI to EXECUTED
        setMessages((prev) =>
          prev.map((m) => {
            if (!m.actionProposals) return m;
            return {
              ...m,
              actionProposals: m.actionProposals.map((p) =>
                p.id === proposalId ? { ...p, status: "EXECUTED" } : p
              ),
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setExecutingProposalId(null);
    }
  };

  const handleDismissAction = (proposalId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (!m.actionProposals) return m;
        return {
          ...m,
          actionProposals: m.actionProposals.map((p) =>
            p.id === proposalId ? { ...p, status: "REJECTED" } : p
          ),
        };
      })
    );
  };

  const startNewConversation = () => {
    setMessages([
      {
        id: `msg_${Date.now()}`,
        role: "assistant",
        content: "New session started. How can I assist PulseAI Health today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white/80 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xs overflow-hidden animate-fade-in">
      {/* ─── Top AI Workspace Header ─── */}
      <div className="h-14 px-6 border-b border-[#E5E5E0] flex items-center justify-between bg-white/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#111110] text-white flex items-center justify-center shadow-xs">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111110]">VentureOS AI Manager</span>
              <Badge variant="outline" className="text-[9px] border-emerald-300 text-emerald-700 bg-emerald-50 py-0">
                Context Synced
              </Badge>
              <Badge variant="outline" className="text-[9px] border-neutral-200 text-neutral-700 bg-[#111110]/[0.04] py-0 flex items-center gap-1 font-mono">
                <Zap className="w-2.5 h-2.5 text-[#FF4F00]" /> Groq LPU Powered
              </Badge>
            </div>
            <span className="text-[10px] text-neutral-400">
              Live context: PulseAI Health (TRACTION Stage • 14 Clinics • ₹32L Runway)
            </span>
          </div>
        </div>

        <Button
          onClick={startNewConversation}
          variant="outline"
          size="sm"
          className="text-xs h-8"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          New Thread
        </Button>
      </div>

      {/* ─── Conversation Message Stream ─── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-3xl ${
              m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.role === "user"
                  ? "bg-neutral-800 text-white"
                  : "bg-[#111110] text-white shadow-xs"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="flex-1 space-y-2">
              {/* Sender Name & Role Header */}
              <div className={`flex items-center gap-2 px-1 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <span className="text-[11px] font-bold text-[#111110]">
                  {m.role === "user" ? "Aarav Sharma" : "VentureOS Co-Pilot"}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  {m.role === "user" ? "Founder & CEO" : "Operating Partner"}
                </span>
              </div>

              <div
                className={`p-5 rounded-2xl text-xs leading-relaxed shadow-xs transition-all ${
                  m.role === "user"
                    ? "bg-[#111110] text-white rounded-tr-xs"
                    : "bg-white/90 border border-[#E5E5E0] text-[#111110] rounded-tl-xs backdrop-blur-sm"
                }`}
              >
                <FormattedMessage content={m.content} isUser={m.role === "user"} />

                <div
                  className={`text-[9px] mt-3 pt-2 border-t flex items-center justify-between ${
                    m.role === "user"
                      ? "text-white/50 border-white/10 justify-end"
                      : "text-neutral-400 border-[#E5E5E0]/70"
                  }`}
                >
                  {m.role === "assistant" && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-neutral-500">
                      <Zap className="w-2.5 h-2.5 text-[#FF4F00]" />
                      Groq LPU {m.latencyMs ? `• ${m.latencyMs}ms` : "• Sub-second"}
                    </span>
                  )}
                  <span>{m.timestamp}</span>
                </div>
              </div>

              {/* Action Proposal Cards (if any) */}
              {m.actionProposals && m.actionProposals.length > 0 && (
                <div className="space-y-2 pt-1">
                  {m.actionProposals.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3.5 rounded-xl border border-[#E5E5E0] bg-[#111110]/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slide-up"
                    >
                      <div className="flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-[#FF4F00] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#111110]">
                              Proposed Action:
                            </span>
                            <Badge variant="outline" className="text-[9px] border-[#111110]/20 text-[#111110] bg-white">
                              {prop.toolName.replace(/_/g, " ")}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-neutral-600 mt-0.5">{prop.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                        {prop.status === "EXECUTED" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Executed
                          </span>
                        ) : prop.status === "REJECTED" ? (
                          <span className="text-[11px] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                            Dismissed
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleDismissAction(prop.id)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-500 hover:bg-neutral-200/60"
                            >
                              Dismiss
                            </button>
                            <Button
                              onClick={() => handleExecuteAction(prop.id)}
                              disabled={executingProposalId === prop.id}
                              size="sm"
                              className="text-xs h-7 bg-[#111110] hover:bg-neutral-800 text-white rounded-lg"
                            >
                              {executingProposalId === prop.id ? (
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                "Approve & Execute"
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-neutral-400 animate-pulse">
            <div className="w-7 h-7 rounded-xl bg-[#111110] text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <span>VentureOS AI is synthesizing startup metrics and knowledge...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Suggested Prompts Chips ─── */}
      <div className="px-6 py-2.5 border-t border-[#E5E5E0] bg-white/40 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
          Suggestions:
        </span>
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => handleSendMessage(p)}
            className="text-[11px] font-medium text-neutral-600 hover:text-[#111110] bg-white/80 border border-[#E5E5E0] hover:border-[#111110]/40 rounded-full px-3 py-1 whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* ─── Chat Input Area ─── */}
      <div className="p-4 border-t border-[#E5E5E0] bg-white/70">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask VentureOS about priorities, schemes, financial runway, or funding..."
            className="text-xs h-10 flex-1"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-10 px-4 bg-[#111110] hover:bg-neutral-800 text-white rounded-xl shadow-xs"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

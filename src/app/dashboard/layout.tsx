"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  Target,
  CheckSquare,
  BarChart3,
  Search,
  DollarSign,
  Users,
  FileText,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  LogOut,
  ExternalLink,
  HelpCircle,
  ChevronUp,
  User,
  Check,
  CheckCheck,
  Send,
  Bot,
  Zap,
  Maximize2,
} from "lucide-react";
import { VentureMark } from "@/components/ui/dot-matrix";
import { FormattedMessage } from "@/components/ui/formatted-message";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAVIGATION: NavSection[] = [
  {
    title: "WORKSPACE",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "AI Manager", href: "/dashboard/ai", icon: Brain, badge: "Co-Pilot" },
      { name: "Lifecycle Roadmap", href: "/dashboard/roadmap", icon: Target },
      { name: "Tasks & Projects", href: "/dashboard/tasks", icon: CheckSquare },
      { name: "Finance & Runway", href: "/dashboard/finance", icon: BarChart3 },
    ],
  },
  {
    title: "OPPORTUNITIES",
    items: [
      { name: "Government Schemes", href: "/dashboard/opportunities", icon: Search, badge: "SISFS" },
    ],
  },
  {
    title: "GROWTH & CAPITAL",
    items: [
      { name: "Funding Readiness", href: "/dashboard/funding", icon: DollarSign },
    ],
  },
  {
    title: "COMMUNITY & ASSETS",
    items: [
      { name: "Founder Network", href: "/dashboard/community", icon: Users },
      { name: "Documents Room", href: "/dashboard/documents", icon: FileText },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeOrgName] = useState("PulseAI Health");
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "SISFS Seed Round #4 Accepting Pitches",
      description: "HealthTech AI vertical verified with 94% match. Closing in 12 days.",
      time: "10m ago",
      unread: true,
      href: "/dashboard/opportunities",
    },
    {
      id: "2",
      title: "Milestone Checked: IRB Protocol",
      description: "Clinical partner approval uploaded to institutional data room.",
      time: "2h ago",
      unread: true,
      href: "/dashboard/roadmap",
    },
    {
      id: "3",
      title: "Runway Calculation Adjusted",
      description: "₹4.2L revenue booked across 14 polyclinics. Net runway: 18 months.",
      time: "1d ago",
      unread: false,
      href: "/dashboard/finance",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // ─── Quick Groq AI Chat Drawer State ───
  const [quickChatOpen, setQuickChatOpen] = useState(false);
  const [quickMessages, setQuickMessages] = useState<Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    latencyMs?: number;
    timestamp: string;
  }>>([
    {
      id: "qc_init",
      role: "assistant",
      content: "Hello Aarav! I am your VentureOS AI Co-Pilot powered by Groq LPU inference. I have real-time sync with PulseAI Health's metrics, tasks, and grant matches. Ask me anything!",
      timestamp: "Just now",
    },
  ]);
  const [quickInput, setQuickInput] = useState("");
  const [quickLoading, setQuickLoading] = useState(false);
  const quickChatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quickChatOpen) {
      quickChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [quickMessages, quickLoading, quickChatOpen]);

  const handleSendQuickMessage = async (promptText?: string) => {
    const text = promptText || quickInput;
    if (!text.trim() || quickLoading) return;

    const userMsg = {
      id: `qc_u_${Date.now()}`,
      role: "user" as const,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setQuickMessages((prev) => [...prev, userMsg]);
    setQuickInput("");
    setQuickLoading(true);

    try {
      const res = await fetch("/api/v1/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          orgId: "org_pulseai",
          userId: "usr_founder_1",
          history: quickMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setQuickMessages((prev) => [
          ...prev,
          {
            id: `qc_a_${Date.now()}`,
            role: "assistant" as const,
            content: json.data.content,
            latencyMs: json.data.latencyMs,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setQuickMessages((prev) => [
        ...prev,
        {
          id: `qc_err_${Date.now()}`,
          role: "assistant" as const,
          content: "Sorry, I had trouble connecting to the Groq AI service. Please verify server connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0EB] flex flex-col md:flex-row text-[#111110]">
      {/* ─── SIDEBAR (Desktop) ─── */}
      <aside className="hidden md:flex md:w-[260px] flex-col fixed inset-y-0 z-40 sidebar-glass">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <VentureMark className="w-7 h-7" />
            <span className="text-base font-bold text-[#111110] tracking-tight">
              VentureOS
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {NAVIGATION.map((section) => (
            <div key={section.title} className="space-y-0.5">
              <div className="text-[10px] font-bold text-neutral-400 tracking-[0.08em] px-3 mb-1.5 uppercase">
                {section.title}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${
                      isActive
                        ? "nav-active-glass font-semibold text-[#111110] shadow-sm"
                        : "text-neutral-500 hover:text-[#111110] hover:bg-black/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-[18px] h-[18px] transition-colors ${
                          isActive ? "text-[#111110]" : "text-neutral-400 group-hover:text-neutral-600"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-[#111110]/10 text-[#111110]"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>


        {/* Bottom nav items */}
        <div className="px-3 pb-2 space-y-0.5">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
              pathname === "/dashboard/settings"
                ? "nav-active-glass font-semibold text-[#111110]"
                : "text-neutral-500 hover:text-[#111110] hover:bg-black/[0.03]"
            }`}
          >
            <Settings className="w-[18px] h-[18px]" />
            Settings
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-500 hover:text-[#111110] hover:bg-black/[0.03] transition-all duration-150">
            <HelpCircle className="w-[18px] h-[18px]" />
            Help Center
          </a>
        </div>

        {/* User Card & Logout Footer */}
        <div className="px-3 pb-4 pt-2 border-t border-[#E5E5E0]/50 relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.03] transition-colors"
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#111110] to-neutral-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                AS
              </div>
              <div className="truncate text-left">
                <div className="text-xs font-semibold text-[#111110] truncate">Aarav Sharma</div>
                <div className="text-[10px] text-neutral-400">Founder & CEO</div>
              </div>
            </div>
            <LogOut className="w-4 h-4 text-neutral-400 hover:text-neutral-600 flex-shrink-0" />
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-[#E5E5E0] rounded-xl shadow-lg p-2 z-50 animate-scale-in">
              <Link
                href="/dashboard/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-[#111110] transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Account Settings
              </Link>
              <Link
                href="/login"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MOBILE TOPBAR ─── */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 header-glass sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <VentureMark className="w-6 h-6" />
          <span className="font-bold text-sm text-[#111110]">VentureOS</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-neutral-600 hover:bg-black/[0.04] rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#F0F0EB] pt-14 flex flex-col justify-between p-6">
          <div className="space-y-4 overflow-y-auto">
            {NAVIGATION.map((sec) => (
              <div key={sec.title} className="space-y-1">
                <div className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">{sec.title}</div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        isActive
                          ? "nav-active-glass text-[#111110]"
                          : "text-neutral-600 hover:bg-black/[0.03]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-neutral-400" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-[#E5E5E0]/50">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-xl bg-[#111110] text-white text-xs font-medium">
                Sign Out
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT REGION ─── */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 header-glass px-5 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Workspace Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-black/[0.03] transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[#111110] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  P
                </div>
                <span className="text-xs font-semibold text-[#111110] hidden sm:inline">{activeOrgName}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {showOrgDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#E5E5E0] rounded-xl shadow-lg p-2 z-50 animate-scale-in">
                  <div className="text-[10px] font-bold text-neutral-400 px-2 py-1 tracking-wider">
                    SWITCH WORKSPACE
                  </div>
                  <button
                    onClick={() => setShowOrgDropdown(false)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 text-left"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FF4F00]" />
                    PulseAI Health (Active)
                  </button>
                  <Link
                    href="/onboarding"
                    onClick={() => setShowOrgDropdown(false)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium text-neutral-500 hover:bg-neutral-50 text-left mt-1 border-t border-neutral-100"
                  >
                    <span className="text-[#FF4F00] font-bold">+</span> Create New Workspace
                  </Link>
                </div>
              )}
            </div>

            <span className="text-neutral-300 hidden sm:inline">/</span>
            <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline uppercase tracking-wider">
              TRACTION Stage
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search button */}
            <button className="w-8 h-8 rounded-xl text-neutral-400 hover:text-[#111110] hover:bg-black/[0.04] flex items-center justify-center transition-all" title="Search">
              <Search className="w-4 h-4" />
            </button>

            {/* Quick AI Trigger */}
            <button
              onClick={() => setQuickChatOpen(!quickChatOpen)}
              className="px-3 py-1.5 rounded-xl bg-[#111110] text-white text-[11px] font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Open Groq AI Co-Pilot Drawer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4F00]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Notification Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                  setShowOrgDropdown(false);
                }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  showNotifications
                    ? "bg-[#111110] text-white shadow-xs"
                    : "text-neutral-500 hover:text-[#111110] hover:bg-black/[0.04]"
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF4F00] ring-2 ring-[#F0F0EB]" />
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xl p-3 z-50 animate-scale-in">
                  <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#E5E5E0]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#111110]">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#111110] text-white">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[10px] font-semibold text-neutral-500 hover:text-[#111110] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-0.5">
                    {notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.href}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                          );
                          setShowNotifications(false);
                        }}
                        className={`block p-2.5 rounded-xl transition-all cursor-pointer ${
                          notif.unread
                            ? "bg-[#111110]/[0.04] border border-[#111110]/10 hover:bg-[#111110]/[0.08]"
                            : "hover:bg-neutral-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {notif.unread && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] flex-shrink-0" />
                            )}
                            <span className="text-xs font-semibold text-[#111110] line-clamp-1">
                              {notif.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                          {notif.description}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#E5E5E0] flex items-center justify-between text-[11px]">
                    <Link
                      href="/dashboard/opportunities"
                      onClick={() => setShowNotifications(false)}
                      className="text-[#111110] font-semibold hover:underline"
                    >
                      View Grant Schemes →
                    </Link>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                  setShowOrgDropdown(false);
                }}
                className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#111110] to-neutral-700 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${
                  showProfileDropdown
                    ? "ring-2 ring-[#111110] ring-offset-2 scale-105"
                    : "hover:ring-2 hover:ring-[#111110]/20"
                }`}
                title="User Profile & Settings"
              >
                AS
              </button>

              {/* Profile Dropdown Panel */}
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xl p-2.5 z-50 animate-scale-in">
                  {/* Founder Profile Details */}
                  <div className="p-2.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E0]/60 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#111110] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        AS
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-[#111110] truncate">Aarav Sharma</div>
                        <div className="text-[10px] text-neutral-400 truncate">aarav@pulseai.health</div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-[#E5E5E0]/60 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-neutral-500">PulseAI Health</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#111110] text-white uppercase">
                        Traction
                      </span>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="space-y-0.5">
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:bg-black/[0.04] hover:text-[#111110] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-neutral-400" />
                      Workspace Settings
                    </Link>
                    <Link
                      href="/dashboard/tasks"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:bg-black/[0.04] hover:text-[#111110] transition-colors"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-neutral-400" />
                      Tasks & Sprints
                    </Link>
                    <Link
                      href="/dashboard/roadmap"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:bg-black/[0.04] hover:text-[#111110] transition-colors"
                    >
                      <Target className="w-3.5 h-3.5 text-neutral-400" />
                      Milestone Roadmap
                    </Link>
                    <Link
                      href="/dashboard/ai"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:bg-black/[0.04] hover:text-[#111110] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FF4F00]" />
                      AI Co-Pilot Console
                    </Link>
                  </div>

                  <div className="mt-1 pt-1 border-t border-[#E5E5E0]">
                    <Link
                      href="/login"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Children */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* ─── Quick Groq AI Chat Drawer ─── */}
        {quickChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              onClick={() => setQuickChatOpen(false)}
              className="absolute inset-0 bg-black/25 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-over Drawer Panel */}
            <div className="relative w-full max-w-md h-full bg-white/95 backdrop-blur-xl border-l border-[#E5E5E0] shadow-2xl flex flex-col z-10 animate-slide-left">
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#E5E5E0] flex items-center justify-between bg-white/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#111110] text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#FF4F00]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#111110]">VentureOS AI Assistant</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#111110]/[0.06] text-[#111110] border border-[#E5E5E0] flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-[#FF4F00]" /> Groq LPU
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400">Context: PulseAI Health (14 Clinics • ₹32L Runway)</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href="/dashboard/ai"
                    onClick={() => setQuickChatOpen(false)}
                    className="w-7 h-7 rounded-lg text-neutral-400 hover:text-[#111110] hover:bg-black/[0.04] flex items-center justify-center transition-colors"
                    title="Open Fullscreen Workspace"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setQuickChatOpen(false)}
                    className="w-7 h-7 rounded-lg text-neutral-400 hover:text-[#111110] hover:bg-black/[0.04] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {quickMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${
                      m.role === "user" ? "ml-auto flex-row-reverse max-w-[85%]" : "mr-auto max-w-[90%]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        m.role === "user"
                          ? "bg-neutral-800 text-white"
                          : "bg-[#111110] text-white shadow-xs"
                      }`}
                    >
                      {m.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-xl text-xs leading-relaxed shadow-xs ${
                        m.role === "user"
                          ? "bg-[#111110] text-white rounded-tr-xs"
                          : "bg-white/95 border border-[#E5E5E0] text-[#111110] rounded-tl-xs"
                      }`}
                    >
                      <FormattedMessage content={m.content} isUser={m.role === "user"} />
                      <div
                        className={`text-[9px] mt-2 pt-1.5 border-t flex items-center justify-between ${
                          m.role === "user" ? "text-white/50 border-white/10 justify-end" : "text-neutral-400 border-[#E5E5E0]/70"
                        }`}
                      >
                        {m.role === "assistant" && (
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] text-neutral-500">
                            <Zap className="w-2.5 h-2.5 text-[#FF4F00]" />
                            Groq {m.latencyMs ? `• ${m.latencyMs}ms` : "• Sub-second"}
                          </span>
                        )}
                        <span>{m.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {quickLoading && (
                  <div className="flex items-center gap-2 text-xs text-neutral-400 animate-pulse pl-1">
                    <div className="w-5 h-5 rounded-md bg-[#111110] text-white flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <span>Groq is reasoning with live startup metrics...</span>
                  </div>
                )}
                <div ref={quickChatEndRef} />
              </div>

              {/* Suggestions */}
              <div className="px-3 py-2 border-t border-[#E5E5E0] bg-white/60 flex items-center gap-1.5 overflow-x-auto">
                {[
                  "Priorities this week",
                  "Grant matches",
                  "Runway & burn analysis",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSendQuickMessage(s)}
                    className="text-[10px] font-medium text-neutral-600 hover:text-[#111110] bg-neutral-100/80 hover:bg-neutral-200/60 border border-[#E5E5E0] rounded-full px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-[#E5E5E0] bg-white/90">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuickMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Ask Groq AI about strategy, runway, grants..."
                    disabled={quickLoading}
                    className="flex-1 h-9 px-3 text-xs rounded-xl border border-[#E5E5E0] bg-white text-[#111110] focus:outline-none focus:ring-2 focus:ring-[#111110]/15"
                  />
                  <button
                    type="submit"
                    disabled={quickLoading || !quickInput.trim()}
                    className="h-9 w-9 rounded-xl bg-[#111110] hover:bg-neutral-800 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ─── Floating Quick AI Launcher (bottom-right) ─── */}
        {pathname !== "/dashboard/ai" && (
          <button
            onClick={() => setQuickChatOpen(!quickChatOpen)}
            className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-full bg-[#111110] text-white hover:bg-[#27272A] shadow-xl border border-white/10 flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
            title="Chat with VentureOS Groq AI"
          >
            <Sparkles className="w-4 h-4 text-[#FF4F00] group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-tight">AI Co-Pilot</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-white/90">Groq</span>
          </button>
        )}
      </div>
    </div>
  );
}

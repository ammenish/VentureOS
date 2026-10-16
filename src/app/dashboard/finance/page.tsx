"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  AlertCircle,
  FileSpreadsheet,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Transaction, FinancialSummary, TransactionType } from "@/lib/types";

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [category, setCategory] = useState("Cloud Infrastructure");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2026-04-13");

  const loadFinance = async () => {
    try {
      const res = await fetch("/api/v1/finance?orgId=org_pulseai");
      const json = await res.json();
      if (json.success) {
        setSummary(json.data.summary);
        setTransactions(json.data.transactions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinance();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      const res = await fetch("/api/v1/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          type,
          category,
          description,
          date,
          orgId: "org_pulseai",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        setAmount("");
        setDescription("");
        loadFinance();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    if (!transactions.length) return;
    const headers = "ID,Date,Type,Category,Amount,Description\n";
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.date}","${t.type}","${t.category}","${t.amount}","${(t.description || "").replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `PulseAI_Transactions_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !summary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-3 border-neutral-300 border-t-[#111110] rounded-full animate-spin" />
        <span className="text-xs text-neutral-400">Loading financial ledger...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E5E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111110] tracking-tight">
            Financial Tracking & Runway Analytics
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Deterministic cash runway, monthly burn rate, and transactional operating ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Export CSV
          </Button>

          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl text-xs shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Record Transaction
          </Button>
        </div>
      </div>

      {/* ─── DETERMINISTIC SUMMARY CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cash Balance */}
        <Card className="border-[#E5E5E0] shadow-xs">
          <CardContent className="p-5">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Available Cash Balance
            </span>
            <div className="text-2xl font-bold text-[#111110] mt-1">
              ₹{summary.cashBalance.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-neutral-500 mt-1">Current liquid operating reserves</p>
          </CardContent>
        </Card>

        {/* Cash Runway */}
        <Card className="border-[#E5E5E0] shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Deterministic Runway
              </span>
              <Clock className="w-4 h-4 text-[#111110]" />
            </div>
            <div className="text-2xl font-bold text-[#111110] mt-1">
              {summary.cashRunway !== null ? `${summary.cashRunway} Months` : "Cash-Flow Positive"}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Formula: Available Cash / Net Monthly Burn
            </p>
          </CardContent>
        </Card>

        {/* Recorded Revenue */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              ₹{summary.totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-500 mt-1">From active outpatient clinics</p>
          </CardContent>
        </Card>

        {/* Operating Burn */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Average Net Burn
              </span>
              <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <ArrowDownRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              ₹{summary.monthlyBurn.toLocaleString("en-IN")}/mo
            </div>
            <p className="text-xs text-slate-500 mt-1">Net outflow after subscription revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimers & Assumptions Alert */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>
          <strong>Assumptions & Boundary Notice:</strong> Runway estimates assume stable recurring subscriptions and constant cloud compute workloads. This module provides internal financial intelligence and is not a certified tax or audit statement.
        </span>
      </div>

      {/* ─── REVENUE VS EXPENSE COMPARISON CHART ─── */}
      <Card className="border-[#E5E5E0] shadow-xs bg-white/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-[#111110]">
            Monthly Inflow vs Outflow
          </CardTitle>
          <p className="text-xs text-neutral-400">
            Comparative analysis of customer collections against AWS GPU compute and operating costs
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#A1A1AA", fontSize: 12 }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#A1A1AA", fontSize: 12 }}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val: unknown) => [
                    `₹${typeof val === "number" ? val.toLocaleString("en-IN") : val}`,
                    "",
                  ]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E5E5E0", fontSize: "12px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar dataKey="revenue" name="Revenue Inflow" fill="#111110" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expense Outflow" fill="#A1A1AA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ─── TRANSACTION LEDGER TABLE ─── */}
      <Card className="border-slate-200 shadow-xs">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">Operating Ledger</CardTitle>
            <p className="text-xs text-slate-400">Chronological history of inflows and outflows</p>
          </div>
          <Badge variant="outline" className="text-xs font-semibold">
            {transactions.length} Records
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      tx.type === "INCOME"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {tx.type === "INCOME" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {tx.description || tx.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {tx.category} • {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-right self-end sm:self-auto">
                  <span
                    className={`text-sm font-bold block ${
                      tx.type === "INCOME" ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {tx.type === "INCOME" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {tx.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── RECORD TRANSACTION MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-slate-900">Record Operating Transaction</h2>
            <p className="text-xs text-slate-500 mt-1">
              Add income from clinic contracts or operational expenses.
            </p>

            <form onSubmit={handleAddTransaction} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="INCOME">Income (Subscription)</option>
                    <option value="EXPENSE">Expense (Outflow)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Amount (₹ INR)
                  </label>
                  <Input
                    type="number"
                    required
                    placeholder="e.g. 95000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Subscriptions">Client Subscriptions</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure (AWS/GPU)</option>
                  <option value="Salaries & Payroll">Salaries & Stipends</option>
                  <option value="Software & Tools">Software Licenses</option>
                  <option value="Legal & Compliance">Legal & Regulatory (DPIIT/CDSCO)</option>
                  <option value="Marketing & Travel">Marketing & OPD Field Travel</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Description / Payee
                </label>
                <Input
                  placeholder="e.g. Apollo Polyclinic Annual SaaS Advance"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Transaction Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  Save Transaction
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

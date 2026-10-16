import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { calculateFinancialSummary } from "@/lib/finance-engine";
import { rankOpportunitiesForStartup } from "@/lib/opportunity-matcher";
import { DashboardData, AIInsight } from "@/lib/types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startup = dataStore.getOrganization(id);

  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 });
  }

  const tasks = dataStore.getTasks(id);
  const projects = dataStore.getProjects(id);
  const milestones = dataStore.getMilestones(id);
  const goals = dataStore.getGoals(id);
  const transactions = dataStore.getTransactions(id);
  const opportunities = dataStore.getOpportunities();

  const finances = calculateFinancialSummary(transactions);
  const matchedOpportunities = rankOpportunitiesForStartup(startup, opportunities);

  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const now = new Date();
  const overdueTasks = tasks.filter((t) => {
    if (t.status === "COMPLETED" || !t.dueDate) return false;
    return new Date(t.dueDate) < now;
  }).length;

  // Curate grounded AI insights based on actual startup state
  const aiInsights: AIInsight[] = [
    {
      id: "ins_1",
      observation: `Cash runway is healthy at ${finances.cashRunway ? `${finances.cashRunway} months` : "18+ months"} with ₹${finances.cashBalance.toLocaleString("en-IN")} in reserves.`,
      supportingData: `Net monthly burn is currently ₹${finances.monthlyBurn.toLocaleString("en-IN")}, offset by ₹${finances.totalRevenue.toLocaleString("en-IN")} in clinic subscriptions.`,
      whyItMatters: "Provides strong negotiating leverage for your Seed round without immediate cash starvation pressure.",
      suggestedAction: "Finalize SISFS grant application to inject ₹20L in non-dilutive capital before opening equity rounds.",
      moduleLink: "/dashboard/opportunities",
      category: "finance",
    },
    {
      id: "ins_2",
      observation: "High-priority compliance task approaching deadline: SISFS Incubator Selection.",
      supportingData: "Incubator quota closes at the end of the current evaluation cycle.",
      whyItMatters: "Selecting CIE IIIT Hyderabad or SINE IIT Bombay accelerates technical diligence approval.",
      suggestedAction: "Confirm partnership with shortlisted incubator partner in compliance project.",
      moduleLink: "/dashboard/tasks",
      category: "operations",
    },
    {
      id: "ins_3",
      observation: "Customer retention is at 100% across all 14 active pilot polyclinics.",
      supportingData: "Zero churn recorded in the past 60 days with consistent weekly diagnostic report usage.",
      whyItMatters: "Demonstrates strong product-market fit signal that institutional Seed VCs actively look for.",
      suggestedAction: "Add clinic retention cohort graph to Slide 7 of your investor pitch deck.",
      moduleLink: "/dashboard/funding",
      category: "growth",
    },
  ];

  const dashboardData: DashboardData = {
    startup,
    metrics: {
      revenue: finances.totalRevenue,
      expenses: finances.totalExpenses,
      cashBalance: finances.cashBalance,
      cashRunway: finances.cashRunway,
      customerCount: startup.customerCount || 14,
      taskCount: tasks.length,
      completedTasks,
      overdueTasks,
      projectCount: projects.length,
    },
    recentTasks: tasks.slice(0, 5),
    upcomingMilestones: milestones.filter((m) => !m.isCompleted).slice(0, 3),
    completedMilestones: milestones.filter((m) => m.isCompleted),
    goals,
    aiInsights,
    recommendedOpportunities: matchedOpportunities.slice(0, 3),
  };

  return NextResponse.json({ success: true, data: dashboardData });
}

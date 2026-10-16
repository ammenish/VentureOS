import { Transaction, FinancialSummary } from "./types";

/**
 * Deterministic Financial Calculations Engine for VentureOS
 * Computes burn rate, runway, net income, and monthly breakdowns
 */
export function calculateFinancialSummary(
  transactions: Transaction[],
  currentCashBalance: number = 3200000 // Default cash reserve if not explicitly set (₹32L)
): FinancialSummary {
  if (!transactions || transactions.length === 0) {
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,
      cashBalance: currentCashBalance,
      monthlyBurn: 0,
      cashRunway: null,
      revenueGrowth: null,
      monthlyData: [],
    };
  }

  // Aggregate monthly totals
  const monthlyMap = new Map<string, { revenue: number; expenses: number }>();

  let totalRev = 0;
  let totalExp = 0;

  for (const tx of transactions) {
    const d = new Date(tx.date);
    const monthKey = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { revenue: 0, expenses: 0 });
    }

    const current = monthlyMap.get(monthKey)!;

    if (tx.type === "INCOME") {
      current.revenue += tx.amount;
      totalRev += tx.amount;
    } else {
      current.expenses += tx.amount;
      totalExp += tx.amount;
    }
  }

  // Convert to sorted monthly array
  const monthlyData = Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    revenue: data.revenue,
    expenses: data.expenses,
  }));

  // Net Income
  const netIncome = totalRev - totalExp;

  // Monthly burn calculation
  // Net monthly burn = average monthly expenses - average monthly revenue
  const totalMonths = Math.max(monthlyData.length, 1);
  const avgMonthlyExpenses = totalExp / totalMonths;
  const avgMonthlyRevenue = totalRev / totalMonths;
  const netMonthlyBurn = avgMonthlyExpenses - avgMonthlyRevenue;

  // Cash runway calculation
  let cashRunway: number | null = null;
  if (netMonthlyBurn <= 0) {
    // If business is cash-flow positive or break-even, runway is infinite (represented as null with profitable note)
    cashRunway = null;
  } else {
    // Runway = Cash Reserve / Net Monthly Burn
    cashRunway = parseFloat((currentCashBalance / netMonthlyBurn).toFixed(1));
  }

  // Revenue growth calculation (between last two months if available)
  let revenueGrowth: number | null = null;
  if (monthlyData.length >= 2) {
    const prevMonthRev = monthlyData[monthlyData.length - 2].revenue;
    const currentMonthRev = monthlyData[monthlyData.length - 1].revenue;
    if (prevMonthRev > 0) {
      revenueGrowth = parseFloat((((currentMonthRev - prevMonthRev) / prevMonthRev) * 100).toFixed(1));
    }
  }

  return {
    totalRevenue: totalRev,
    totalExpenses: totalExp,
    netIncome,
    cashBalance: currentCashBalance,
    monthlyBurn: Math.max(0, netMonthlyBurn),
    cashRunway,
    revenueGrowth,
    monthlyData,
  };
}

import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { calculateFinancialSummary } from "@/lib/finance-engine";
import { TransactionType } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";

  const transactions = dataStore.getTransactions(orgId);
  const summary = calculateFinancialSummary(transactions);

  return NextResponse.json({
    success: true,
    data: {
      summary,
      transactions,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, type, category, description, date, orgId } = body;

    if (!amount || !type || !category) {
      return NextResponse.json(
        { error: "Amount, type (INCOME/EXPENSE), and category are required" },
        { status: 400 }
      );
    }

    const newTx = dataStore.createTransaction({
      id: `tx_${Date.now()}`,
      orgId: orgId || "org_pulseai",
      type: type as TransactionType,
      amount: parseFloat(amount),
      category,
      description: description || "",
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    dataStore.logAction({
      id: `log_${Date.now()}`,
      orgId: newTx.orgId,
      userId: "usr_founder_1",
      action: "FINANCE_TRANSACTION_RECORDED",
      entity: "Transaction",
      details: `Recorded ${newTx.type} of ₹${newTx.amount.toLocaleString("en-IN")} under ${newTx.category}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newTx });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

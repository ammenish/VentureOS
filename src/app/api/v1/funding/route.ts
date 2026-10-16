import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { evaluateFundingReadiness, generatePitchDeckOutline } from "@/lib/funding-engine";
import { InvestorStage } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";

  const startup = dataStore.getOrganization(orgId);
  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 });
  }

  const readiness = evaluateFundingReadiness(startup);
  const investors = dataStore.getInvestors(orgId);
  const pitchSlides = generatePitchDeckOutline(startup);

  return NextResponse.json({
    success: true,
    data: {
      readiness,
      investors,
      pitchSlides,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, orgId } = body;

    const startup = dataStore.getOrganization(orgId || "org_pulseai");
    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    if (action === "create_investor") {
      const { name, firm, stage, sectors, ticketSize, contactEmail, dealStage, notes } = body;
      const newInv = dataStore.createInvestor({
        id: `inv_${Date.now()}`,
        orgId: startup.id,
        name,
        firm,
        stage: stage || "Seed",
        sectors: sectors || [startup.industry],
        ticketSize: ticketSize || "$250K - $1M",
        contactEmail,
        dealStage: (dealStage as InvestorStage) || "IDENTIFIED",
        notes: notes || "",
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, data: newInv });
    }

    if (action === "pitch_draft") {
      const pitchSlides = generatePitchDeckOutline(startup);
      return NextResponse.json({ success: true, data: pitchSlides });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { rankOpportunitiesForStartup, matchOpportunity } from "@/lib/opportunity-matcher";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();

  const startup = dataStore.getOrganization(orgId);
  const allOpps = dataStore.getOpportunities();

  let filtered = allOpps;
  if (category && category !== "ALL") {
    filtered = filtered.filter((o) => o.category === category);
  }
  if (query) {
    filtered = filtered.filter(
      (o) =>
        o.name.toLowerCase().includes(query) ||
        o.provider.toLowerCase().includes(query) ||
        o.description.toLowerCase().includes(query)
    );
  }

  // If startup exists, augment with matching score and reasons
  if (startup) {
    const matches = filtered.map((opp) => matchOpportunity(startup, opp));
    matches.sort((a, b) => b.matchScore - a.matchScore);
    return NextResponse.json({ success: true, data: matches });
  }

  return NextResponse.json({
    success: true,
    data: filtered.map((opp) => ({ opportunity: opp, matchScore: 0 })),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orgId, opportunityId } = body;

    const startup = dataStore.getOrganization(orgId || "org_pulseai");
    const opp = dataStore.getOpportunity(opportunityId);

    if (!startup || !opp) {
      return NextResponse.json({ error: "Startup or opportunity not found" }, { status: 404 });
    }

    const match = matchOpportunity(startup, opp);
    return NextResponse.json({ success: true, data: match });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

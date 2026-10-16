import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { StartupStage } from "@/lib/types";

export async function GET() {
  const startups = dataStore.getOrganizations();
  return NextResponse.json({ success: true, data: startups });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, industry, description, businessModel, targetCustomers, geographicMarket, stage, goals, teamSize, revenue } = body;

    if (!name) {
      return NextResponse.json({ error: "Startup name is required" }, { status: 400 });
    }

    const orgId = `org_${Date.now()}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newOrg = dataStore.createOrganization(
      {
        id: orgId,
        name,
        slug,
        industry: industry || "Technology",
        description: description || "",
        businessModel: businessModel || "B2B SaaS",
        targetCustomers: targetCustomers || "Enterprise & SMB",
        geographicMarket: geographicMarket || "India",
        stage: (stage as StartupStage) || "MVP",
        teamSize: teamSize || 2,
        revenue: revenue || 0,
        goals: goals || ["Launch MVP", "Acquire initial pilot customers"],
        isRegistered: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      "usr_founder_1"
    );

    // Also populate initial standard milestones for the chosen stage
    dataStore.createMilestone({
      id: `mls_${Date.now()}_1`,
      orgId,
      title: "Validate core value proposition with 10 target users",
      description: "Gather structured qualitative feedback",
      stage: newOrg.stage,
      isCompleted: false,
      order: 1,
      createdAt: new Date().toISOString(),
    });

    dataStore.createMilestone({
      id: `mls_${Date.now()}_2`,
      orgId,
      title: "Deploy V1 production release",
      description: "Deliver MVP with telemetry and onboarding flow",
      stage: newOrg.stage,
      isCompleted: false,
      order: 2,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newOrg });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

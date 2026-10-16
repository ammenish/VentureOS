import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";
  const projects = dataStore.getProjects(orgId);
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, orgId } = body;

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const newProject = dataStore.createProject({
      id: `proj_${Date.now()}`,
      orgId: orgId || "org_pulseai",
      name,
      description: description || "",
      status: "ACTIVE",
      taskCount: 0,
      completedTaskCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newProject });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

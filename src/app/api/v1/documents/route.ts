import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";
  const docs = dataStore.getDocuments(orgId);
  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, size, orgId } = body;

    if (!name) {
      return NextResponse.json({ error: "Document name is required" }, { status: 400 });
    }

    const newDoc = dataStore.createDocument({
      id: `doc_${Date.now()}`,
      orgId: orgId || "org_pulseai",
      name,
      category: category || "pitch_deck",
      size: size || "1.5 MB",
      url: `/docs/${name.replace(/\s+/g, "_")}`,
      uploadedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newDoc });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

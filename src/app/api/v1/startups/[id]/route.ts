import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const startup = dataStore.getOrganization(id);
  if (!startup) {
    return NextResponse.json({ error: "Startup not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: startup });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = dataStore.updateOrganization(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

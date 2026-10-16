import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = dataStore.updateTask(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    dataStore.logAction({
      id: `log_${Date.now()}`,
      orgId: updated.orgId,
      userId: "usr_founder_1",
      action: "TASK_UPDATED",
      entity: "Task",
      details: `Updated task "${updated.title}" to status ${updated.status}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = dataStore.deleteTask(id);

    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

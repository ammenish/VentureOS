import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { TaskStatus, TaskPriority } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || "org_pulseai";
  const tasks = dataStore.getTasks(orgId);
  return NextResponse.json({ success: true, data: tasks });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, priority, status, projectId, dueDate, orgId } = body;

    if (!title) {
      return NextResponse.json({ error: "Task title is required" }, { status: 400 });
    }

    const newTask = dataStore.createTask({
      id: `tsk_${Date.now()}`,
      orgId: orgId || "org_pulseai",
      projectId: projectId || undefined,
      title,
      description: description || "",
      status: (status as TaskStatus) || "TODO",
      priority: (priority as TaskPriority) || "MEDIUM",
      dueDate: dueDate || undefined,
      assigneeId: "usr_founder_1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    dataStore.logAction({
      id: `log_${Date.now()}`,
      orgId: newTask.orgId,
      userId: "usr_founder_1",
      action: "TASK_CREATED",
      entity: "Task",
      details: `Created task "${newTask.title}"`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newTask });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

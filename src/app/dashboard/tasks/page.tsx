"use client";

import { useState, useEffect } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Columns,
  List,
  Calendar,
  AlertCircle,
  Clock,
  Trash2,
  CheckCircle2,
  FolderPlus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task, Project, TaskStatus, TaskPriority } from "@/lib/types";

const COLUMNS: { status: TaskStatus; label: string; dotColor: string }[] = [
  { status: "BACKLOG", label: "Backlog", dotColor: "bg-neutral-400" },
  { status: "TODO", label: "To Do", dotColor: "bg-amber-500" },
  { status: "IN_PROGRESS", label: "In Progress", dotColor: "bg-[#111110]" },
  { status: "BLOCKED", label: "Blocked", dotColor: "bg-rose-500" },
  { status: "COMPLETED", label: "Completed", dotColor: "bg-emerald-500" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("HIGH");
  const [newStatus, setNewStatus] = useState<TaskStatus>("TODO");
  const [newProjectId, setNewProjectId] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const loadData = async () => {
    try {
      const [tRes, pRes] = await Promise.all([
        fetch("/api/v1/tasks?orgId=org_pulseai"),
        fetch("/api/v1/projects?orgId=org_pulseai"),
      ]);
      const tJson = await tRes.json();
      const pJson = await pRes.json();
      if (tJson.success) setTasks(tJson.data);
      if (pJson.success) setProjects(pJson.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );

    try {
      await fetch(`/api/v1/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    try {
      await fetch(`/api/v1/tasks/${taskId}`, { method: "DELETE" });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          priority: newPriority,
          status: newStatus,
          projectId: newProjectId || (projects[0]?.id ?? undefined),
          dueDate: newDueDate || undefined,
          orgId: "org_pulseai",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setTasks((prev) => [json.data, ...prev]);
        setShowAddModal(false);
        setNewTitle("");
        setNewDesc("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      selectedProject === "ALL" || t.projectId === selectedProject;
    return matchesQuery && matchesProject;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Tasks & Project Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize engineering sprints, fundraising milestones, and compliance deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F7F7F5] border border-[#E5E5E0] rounded-xl p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "kanban"
                  ? "bg-[#111110] text-white shadow-xs"
                  : "text-neutral-500 hover:text-[#111110]"
              }`}
              title="Kanban Board View"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "list"
                  ? "bg-[#111110] text-white shadow-xs"
                  : "text-neutral-500 hover:text-[#111110]"
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="bg-[#111110] hover:bg-neutral-800 text-white text-xs rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-neutral-400 font-semibold whitespace-nowrap">Filter:</span>
          <button
            onClick={() => setSelectedProject("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedProject === "ALL"
                ? "bg-[#111110] text-white shadow-xs"
                : "bg-white/80 border border-[#E5E5E0] text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            All Projects
          </button>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedProject === p.id
                  ? "bg-[#111110] text-white shadow-xs"
                  : "bg-white/80 border border-[#E5E5E0] text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── KANBAN BOARD VIEW ─── */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {COLUMNS.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-slate-100/60 border border-slate-200/80 rounded-xl p-3 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span className="text-xs font-bold text-slate-800">{col.label}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                          {t.title}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(t.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-opacity p-0.5"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {t.description && (
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-1 text-[10px]">
                        <Badge
                          variant={
                            t.priority === "URGENT"
                              ? "destructive"
                              : t.priority === "HIGH"
                              ? "primary"
                              : "secondary"
                          }
                          className="text-[9px] px-1.5 py-0"
                        >
                          {t.priority}
                        </Badge>

                        {t.dueDate && (
                          <span className="text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      {/* Quick Status Move Dropdown */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Move:</span>
                        <select
                          value={t.status}
                          onChange={(e) =>
                            handleStatusChange(t.id, e.target.value as TaskStatus)
                          }
                          className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 focus:outline-hidden"
                        >
                          {COLUMNS.map((c) => (
                            <option key={c.status} value={c.status}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="h-24 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                      No tasks in {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── LIST VIEW ─── */}
      {viewMode === "list" && (
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          t.id,
                          t.status === "COMPLETED" ? "TODO" : "COMPLETED"
                        )
                      }
                      className="mt-0.5 text-neutral-400 hover:text-[#111110]"
                    >
                      {t.status === "COMPLETED" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-neutral-300" />
                      )}
                    </button>
                    <div>
                      <div
                        className={`text-xs font-semibold ${
                          t.status === "COMPLETED" ? "line-through text-neutral-400" : "text-[#111110]"
                        }`}
                      >
                        {t.title}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {t.project?.name || "General"} • Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "Flexible"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Badge variant={t.priority === "URGENT" ? "destructive" : "primary"}>
                      {t.priority}
                    </Badge>
                    <select
                      value={t.status}
                      onChange={(e) =>
                        handleStatusChange(t.id, e.target.value as TaskStatus)
                      }
                      className="text-xs bg-white border border-[#E5E5E0] rounded-lg px-2.5 py-1 text-[#111110]"
                    >
                      {COLUMNS.map((c) => (
                        <option key={c.status} value={c.status}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="text-neutral-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ─── ADD TASK MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-[#E5E5E0] rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-[#111110]">Create New Task</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Add actionable task to your startup projects pipeline.
            </p>

            <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1">
                  Task Title
                </label>
                <Input
                  required
                  placeholder="e.g. Schedule meeting with IIIT-H incubator manager"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1">
                  Description / Context
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes, deliverables, and acceptance criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-[#E5E5E0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#111110]/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#111110] block mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#E5E5E0] rounded-xl bg-white text-[#111110]"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#111110] block mb-1">
                    Project
                  </label>
                  <select
                    value={newProjectId}
                    onChange={(e) => setNewProjectId(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#E5E5E0] rounded-xl bg-white text-[#111110]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#111110] block mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl">
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

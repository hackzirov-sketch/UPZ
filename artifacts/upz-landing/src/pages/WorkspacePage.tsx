import { useEffect, useMemo, useState } from "react";
import { Calendar, FileText, Figma, Github, HardDrive, LayoutDashboard, NotepadText, Plus, Settings, Slack, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, PageHeader, PageShell, Pill, ProgressBar, SectionTitle, SurfaceCard } from "@/components/app/DesignSystem";
import { DataTable, FilterBar, ViewSwitcher, WidgetCard, WorkspaceHierarchy } from "@/components/app/PowerWorkspaceSystem";
import { CLIP_ITEMS, DASHBOARD_WIDGETS, DOC_PAGES, FORM_FIELDS, POWER_VIEWS, SMART_TASKS, WHITEBOARD_NODES, WORKSPACE_ZONE } from "@/data/ecosystemData";
import type { TaskView, UserProfile } from "@/types";
import { storage } from "@/utils/storage";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

const INTEGRATIONS = [
  { id: "github", name: "GitHub", icon: Github, status: "Connected", desc: "Repo, PR, issue and commit activity placeholder." },
  { id: "drive", name: "Drive", icon: HardDrive, status: "Ready UI", desc: "Docs, files, assets and handoff folders." },
  { id: "calendar", name: "Calendar", icon: Calendar, status: "Ready UI", desc: "Deadlines, meetings, agenda and reminder sync." },
  { id: "slack", name: "Slack", icon: Slack, status: "Placeholder", desc: "Team notifications and channel mirroring." },
  { id: "figma", name: "Figma", icon: Figma, status: "Placeholder", desc: "Design files, exports, review comments and tokens." },
  { id: "notion", name: "Notion", icon: NotepadText, status: "Placeholder", desc: "Knowledge import and wiki bridge." },
];

export default function WorkspacePage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<TaskView>(() => storage.getActiveView() ?? "board");
  const [activeBoard, setActiveBoard] = useState(() => storage.getActiveBoard() ?? "Roadmap");
  const [query, setQuery] = useState("");
  const filteredTasks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SMART_TASKS;
    return SMART_TASKS.filter((task) => `${task.title} ${task.project} ${task.assignee} ${task.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => storage.saveActiveView(activeView), [activeView]);
  useEffect(() => storage.saveActiveBoard(activeBoard), [activeBoard]);

  const taskRows = filteredTasks.map((task) => ({
    id: task.id,
    cells: [
      <span className="font-black">{task.title}</span>,
      <Pill tone="blue">{task.project}</Pill>,
      <span>{task.assignee}</span>,
      <Pill tone={task.priority === "high" ? "red" : task.priority === "medium" ? "amber" : "green"}>{task.priority}</Pill>,
      <span className="text-[#6B7280]">{task.dueDate}</span>,
    ],
  }));

  return (
    <AppLayout user={user} title={t("app.nav.workspace")} onLogout={onLogout}>
      <PageShell>
        <PageHeader
          eyebrow="Power Workspace"
          title={`Zone command center for ${user.name}`}
          description="ClickUp-level structure translated into UPZ: zones, spaces, collections, boards, views, docs, canvas, forms, clips and integrations in one clean operating layer."
        >
          <ActionButton><Plus className="h-4 w-4" /> New collection</ActionButton>
          <ActionButton variant="secondary"><Settings className="h-4 w-4" /> Customize layout</ActionButton>
        </PageHeader>

        <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
          <WorkspaceHierarchy zone={WORKSPACE_ZONE} activeBoard={activeBoard} onSelectBoard={setActiveBoard} />
          <div className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <ViewSwitcher views={POWER_VIEWS} value={activeView} onChange={setActiveView} />
              <div className="flex flex-wrap gap-2">
                <Pill tone="green">{WORKSPACE_ZONE.health}% zone health</Pill>
                <Pill tone="indigo">Active board: {activeBoard}</Pill>
              </div>
            </div>

            <FilterBar query={query} onQueryChange={setQuery} chips={["Assignee", "Priority", "Due date", "Tag", "Saved view"]} />

            {activeView === "board" && (
              <SurfaceCard>
                <SectionTitle icon={LayoutDashboard} title="Board view" description="Compact Smart Task board grouped by UPZ workflow statuses." />
                <div className="grid gap-3 xl:grid-cols-4">
                  {["todo", "in_progress", "review", "done"].map((status) => (
                    <div key={status} className="rounded-2xl bg-[#F7FAFC] p-3 ring-1 ring-[#E5E7EB]">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-black capitalize text-[#111827]">{status.replace("_", " ")}</h3>
                        <Pill tone="slate">{filteredTasks.filter((task) => task.status === status).length}</Pill>
                      </div>
                      <div className="space-y-2">
                        {filteredTasks.filter((task) => task.status === status).map((task) => (
                          <div key={task.id} className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
                            <p className="text-sm font-black text-[#111827]">{task.title}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {task.tags.slice(0, 2).map((tag) => <Pill key={tag} tone="blue">{tag}</Pill>)}
                            </div>
                            <ProgressBar value={task.progress} label={task.assignee} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            )}

            {activeView === "list" && <DataTable columns={["Task", "Project", "Owner", "Priority", "Due"]} rows={taskRows} />}
            {activeView === "table" && <DataTable columns={["Task", "Project", "Owner", "Priority", "Due"]} rows={taskRows} />}

            {activeView === "calendar" && (
              <SurfaceCard>
                <SectionTitle icon={Calendar} title="Calendar view" description="Deadline preview for Smart Tasks, meetings and reminders." />
                <div className="grid gap-3 md:grid-cols-4">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-500">{task.dueDate}</p>
                      <p className="mt-2 text-sm font-black text-[#111827]">{task.title}</p>
                      <p className="mt-1 text-xs text-[#6B7280]">{task.assignee}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            )}

            {activeView === "timeline" && (
              <SurfaceCard>
                <SectionTitle icon={Sparkles} title="Timeline view" description="Launch lane with progress, estimate and tracked focus time." />
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="grid gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4 md:grid-cols-[1fr_2fr_0.5fr] md:items-center">
                      <div>
                        <p className="font-black text-[#111827]">{task.title}</p>
                        <p className="text-xs text-[#6B7280]">{task.estimate} estimate - {task.timeTracked} tracked</p>
                      </div>
                      <ProgressBar value={task.progress} />
                      <Pill tone="indigo">{task.dueDate}</Pill>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            )}

            {activeView === "dashboard" && (
              <SurfaceCard>
                <SectionTitle icon={LayoutDashboard} title="Insight Board" description="Saved dashboard widgets for power-user workspace monitoring." />
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {DASHBOARD_WIDGETS.slice(0, 4).map((widget) => <WidgetCard key={widget.id} widget={widget} />)}
                </div>
              </SurfaceCard>
            )}
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <SurfaceCard>
            <SectionTitle icon={FileText} title="Knowledge Hub" description="Docs and wiki pages linked to tasks, spaces and boards." />
            <div className="grid gap-3 md:grid-cols-3">
              {DOC_PAGES.map((doc) => (
                <div key={doc.id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4">
                  <p className="font-black text-[#111827]">{doc.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-[#6B7280]">{doc.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#6B7280]"><span>{doc.space}</span><span>{doc.linkedTasks} tasks</span></div>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle icon={Sparkles} title="UPZ Canvas + Intake" description="Whiteboard nodes, intake fields and screen notes placeholders." />
            <div className="relative h-56 overflow-hidden rounded-[24px] bg-[#F7FAFC] ring-1 ring-[#E5E7EB]">
              {WHITEBOARD_NODES.map((node) => (
                <div key={node.id} className="absolute rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#111827] shadow-sm ring-1 ring-[#E5E7EB]" style={{ left: `${node.x}%`, top: `${node.y}%` }}>{node.title}</div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {FORM_FIELDS.map((field) => <Pill key={field.id} tone={field.required ? "indigo" : "slate"}>{field.label}</Pill>)}
              {CLIP_ITEMS.map((clip) => <Pill key={clip.id} tone="blue">{clip.title} - {clip.duration}</Pill>)}
            </div>
          </SurfaceCard>
        </div>

        <SurfaceCard>
          <SectionTitle title="Integration placeholders" description="Backend-ready UI for the tool ecosystem UPZ will connect later." />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {INTEGRATIONS.map(({ id, name, icon: Icon, status, desc }) => (
              <div key={id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                  <Pill tone={status === "Connected" ? "green" : "slate"}>{status}</Pill>
                </div>
                <h3 className="mt-4 font-black text-[#111827]">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{desc}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </PageShell>
    </AppLayout>
  );
}

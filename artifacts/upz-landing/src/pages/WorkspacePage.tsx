import { useState } from "react";
import {
  Calendar,
  Code2,
  ExternalLink,
  FileText,
  GitBranch,
  GripVertical,
  HardDrive,
  Layers,
  Plus,
  Settings,
  Slack,
  Terminal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, EmptyState, PageHeader, PageShell, Pill, SectionTitle, SimpleTabs, SurfaceCard } from "@/components/app/DesignSystem";
import type { UserProfile } from "@/types";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

interface WorkspaceCard {
  id: string;
  titleKey: string;
  descKey: string;
  badgeKey: string;
  accent: string;
}

const WORKSPACE_TABS = ["projects", "tools", "layout"] as const;

const BASE_CARDS: WorkspaceCard[] = [
  { id: "repos", titleKey: "reposTitle", descKey: "reposDesc", badgeKey: "reposBadge", accent: "#6366F1" },
  { id: "tasks", titleKey: "tasksTitle", descKey: "tasksDesc", badgeKey: "tasksBadge", accent: "#3B82F6" },
  { id: "files", titleKey: "filesTitle", descKey: "filesDesc", badgeKey: "filesBadge", accent: "#10B981" },
  { id: "calendar", titleKey: "calendarTitle", descKey: "calendarDesc", badgeKey: "calendarBadge", accent: "#F59E0B" },
];

const INTEGRATIONS = [
  { id: "github", name: "GitHub", descKey: "github", icon: GitBranch, statusKey: "connected" },
  { id: "drive", name: "Google Drive", descKey: "drive", icon: HardDrive, statusKey: "placeholder" },
  { id: "slack", name: "Slack", descKey: "slack", icon: Slack, statusKey: "placeholder" },
  { id: "calendar", name: "Calendar", descKey: "calendar", icon: Calendar, statusKey: "readyUi" },
];

export default function WorkspacePage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<(typeof WORKSPACE_TABS)[number]>("projects");
  const [cards, setCards] = useState(BASE_CARDS);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const moveCard = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    setCards((current) => {
      const sourceIndex = current.findIndex((card) => card.id === draggingId);
      const targetIndex = current.findIndex((card) => card.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const tabLabels = Object.fromEntries(WORKSPACE_TABS.map((tab) => [tab, t(`app.workspace.tabs.${tab}`)])) as Record<(typeof WORKSPACE_TABS)[number], string>;
  const profession = t(`app.professions.${user.profession}`, user.profession);

  return (
    <AppLayout user={user} title={t("app.nav.workspace")} onLogout={onLogout}>
      <PageShell>
        <PageHeader
          eyebrow={t("app.workspace.eyebrow")}
          title={t("app.workspace.title", { profession })}
          description={t("app.workspace.description")}
        >
          <ActionButton><Plus className="h-4 w-4" /> {t("app.workspace.addCard")}</ActionButton>
          <ActionButton variant="secondary"><Settings className="h-4 w-4" /> {t("app.workspace.customize")}</ActionButton>
        </PageHeader>

        <SimpleTabs tabs={WORKSPACE_TABS} labels={tabLabels} value={activeTab} onChange={(tab) => setActiveTab(tab as (typeof WORKSPACE_TABS)[number])} />

        {activeTab === "projects" && (
          <SurfaceCard>
            <SectionTitle icon={Layers} title={t("app.workspace.projectWorkspace")} description={t("app.workspace.projectWorkspaceDesc")} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  draggable
                  onDragStart={() => setDraggingId(card.id)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    moveCard(card.id);
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  className="group rounded-2xl border border-[#E5E7EB] bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${card.accent}14`, color: card.accent }}>
                      {card.id === "repos" ? <GitBranch className="h-5 w-5" /> : card.id === "tasks" ? <Terminal className="h-5 w-5" /> : card.id === "files" ? <FileText className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                    </span>
                    <div className="flex items-center gap-2">
                      <Pill tone="indigo">{t(`app.workspace.cards.${card.badgeKey}`)}</Pill>
                      <GripVertical className="h-4 w-4 text-[#6B7280] opacity-60 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-[#111827]">{t(`app.workspace.cards.${card.titleKey}`)}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">{t(`app.workspace.cards.${card.descKey}`)}</p>
                </button>
              ))}
            </div>
          </SurfaceCard>
        )}

        {activeTab === "tools" && (
          <SurfaceCard>
            <SectionTitle icon={Code2} title={t("app.workspace.toolIntegrations")} description={t("app.workspace.toolIntegrationsDesc")} />
            <div className="grid gap-4 md:grid-cols-2">
              {INTEGRATIONS.map(({ id, name, descKey, icon: Icon, statusKey }) => (
                <div key={id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-5 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#111827]">{name}</h3>
                        <p className="mt-1 text-sm text-[#6B7280]">{t(`app.workspace.integrations.${descKey}`)}</p>
                      </div>
                    </div>
                    <Pill tone={statusKey === "connected" ? "green" : "slate"}>{t(`app.status.${statusKey}`)}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        )}

        {activeTab === "layout" && (
          <EmptyState
            icon={ExternalLink}
            title={t("app.workspace.layoutTitle")}
            description={t("app.workspace.layoutDesc")}
            action={<ActionButton variant="secondary">{t("app.workspace.previewLayout")}</ActionButton>}
          />
        )}
      </PageShell>
    </AppLayout>
  );
}

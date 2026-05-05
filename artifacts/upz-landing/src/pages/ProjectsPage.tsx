import { useState } from "react";
import { CalendarDays, ClipboardList, Plus, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, Modal, PageHeader, PageShell, Pill, SectionTitle, SurfaceCard } from "@/components/app/DesignSystem";
import { ACTIVITY_LOG, PROJECT_COLUMNS, TEAM_MEMBERS } from "@/data/ecosystemData";
import type { UserProfile } from "@/types";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

export default function ProjectsPage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppLayout user={user} title={t("app.nav.projects")} onLogout={onLogout}>
      <PageShell>
        <PageHeader
          eyebrow={t("app.projects.eyebrow")}
          title={t("app.projects.title")}
          description={t("app.projects.description")}
        >
          <ActionButton onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> {t("app.projects.createProject")}</ActionButton>
          <ActionButton variant="secondary"><CalendarDays className="h-4 w-4" /> {t("app.projects.deadlines")}</ActionButton>
        </PageHeader>

        <SurfaceCard>
          <SectionTitle icon={ClipboardList} title={t("app.projects.kanban")} description={t("app.projects.kanbanDesc")} />
          <div className="grid gap-4 xl:grid-cols-4">
            {PROJECT_COLUMNS.map((column) => (
              <div key={column.id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-[#111827]">{t(`app.projects.columns.${column.id}.title`, column.title)}</h3>
                  <Pill tone="slate">{column.tasks.length}</Pill>
                </div>
                <div className="space-y-3">
                  {column.tasks.map((task, index) => {
                    const priority = index % 2 === 0 ? "high" : "medium";
                    return (
                      <button key={task} type="button" className="w-full rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <p className="font-semibold leading-snug text-[#111827]">{t(`app.projects.columns.${column.id}.tasks.${index}`, task)}</p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <Pill tone={priority === "high" ? "indigo" : "blue"}>{t(`app.priority.${priority}`)}</Pill>
                          <span className="text-xs text-[#6B7280]">{t("app.projects.dueMay", { day: 8 + index })}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <SurfaceCard>
            <SectionTitle icon={UserPlus} title={t("app.projects.assignment")} description={t("app.projects.assignmentDesc")} />
            <div className="space-y-3">
              {TEAM_MEMBERS.slice(0, 3).map((member, index) => (
                <div key={member.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#F7FAFC] p-4">
                  <div>
                    <p className="font-semibold text-[#111827]">{member.name}</p>
                    <p className="text-sm text-[#6B7280]">{t(`app.teams.focus.${member.focus.toLowerCase()}`, member.focus)}</p>
                  </div>
                  <Pill tone={index === 0 ? "indigo" : "slate"}>{t("app.projects.tasksCount", { count: index + 2 })}</Pill>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle title={t("app.projects.activityLog")} description={t("app.projects.activityLogDesc")} />
            <div className="space-y-3">
              {ACTIVITY_LOG.map((activity, index) => (
                <div key={activity} className="flex gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{t(`app.projects.activity.${index}`, activity)}</p>
                    <p className="mt-1 text-xs text-[#6B7280]">{t("app.projects.recorded")}</p>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <Modal open={modalOpen} title={t("app.projects.modalTitle")} description={t("app.projects.modalDesc")} onClose={() => setModalOpen(false)}>
          <div className="space-y-3">
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.projects.projectName")} />
            <textarea className="min-h-28 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.projects.projectBrief")} />
            <div className="flex justify-end gap-2 pt-2">
              <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>{t("app.common.cancel")}</ActionButton>
              <ActionButton onClick={() => setModalOpen(false)}>{t("app.projects.createDemoProject")}</ActionButton>
            </div>
          </div>
        </Modal>
      </PageShell>
    </AppLayout>
  );
}

import { useState } from "react";
import { MessageCircle, Plus, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, Modal, PageHeader, PageShell, Pill, ProgressBar, SectionTitle, SurfaceCard } from "@/components/app/DesignSystem";
import { PremiumAvatarRing, PremiumGradientBadge, PremiumStatusBadge, type PremiumStatusId } from "@/components/premium/PremiumAssets";
import { TEAM_MEMBERS, TEAM_SPACES } from "@/data/ecosystemData";
import type { UserProfile } from "@/types";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

const TEAM_METRICS = [
  { labelKey: "members", value: "7" },
  { labelKey: "openTasks", value: "18" },
  { labelKey: "teamChats", value: "3" },
  { labelKey: "thisWeek", value: "84%" },
];

const TEAM_STATUS: Record<string, PremiumStatusId> = {
  Online: "available",
  Away: "busy",
  Offline: "offline",
};

const TEAM_FOCUS_ASSETS = {
  Frontend: "/emojis/laptop.svg",
  Design: "/emojis/gem.svg",
  Delivery: "/emojis/rocket.svg",
  Marketing: "/emojis/trophy.svg",
  Product: "/emojis/book.svg",
  Backend: "/status/coding.svg",
} as const;

export default function TeamsPage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppLayout user={user} title={t("app.nav.teams")} onLogout={onLogout}>
      <PageShell>
        <PageHeader
          eyebrow={t("app.teams.eyebrow")}
          title={t("app.teams.title")}
          description={t("app.teams.description")}
        >
          <ActionButton onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> {t("app.teams.createTeam")}</ActionButton>
          <ActionButton variant="secondary"><MessageCircle className="h-4 w-4" /> {t("app.teams.openTeamChat")}</ActionButton>
        </PageHeader>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <SurfaceCard>
            <SectionTitle icon={Users} title={t("app.teams.dashboard")} description={t("app.teams.dashboardDesc")} />
            <div className="grid gap-3 sm:grid-cols-2">
              {TEAM_METRICS.map((metric) => (
                <div key={metric.labelKey} className="rounded-2xl bg-[#F7FAFC] p-4 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{t(`app.teams.metrics.${metric.labelKey}`)}</p>
                  <p className="mt-2 text-2xl font-bold text-[#111827]">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-semibold text-indigo-700">{t("app.teams.linkedChat")}</p>
              <p className="mt-1 text-sm text-indigo-700/80">{t("app.teams.linkedChatDesc")}</p>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle icon={Shield} title={t("app.teams.membersRoles")} description={t("app.teams.membersRolesDesc")} />
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <PremiumAvatarRing active={member.status === "Online"} className="h-11 w-11 rounded-2xl">
                      <div className="relative grid h-full w-full place-items-center rounded-[14px] bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-bold text-white">
                        {member.name.split(" ").map((part) => part[0]).join("")}
                        <PremiumStatusBadge status={TEAM_STATUS[member.status] ?? "offline"} size={16} className="absolute -bottom-1 -right-1 border-[#E5E7EB]" />
                      </div>
                    </PremiumAvatarRing>
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-[#111827]">
                        {member.name}
                        {member.role === "Admin" && <PremiumGradientBadge label="Creator" icon="/emojis/trophy.svg" />}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#6B7280]">
                        <img src={TEAM_FOCUS_ASSETS[member.focus as keyof typeof TEAM_FOCUS_ASSETS] ?? "/emojis/gem.svg"} alt={`${member.focus} skill icon`} className="h-4 w-4" loading="lazy" decoding="async" />
                        {t(`app.teams.focus.${member.focus.toLowerCase()}`, member.focus)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Pill tone={member.role === "Admin" ? "indigo" : "slate"}>{t(`app.teams.roles.${member.role.toLowerCase()}`, member.role)}</Pill>
                    <Pill tone={member.status === "Online" ? "green" : member.status === "Away" ? "amber" : "slate"}>{t(`app.chat.${member.status.toLowerCase()}`, member.status)}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard>
            <SectionTitle icon={Users} title="Team spaces" description="Spaces connect people, projects, chats, workload and permissions." />
            <div className="grid gap-3 md:grid-cols-3">
              {TEAM_SPACES.map((space) => (
                <div key={space.id} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black text-[#111827]">{space.name}</h3>
                    <Pill tone="indigo">{space.projects} projects</Pill>
                  </div>
                  <p className="mt-2 text-sm text-[#6B7280]">{space.permissions}</p>
                  <div className="mt-4"><ProgressBar value={space.workload} label="Workload" /></div>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle icon={Shield} title="Roles and permissions" description="Admin/member roles are ready for future backend permissions." />
            <div className="space-y-3">
              {["Create projects", "Manage automations", "Invite members", "Approve deliverables"].map((permission, index) => (
                <div key={permission} className="flex items-center justify-between rounded-2xl bg-[#F7FAFC] p-3 ring-1 ring-[#E5E7EB]">
                  <span className="text-sm font-bold text-[#111827]">{permission}</span>
                  <div className="flex gap-2">
                    <Pill tone="indigo">Admin</Pill>
                    <Pill tone={index < 2 ? "slate" : "blue"}>{index < 2 ? "Restricted" : "Member"}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <Modal open={modalOpen} title={t("app.teams.modalTitle")} description={t("app.teams.modalDesc")} onClose={() => setModalOpen(false)}>
          <div className="space-y-3">
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.teams.teamName")} />
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.teams.inviteEmail")} />
            <div className="flex justify-end gap-2 pt-2">
              <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>{t("app.common.cancel")}</ActionButton>
              <ActionButton onClick={() => setModalOpen(false)}>{t("app.teams.createDemoTeam")}</ActionButton>
            </div>
          </div>
        </Modal>
      </PageShell>
    </AppLayout>
  );
}

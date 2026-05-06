import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Copy,
  Crown,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MoreVertical,
  Plus,
  Search,
  Settings2,
  Shield,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import {
  ActionButton,
  EmptyState,
  Modal,
  PageHeader,
  PageShell,
  Pill,
  ProgressBar,
  SectionTitle,
  SurfaceCard,
  Toast,
  cn,
} from "@/components/app/DesignSystem";
import { TEAM_ACTIVITY, TEAM_MEMBERS, TEAM_PERMISSIONS, TEAM_RITUALS } from "@/data/ecosystemData";
import type { UserProfile } from "@/types";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

type TeamMember = (typeof TEAM_MEMBERS)[number];
type TeamFilter = "all" | "online" | "away" | "admin";

const TEAM_METRICS = [
  { labelKey: "members", value: "7", tone: "indigo" },
  { labelKey: "openTasks", value: "18", tone: "blue" },
  { labelKey: "teamChats", value: "3", tone: "green" },
  { labelKey: "thisWeek", value: "84%", tone: "amber" },
] as const;

const TEAM_FILTERS: TeamFilter[] = ["all", "online", "away", "admin"];

const statusTone = {
  Online: "bg-emerald-400 ring-emerald-100",
  Away: "bg-amber-400 ring-amber-100",
  Offline: "bg-slate-400 ring-slate-100",
};

const workloadTone = (value: number) => {
  if (value >= 75) return "#6366F1";
  if (value >= 55) return "#3B82F6";
  return "#10B981";
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function MemberAvatar({ member, size = "lg" }: { member: TeamMember; size?: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 font-bold text-white shadow-sm shadow-indigo-100",
        size === "lg" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs",
      )}
    >
      {initials(member.name)}
      <span
        className={cn(
          "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-white",
          statusTone[member.status as keyof typeof statusTone],
        )}
      />
    </div>
  );
}

function MemberMenu({
  member,
  onSelect,
  onToast,
}: {
  member: TeamMember;
  onSelect: () => void;
  onToast: (message: string) => void;
}) {
  const { t } = useTranslation();
  const items = [
    { icon: Mail, label: t("app.teams.actions.message"), action: () => onToast(t("app.teams.toasts.message", { name: member.name })) },
    { icon: UserCheck, label: t("app.teams.actions.assignTask"), action: () => onToast(t("app.teams.toasts.assign", { name: member.name })) },
    { icon: Crown, label: t("app.teams.actions.makeAdmin"), action: () => onToast(t("app.teams.toasts.admin", { name: member.name })) },
    { icon: Copy, label: t("app.teams.actions.copyEmail"), action: () => onToast(t("app.teams.toasts.emailCopied")) },
  ];

  return (
    <div className="absolute right-3 top-12 z-20 w-48 origin-top-right rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xl">
      {items.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            action();
            onSelect();
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#6B7280] transition-colors hover:bg-[#F7FAFC] hover:text-[#111827]"
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

function MemberCard({
  member,
  selected,
  menuOpen,
  onSelect,
  onMenu,
  onCloseMenu,
  onToast,
}: {
  member: TeamMember;
  selected: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onMenu: () => void;
  onCloseMenu: () => void;
  onToast: (message: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <article
      tabIndex={0}
      aria-label={`${member.name} ${t("app.teams.memberProfile")}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "relative w-full cursor-pointer rounded-[24px] border bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100",
        selected ? "border-indigo-200 ring-4 ring-indigo-100" : "border-[#E5E7EB]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <MemberAvatar member={member} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-[#111827]">{member.name}</p>
              {member.role === "Admin" && <Crown className="h-4 w-4 text-amber-500" />}
            </div>
            <p className="truncate text-sm text-[#6B7280]">
              {member.handle} - {t(`app.teams.focus.${member.focus.toLowerCase()}`, member.focus)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onMenu();
          }}
          className="rounded-xl p-2 text-[#6B7280] transition-colors hover:bg-[#F7FAFC] hover:text-[#111827]"
          aria-label={t("app.teams.moreMemberActions")}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-[#F7FAFC] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("app.teams.card.tasks")}</p>
          <p className="mt-1 text-lg font-bold text-[#111827]">{member.tasks}</p>
        </div>
        <div className="rounded-2xl bg-[#F7FAFC] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("app.teams.card.projects")}</p>
          <p className="mt-1 text-lg font-bold text-[#111827]">{member.projects}</p>
        </div>
        <div className="rounded-2xl bg-[#F7FAFC] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("app.teams.card.load")}</p>
          <p className="mt-1 text-lg font-bold text-[#111827]">{member.workload}%</p>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar value={member.workload} accent={workloadTone(member.workload)} label={t("app.teams.workload")} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill tone={member.role === "Admin" ? "indigo" : "slate"}>{t(`app.teams.roles.${member.role.toLowerCase()}`, member.role)}</Pill>
        <Pill tone={member.status === "Online" ? "green" : member.status === "Away" ? "amber" : "slate"}>{t(`app.chat.${member.status.toLowerCase()}`, member.status)}</Pill>
      </div>

      {menuOpen && <MemberMenu member={member} onSelect={onCloseMenu} onToast={onToast} />}
    </article>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
        <p className="truncate text-sm font-semibold text-[#111827]">{value}</p>
      </div>
    </div>
  );
}

export default function TeamsPage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TeamFilter>("all");
  const [selectedMemberId, setSelectedMemberId] = useState(TEAM_MEMBERS[0]?.id ?? "");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => Object.fromEntries(TEAM_PERMISSIONS.map((item) => [item.id, item.enabled])));

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredMembers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return TEAM_MEMBERS.filter((member) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "admin" ? member.role === "Admin" : member.status.toLowerCase() === filter);
      const matchesQuery = `${member.name} ${member.handle} ${member.focus} ${member.email}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const selectedMember = TEAM_MEMBERS.find((member) => member.id === selectedMemberId) ?? filteredMembers[0] ?? TEAM_MEMBERS[0];
  const onlineCount = TEAM_MEMBERS.filter((member) => member.status === "Online").length;

  const copyInvite = () => {
    setToast(t("app.teams.toasts.inviteCopied"));
  };

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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TEAM_METRICS.map((metric) => (
            <div key={metric.labelKey} className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{t(`app.teams.metrics.${metric.labelKey}`)}</p>
                <span className={cn("h-2.5 w-2.5 rounded-full", metric.tone === "indigo" && "bg-indigo-500", metric.tone === "blue" && "bg-blue-500", metric.tone === "green" && "bg-emerald-500", metric.tone === "amber" && "bg-amber-500")} />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#111827]">{metric.value}</p>
              <p className="mt-1 text-xs font-medium text-[#6B7280]">{metric.labelKey === "members" ? t("app.teams.onlineNow", { count: onlineCount }) : t("app.teams.localDemo")}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <SurfaceCard>
            <SectionTitle
              icon={Users}
              title={t("app.teams.membersRoles")}
              description={t("app.teams.membersRolesDesc")}
              action={<ActionButton variant="secondary" onClick={() => setModalOpen(true)}><UserPlus className="h-4 w-4" /> {t("app.teams.invite")}</ActionButton>}
            />

            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] px-3 py-2">
                <Search className="h-4 w-4 flex-shrink-0 text-[#6B7280]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                  placeholder={t("app.teams.searchPlaceholder")}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {TEAM_FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={cn(
                      "rounded-2xl px-3 py-2 text-xs font-bold capitalize transition-all",
                      filter === item ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100" : "bg-[#F7FAFC] text-[#6B7280] hover:bg-white hover:text-[#111827]",
                    )}
                  >
                    {t(`app.teams.filters.${item}`)}
                  </button>
                ))}
              </div>
            </div>

            {filteredMembers.length > 0 ? (
              <div className="grid gap-3 lg:grid-cols-2">
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    selected={member.id === selectedMember.id}
                    menuOpen={openMenuId === member.id}
                    onSelect={() => {
                      setSelectedMemberId(member.id);
                      setOpenMenuId(null);
                    }}
                    onMenu={() => setOpenMenuId((current) => (current === member.id ? null : member.id))}
                    onCloseMenu={() => setOpenMenuId(null)}
                    onToast={setToast}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title={t("app.teams.emptyTitle")}
                description={t("app.teams.emptyDesc")}
                action={<ActionButton variant="secondary" onClick={() => { setQuery(""); setFilter("all"); }}>{t("app.teams.clearFilters")}</ActionButton>}
              />
            )}
          </SurfaceCard>

          <div className="space-y-5">
            <SurfaceCard>
              <SectionTitle icon={Shield} title={t("app.teams.memberProfile")} description={t("app.teams.memberProfileDesc")} />
              <div className="flex items-start gap-3">
                <MemberAvatar member={selectedMember} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-[#111827]">{selectedMember.name}</h3>
                    <Pill tone={selectedMember.role === "Admin" ? "indigo" : "slate"}>{t(`app.teams.roles.${selectedMember.role.toLowerCase()}`, selectedMember.role)}</Pill>
                  </div>
                  <p className="mt-1 text-sm text-[#6B7280]">{selectedMember.email}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <DetailRow icon={MapPin} label={t("app.teams.details.location")} value={selectedMember.location} />
                <DetailRow icon={Activity} label={t("app.teams.details.availability")} value={selectedMember.availability} />
                <DetailRow icon={CalendarDays} label={t("app.teams.details.lastActive")} value={selectedMember.lastActive} />
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{t("app.teams.skills")}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill) => (
                    <Pill key={skill} tone="blue">{skill}</Pill>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <ActionButton variant="secondary" className="w-full"><Mail className="h-4 w-4" /> {t("app.teams.message")}</ActionButton>
                <ActionButton className="w-full"><UserCheck className="h-4 w-4" /> {t("app.teams.assign")}</ActionButton>
              </div>
            </SurfaceCard>

            <SurfaceCard>
              <SectionTitle icon={Settings2} title={t("app.teams.permissions")} description={t("app.teams.permissionsDesc")} />
              <div className="space-y-3">
                {TEAM_PERMISSIONS.map((permission) => {
                  const enabled = permissions[permission.id];
                  return (
                    <button
                      key={permission.id}
                      type="button"
                      onClick={() => setPermissions((current) => ({ ...current, [permission.id]: !current[permission.id] }))}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-3 text-left transition-colors hover:bg-white"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-[#111827]">{t(`app.teams.permissionLabels.${permission.labelKey}`)}</span>
                        <span className="block text-xs text-[#6B7280]">{enabled ? t("app.teams.enabled") : t("app.teams.disabled")}</span>
                      </span>
                      <span className={cn("grid h-8 w-8 place-items-center rounded-full", enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </SurfaceCard>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <SurfaceCard>
            <SectionTitle icon={Link2} title={t("app.teams.linkedChat")} description={t("app.teams.linkedChatDesc")} />
            <div className="rounded-[24px] border border-indigo-100 bg-indigo-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-indigo-700">UPZ Core Team</p>
                  <p className="mt-1 text-sm text-indigo-700/80">{t("app.teams.chatPreview", { count: onlineCount })}</p>
                </div>
                <div className="flex -space-x-2">
                  {TEAM_MEMBERS.slice(0, 4).map((member) => (
                    <MemberAvatar key={member.id} member={member} size="sm" />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <ActionButton variant="secondary" onClick={copyInvite}><Copy className="h-4 w-4" /> {t("app.teams.copyInvite")}</ActionButton>
                <ActionButton variant="ghost"><MessageCircle className="h-4 w-4" /> {t("app.teams.openThread")}</ActionButton>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionTitle title={t("app.teams.pulse")} description={t("app.teams.pulseDesc")} />
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                {TEAM_ACTIVITY.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">{index + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">
                        {activity.actor} {t(`app.teams.activity.${activity.actionKey}`)}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">{activity.target} - {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {TEAM_RITUALS.map((ritual) => (
                  <div key={ritual.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#F7FAFC] p-4">
                    <div>
                      <p className="font-semibold text-[#111827]">{t(`app.teams.rituals.${ritual.titleKey}`)}</p>
                      <p className="text-sm text-[#6B7280]">{ritual.meta}</p>
                    </div>
                    <Pill tone="indigo">{ritual.time}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
        </div>

        <Modal open={modalOpen} title={t("app.teams.modalTitle")} description={t("app.teams.modalDesc")} onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.teams.teamName")} />
            <input className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm outline-none focus:border-indigo-300" placeholder={t("app.teams.inviteEmail")} />
            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" className="rounded-2xl border border-indigo-100 bg-indigo-50 p-3 text-left text-sm font-semibold text-indigo-700">
                <Crown className="mb-2 h-4 w-4" />
                {t("app.teams.roles.admin")}
              </button>
              <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-3 text-left text-sm font-semibold text-[#6B7280]">
                <Users className="mb-2 h-4 w-4" />
                {t("app.teams.roles.member")}
              </button>
            </div>
            <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F7FAFC] p-4">
              <p className="text-sm font-semibold text-[#111827]">{t("app.teams.invitePreview")}</p>
              <p className="mt-1 text-xs leading-5 text-[#6B7280]">{t("app.teams.invitePreviewDesc")}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>{t("app.common.cancel")}</ActionButton>
              <ActionButton onClick={() => { setModalOpen(false); setToast(t("app.teams.toasts.inviteSent")); }}><UserPlus className="h-4 w-4" /> {t("app.teams.createDemoTeam")}</ActionButton>
            </div>
          </div>
        </Modal>
      </PageShell>
      <Toast message={toast} />
    </AppLayout>
  );
}

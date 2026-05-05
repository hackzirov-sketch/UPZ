import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Plug, Github, Send, Instagram, Youtube, HardDrive, Mail, Calendar, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile } from "@/types";
import { storage } from "@/utils/storage";

interface Props { user: UserProfile; onLogout: () => void; }

const INTEGRATIONS = [
  { id: "github", name: "GitHub", icon: <Github className="h-5 w-5" />, iconBg: "#1F2937", iconColor: "#E5E7EB" },
  { id: "telegram", name: "Telegram", icon: <Send className="h-5 w-5" />, iconBg: "#E0F2FE", iconColor: "#0284C7" },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" />, iconBg: "#FCE7F3", iconColor: "#DB2777" },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" />, iconBg: "#FEE2E2", iconColor: "#DC2626" },
  { id: "gdrive", name: "Google Drive", icon: <HardDrive className="h-5 w-5" />, iconBg: "#DCFCE7", iconColor: "#16A34A" },
  { id: "mail", name: "Mail", icon: <Mail className="h-5 w-5" />, iconBg: "#DBEAFE", iconColor: "#2563EB" },
  { id: "calendar", name: "Calendar", icon: <Calendar className="h-5 w-5" />, iconBg: "#DCFCE7", iconColor: "#059669" },
  { id: "class", name: "Class", icon: <BookOpen className="h-5 w-5" />, iconBg: "#FEF3C7", iconColor: "#D97706" },
];

const TABS = [
  { id: "account", icon: User },
  { id: "notifications", icon: Bell },
  { id: "integrations", icon: Plug },
] as const;

const NOTIFICATION_KEYS = ["email", "push", "taskReminders", "chatMessages", "weeklyReport", "productUpdates"] as const;

export default function SettingsPage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("account");
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    taskReminders: true,
    chatMessages: true,
    weeklyReport: false,
    productUpdates: true,
  });

  useEffect(() => {
    const saved = storage.getIntegrations();
    setConnected(saved ?? {});
  }, []);

  const toggleIntegration = (id: string) => {
    const updated = { ...connected, [id]: !connected[id] };
    setConnected(updated);
    storage.saveIntegrations(updated);
  };

  return (
    <AppLayout user={user} title={t("app.nav.settings")} onLogout={onLogout}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex gap-1 rounded-xl p-1" style={{ background: "#FFFFFF", width: "fit-content" }}>
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
              style={{ background: tab === item.id ? "#6366F1" : "transparent", color: tab === item.id ? "white" : "#6B7280" }}
            >
              <item.icon className="h-3.5 w-3.5" />
              {t(`app.settings.tabs.${item.id}`)}
            </button>
          ))}
        </div>

        {tab === "account" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="space-y-5 rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <h3 className="font-semibold text-[#111827]">{t("app.settings.accountInfo")}</h3>

              {[
                { label: t("app.settings.displayName"), value: user.name, type: "text" },
                { label: t("app.settings.email"), value: "user@example.com", type: "email" },
                { label: t("app.settings.username"), value: `@${user.name.toLowerCase().replace(/\s+/g, "_")}`, type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-xs text-gray-500">{field.label}</label>
                  <input type={field.type} defaultValue={field.value} className="w-full rounded-xl px-4 py-2.5 text-sm text-[#111827] outline-none" style={{ background: "#F7FAFC", border: "1px solid #E5E7EB" }} />
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-xs text-gray-500">{t("app.settings.profession")}</label>
                <div className="rounded-xl px-4 py-2.5 text-sm text-gray-700" style={{ background: "#F7FAFC", border: "1px solid #E5E7EB" }}>
                  {t(`app.professions.${user.profession}`, user.profession)}
                  <span className="ml-2 text-xs text-gray-500">{t("app.settings.changeOnboarding")}</span>
                </div>
              </div>

              <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">{t("app.settings.saveChanges")}</button>
            </div>

            <div className="space-y-4 rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <h3 className="font-semibold text-[#111827]">{t("app.settings.dangerZone")}</h3>
              <div className="flex items-center justify-between rounded-xl p-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <div>
                  <p className="text-sm font-medium text-red-500">{t("app.settings.deleteAccount")}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{t("app.settings.deleteAccountDesc")}</p>
                </div>
                <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500" style={{ background: "rgba(239,68,68,0.15)" }}>{t("app.settings.delete")}</button>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "notifications" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-5 rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <h3 className="font-semibold text-[#111827]">{t("app.settings.notificationPrefs")}</h3>
              {NOTIFICATION_KEYS.map((key) => {
                const val = notifs[key];
                return (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-[#111827]">{t(`app.settings.notifications.${key}.label`)}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{t(`app.settings.notifications.${key}.desc`)}</p>
                    </div>
                    <button onClick={() => setNotifs((state) => ({ ...state, [key]: !state[key] }))} className="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors" style={{ background: val ? "#6366F1" : "#CBD5E1" }}>
                      <div className="absolute top-1 h-4 w-4 rounded-full bg-white transition-all" style={{ left: val ? "calc(100% - 20px)" : 4 }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {tab === "integrations" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-gray-500">{t("app.settings.integrationsIntro")}</p>
            {INTEGRATIONS.map((intg, index) => {
              const isConnected = connected[intg.id] ?? false;
              return (
                <motion.div key={intg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center gap-4 rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: intg.iconBg, color: intg.iconColor }}>{intg.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#111827]">{intg.name}</p>
                      {isConnected && <span className="flex items-center gap-1 text-xs text-emerald-500"><CheckCircle2 className="h-3 w-3" /> {t("app.status.connected")}</span>}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500">{t(`app.settings.integrations.${intg.id}`, intg.id)}</p>
                  </div>
                  <motion.button onClick={() => toggleIntegration(intg.id)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all" style={isConnected ? { background: "rgba(239,68,68,0.12)", color: "#DC2626", border: "1px solid rgba(239,68,68,0.2)" } : { background: "rgba(99,102,241,0.15)", color: "#4F46E5", border: "1px solid rgba(99,102,241,0.25)" }}>
                    {isConnected ? <span className="flex items-center gap-1"><XCircle className="h-3 w-3" /> {t("app.settings.disconnect")}</span> : t("app.settings.connect")}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

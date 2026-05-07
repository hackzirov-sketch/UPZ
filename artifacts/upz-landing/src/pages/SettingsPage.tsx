import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Plug, Github, Send, Instagram, Youtube, HardDrive, Mail, Calendar, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile } from "@/types";
import { storage } from "@/utils/storage";

interface Props { user: UserProfile; onLogout: () => void; }

const INTEGRATIONS = [
  { id: "github", name: "GitHub", icon: <Github className="h-5 w-5" />, iconBg: "bg-gray-800", iconColor: "text-gray-200" },
  { id: "telegram", name: "Telegram", icon: <Send className="h-5 w-5" />, iconBg: "bg-sky-100 dark:bg-sky-900/40", iconColor: "text-sky-600 dark:text-sky-400" },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" />, iconBg: "bg-pink-100 dark:bg-pink-900/40", iconColor: "text-pink-600 dark:text-pink-400" },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" />, iconBg: "bg-red-100 dark:bg-red-900/40", iconColor: "text-red-600 dark:text-red-400" },
  { id: "gdrive", name: "Google Drive", icon: <HardDrive className="h-5 w-5" />, iconBg: "bg-green-100 dark:bg-green-900/40", iconColor: "text-green-600 dark:text-green-400" },
  { id: "mail", name: "Mail", icon: <Mail className="h-5 w-5" />, iconBg: "bg-blue-100 dark:bg-blue-900/40", iconColor: "text-blue-600 dark:text-blue-400" },
  { id: "calendar", name: "Calendar", icon: <Calendar className="h-5 w-5" />, iconBg: "bg-emerald-100 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { id: "class", name: "Class", icon: <BookOpen className="h-5 w-5" />, iconBg: "bg-amber-100 dark:bg-amber-900/40", iconColor: "text-amber-600 dark:text-amber-400" },
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
        <div className="mb-6 flex w-fit gap-1 rounded-xl bg-white p-1 dark:bg-gray-800">
          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={[
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                tab === item.id
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              ].join(" ")}
            >
              <item.icon className="h-3.5 w-3.5" />
              {t(`app.settings.tabs.${item.id}`)}
            </button>
          ))}
        </div>

        {tab === "account" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t("app.settings.accountInfo")}</h3>

              {[
                { label: t("app.settings.displayName"), value: user.name, type: "text" },
                { label: t("app.settings.email"), value: "user@example.com", type: "email" },
                { label: t("app.settings.username"), value: `@${user.name.toLowerCase().replace(/\s+/g, "_")}`, type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-xs text-gray-500 dark:text-gray-400">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:bg-gray-600"
                  />
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-xs text-gray-500 dark:text-gray-400">{t("app.settings.profession")}</label>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {t(`app.professions.${user.profession}`, user.profession)}
                  <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">{t("app.settings.changeOnboarding")}</span>
                </div>
              </div>

              <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                {t("app.settings.saveChanges")}
              </button>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t("app.settings.dangerZone")}</h3>
              <div className="flex items-center justify-between rounded-xl border border-red-200/70 bg-red-50/70 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                <div>
                  <p className="text-sm font-medium text-red-500">{t("app.settings.deleteAccount")}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{t("app.settings.deleteAccountDesc")}</p>
                </div>
                <button className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60">
                  {t("app.settings.delete")}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "notifications" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t("app.settings.notificationPrefs")}</h3>
              {NOTIFICATION_KEYS.map((key) => {
                const val = notifs[key];
                return (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t(`app.settings.notifications.${key}.label`)}</p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{t(`app.settings.notifications.${key}.desc`)}</p>
                    </div>
                    <button
                      onClick={() => setNotifs((state) => ({ ...state, [key]: !state[key] }))}
                      className={[
                        "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors",
                        val ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600",
                      ].join(" ")}
                    >
                      <div
                        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all"
                        style={{ left: val ? "calc(100% - 20px)" : 4 }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {tab === "integrations" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("app.settings.integrationsIntro")}</p>
            {INTEGRATIONS.map((intg, index) => {
              const isConnected = connected[intg.id] ?? false;
              return (
                <motion.div
                  key={intg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className={["flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl", intg.iconBg, intg.iconColor].join(" ")}>
                    {intg.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{intg.name}</p>
                      {isConnected && (
                        <span className="flex items-center gap-1 text-xs text-emerald-500">
                          <CheckCircle2 className="h-3 w-3" /> {t("app.status.connected")}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">{t(`app.settings.integrations.${intg.id}`, intg.id)}</p>
                  </div>
                  <motion.button
                    onClick={() => toggleIntegration(intg.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={[
                      "flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                      isConnected
                        ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                        : "border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-950/50",
                    ].join(" ")}
                  >
                    {isConnected
                      ? <span className="flex items-center gap-1"><XCircle className="h-3 w-3" /> {t("app.settings.disconnect")}</span>
                      : t("app.settings.connect")}
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

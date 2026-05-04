import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Bell, Plug, Github, Send, Instagram, Youtube, HardDrive, Mail, Calendar, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile } from "@/types";
import { storage } from "@/utils/storage";
import { PROFESSION_LABELS } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const INTEGRATIONS = [
  { id: 'github', name: 'GitHub', desc: 'Connect repos and track code activity', icon: <Github className="w-5 h-5" />, iconBg: '#1F2937', iconColor: '#E5E7EB' },
  { id: 'telegram', name: 'Telegram', desc: 'Get notifications via Telegram bot', icon: <Send className="w-5 h-5" />, iconBg: '#0F3460', iconColor: '#2AABEE' },
  { id: 'instagram', name: 'Instagram', desc: 'Track your IG analytics and schedule posts', icon: <Instagram className="w-5 h-5" />, iconBg: '#3D1A47', iconColor: '#E91E8C' },
  { id: 'youtube', name: 'YouTube', desc: 'Monitor channel stats and video performance', icon: <Youtube className="w-5 h-5" />, iconBg: '#3D1A1A', iconColor: '#FF0000' },
  { id: 'gdrive', name: 'Google Drive', desc: 'Access and manage your Drive files', icon: <HardDrive className="w-5 h-5" />, iconBg: '#1A2E1A', iconColor: '#34A853' },
  { id: 'mail', name: 'Mail', desc: 'Connect your email for notifications', icon: <Mail className="w-5 h-5" />, iconBg: '#1A1F3A', iconColor: '#4285F4' },
  { id: 'calendar', name: 'Calendar', desc: 'Sync events and schedule reminders', icon: <Calendar className="w-5 h-5" />, iconBg: '#1A2A3A', iconColor: '#0F9D58' },
  { id: 'class', name: 'Class', desc: 'Manage classes and student groups', icon: <BookOpen className="w-5 h-5" />, iconBg: '#2A1A0F', iconColor: '#F59E0B' },
];

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
];

export default function SettingsPage({ user, onLogout }: Props) {
  const [tab, setTab] = useState('account');
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
    <AppLayout user={user} title="Settings" onLogout={onLogout}>
      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "#111827", width: "fit-content" }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t.id ? "#6366F1" : "transparent",
                color: tab === t.id ? "white" : "#9CA3AF",
              }}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ACCOUNT TAB */}
        {tab === 'account' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="rounded-xl p-6 space-y-5" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-semibold text-white">Account Information</h3>

              {[
                { label: "Display Name", value: user.name, type: "text" },
                { label: "Email", value: "user@example.com", type: "email" },
                { label: "Username", value: `@${user.name.toLowerCase().replace(/\s+/g, '_')}`, type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs text-gray-500 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Profession</label>
                <div
                  className="px-4 py-2.5 rounded-xl text-sm text-gray-300"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  {PROFESSION_LABELS[user.profession]}
                  <span className="text-gray-600 text-xs ml-2">(Change in onboarding)</span>
                </div>
              </div>

              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
                Save Changes
              </button>
            </div>

            <div className="rounded-xl p-6 space-y-4" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-semibold text-white">Danger Zone</h3>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <div>
                  <p className="text-sm font-medium text-red-400">Delete Account</p>
                  <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400" style={{ background: "rgba(239,68,68,0.15)" }}>
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* NOTIFICATIONS TAB */}
        {tab === 'notifications' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-xl p-6 space-y-5" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-semibold text-white">Notification Preferences</h3>
              {(Object.entries(notifs) as [string, boolean][]).map(([key, val]) => {
                const labels: Record<string, { label: string; desc: string }> = {
                  email: { label: 'Email Notifications', desc: 'Receive updates via email' },
                  push: { label: 'Push Notifications', desc: 'Browser push notifications' },
                  taskReminders: { label: 'Task Reminders', desc: 'Get reminded about upcoming tasks' },
                  chatMessages: { label: 'Chat Messages', desc: 'Alerts for new messages' },
                  weeklyReport: { label: 'Weekly Report', desc: 'Summary email every Monday' },
                  productUpdates: { label: 'Product Updates', desc: 'News about new UPZ features' },
                };
                const info = labels[key];
                return (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-white">{info.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{info.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                      className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                      style={{ background: val ? "#6366F1" : "rgba(255,255,255,0.1)" }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                        style={{ left: val ? "calc(100% - 20px)" : 4 }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* INTEGRATIONS TAB */}
        {tab === 'integrations' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-gray-500">Connect external services to enhance your workspace. No real credentials required in this demo.</p>
            {INTEGRATIONS.map((intg, i) => {
              const isConnected = connected[intg.id] ?? false;
              return (
                <motion.div
                  key={intg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: intg.iconBg, color: intg.iconColor }}
                  >
                    {intg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{intg.name}</p>
                      {isConnected && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{intg.desc}</p>
                  </div>
                  <motion.button
                    onClick={() => toggleIntegration(intg.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={isConnected
                      ? { background: "rgba(239,68,68,0.12)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)" }
                      : { background: "rgba(99,102,241,0.15)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.25)" }
                    }
                  >
                    {isConnected ? (
                      <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Disconnect</span>
                    ) : (
                      "Connect"
                    )}
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

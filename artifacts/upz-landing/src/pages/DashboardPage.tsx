import { motion } from "framer-motion";
import { CheckSquare, FolderOpen, Users, Zap, TrendingUp, BarChart3, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { AppLayout } from "@/components/app/AppLayout";
import { StatCard } from "@/components/app/StatCard";
import { WEEKLY_ACTIVITY } from "@/data/mockData";
import type { UserProfile } from "@/types";

interface Props { user: UserProfile; onLogout: () => void; }

const PROJECT_PROGRESS = [
  { name: "UPZ Landing Page", progress: 85, color: "#6366F1" },
  { name: "Internal App MVP", progress: 62, color: "#3B82F6" },
  { name: "API Integration", progress: 40, color: "#10B981" },
  { name: "Mobile App", progress: 15, color: "#F59E0B" },
];

const PRODUCTIVITY_DATA = [
  { week: "W1", score: 62 },
  { week: "W2", score: 74 },
  { week: "W3", score: 68 },
  { week: "W4", score: 81 },
  { week: "W5", score: 88 },
];

const CUSTOM_TOOLTIP_STYLE = {
  contentStyle: { background: "#1F2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#E5E7EB" },
  cursor: { fill: "rgba(99,102,241,0.08)" },
};

export default function DashboardPage({ user, onLogout }: Props) {
  return (
    <AppLayout user={user} title="Dashboard" onLogout={onLogout}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Tasks Done" value="24" icon={CheckSquare} trend="8 this week" trendUp accent="#6366F1" delay={0} />
          <StatCard label="Active Projects" value="4" icon={FolderOpen} trend="1 new" trendUp accent="#3B82F6" delay={0.05} />
          <StatCard label="Team Members" value="7" icon={Users} trend="2 online" trendUp accent="#10B981" delay={0.1} />
          <StatCard label="Productivity" value="88%" icon={Zap} trend="vs last week +6%" trendUp accent="#F59E0B" delay={0.15} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <h3 className="font-semibold text-white">Weekly Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_ACTIVITY} barGap={4}>
                <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
                <Bar dataKey="tasks" fill="#6366F1" radius={[4, 4, 0, 0]} name="Tasks" />
                <Bar dataKey="messages" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Messages" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                <span className="text-xs text-gray-400">Tasks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                <span className="text-xs text-gray-400">Messages</span>
              </div>
            </div>
          </motion.div>

          {/* Productivity Trend */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-white">Productivity Score</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={PRODUCTIVITY_DATA}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ fill: "#10B981", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#10B981" }}
                  name="Score"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">5-week trend</span>
              <span className="text-xs text-emerald-400 font-semibold">+26 pts overall ↑</span>
            </div>
          </motion.div>
        </div>

        {/* Project Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-5"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white">Project Progress</h3>
          </div>
          <div className="space-y-4">
            {PROJECT_PROGRESS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-gray-300">{project.name}</span>
                  <span className="text-sm font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: project.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Streak", value: "7 days 🔥" },
            { label: "Messages sent", value: "143" },
            { label: "Notes created", value: "18" },
            { label: "Hours logged", value: "42h" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="rounded-xl p-4 text-center"
              style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

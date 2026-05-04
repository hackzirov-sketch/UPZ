import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Zap, Clock, TrendingUp, MessageCircle, ListTodo, Layers } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import { Link } from "wouter";
import type { UserProfile, Task } from "@/types";
import { storage } from "@/utils/storage";
import { PROFESSION_LABELS, GOAL_LABELS, INITIAL_TASKS } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const GREETINGS: Record<string, string> = {
  developer: "Time to ship something great today, ",
  teacher: "Ready to inspire minds today, ",
  student: "A great day to learn something new, ",
  freelancer: "Let's land some wins today, ",
  designer: "Create something beautiful today, ",
  smm: "Let's grow your audience today, ",
  creator: "Ready to create amazing content, ",
};

const QUICK_ACTIONS = [
  { label: "New Task", icon: ListTodo, href: "/app/tasks", color: "#6366F1" },
  { label: "Open Chat", icon: MessageCircle, href: "/app/chat", color: "#3B82F6" },
  { label: "Workspace", icon: Layers, href: "/app/workspace", color: "#10B981" },
  { label: "Dashboard", icon: TrendingUp, href: "/app/dashboard", color: "#F59E0B" },
];

const RECENT_ACTIVITY = [
  { label: "Completed task: Review project requirements", time: "2h ago", icon: "✅" },
  { label: "New message from Alex Kim", time: "3h ago", icon: "💬" },
  { label: "Updated note: MVP Feature List", time: "5h ago", icon: "📝" },
  { label: "Joined UPZ Core Team chat", time: "1d ago", icon: "👥" },
  { label: "Onboarding completed", time: "1d ago", icon: "🎉" },
];

export default function HomePage({ user, onLogout }: Props) {
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = storage.getTasks();
    if (saved.length === 0) {
      storage.saveTasks(INITIAL_TASKS);
      setTasks(INITIAL_TASKS);
    } else {
      setTasks(saved);
    }
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const daysSince = Math.floor((Date.now() - user.joinedAt) / 86400000);
  const todaysTasks = tasks.filter((t) => !t.done).slice(0, 3);
  const completedCount = tasks.filter((t) => t.done).length;

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const greeting = GREETINGS[user.profession] ?? "Welcome back, ";
  const dayOfWeek = time.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <AppLayout user={user} title="Home" onLogout={onLogout}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          <div>
            <p className="text-indigo-300 text-sm font-medium mb-1">{dayOfWeek}, {dateStr}</p>
            <h2 className="text-2xl font-bold text-white mb-1">
              {greeting}<span className="text-indigo-400">{user.name}</span> 👋
            </h2>
            <p className="text-gray-400 text-sm">
              Goal: <span className="text-gray-300">{GOAL_LABELS[user.goal]}</span>
              {" · "}
              Level: <span className="text-gray-300 capitalize">{user.experience}</span>
              {" · "}
              Member for <span className="text-gray-300">{daysSince === 0 ? "just today" : `${daysSince} day${daysSince !== 1 ? "s" : ""}`}</span>
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-4xl font-bold text-white font-mono">{timeStr}</div>
            <div className="text-xs text-gray-500 mt-1">
              {completedCount}/{tasks.length} tasks done today
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.href} href={action.href}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer"
                  style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${action.color}22` }}>
                    <action.icon className="w-5 h-5" style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-medium text-gray-300">{action.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Today's tasks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-indigo-400" /> Today's Tasks
              </h3>
              <Link href="/app/tasks">
                <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer">View all →</span>
              </Link>
            </div>
            <div className="space-y-3">
              {todaysTasks.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">All done! 🎉</p>
              ) : (
                todaysTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleTask(task.id)}
                    whileHover={{ x: 2 }}
                  >
                    {task.done
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      : <Circle className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                    }
                    <span className={`text-sm ${task.done ? "line-through text-gray-600" : "text-gray-300"}`}>{task.text}</span>
                    <span
                      className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: task.priority === 'high' ? 'rgba(239,68,68,0.15)' : task.priority === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                        color: task.priority === 'high' ? '#F87171' : task.priority === 'medium' ? '#FCD34D' : '#6EE7B7',
                      }}
                    >{task.priority}</span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-blue-400" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 leading-snug">{item.label}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

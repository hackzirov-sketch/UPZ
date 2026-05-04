import { motion } from "framer-motion";
import { Home, BarChart3, Layers, MessageCircle, ListTodo, User, Settings, LogOut, Zap } from "lucide-react";
import { useLocation, Link } from "wouter";
import type { UserProfile } from "@/types";
import { PROFESSION_LABELS } from "@/data/mockData";

const NAV_ITEMS = [
  { path: "/app/home", label: "Home", icon: Home },
  { path: "/app/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/app/workspace", label: "Workspace", icon: Layers },
  { path: "/app/chat", label: "Chat", icon: MessageCircle },
  { path: "/app/tasks", label: "Tasks & Notes", icon: ListTodo },
  { path: "/app/profile", label: "Profile", icon: User },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  user: UserProfile;
  onLogout: () => void;
  collapsed?: boolean;
}

export function Sidebar({ user, onLogout, collapsed = false }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside
      className="flex flex-col h-full border-r"
      style={{
        width: collapsed ? 64 : 220,
        background: "#0F172A",
        borderColor: "rgba(255,255,255,0.07)",
        transition: "width 0.2s ease",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-sm tracking-wide">UPZ</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = location.startsWith(path);
          return (
            <Link key={path} href={path}>
              <motion.div
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer select-none"
                style={{
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  color: active ? "#A5B4FC" : "#9CA3AF",
                }}
                whileHover={{ background: active ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)", color: "#E5E7EB" }}
                transition={{ duration: 0.15 }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-indigo-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-2 pb-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {!collapsed && (
          <div className="px-3 mb-3">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{PROFESSION_LABELS[user.profession]}</p>
          </div>
        )}
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 text-sm"
          whileHover={{ background: "rgba(239,68,68,0.1)", color: "#F87171" }}
          transition={{ duration: 0.15 }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </motion.button>
      </div>
    </aside>
  );
}

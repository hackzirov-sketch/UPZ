import { Bell, Search, Menu } from "lucide-react";
import type { UserProfile } from "@/types";

interface TopbarProps {
  user: UserProfile;
  title: string;
  onToggleSidebar?: () => void;
}

export function Topbar({ user, title, onToggleSidebar }: TopbarProps) {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
      style={{
        background: "#0B0F14",
        borderColor: "rgba(255,255,255,0.07)",
        height: 64,
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-white text-base">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 cursor-pointer hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-xs">Search...</span>
          <kbd className="hidden md:inline text-xs text-gray-600 ml-1">⌘K</kbd>
        </div>

        <button
          className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 cursor-pointer"
          style={{ background: "#6366F1", color: "white" }}
          title={user.name}
        >
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

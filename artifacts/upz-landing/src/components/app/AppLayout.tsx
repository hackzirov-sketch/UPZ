import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import type { UserProfile } from "@/types";

interface AppLayoutProps {
  user: UserProfile;
  title: string;
  children: React.ReactNode;
  onLogout: () => void;
}

export function AppLayout({ user, title, children, onLogout }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0B0F14" }}>
      <Sidebar user={user} onLogout={onLogout} collapsed={collapsed} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar user={user} title={title} onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "#0B0F14" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

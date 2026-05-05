import { AnimatePresence, motion } from "framer-motion";
import { Pin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ChatRoom, ChatUser } from "@/types";
import { ChatListItem } from "./ChatListItem";
import { cn, getLastMessage, getMessageText, getRoomName } from "./chatShared";

interface ChatSidebarProps {
  rooms: ChatRoom[];
  users: ChatUser[];
  activeId?: string;
  query: string;
  onQueryChange: (query: string) => void;
  onSelectRoom: (roomId: string) => void;
  className?: string;
}

function sortRooms(rooms: ChatRoom[]) {
  return [...rooms].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return (getLastMessage(b)?.timestamp ?? 0) - (getLastMessage(a)?.timestamp ?? 0);
  });
}

export function ChatSidebar({ rooms, users, activeId, query, onQueryChange, onSelectRoom, className }: ChatSidebarProps) {
  const { t } = useTranslation();
  const normalizedQuery = query.trim().toLowerCase();
  const visibleRooms = sortRooms(
    rooms.filter((room) => {
      if (room.archived) return false;
      if (!normalizedQuery) return true;
      const last = getMessageText(getLastMessage(room), t).toLowerCase();
      return getRoomName(room, t).toLowerCase().includes(normalizedQuery) || last.includes(normalizedQuery);
    }),
  );
  const pinnedRooms = visibleRooms.filter((room) => room.pinned);
  const regularRooms = visibleRooms.filter((room) => !room.pinned);

  return (
    <aside className={cn("flex min-h-0 flex-col border-r border-[#E5E7EB] bg-white", className)}>
      <div className="border-b border-[#E5E7EB] p-2.5 sm:p-3">
        <div className="flex h-10 items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] px-3 text-[#6B7280] transition-colors focus-within:border-indigo-300 focus-within:bg-white">
          <Search className="h-4 w-4 flex-shrink-0" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("app.chat.searchChats")}
            className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#6B7280]"
            type="search"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {pinnedRooms.length > 0 && (
          <section className="mb-3">
            <div className="mb-1 flex items-center gap-2 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
              <Pin className="h-3.5 w-3.5" />
              {t("app.chat.pinned")}
            </div>
            <div className="space-y-1">
              <AnimatePresence initial={false}>
                {pinnedRooms.map((room) => (
                  <ChatListItem key={room.id} room={room} users={users} active={room.id === activeId} onSelect={onSelectRoom} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        <section>
          <div className="mb-1 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            {t("app.chat.allConversations")}
          </div>
          <div className="space-y-1">
            <AnimatePresence initial={false}>
              {regularRooms.map((room) => (
                <ChatListItem key={room.id} room={room} users={users} active={room.id === activeId} onSelect={onSelectRoom} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {visibleRooms.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-8 text-center text-sm text-[#6B7280]">
            {t("app.chat.noChatsMatch")}
          </motion.div>
        )}
      </div>

      <div className="border-t border-[#E5E7EB] p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F7FAFC] px-4 py-3 text-left transition-colors hover:border-indigo-400/25 hover:bg-indigo-500/10"
        >
          <span>
            <span className="block text-sm font-semibold text-[#111827]">{t("app.chat.archived")}</span>
            <span className="text-xs text-[#6B7280]">{t("app.chat.archivedDesc")}</span>
          </span>
          <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-[#6B7280]">0</span>
        </button>
      </div>
    </aside>
  );
}

import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ChatRoom, ChatUser } from "@/types";
import {
  Avatar,
  RoomGlyph,
  cn,
  formatSidebarTime,
  getLastMessage,
  getRoomPeer,
  getRoomName,
  messagePreview,
} from "./chatShared";

interface ChatListItemProps {
  room: ChatRoom;
  users: ChatUser[];
  active: boolean;
  onSelect: (roomId: string) => void;
}

export function ChatListItem({ room, users, active, onSelect }: ChatListItemProps) {
  const { t } = useTranslation();
  const lastMessage = getLastMessage(room);
  const peer = getRoomPeer(room, users);
  const unread = room.unread ?? 0;
  const isDirect = room.type === "1on1";
  const roomName = getRoomName(room, t);

  return (
    <motion.button
      type="button"
      layout
      onClick={() => onSelect(room.id)}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-150",
        active
          ? "bg-indigo-50 ring-1 ring-indigo-100"
          : "hover:bg-[#F7FAFC]",
      )}
    >
      {isDirect ? (
        <Avatar user={peer} size={46} showOnline />
      ) : (
        <RoomGlyph room={room} className="h-[46px] w-[46px]" />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={cn("truncate text-sm font-semibold", active ? "text-[#111827]" : "text-[#111827]")}>{roomName}</span>
          {room.pinned && <Pin className="h-3.5 w-3.5 flex-shrink-0 text-indigo-300/80" />}
          {room.muted && <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-[#6B7280]">{t("app.chat.muted")}</span>}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
            {t(`app.chat.types.${room.type}`)}
          </span>
          <p className="min-w-0 flex-1 truncate text-xs text-[#6B7280] group-hover:text-[#111827]">
            {messagePreview(lastMessage, users, t)}
          </p>
        </div>
      </div>

      <div className="flex h-full flex-col items-end justify-between gap-2 self-stretch py-0.5">
        <span className={cn("text-[11px]", unread ? "font-semibold text-indigo-600" : "text-[#6B7280]")}>{formatSidebarTime(lastMessage?.timestamp)}</span>
        {unread > 0 ? (
          <span className="grid min-h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 px-1.5 text-[11px] font-bold text-white shadow-lg shadow-indigo-200">
            {unread > 99 ? "99+" : unread}
          </span>
        ) : (
          <span className="h-5 text-[11px] text-[#6B7280]">{lastMessage?.userId === "me" ? t("app.chat.read") : ""}</span>
        )}
      </div>
    </motion.button>
  );
}

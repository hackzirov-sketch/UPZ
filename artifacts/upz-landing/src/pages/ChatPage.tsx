import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Hash, Users, User, FolderOpen, Search } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile, ChatRoom, ChatMessage } from "@/types";
import { MOCK_USERS, MOCK_CHAT_ROOMS } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const TYPE_ICONS: Record<string, React.ReactNode> = {
  '1on1': <User className="w-3.5 h-3.5" />,
  'group': <Users className="w-3.5 h-3.5" />,
  'team': <Hash className="w-3.5 h-3.5" />,
  'project': <FolderOpen className="w-3.5 h-3.5" />,
};

function formatTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function Avatar({ userId, size = 32 }: { userId: string; size?: number }) {
  const u = MOCK_USERS.find((u) => u.id === userId);
  if (!u) return null;
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, background: u.color, fontSize: size * 0.35 }}
    >
      {u.initials}
    </div>
  );
}

export default function ChatPage({ user, onLogout }: Props) {
  const [rooms, setRooms] = useState<ChatRoom[]>(MOCK_CHAT_ROOMS);
  const [activeId, setActiveId] = useState(rooms[0].id);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = rooms.find((r) => r.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, rooms]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      userId: 'me',
      text: input.trim(),
      timestamp: Date.now(),
    };
    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeId
          ? { ...r, messages: [...r.messages, newMsg], unread: 0 }
          : r
      )
    );
    setInput('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSelectRoom = (id: string) => {
    setActiveId(id);
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, unread: 0 } : r));
  };

  const totalUnread = rooms.reduce((s, r) => s + (r.unread ?? 0), 0);

  return (
    <AppLayout user={user} title={`Chat ${totalUnread > 0 ? `(${totalUnread})` : ""}`} onLogout={onLogout}>
      <div
        className="rounded-2xl overflow-hidden flex"
        style={{
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.07)",
          height: "calc(100vh - 140px)",
        }}
      >
        {/* Sidebar: room list */}
        <div
          className="w-64 flex-shrink-0 flex flex-col border-r"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search chats...</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {/* Sections */}
            {(['1on1', 'team', 'project', 'group'] as const).map((type) => {
              const filtered = rooms.filter((r) => r.type === type);
              if (filtered.length === 0) return null;
              const labels: Record<string, string> = { '1on1': 'Direct', 'team': 'Teams', 'project': 'Projects', 'group': 'Groups' };
              return (
                <div key={type} className="mb-2">
                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-gray-600">
                    {TYPE_ICONS[type]}
                    <span className="text-xs font-semibold uppercase tracking-wider">{labels[type]}</span>
                  </div>
                  {filtered.map((room) => {
                    const lastMsg = room.messages[room.messages.length - 1];
                    const lastSender = lastMsg ? MOCK_USERS.find((u) => u.id === lastMsg.userId) : null;
                    return (
                      <motion.button
                        key={room.id}
                        onClick={() => handleSelectRoom(room.id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors"
                        style={{
                          background: activeId === room.id ? "rgba(99,102,241,0.12)" : "transparent",
                          color: activeId === room.id ? "#A5B4FC" : "#9CA3AF",
                        }}
                        whileHover={{ background: activeId === room.id ? undefined : "rgba(255,255,255,0.04)" }}
                      >
                        {type === '1on1' ? (
                          <Avatar userId={room.memberIds.find((id) => id !== 'me') ?? 'u1'} size={28} />
                        ) : (
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(99,102,241,0.2)", color: "#818CF8" }}
                          >
                            {TYPE_ICONS[type]}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white truncate">{room.name}</span>
                            {(room.unread ?? 0) > 0 && (
                              <span className="text-xs bg-indigo-600 text-white rounded-full px-1.5 py-0.5 flex-shrink-0 ml-1">
                                {room.unread}
                              </span>
                            )}
                          </div>
                          {lastMsg && (
                            <p className="text-xs text-gray-600 truncate">
                              {lastSender?.id === 'me' ? 'You' : lastSender?.name?.split(' ')[0]}: {lastMsg.text}
                            </p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 border-b flex-shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {activeRoom.type === '1on1' ? (
              <Avatar userId={activeRoom.memberIds.find((id) => id !== 'me') ?? 'u1'} size={32} />
            ) : (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(99,102,241,0.2)", color: "#818CF8" }}
              >
                {TYPE_ICONS[activeRoom.type]}
              </div>
            )}
            <div>
              <div className="font-semibold text-white text-sm">{activeRoom.name}</div>
              <div className="text-xs text-gray-500">
                {activeRoom.type === '1on1'
                  ? (() => { const u = MOCK_USERS.find((u) => u.id === activeRoom.memberIds.find((id) => id !== 'me')); return u?.status === 'online' ? '🟢 Online' : u?.status === 'away' ? '🟡 Away' : '⚫ Offline'; })()
                  : `${activeRoom.memberIds.length} members`
                }
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <AnimatePresence initial={false}>
              {activeRoom.messages.map((msg) => {
                const sender = MOCK_USERS.find((u) => u.id === msg.userId);
                const isMe = msg.userId === 'me';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}
                  >
                    {!isMe && <Avatar userId={msg.userId} size={28} />}
                    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-xs lg:max-w-md`}>
                      {!isMe && (
                        <span className="text-xs text-gray-600 mb-1 ml-1">{sender?.name}</span>
                      )}
                      <div
                        className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: isMe ? "#6366F1" : "rgba(255,255,255,0.07)",
                          color: isMe ? "white" : "#E5E7EB",
                          borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        }}
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-700 mt-1 px-1">{formatTime(msg.timestamp)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                type="text"
                placeholder={`Message ${activeRoom.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600"
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim()}
                whileHover={input.trim() ? { scale: 1.1 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: input.trim() ? "#6366F1" : "rgba(99,102,241,0.3)",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pin } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ChatMessage, ChatReactionEmoji, ChatRoom, ChatUser } from "@/types";
import { EmojiRenderer, ReactionButton, findEmojiAsset, getReactionAsset, normalizeReactionId } from "@/components/premium/PremiumAssets";
import { Avatar, cn, formatMessageTime, getMessageText, getReplySnippet, getUser } from "./chatShared";
import { MessageOptionsMenu, type MessageOptionAction } from "./MessageOptionsMenu";
import { ReactionPicker } from "./ReactionPicker";

interface MessageBubbleProps {
  room: ChatRoom;
  message: ChatMessage;
  users: ChatUser[];
  replyMessage?: ChatMessage;
  isPinned?: boolean;
  onReply: (message: ChatMessage) => void;
  onEdit: (message: ChatMessage) => void;
  onDelete: (messageId: string) => void;
  onForward: (message: ChatMessage) => void;
  onPin: (messageId: string) => void;
  onToggleReaction: (messageId: string, emoji: ChatReactionEmoji) => void;
}

type FloatingState = {
  fixed: boolean;
  x: number;
  y: number;
};

function PremiumMessageText({ text, isOwn }: { text: string; isOwn: boolean }) {
  const parts: Array<string | { token: string; key: string }> = [];
  const pattern = /:([a-z0-9-]+):/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [raw, token] = match;
    const asset = findEmojiAsset(token);
    if (!asset) continue;

    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push({ token, key: `${token}-${match.index}` });
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  if (parts.length === 0) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={`text-${index}`}>{part}</span>
        ) : (
          <span
            key={part.key}
            className={cn(
              "mx-0.5 inline-flex translate-y-1 items-center rounded-full p-0.5 align-middle shadow-sm",
              isOwn ? "bg-white/20" : "bg-[#F7FAFC] ring-1 ring-[#E5E7EB]",
            )}
          >
            <EmojiRenderer assetId={part.token} size={22} />
          </span>
        ),
      )}
    </>
  );
}

export function MessageBubble({
  room,
  message,
  users,
  replyMessage,
  isPinned,
  onReply,
  onEdit,
  onDelete,
  onForward,
  onPin,
  onToggleReaction,
}: MessageBubbleProps) {
  const { t } = useTranslation();
  const [menu, setMenu] = useState<FloatingState | null>(null);
  const [picker, setPicker] = useState<FloatingState | null>(null);
  const isOwn = message.userId === "me";
  const sender = getUser(message.userId, users);
  const showSender = !isOwn && room.type !== "1on1";
  const activeReactionEmojis = message.reactions?.filter((reaction) => reaction.userIds.includes("me")).map((reaction) => normalizeReactionId(reaction.emoji)) ?? [];
  const text = getMessageText(message, t);

  useEffect(() => {
    if (!menu && !picker) return;
    const close = () => {
      setMenu(null);
      setPicker(null);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menu, picker]);

  const openMenuFromClick = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setPicker(null);
    setMenu((current) => (current && !current.fixed ? null : { fixed: false, x: 0, y: 0 }));
  };

  const openMenuFromContext = (event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setPicker(null);
    setMenu({ fixed: true, x: event.clientX, y: event.clientY });
  };

  const handleAction = (action: MessageOptionAction) => {
    if (action === "react") {
      setPicker(menu ?? { fixed: false, x: 0, y: 0 });
      setMenu(null);
      return;
    }

    setMenu(null);
    setPicker(null);

    if (action === "reply") onReply(message);
    if (action === "copy") void navigator.clipboard?.writeText(text).catch(() => undefined);
    if (action === "forward") onForward(message);
    if (action === "pin") onPin(message.id);
    if (action === "edit" && isOwn) onEdit(message);
    if (action === "delete") onDelete(message.id);
  };

  const handleReaction = (emoji: ChatReactionEmoji) => {
    onToggleReaction(message.id, emoji);
    setPicker(null);
  };

  const menuStyle: CSSProperties = menu?.fixed
    ? { position: "fixed", left: menu.x, top: menu.y }
    : { position: "absolute", top: "calc(100% + 8px)", right: isOwn ? 0 : undefined, left: isOwn ? undefined : 0 };

  const pickerStyle: CSSProperties = picker?.fixed
    ? { position: "fixed", left: picker.x, top: picker.y }
    : { position: "absolute", top: "calc(100% + 8px)", right: isOwn ? 0 : undefined, left: isOwn ? undefined : 0 };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("flex items-end gap-2.5", isOwn && "flex-row-reverse")}
    >
      {!isOwn && <Avatar user={sender} size={30} />}
      <div className={cn("relative flex max-w-[78%] flex-col sm:max-w-[68%] lg:max-w-[58%]", isOwn ? "items-end" : "items-start")}>
        {showSender && <span className="mb-1 ml-2 text-xs font-medium text-[#6B7280]">{sender?.name}</span>}
        <button
          type="button"
          onClick={openMenuFromClick}
          onContextMenu={openMenuFromContext}
          className={cn(
            "group/bubble relative rounded-[22px] px-4 py-2.5 text-left text-sm leading-relaxed shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400/30",
            isOwn
              ? "rounded-br-md bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-indigo-950/25 hover:shadow-indigo-500/25"
              : "rounded-bl-md border border-[#E5E7EB] bg-white text-[#111827] hover:bg-white hover:shadow-indigo-100",
          )}
        >
          {replyMessage && (
            <div
              className={cn(
                "relative mb-2 overflow-hidden rounded-xl border-l-2 px-3 py-2 text-xs",
                isOwn ? "border-white/70 bg-white/20 text-white" : "border-indigo-300 bg-indigo-50 text-[#111827]",
              )}
            >
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className={cn("absolute inset-y-2 left-0 w-0.5 rounded-full", isOwn ? "bg-white" : "bg-indigo-500")}
              />
              <div className="font-semibold">{getUser(replyMessage.userId, users)?.name ?? t("app.chat.unknown")}</div>
              <div className="mt-0.5 line-clamp-2 opacity-80">{getReplySnippet(replyMessage, t)}</div>
            </div>
          )}
          {isPinned && (
            <div className={cn("mb-1.5 flex items-center gap-1 text-[11px] font-semibold", isOwn ? "text-white/75" : "text-indigo-600")}>
              <Pin className="h-3 w-3" />
              {t("app.chat.pinnedLabel")}
            </div>
          )}
          <div className="whitespace-pre-wrap break-words">
            <PremiumMessageText text={text} isOwn={isOwn} />
          </div>
          <div className={cn("mt-1.5 flex items-center justify-end gap-1 text-[11px]", isOwn ? "text-white/70" : "text-[#6B7280]")}>
            {message.edited && <span>{t("app.chat.edited")}</span>}
            <span>{formatMessageTime(message.timestamp)}</span>
            {isOwn && <span className={message.read === false ? "text-white/65" : "text-cyan-100"}>{message.read === false ? t("app.chat.sent") : t("app.chat.readStatus")}</span>}
          </div>
        </button>

        {!!message.reactions?.length && (
          <div className={cn("mt-1 flex max-w-full gap-1 overflow-x-auto", isOwn ? "justify-end pr-2" : "justify-start pl-2")}>
            {message.reactions.map((reaction) => {
              const reactionId = normalizeReactionId(reaction.emoji);
              const active = reaction.userIds.includes("me");
              return (
                <ReactionButton
                  key={reactionId}
                  asset={getReactionAsset(reactionId)}
                  active={active}
                  count={reaction.userIds.length}
                  compact
                  onClick={() => onToggleReaction(message.id, reactionId)}
                />
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {menu && <MessageOptionsMenu isOwn={isOwn} onAction={handleAction} style={menuStyle} />}
          {picker && (
            <div key="reaction-picker" style={pickerStyle} className="z-50">
              <ReactionPicker activeEmojis={activeReactionEmojis} onSelect={handleReaction} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

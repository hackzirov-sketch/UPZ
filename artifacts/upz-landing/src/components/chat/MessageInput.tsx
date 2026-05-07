import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Mic, Paperclip, Reply, Send, Smile } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ChatMessage, ChatReactionEmoji, ChatRoom, ChatUser } from "@/types";
import { StickerPicker, getReactionAsset } from "@/components/premium/PremiumAssets";
import { ReactionPicker } from "./ReactionPicker";
import { cn, getReplySnippet, getRoomName, getUser } from "./chatShared";

interface MessageInputProps {
  room: ChatRoom;
  users: ChatUser[];
  value: string;
  replyTo: ChatMessage | null;
  editingMessage: ChatMessage | null;
  onChange: (value: string) => void;
  onSend: () => void;
  onCancelReply: () => void;
  onCancelEdit: () => void;
}

export function MessageInput({
  room,
  users,
  value,
  replyTo,
  editingMessage,
  onChange,
  onSend,
  onCancelReply,
  onCancelEdit,
}: MessageInputProps) {
  const { t } = useTranslation();
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [stickerOpen, setStickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canMention = room.type !== "1on1";
  const mentionOpen = canMention && value.includes("@");
  const typingUser = room.memberIds.map((id) => getUser(id, users)).find((candidate) => candidate && candidate.id !== "me" && candidate.status === "online");
  const roomName = getRoomName(room, t);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [value]);

  const appendEmoji = (emoji: ChatReactionEmoji) => {
    const asset = getReactionAsset(emoji);
    onChange(`${value}${value.endsWith(" ") || !value ? "" : " "}:${asset.id}:`);
    setEmojiOpen(false);
    textareaRef.current?.focus();
  };

  const appendEmojiAsset = (assetId: string) => {
    onChange(`${value}${value.endsWith(" ") || !value ? "" : " "}:${assetId}:`);
    setEmojiOpen(false);
    textareaRef.current?.focus();
  };

  const appendSticker = (prompt: string) => {
    onChange(`${value}${value.endsWith(" ") || !value ? "" : " "}${prompt}`);
    setStickerOpen(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex-shrink-0 border-t border-[#E5E7EB] bg-white px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
      <AnimatePresence>
        {typingUser && !editingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mb-2 flex items-center gap-2 px-2 text-xs text-[#6B7280]"
          >
            <img src="/emojis/laptop.svg" alt="Typing status" className="h-5 w-5" loading="lazy" decoding="async" />
            <span className="font-medium text-indigo-600">{typingUser.name.split(" ")[0]}</span>
            <span>{t("app.chat.isTyping")}</span>
            <span className="flex gap-0.5">
              <span className="h-1 w-1 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-slate-500" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mb-2 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-blue-50 px-4 py-3 text-sm shadow-sm"
          >
            <Reply className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-indigo-700">{t("app.chat.replyingTo", { name: getUser(replyTo.userId, users)?.name ?? t("app.chat.messageFallback") })}</div>
              <div className="truncate text-xs text-[#6B7280]">{getReplySnippet(replyTo, t)}</div>
            </div>
            <button type="button" onClick={onCancelReply} className="text-lg leading-none text-[#6B7280] transition-colors hover:text-[#111827]" aria-label={t("app.chat.closeSearch")}>
              x
            </button>
          </motion.div>
        )}
        {editingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mb-2 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm"
          >
            <Edit className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-amber-700">{t("app.chat.editingMessage")}</div>
              <div className="truncate text-xs text-[#6B7280]">{t("app.chat.pressEnterSave")}</div>
            </div>
            <button type="button" onClick={onCancelEdit} className="text-lg leading-none text-[#6B7280] transition-colors hover:text-[#111827]" aria-label={t("app.chat.editingMessage")}>
              x
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-end gap-2 rounded-[26px] border border-[#E5E7EB] bg-[#F7FAFC] p-2 shadow-sm transition-colors focus-within:border-indigo-300 focus-within:bg-white">
        <button
          type="button"
          onClick={() => {
            setStickerOpen((current) => !current);
            setEmojiOpen(false);
          }}
          className={cn(
            "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full transition-colors hover:bg-white hover:text-[#111827]",
            stickerOpen ? "bg-white text-[#111827]" : "text-[#6B7280]",
          )}
          aria-label={t("app.chat.attachFile")}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setEmojiOpen((current) => !current);
            setStickerOpen(false);
          }}
          className={cn(
            "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full transition-colors hover:bg-white hover:text-[#111827]",
            emojiOpen ? "bg-white text-[#111827]" : "text-[#6B7280]",
          )}
          aria-label={t("app.chat.emojiPicker")}
        >
          <Smile className="h-5 w-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          rows={1}
          placeholder={canMention ? t("app.chat.mentionPlaceholder", { room: roomName }) : t("app.chat.messagePlaceholder", { room: roomName })}
          className="max-h-[120px] min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm leading-5 text-[#111827] outline-none placeholder:text-[#6B7280]"
        />

        <button type="button" className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[#6B7280] transition-colors hover:bg-white hover:text-[#111827]" aria-label={t("app.chat.voicePlaceholder")}>
          <Mic className="h-5 w-5" />
        </button>
        <motion.button
          type="button"
          disabled={!value.trim()}
          onClick={onSend}
          whileHover={value.trim() ? { scale: 1.04 } : undefined}
          whileTap={value.trim() ? { scale: 0.96 } : undefined}
          className={cn(
            "grid h-11 w-11 flex-shrink-0 place-items-center rounded-full shadow-lg transition-all",
            value.trim()
              ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-indigo-950/30"
              : "cursor-not-allowed bg-white text-[#6B7280] shadow-none",
          )}
          aria-label={t("app.chat.sendMessage")}
        >
          <Send className="h-5 w-5" />
        </motion.button>

        <AnimatePresence>
          {emojiOpen && (
            <div className="absolute bottom-[64px] left-11 z-40">
              <ReactionPicker onSelect={appendEmoji} onSelectAsset={appendEmojiAsset} />
            </div>
          )}
          {stickerOpen && (
            <div className="absolute bottom-[64px] left-0 z-40">
              <StickerPicker
                onSelect={(sticker) => appendSticker(sticker.prompt)}
                onClose={() => setStickerOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mentionOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-2 flex flex-wrap gap-2 px-2"
          >
            {room.memberIds
              .filter((id) => id !== "me")
              .slice(0, 4)
              .map((memberId) => {
                const member = getUser(memberId, users);
                if (!member) return null;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => onChange(value.replace(/@\w*$/, `@${member.name.split(" ")[0]} `))}
                    className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#6B7280] transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    @{member.name.split(" ")[0]}
                  </button>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

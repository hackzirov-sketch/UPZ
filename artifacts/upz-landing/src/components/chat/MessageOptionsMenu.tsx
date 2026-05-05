import type { CSSProperties } from "react";
import { BellOff, Copy, Edit, Forward, Pin, Reply, Smile, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "./chatShared";

export type MessageOptionAction = "reply" | "react" | "copy" | "forward" | "pin" | "edit" | "delete";

interface MessageOptionsMenuProps {
  isOwn: boolean;
  onAction: (action: MessageOptionAction) => void;
  className?: string;
  style?: CSSProperties;
}

const BASE_ACTIONS = [
  { action: "reply", labelKey: "reply", icon: Reply },
  { action: "react", labelKey: "react", icon: Smile },
  { action: "copy", labelKey: "copy", icon: Copy },
  { action: "forward", labelKey: "forward", icon: Forward },
  { action: "pin", labelKey: "pin", icon: Pin },
] as const;

export function MessageOptionsMenu({ isOwn, onAction, className, style }: MessageOptionsMenuProps) {
  const { t } = useTranslation();
  const actions = isOwn
    ? [...BASE_ACTIONS, { action: "edit", labelKey: "editOwn", icon: Edit } as const]
    : BASE_ACTIONS;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ duration: 0.13, ease: "easeOut" }}
      className={cn(
        "z-50 min-w-48 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-1.5 text-sm text-[#111827] shadow-2xl backdrop-blur-xl",
        className,
      )}
      style={style}
      onClick={(event) => event.stopPropagation()}
    >
      {actions.map(({ action, labelKey, icon: Icon }) => (
        <button
          key={action}
          type="button"
          onClick={() => onAction(action)}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors hover:bg-[#F7FAFC]"
        >
          <Icon className="h-4 w-4 text-[#6B7280]" />
          <span>{t(`app.chat.menu.${labelKey}`)}</span>
        </button>
      ))}
      <div className="my-1 h-px bg-[#F7FAFC]" />
      <button
        type="button"
        onClick={() => onAction("delete")}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-rose-600 transition-colors hover:bg-rose-50"
      >
        <Trash className="h-4 w-4" />
        <span>{t("app.chat.menu.delete")}</span>
      </button>
      <div className="mt-1 flex items-center gap-2 rounded-xl bg-[#F7FAFC] px-3 py-2 text-[11px] text-[#6B7280]">
        <BellOff className="h-3.5 w-3.5" />
        {t("app.chat.menu.localActions")}
      </div>
    </motion.div>
  );
}

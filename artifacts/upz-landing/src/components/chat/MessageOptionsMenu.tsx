import type { CSSProperties } from "react";
import { Copy, Edit, Forward, Pin, Reply, Smile, Trash } from "lucide-react";
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
        "z-50 w-max max-w-[min(286px,calc(100vw-1rem))] overflow-hidden rounded-full border border-white/80 bg-white/92 p-1 text-xs text-gray-900 shadow-xl shadow-indigo-950/12 backdrop-blur-xl dark:border-gray-700/80 dark:bg-gray-900/92 dark:text-gray-100",
        className,
      )}
      style={style}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center gap-0.5 pr-1">
        {actions.map(({ action, labelKey, icon: Icon }) => (
          <button
            key={action}
            type="button"
            onClick={() => onAction(action)}
            className="group grid h-9 w-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:text-gray-400 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
            aria-label={t(`app.chat.menu.${labelKey}`)}
            title={t(`app.chat.menu.${labelKey}`)}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => onAction("forward")}
          className="group grid h-9 w-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:text-gray-400 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
          aria-label={t("app.chat.menu.forward")}
          title={t("app.chat.menu.forward")}
        >
          <Forward className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onAction("pin")}
          className="group grid h-9 w-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:text-gray-400 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
          aria-label={t("app.chat.menu.pin")}
          title={t("app.chat.menu.pin")}
        >
          <Pin className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => onAction("delete")}
        className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-rose-50 px-2.5 text-rose-600 ring-1 ring-rose-100 transition-colors hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300/40 dark:bg-rose-950/50 dark:ring-rose-900/60"
        aria-label={t("app.chat.menu.delete")}
        title={t("app.chat.menu.delete")}
      >
        <Trash className="h-4 w-4" />
        <span className="hidden text-[11px] font-bold sm:inline">{t("app.chat.menu.delete")}</span>
      </button>
    </motion.div>
  );
}

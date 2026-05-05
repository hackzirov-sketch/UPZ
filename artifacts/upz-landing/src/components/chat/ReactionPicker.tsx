import { motion } from "framer-motion";
import type { ChatReactionEmoji } from "@/types";
import { REACTION_EMOJIS, cn } from "./chatShared";

interface ReactionPickerProps {
  activeEmojis?: ChatReactionEmoji[];
  onSelect: (emoji: ChatReactionEmoji) => void;
  className?: string;
}

export function ReactionPicker({ activeEmojis = [], onSelect, className }: ReactionPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      className={cn(
        "flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white p-1.5 shadow-2xl backdrop-blur-xl",
        className,
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {REACTION_EMOJIS.map((emoji) => {
        const active = activeEmojis.includes(emoji);
        return (
          <motion.button
            key={emoji}
            type="button"
            whileHover={{ scale: 1.18, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onSelect(emoji)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full text-lg transition-colors",
              active ? "bg-indigo-500/25 ring-1 ring-indigo-300/30" : "hover:bg-[#F7FAFC]",
            )}
            aria-label={`React with ${emoji}`}
          >
            {emoji}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

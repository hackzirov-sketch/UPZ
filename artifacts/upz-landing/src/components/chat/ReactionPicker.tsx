import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ChatReactionEmoji } from "@/types";
import {
  PREMIUM_EMOJI_SECTIONS,
  PREMIUM_REACTIONS,
  ReactionButton,
  getEmojiSectionItems,
  normalizeReactionId,
  type PremiumEmojiSectionId,
} from "@/components/premium/PremiumAssets";
import { cn } from "./chatShared";

interface ReactionPickerProps {
  activeEmojis?: ChatReactionEmoji[];
  onSelect: (emoji: ChatReactionEmoji) => void;
  onSelectAsset?: (assetId: string) => void;
  className?: string;
}

export function ReactionPicker({ activeEmojis = [], onSelect, onSelectAsset, className }: ReactionPickerProps) {
  const [activeSection, setActiveSection] = useState<PremiumEmojiSectionId>("recent");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const activeIds = activeEmojis.map((emoji) => normalizeReactionId(emoji));
  const sectionItems = useMemo(() => getEmojiSectionItems(activeSection, query), [activeSection, query]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(
        "w-[min(360px,calc(100vw-1rem))] overflow-hidden border border-gray-200 bg-white/95 shadow-2xl shadow-indigo-950/15 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/95",
        expanded ? "rounded-[24px] p-2.5" : "rounded-full p-1.5",
        className,
      )}
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-label="Premium reaction picker"
    >
      <div className="flex max-w-full items-center gap-1 overflow-x-auto">
        {PREMIUM_REACTIONS.map((reaction) => (
          <ReactionButton
            key={reaction.id}
            asset={reaction}
            active={activeIds.includes(reaction.id)}
            compact
            onClick={() => onSelect(reaction.id)}
          />
        ))}
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="h-8 flex-shrink-0 rounded-full bg-gray-100 px-3 text-[11px] font-black text-indigo-600 ring-1 ring-gray-200 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:bg-gray-700 dark:ring-gray-600 dark:hover:bg-indigo-950/40"
          aria-expanded={expanded}
          aria-label={expanded ? "Hide emoji collection" : "Show more reactions"}
        >
          {expanded ? "Less" : "More"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="mt-2 overflow-hidden"
          >
            <div className="mb-2 flex h-8 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-2.5 focus-within:border-indigo-300 focus-within:bg-white dark:border-gray-600 dark:bg-gray-700 dark:focus-within:border-indigo-500 dark:focus-within:bg-gray-600">
              <Search className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search emoji"
                className="min-w-0 flex-1 bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                aria-label="Search premium reactions"
              />
            </div>

            <div className="mb-2 flex items-center gap-1 overflow-x-auto rounded-2xl bg-gray-50 p-1 dark:bg-gray-700" role="tablist" aria-label="Emoji sections">
              {PREMIUM_EMOJI_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "inline-flex h-7 flex-shrink-0 items-center gap-1 rounded-full px-2 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/30",
                    activeSection === section.id
                      ? "bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-100 dark:bg-gray-600 dark:text-indigo-300 dark:ring-indigo-700"
                      : "text-gray-500 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-100",
                  )}
                  role="tab"
                  aria-selected={activeSection === section.id}
                >
                  {section.label}
                  {section.premium && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />}
                </button>
              ))}
            </div>

            <div className="max-h-[126px] overflow-y-auto rounded-[18px] bg-gray-50 p-1.5 dark:bg-gray-700">
              <div className="grid grid-cols-7 gap-1 max-sm:grid-cols-6" role="list" aria-label={`${activeSection} emoji collection`}>
                {sectionItems.map((asset) => {
                  const reactionId = normalizeReactionId(asset.reactionId ?? asset.id);
                  return (
                    <ReactionButton
                      key={asset.id}
                      asset={asset}
                      active={activeIds.includes(reactionId)}
                      compact
                      onClick={() => (onSelectAsset ? onSelectAsset(asset.id) : onSelect(reactionId))}
                    />
                  );
                })}
              </div>
              {sectionItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-xs text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500">
                  No assets found.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

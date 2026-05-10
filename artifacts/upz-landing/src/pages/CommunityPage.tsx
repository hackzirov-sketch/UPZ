import { useState } from "react";
import { MessageSquare, Plus, Send, ShieldCheck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, PageHeader, PageShell, Pill, SectionTitle, SimpleTabs, SurfaceCard } from "@/components/app/DesignSystem";
import { CommunityRoleIcon, PremiumGradientBadge } from "@/components/premium/PremiumAssets";
import { COMMUNITY_CHANNELS, COMMUNITY_GROUPS, FEATURED_CREATORS, PROFESSIONAL_COMMUNITIES } from "@/data/ecosystemData";
import type { UserProfile } from "@/types";

interface PostComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

type ReactionKey = "heart" | "like" | "fire" | "idea";

interface ChannelPost {
  id: string;
  channelId: string;
  author: string;
  authorRole: string;
  time: string;
  content: string;
  baseReactions: Record<ReactionKey, number>;
  baseComments: PostComment[];
}

const REACTION_META: { key: ReactionKey; emoji: string }[] = [
  { key: "heart", emoji: "❤️" },
  { key: "like", emoji: "👍" },
  { key: "fire", emoji: "🔥" },
  { key: "idea", emoji: "💡" },
];

const COMMUNITY_ASSETS = ["/emojis/laptop.svg", "/emojis/book.svg", "/emojis/rocket.svg", "/emojis/gem.svg", "/emojis/trophy.svg"];

const CHANNEL_POSTS: ChannelPost[] = [
  {
    id: "cp1", channelId: "c1", author: "UPZ Team", authorRole: "Official", time: "2h ago",
    content: "Workspace presets just shipped! You can now get the right setup for developer, designer, or freelancer with a single click. Try it in your workspace settings.",
    baseReactions: { heart: 42, like: 28, fire: 15, idea: 8 },
    baseComments: [
      { id: "cc1", author: "Otabek K.", text: "Tried the developer preset — fits perfectly with my workflow!", time: "1h ago" },
      { id: "cc2", author: "Sara C.", text: "Is a designer preset coming too?", time: "45m ago" },
      { id: "cc3", author: "UPZ Team", text: "Yes! Designer and creator presets ship next week.", time: "30m ago" },
    ],
  },
  {
    id: "cp2", channelId: "c1", author: "UPZ Team", authorRole: "Official", time: "1d ago",
    content: "Dark mode got a major update. Message bubbles, notification panels, and sidebar navigation now adapt cleanly. Drop a 🔥 if you're already using dark mode.",
    baseReactions: { heart: 31, like: 19, fire: 67, idea: 12 },
    baseComments: [
      { id: "cc4", author: "Mira J.", text: "The chat dark mode looks really polished now!", time: "23h ago" },
      { id: "cc5", author: "Alex K.", text: "Sidebar looks great on my second monitor setup.", time: "20h ago" },
    ],
  },
  {
    id: "cp3", channelId: "c2", author: "Jobs Bot", authorRole: "Automated", time: "3h ago",
    content: "12 new verified remote roles added today.\n\n• 3× Frontend Engineer (React)\n• 2× Product Designer\n• 4× Content Creator\n• 3× Freelance Strategist\n\nAll positions are verified and available in the Jobs section.",
    baseReactions: { heart: 18, like: 54, fire: 11, idea: 6 },
    baseComments: [
      { id: "cc6", author: "Luca R.", text: "The freelance strategist roles look interesting!", time: "2h ago" },
    ],
  },
  {
    id: "cp4", channelId: "c3", author: "Learning Team", authorRole: "Education", time: "5h ago",
    content: "New mini-course dropped: AI Prompt Design for Productivity.\n\nCovers: prompt structure, context layering, output formatting, and real workflow examples. Free for all UPZ users this week.",
    baseReactions: { heart: 29, like: 41, fire: 22, idea: 35 },
    baseComments: [
      { id: "cc7", author: "Aisha P.", text: "Completed the first 3 modules. The prompt structure section is gold.", time: "4h ago" },
      { id: "cc8", author: "James W.", text: "Bookmarked. This is exactly what I needed for client proposals.", time: "3h ago" },
    ],
  },
  {
    id: "cp5", channelId: "c4", author: "Aisha Patel", authorRole: "Freelancer", time: "4h ago",
    content: "5 new project requests are live in the Freelance Deals channel. Budgets range from $400 to $2,800. Check the Jobs board for full scope details.",
    baseReactions: { heart: 23, like: 37, fire: 18, idea: 9 },
    baseComments: [
      { id: "cc9", author: "Luca R.", text: "Already applied to the landing page project. Fingers crossed!", time: "3h ago" },
    ],
  },
  {
    id: "cp6", channelId: "c6", author: "Otabek K.", authorRole: "Builder", time: "6h ago",
    content: "3 months ago I started building UPZ as a solo project. Today, the MVP launched with 8 core modules, 5 languages, and a real design system.\n\nThe hardest part wasn't the code — it was deciding what NOT to build.\n\nShipping > perfect.",
    baseReactions: { heart: 89, like: 62, fire: 44, idea: 27 },
    baseComments: [
      { id: "cc10", author: "Mira J.", text: "This is incredibly inspiring. Congrats on the launch!", time: "5h ago" },
      { id: "cc11", author: "Sara C.", text: "The design system is what got me hooked. Really clean work.", time: "4h ago" },
      { id: "cc12", author: "Alex K.", text: "Shipping > perfect is the right mindset. Well done!", time: "3h ago" },
    ],
  },
];

const GROUP_POSTS: (ChannelPost & { groupId: string })[] = [
  {
    id: "gp1", channelId: "", groupId: "dev", author: "Alex Kim", authorRole: "Developer", time: "1h ago",
    content: "Quick tip: using React.memo + useCallback on list items dropped our rendering time by 40%. UPZ chat list went from 120ms → 72ms re-render. Worth adding to your toolkit.",
    baseReactions: { heart: 24, like: 38, fire: 19, idea: 14 },
    baseComments: [
      { id: "gc1", author: "Otabek K.", text: "What profiling tool did you use to measure this?", time: "45m ago" },
      { id: "gc2", author: "Alex K.", text: "React DevTools Profiler + Chrome perf tab.", time: "30m ago" },
    ],
  },
  {
    id: "gp2", channelId: "", groupId: "dev", author: "James Wright", authorRole: "Developer", time: "3h ago",
    content: "Anyone using Drizzle ORM in production? We're migrating from Prisma and wondering about edge cases with complex relations.",
    baseReactions: { heart: 8, like: 22, fire: 5, idea: 16 },
    baseComments: [
      { id: "gc3", author: "Luca R.", text: "Been using Drizzle for 3 months. Type inference is excellent. Relations need some getting used to.", time: "2h ago" },
    ],
  },
  {
    id: "gp3", channelId: "", groupId: "design", author: "Sara Chen", authorRole: "Designer", time: "2h ago",
    content: "Design token tip: keep your color scale at 9 steps (50→900) and always define semantic tokens on top. Made our dark mode migration 5× faster by just swapping semantic mappings.",
    baseReactions: { heart: 31, like: 27, fire: 13, idea: 22 },
    baseComments: [
      { id: "gc4", author: "Mira J.", text: "100% agree. Semantic tokens are the key. Shared a template in the channel.", time: "1h ago" },
    ],
  },
  {
    id: "gp4", channelId: "", groupId: "freelance", author: "Aisha Patel", authorRole: "Freelancer", time: "4h ago",
    content: "My client onboarding checklist that cut scope creep by 80%:\n\n✅ Signed brief + scope doc\n✅ Milestone schedule with payment gates\n✅ Dedicated communication channel\n✅ Weekly 15-min sync\n✅ Delivery archive after each milestone\n\nDM me for the full template.",
    baseReactions: { heart: 56, like: 43, fire: 31, idea: 28 },
    baseComments: [
      { id: "gc5", author: "Luca R.", text: "This is gold. DM'd you!", time: "3h ago" },
      { id: "gc6", author: "James W.", text: "Scope creep is the #1 issue. Saving this immediately.", time: "2h ago" },
    ],
  },
  {
    id: "gp5", channelId: "", groupId: "student", author: "Otabek K.", authorRole: "Student", time: "8h ago",
    content: "Portfolio review thread! Drop your portfolio link below and I'll give honest feedback. I've reviewed 40+ portfolios this year.\n\nWhat I look for: clarity of problem statement, process documentation, and quantified results.",
    baseReactions: { heart: 45, like: 67, fire: 29, idea: 38 },
    baseComments: [
      { id: "gc7", author: "Sara C.", text: "Just sent you a DM! Would love your feedback on my case studies.", time: "7h ago" },
    ],
  },
  {
    id: "gp6", channelId: "", groupId: "creator", author: "Luca Rossi", authorRole: "Creator", time: "5h ago",
    content: "Content calendar hack: I batch-create everything on Sunday for the whole week. 3 hours of focus beats 30 minutes of daily context switching every time.\n\nTools I use: Notion for planning, UPZ for scheduling reminders, Figma for thumbnails.",
    baseReactions: { heart: 38, like: 52, fire: 24, idea: 31 },
    baseComments: [
      { id: "gc8", author: "Aisha P.", text: "The Sunday batch method changed my life. 100% recommend.", time: "4h ago" },
    ],
  },
];

type CommunityTab = "channels" | "groups" | "network";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

function PostCard({
  post,
  userReactions,
  expandedComments,
  commentDrafts,
  userAddedComments,
  onToggleReaction,
  onToggleComments,
  onDraftChange,
  onSubmitComment,
}: {
  post: ChannelPost;
  userReactions: Record<string, Set<ReactionKey>>;
  expandedComments: Set<string>;
  commentDrafts: Record<string, string>;
  userAddedComments: Record<string, PostComment[]>;
  onToggleReaction: (postId: string, key: ReactionKey) => void;
  onToggleComments: (postId: string) => void;
  onDraftChange: (postId: string, val: string) => void;
  onSubmitComment: (postId: string) => void;
}) {
  const isExpanded = expandedComments.has(post.id);
  const myReactions = userReactions[post.id] ?? new Set<ReactionKey>();
  const allComments = [...(userAddedComments[post.id] ?? []), ...post.baseComments];
  const draft = commentDrafts[post.id] ?? "";

  return (
    <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-bold text-white shadow-sm">
          {post.author.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold text-[#111827]">{post.author}</span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">{post.authorRole}</span>
            <span className="ml-auto text-xs text-[#6B7280]">{post.time}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#111827] whitespace-pre-line">{post.content}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-[#E5E7EB] pt-3">
        {REACTION_META.map(({ key, emoji }) => {
          const active = myReactions.has(key);
          const count = post.baseReactions[key] + (active ? 1 : 0);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleReaction(post.id, key)}
              className={`flex items-center gap-1 rounded-2xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                  : "text-[#6B7280] hover:bg-[#F7FAFC] hover:text-[#111827]"
              }`}
            >
              <span>{emoji}</span>
              <span>{count}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onToggleComments(post.id)}
          className="ml-auto flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-xs font-semibold text-[#6B7280] transition-colors hover:bg-[#F7FAFC] hover:text-[#111827]"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {allComments.length}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          {allComments.map((comment) => (
            <div key={comment.id} className="flex gap-2.5 rounded-2xl bg-[#F7FAFC] px-3 py-2.5">
              <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 text-[10px] font-bold text-white">
                {comment.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#111827]">{comment.author}</span>
                  <span className="text-[10px] text-[#6B7280]">{comment.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-[#6B7280]">{comment.text}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <input
              value={draft}
              onChange={(e) => onDraftChange(post.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmitComment(post.id);
                }
              }}
              placeholder="Write a comment..."
              className="flex-1 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] px-3 py-2 text-xs text-[#111827] outline-none transition-colors focus:border-indigo-300 focus:bg-white placeholder:text-[#6B7280]"
            />
            <button
              type="button"
              onClick={() => onSubmitComment(post.id)}
              disabled={!draft.trim()}
              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white transition-all hover:bg-indigo-500 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommunityPage({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CommunityTab>("channels");
  const [selectedChannelId, setSelectedChannelId] = useState("c1");
  const [selectedGroupId, setSelectedGroupId] = useState("dev");
  const [joinedGroups, setJoinedGroups] = useState(() =>
    COMMUNITY_GROUPS.filter((group) => group.joined).map((group) => group.id),
  );

  const [userReactions, setUserReactions] = useState<Record<string, Set<ReactionKey>>>({});
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [userAddedComments, setUserAddedComments] = useState<Record<string, PostComment[]>>({});
  const [groupPostDraft, setGroupPostDraft] = useState("");
  const [groupUserPosts, setGroupUserPosts] = useState<Record<string, ChannelPost[]>>({});

  const toggleGroup = (groupId: string) => {
    setJoinedGroups((current) => (current.includes(groupId) ? current.filter((id) => id !== groupId) : [...current, groupId]));
  };

  const toggleReaction = (postId: string, key: ReactionKey) => {
    setUserReactions((current) => {
      const existing = new Set(current[postId] ?? []);
      if (existing.has(key)) existing.delete(key);
      else existing.add(key);
      return { ...current, [postId]: new Set(existing) };
    });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((current) => {
      const next = new Set(current);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const handleDraftChange = (postId: string, val: string) => {
    setCommentDrafts((current) => ({ ...current, [postId]: val }));
  };

  const submitComment = (postId: string) => {
    const text = (commentDrafts[postId] ?? "").trim();
    if (!text) return;
    const newComment: PostComment = { id: `uc-${Date.now()}`, author: user.name, text, time: "just now" };
    setUserAddedComments((current) => ({ ...current, [postId]: [newComment, ...(current[postId] ?? [])] }));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const publishGroupPost = () => {
    const text = groupPostDraft.trim();
    if (!text) return;
    const newPost: ChannelPost = {
      id: `gup-${Date.now()}`,
      channelId: "",
      author: user.name,
      authorRole: user.profession ?? "Member",
      time: "just now",
      content: text,
      baseReactions: { heart: 0, like: 0, fire: 0, idea: 0 },
      baseComments: [],
    };
    setGroupUserPosts((current) => ({ ...current, [selectedGroupId]: [newPost, ...(current[selectedGroupId] ?? [])] }));
    setGroupPostDraft("");
  };

  const postCardProps = {
    userReactions,
    expandedComments,
    commentDrafts,
    userAddedComments,
    onToggleReaction: toggleReaction,
    onToggleComments: toggleComments,
    onDraftChange: handleDraftChange,
    onSubmitComment: submitComment,
  };

  const visibleChannelPosts = CHANNEL_POSTS.filter((post) => post.channelId === selectedChannelId);
  const visibleGroupPosts = [...(groupUserPosts[selectedGroupId] ?? []), ...GROUP_POSTS.filter((post) => post.groupId === selectedGroupId)];
  const selectedChannel = COMMUNITY_CHANNELS.find((ch) => ch.id === selectedChannelId);
  const selectedGroup = COMMUNITY_GROUPS.find((gr) => gr.id === selectedGroupId);

  const TABS: CommunityTab[] = ["channels", "groups", "network"];
  const tabLabels: Record<CommunityTab, string> = {
    channels: t("app.community.tabChannels", "Channels"),
    groups: t("app.community.tabGroups", "Groups"),
    network: t("app.community.tabNetwork", "Network"),
  };

  return (
    <AppLayout user={user} title={t("app.nav.community")} onLogout={onLogout}>
      <PageShell>
        <PageHeader
          eyebrow={t("app.community.eyebrow")}
          title={t("app.community.title")}
          description={t("app.community.description")}
        >
          <ActionButton>
            <Plus className="h-4 w-4" /> {t("app.community.startDiscussion")}
          </ActionButton>
          <ActionButton variant="secondary">
            <ShieldCheck className="h-4 w-4" /> {t("app.community.moderationQueue")}
          </ActionButton>
        </PageHeader>

        <SimpleTabs tabs={TABS} value={activeTab} onChange={setActiveTab} labels={tabLabels} />

        {activeTab === "channels" && (
          <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
            <SurfaceCard className="h-fit">
              <SectionTitle title={t("app.community.channelsTitle", "Channels")} />
              <div className="space-y-1">
                {COMMUNITY_CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setSelectedChannelId(channel.id)}
                    className={`w-full rounded-2xl p-3 text-left transition-all ${
                      selectedChannelId === channel.id ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-[#F7FAFC]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${selectedChannelId === channel.id ? "text-indigo-700" : "text-[#111827]"}`}>
                        # {t(`app.community.channels.${channel.id}.name`, channel.name)}
                      </span>
                      <Pill tone="blue" className="text-[10px]">
                        {t(`app.community.channels.${channel.id}.category`, channel.category)}
                      </Pill>
                    </div>
                    <p className="mt-1 text-xs text-[#6B7280]">{t("app.community.subscribers", { count: channel.subscribers })}</p>
                    <p className="mt-0.5 truncate text-xs text-[#6B7280]">{t(`app.community.channels.${channel.id}.last`, channel.last)}</p>
                  </button>
                ))}
              </div>
            </SurfaceCard>

            <div className="space-y-4">
              {selectedChannel && (
                <div className="flex items-center gap-3 rounded-[22px] border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#111827]">
                      # {t(`app.community.channels.${selectedChannelId}.name`, selectedChannel.name)}
                    </h3>
                    <p className="text-xs text-[#6B7280]">{t("app.community.subscribers", { count: selectedChannel.subscribers })}</p>
                  </div>
                  <Pill tone="blue">{t(`app.community.channels.${selectedChannelId}.category`, selectedChannel.category)}</Pill>
                </div>
              )}

              {visibleChannelPosts.length > 0 ? (
                visibleChannelPosts.map((post) => <PostCard key={post.id} post={post} {...postCardProps} />)
              ) : (
                <div className="rounded-[22px] border border-dashed border-[#E5E7EB] bg-[#F7FAFC] p-8 text-center text-sm text-[#6B7280]">
                  {t("app.community.feedEmpty", "No posts yet in this channel.")}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "groups" && (
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <div className="space-y-2">
              {COMMUNITY_GROUPS.map((group, index) => {
                const joined = joinedGroups.includes(group.id);
                const isSelected = selectedGroupId === group.id;
                return (
                  <div
                    key={group.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedGroupId(group.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setSelectedGroupId(group.id);
                    }}
                    className={`cursor-pointer rounded-[22px] border p-4 transition-all ${
                      isSelected ? "border-indigo-200 bg-indigo-50/60 ring-2 ring-indigo-100" : "border-[#E5E7EB] bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-[#E5E7EB]">
                        <img src={COMMUNITY_ASSETS[index % COMMUNITY_ASSETS.length]} alt={group.profession} className="h-6 w-6" loading="lazy" decoding="async" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#111827]">{t(`app.community.groups.${group.id}.name`, group.name)}</h3>
                          <Pill tone={joined ? "green" : "slate"} className="text-[10px]">
                            {joined ? t("app.community.joined") : t("app.community.public")}
                          </Pill>
                        </div>
                        <p className="mt-0.5 text-xs text-[#6B7280]">{t("app.community.membersCount", { count: group.members.toLocaleString() })}</p>
                      </div>
                    </div>
                    <ActionButton
                      variant={joined ? "secondary" : "primary"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.id);
                      }}
                      className="mt-3 w-full py-1.5 text-xs"
                    >
                      {joined ? t("app.community.leave") : t("app.community.join")}
                    </ActionButton>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              {selectedGroup && (
                <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Users className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#111827]">{t(`app.community.groups.${selectedGroupId}.name`, selectedGroup.name)}</h3>
                      <p className="text-xs text-[#6B7280]">{t(`app.community.groups.${selectedGroupId}.description`, selectedGroup.description)}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-3">
                    <textarea
                      value={groupPostDraft}
                      onChange={(e) => setGroupPostDraft(e.target.value)}
                      placeholder={t("app.community.writeGroupPost", "Share something with this group...")}
                      className="min-h-[72px] w-full resize-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#6B7280]"
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-xs text-[#6B7280]">
                        {t("app.community.writingAs", "Writing as")} <strong>{user.name}</strong>
                      </span>
                      <ActionButton onClick={publishGroupPost} className="py-1.5">
                        <Send className="h-3.5 w-3.5" />
                        {t("app.community.publishPost")}
                      </ActionButton>
                    </div>
                  </div>
                </div>
              )}

              {visibleGroupPosts.length > 0 ? (
                visibleGroupPosts.map((post) => <PostCard key={post.id} post={post} {...postCardProps} />)
              ) : (
                <div className="rounded-[22px] border border-dashed border-[#E5E7EB] bg-[#F7FAFC] p-8 text-center text-sm text-[#6B7280]">
                  {t("app.community.feedEmpty", "No posts yet. Be the first to share something!")}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="grid gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <SurfaceCard>
                <SectionTitle title={t("app.community.networkDepth")} description={t("app.community.networkDepthDesc")} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {PROFESSIONAL_COMMUNITIES.map((community, index) => (
                    <div key={community.profession} className="rounded-2xl border border-[#E5E7EB] bg-[#F7FAFC] p-4">
                      <div className="flex items-center gap-2">
                        <img src={COMMUNITY_ASSETS[index % COMMUNITY_ASSETS.length]} alt={`${community.profession} icon`} className="h-7 w-7" loading="lazy" decoding="async" />
                        <h3 className="font-semibold text-[#111827]">{t(`app.community.professional.${index}.profession`, community.profession)}</h3>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
                        <span>{t("app.community.groupsMetric", { count: community.groups })}</span>
                        <span>{t("app.community.channelsMetric", { count: community.channels })}</span>
                        <span>{t("app.community.mentorsMetric", { count: community.mentors })}</span>
                        <span>{t("app.community.postsMetric", { count: community.weeklyPosts })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard>
                <SectionTitle title={t("app.community.featuredCreators")} description={t("app.community.featuredCreatorsDesc")} />
                <div className="space-y-3">
                  {FEATURED_CREATORS.map((creator, index) => (
                    <div key={creator.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 ring-1 ring-indigo-100">
                          <CommunityRoleIcon role={creator.role} className="h-7 w-7" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#111827]">{creator.name}</p>
                          <p className="text-sm text-[#6B7280]">
                            {t(`app.community.creators.${index}.role`, creator.role)} — {t(`app.community.creators.${index}.contribution`, creator.contribution)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <PremiumGradientBadge label={t(`app.community.creators.${index}.badge`, creator.badge)} icon="/emojis/trophy.svg" />
                        <p className="mt-2 text-xs font-semibold text-[#6B7280]">{creator.followers}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>
          </div>
        )}
      </PageShell>
    </AppLayout>
  );
}

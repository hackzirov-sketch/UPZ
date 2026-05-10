import { useState } from "react";
import { ArrowLeft, ChevronRight, MessageSquare, Plus, Send, ShieldCheck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/app/AppLayout";
import { ActionButton, PageHeader, PageShell, Pill, SectionTitle, SimpleTabs, SurfaceCard } from "@/components/app/DesignSystem";
import { CommunityRoleIcon, PremiumGradientBadge } from "@/components/premium/PremiumAssets";
import { COMMUNITY_CHANNELS, COMMUNITY_GROUPS, FEATURED_CREATORS, PROFESSIONAL_COMMUNITIES } from "@/data/ecosystemData";
import type { UserProfile } from "@/types";

/* ─── Types ──────────────────────────────────────────────── */

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
  groupId?: string;
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

/* ─── Mock post data ─────────────────────────────────────── */

const CHANNEL_POSTS: ChannelPost[] = [
  {
    id: "cp1", channelId: "c1", author: "UPZ Team", authorRole: "Official", time: "2h oldin",
    content: "Workspace presets chiqdi! Endi developer, designer yoki freelancer sozlamasini bir click bilan olishingiz mumkin. Workspace sozlamalarida sinab ko'ring.",
    baseReactions: { heart: 42, like: 28, fire: 15, idea: 8 },
    baseComments: [
      { id: "cc1", author: "Otabek K.", text: "Developer presetni sinab ko'rdim — workflow'imga juda mos tushdi!", time: "1h oldin" },
      { id: "cc2", author: "Sara C.", text: "Designer preset ham chiqadimi?", time: "45d oldin" },
      { id: "cc3", author: "UPZ Team", text: "Ha! Designer va creator presetlar keyingi haftada chiqadi.", time: "30d oldin" },
    ],
  },
  {
    id: "cp2", channelId: "c1", author: "UPZ Team", authorRole: "Official", time: "1k oldin",
    content: "Dark mode katta yangilanish oldi. Xabar pufakchalari, bildirishnoma panellari va yon panel navigatsiyasi endi aniq moslashadi. Dark modeda ishlayotgan bo'lsangiz 🔥 tashlang.",
    baseReactions: { heart: 31, like: 19, fire: 67, idea: 12 },
    baseComments: [
      { id: "cc4", author: "Mira J.", text: "Chat dark mode hozir juda chiroyli ko'rinadi!", time: "23s oldin" },
      { id: "cc5", author: "Alex K.", text: "Yon panel ikkinchi monitorda ajoyib.", time: "20s oldin" },
    ],
  },
  {
    id: "cp3", channelId: "c2", author: "Jobs Bot", authorRole: "Avtomatik", time: "3h oldin",
    content: "Bugun 12 ta yangi tasdiqlangan remote lavozimlar qo'shildi.\n\n• 3× Frontend Engineer (React)\n• 2× Product Designer\n• 4× Content Creator\n• 3× Freelance Strategist\n\nBarcha pozitsiyalar tasdiqlangan va Jobs bo'limida mavjud.",
    baseReactions: { heart: 18, like: 54, fire: 11, idea: 6 },
    baseComments: [
      { id: "cc6", author: "Luca R.", text: "Freelance strategist lavozimlari qiziqarli ko'rinadi!", time: "2h oldin" },
    ],
  },
  {
    id: "cp4", channelId: "c3", author: "Learning Team", authorRole: "Ta'lim", time: "5h oldin",
    content: "Yangi mini-kurs chiqdi: AI Prompt Design for Productivity.\n\nQamrab oladi: prompt tuzilishi, kontekst qatlamlash, natija formatlash va real workflow misollar. Bu hafta barcha UPZ foydalanuvchilari uchun bepul.",
    baseReactions: { heart: 29, like: 41, fire: 22, idea: 35 },
    baseComments: [
      { id: "cc7", author: "Aisha P.", text: "Birinchi 3 modulni tugatdim. Prompt tuzilishi bo'limi — oltin.", time: "4h oldin" },
      { id: "cc8", author: "James W.", text: "Saqlash qildim. Mijoz takliflari uchun kerak edi.", time: "3h oldin" },
    ],
  },
  {
    id: "cp5", channelId: "c4", author: "Aisha Patel", authorRole: "Freelancer", time: "4h oldin",
    content: "Freelance Deals kanalida 5 ta yangi loyiha so'rovi jonli. Byudjetlar $400 dan $2,800 gacha. To'liq vazifalar uchun Jobs doskasini tekshiring.",
    baseReactions: { heart: 23, like: 37, fire: 18, idea: 9 },
    baseComments: [
      { id: "cc9", author: "Luca R.", text: "Landing page loyihasiga allaqachon ariza berdim. Barmoqlar kesishgan!", time: "3h oldin" },
    ],
  },
  {
    id: "cp6", channelId: "c6", author: "Otabek K.", authorRole: "Builder", time: "6h oldin",
    content: "3 oy oldin UPZ'ni yakkam o'zim qura boshladim. Bugun MVP 8 ta asosiy modul, 5 ta til va real dizayn tizimi bilan ishga tushdi.\n\nEng qiyin qismi kod emas edi — nima QURMASLIKNI hal qilish edi.\n\nYuborish > mukammal.",
    baseReactions: { heart: 89, like: 62, fire: 44, idea: 27 },
    baseComments: [
      { id: "cc10", author: "Mira J.", text: "Bu juda ilhomlantiruvchi. Tabriklayman!", time: "5h oldin" },
      { id: "cc11", author: "Sara C.", text: "Dizayn tizimi meni jalb qildi. Juda toza ish.", time: "4h oldin" },
      { id: "cc12", author: "Alex K.", text: "Yuborish > mukammal — to'g'ri fikr. Barakallo!", time: "3h oldin" },
    ],
  },
];

const GROUP_POSTS: ChannelPost[] = [
  {
    id: "gp1", channelId: "", groupId: "dev", author: "Alex Kim", authorRole: "Developer", time: "1h oldin",
    content: "Tez maslahat: React.memo + useCallback'ni list itemlarda ishlatish render vaqtimizni 40% kamaytirdi. UPZ chat ro'yxati 120ms → 72ms qayta renderga tushdi.",
    baseReactions: { heart: 24, like: 38, fire: 19, idea: 14 },
    baseComments: [
      { id: "gc1", author: "Otabek K.", text: "Buni o'lchash uchun qaysi profilaktika vositasini ishlatdingiz?", time: "45d oldin" },
      { id: "gc2", author: "Alex K.", text: "React DevTools Profiler + Chrome perf tab.", time: "30d oldin" },
    ],
  },
  {
    id: "gp2", channelId: "", groupId: "dev", author: "James Wright", authorRole: "Developer", time: "3h oldin",
    content: "Kimdir Drizzle ORM'ni produksiyada ishlatyaptimi? Prisma'dan migratsiya qilyapmiz va murakkab munosabatlarda edge case'lar haqida so'ramoqchi edim.",
    baseReactions: { heart: 8, like: 22, fire: 5, idea: 16 },
    baseComments: [
      { id: "gc3", author: "Luca R.", text: "3 oydan beri Drizzle ishlatyapman. Type inference ajoyib.", time: "2h oldin" },
    ],
  },
  {
    id: "gp3", channelId: "", groupId: "design", author: "Sara Chen", authorRole: "Designer", time: "2h oldin",
    content: "Dizayn token maslahat: rang skalasini 9 bosqichda (50→900) saqlang va ustida semantik tokenlar aniqlang. Dark mode migratsiyamizni 5× tezlashtirdi.",
    baseReactions: { heart: 31, like: 27, fire: 13, idea: 22 },
    baseComments: [
      { id: "gc4", author: "Mira J.", text: "100% roziman. Semantik tokenlar asosiy kalit. Kanalda shablon ulashdim.", time: "1h oldin" },
    ],
  },
  {
    id: "gp4", channelId: "", groupId: "freelance", author: "Aisha Patel", authorRole: "Freelancer", time: "4h oldin",
    content: "Scope creep'ni 80% kamaytirgan mijoz onboarding ro'yxatim:\n\n✅ Imzolangan brief + scope hujjat\n✅ To'lov shartlari bilan milestone jadvali\n✅ Maxsus aloqa kanali\n✅ Haftalik 15 daqiqalik sinxronizatsiya\n✅ Har bir milestone'dan keyin yetkazib berish arxivi\n\nTo'liq shablon uchun DM yuboring.",
    baseReactions: { heart: 56, like: 43, fire: 31, idea: 28 },
    baseComments: [
      { id: "gc5", author: "Luca R.", text: "Bu oltin. DM yubordim!", time: "3h oldin" },
      { id: "gc6", author: "James W.", text: "Scope creep #1 muammo. Darhol saqlayapman.", time: "2h oldin" },
    ],
  },
  {
    id: "gp5", channelId: "", groupId: "student", author: "Otabek K.", authorRole: "Talaba", time: "8h oldin",
    content: "Portfolio ko'rib chiqish! Portfolio havolangizni qoldiring va men halol fikr bildiraman. Bu yil 40+ ta portfolioni ko'rib chiqdim.\n\nNimani qidiraman: muammo bayonotining aniqligi, jarayon hujjatlari va miqdoriy natijalar.",
    baseReactions: { heart: 45, like: 67, fire: 29, idea: 38 },
    baseComments: [
      { id: "gc7", author: "Sara C.", text: "Sizga DM yubordim! Case studylarim haqida fikringizni bilmoqchi edim.", time: "7h oldin" },
    ],
  },
  {
    id: "gp6", channelId: "", groupId: "creator", author: "Luca Rossi", authorRole: "Creator", time: "5h oldin",
    content: "Kontent kalendar hiyla: hamma narsani yakshanba kuni butun hafta uchun paketlayman. 3 soatlik e'tibor har kuni 30 daqiqalik kontekst almashtirishdan ustun.\n\nIshlatadiganlarim: Notion (rejalash), UPZ (eslatmalar), Figma (muqovalar).",
    baseReactions: { heart: 38, like: 52, fire: 24, idea: 31 },
    baseComments: [
      { id: "gc8", author: "Aisha P.", text: "Yakshanba partiyasi metodi hayotimni o'zgartirdi. 100% tavsiya.", time: "4h oldin" },
    ],
  },
];

/* ─── Shared PostCard ─────────────────────────────────────── */

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
    <div
      className="rounded-[22px] border p-4 shadow-sm transition-all hover:shadow-md"
      style={{ backgroundColor: "var(--upz-surface)", borderColor: "var(--upz-border)" }}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-bold text-white shadow-sm">
          {post.author.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold" style={{ color: "var(--upz-text)" }}>{post.author}</span>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {post.authorRole}
            </span>
            <span className="ml-auto text-xs" style={{ color: "var(--upz-muted)" }}>{post.time}</span>
          </div>
          <p className="mt-2 text-sm leading-6 whitespace-pre-line" style={{ color: "var(--upz-text)" }}>{post.content}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1 border-t pt-3" style={{ borderColor: "var(--upz-border)" }}>
        {REACTION_META.map(({ key, emoji }) => {
          const active = myReactions.has(key);
          const count = post.baseReactions[key] + (active ? 1 : 0);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleReaction(post.id, key)}
              className="flex items-center gap-1 rounded-2xl px-2.5 py-1.5 text-xs font-semibold transition-all"
              style={
                active
                  ? { backgroundColor: "rgb(99 102 241 / 0.15)", color: "var(--upz-accent, #6366F1)", outline: "1px solid rgb(99 102 241 / 0.3)" }
                  : { color: "var(--upz-muted)" }
              }
            >
              <span>{emoji}</span>
              <span>{count}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onToggleComments(post.id)}
          className="ml-auto flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-xs font-semibold transition-colors"
          style={{ color: isExpanded ? "var(--upz-accent, #6366F1)" : "var(--upz-muted)" }}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {allComments.length}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          {allComments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-2.5 rounded-2xl px-3 py-2.5"
              style={{ backgroundColor: "var(--upz-surface-soft)" }}
            >
              <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 text-[10px] font-bold text-white">
                {comment.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: "var(--upz-text)" }}>{comment.author}</span>
                  <span className="text-[10px]" style={{ color: "var(--upz-muted)" }}>{comment.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-5" style={{ color: "var(--upz-muted)" }}>{comment.text}</p>
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
              placeholder="Izoh yozing..."
              className="flex-1 rounded-2xl border px-3 py-2 text-xs outline-none transition-colors focus:border-indigo-400"
              style={{
                backgroundColor: "var(--upz-surface-soft)",
                borderColor: "var(--upz-border)",
                color: "var(--upz-text)",
              }}
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

/* ─── Main component ─────────────────────────────────────── */

type CommunityTab = "channels" | "groups" | "network";
type View = "tabs" | "channel-feed" | "group-feed";

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

export default function CommunityPage({ user, onLogout }: Props) {
  const { t } = useTranslation();

  const [view, setView] = useState<View>("tabs");
  const [activeTab, setActiveTab] = useState<CommunityTab>("channels");
  const [activeChannelId, setActiveChannelId] = useState("c1");
  const [activeGroupId, setActiveGroupId] = useState("dev");
  const [joinedGroups, setJoinedGroups] = useState(() =>
    COMMUNITY_GROUPS.filter((g) => g.joined).map((g) => g.id),
  );

  const [userReactions, setUserReactions] = useState<Record<string, Set<ReactionKey>>>({});
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [userAddedComments, setUserAddedComments] = useState<Record<string, PostComment[]>>({});
  const [groupPostDraft, setGroupPostDraft] = useState("");
  const [groupUserPosts, setGroupUserPosts] = useState<Record<string, ChannelPost[]>>({});

  const openChannel = (channelId: string) => {
    setActiveChannelId(channelId);
    setView("channel-feed");
  };

  const openGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    setView("group-feed");
  };

  const goBack = () => setView("tabs");

  const toggleGroup = (groupId: string) =>
    setJoinedGroups((cur) => (cur.includes(groupId) ? cur.filter((id) => id !== groupId) : [...cur, groupId]));

  const toggleReaction = (postId: string, key: ReactionKey) => {
    setUserReactions((cur) => {
      const s = new Set(cur[postId] ?? []);
      if (s.has(key)) s.delete(key); else s.add(key);
      return { ...cur, [postId]: new Set(s) };
    });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((cur) => {
      const s = new Set(cur);
      if (s.has(postId)) s.delete(postId); else s.add(postId);
      return s;
    });
  };

  const handleDraftChange = (postId: string, val: string) =>
    setCommentDrafts((cur) => ({ ...cur, [postId]: val }));

  const submitComment = (postId: string) => {
    const text = (commentDrafts[postId] ?? "").trim();
    if (!text) return;
    const nc: PostComment = { id: `uc-${Date.now()}`, author: user.name, text, time: "hozirgina" };
    setUserAddedComments((cur) => ({ ...cur, [postId]: [nc, ...(cur[postId] ?? [])] }));
    setCommentDrafts((cur) => ({ ...cur, [postId]: "" }));
  };

  const publishGroupPost = () => {
    const text = groupPostDraft.trim();
    if (!text) return;
    const np: ChannelPost = {
      id: `gup-${Date.now()}`,
      channelId: "",
      groupId: activeGroupId,
      author: user.name,
      authorRole: user.profession ?? "A'zo",
      time: "hozirgina",
      content: text,
      baseReactions: { heart: 0, like: 0, fire: 0, idea: 0 },
      baseComments: [],
    };
    setGroupUserPosts((cur) => ({ ...cur, [activeGroupId]: [np, ...(cur[activeGroupId] ?? [])] }));
    setGroupPostDraft("");
  };

  const postCardProps = {
    userReactions, expandedComments, commentDrafts, userAddedComments,
    onToggleReaction: toggleReaction,
    onToggleComments: toggleComments,
    onDraftChange: handleDraftChange,
    onSubmitComment: submitComment,
  };

  const activeChannel = COMMUNITY_CHANNELS.find((ch) => ch.id === activeChannelId);
  const activeGroup = COMMUNITY_GROUPS.find((g) => g.id === activeGroupId);
  const channelPosts = CHANNEL_POSTS.filter((p) => p.channelId === activeChannelId);
  const groupPosts = [
    ...(groupUserPosts[activeGroupId] ?? []),
    ...GROUP_POSTS.filter((p) => p.groupId === activeGroupId),
  ];

  const TABS: CommunityTab[] = ["channels", "groups", "network"];
  const tabLabels: Record<CommunityTab, string> = {
    channels: t("app.community.tabChannels", "Kanallar"),
    groups: t("app.community.tabGroups", "Guruhlar"),
    network: t("app.community.tabNetwork", "Tarmoq"),
  };

  /* ── Channel feed view ─────────────────────────────── */
  if (view === "channel-feed" && activeChannel) {
    return (
      <AppLayout user={user} title={activeChannel.name} onLogout={onLogout}>
        <PageShell>
          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-semibold transition-all hover:shadow-sm"
              style={{ borderColor: "var(--upz-border)", backgroundColor: "var(--upz-surface)", color: "var(--upz-text)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("app.back", "Orqaga")}
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl"
                style={{ backgroundColor: "rgb(99 102 241 / 0.12)" }}
              >
                <span className="text-lg">#</span>
              </div>
              <div className="min-w-0">
                <h2 className="font-bold" style={{ color: "var(--upz-text)" }}>
                  {t(`app.community.channels.${activeChannelId}.name`, activeChannel.name)}
                </h2>
                <p className="text-xs" style={{ color: "var(--upz-muted)" }}>
                  {t("app.community.subscribers", { count: activeChannel.subscribers })}
                </p>
              </div>
            </div>
            <Pill tone="blue">{t(`app.community.channels.${activeChannelId}.category`, activeChannel.category)}</Pill>
          </div>

          <div className="space-y-4">
            {channelPosts.length > 0 ? (
              channelPosts.map((post) => <PostCard key={post.id} post={post} {...postCardProps} />)
            ) : (
              <div
                className="rounded-[22px] border border-dashed p-10 text-center text-sm"
                style={{ borderColor: "var(--upz-border)", color: "var(--upz-muted)", backgroundColor: "var(--upz-surface-soft)" }}
              >
                {t("app.community.feedEmpty", "Bu kanalda hali post yo'q.")}
              </div>
            )}
          </div>
        </PageShell>
      </AppLayout>
    );
  }

  /* ── Group feed view ───────────────────────────────── */
  if (view === "group-feed" && activeGroup) {
    const isJoined = joinedGroups.includes(activeGroupId);
    const groupIndex = COMMUNITY_GROUPS.findIndex((g) => g.id === activeGroupId);
    return (
      <AppLayout user={user} title={activeGroup.name} onLogout={onLogout}>
        <PageShell>
          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-semibold transition-all hover:shadow-sm"
              style={{ borderColor: "var(--upz-border)", backgroundColor: "var(--upz-surface)", color: "var(--upz-text)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("app.back", "Orqaga")}
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <span
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl ring-1"
                style={{ backgroundColor: "var(--upz-surface)", ringColor: "var(--upz-border)" }}
              >
                <img
                  src={COMMUNITY_ASSETS[groupIndex % COMMUNITY_ASSETS.length]}
                  alt={activeGroup.profession}
                  className="h-6 w-6"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div className="min-w-0">
                <h2 className="font-bold" style={{ color: "var(--upz-text)" }}>
                  {t(`app.community.groups.${activeGroupId}.name`, activeGroup.name)}
                </h2>
                <p className="text-xs" style={{ color: "var(--upz-muted)" }}>
                  {t("app.community.membersCount", { count: activeGroup.members.toLocaleString() })}
                </p>
              </div>
            </div>
            <Pill tone={isJoined ? "green" : "slate"}>
              {isJoined ? t("app.community.joined") : t("app.community.public")}
            </Pill>
          </div>

          <div
            className="mb-4 rounded-[22px] border p-4 shadow-sm"
            style={{ backgroundColor: "var(--upz-surface)", borderColor: "var(--upz-border)" }}
          >
            <textarea
              value={groupPostDraft}
              onChange={(e) => setGroupPostDraft(e.target.value)}
              placeholder={t("app.community.writeGroupPost", "Bu guruhda nima ulashmoqchisiz?")}
              rows={3}
              className="w-full resize-none bg-transparent text-sm outline-none"
              style={{ color: "var(--upz-text)" }}
            />
            <div
              className="mt-3 flex items-center justify-between gap-3 border-t pt-3"
              style={{ borderColor: "var(--upz-border)" }}
            >
              <span className="text-xs" style={{ color: "var(--upz-muted)" }}>
                {t("app.community.writingAs", "Sifatida yozilyapti")}:{" "}
                <strong style={{ color: "var(--upz-text)" }}>{user.name}</strong>
              </span>
              <ActionButton onClick={publishGroupPost} className="py-1.5 text-xs">
                <Send className="h-3.5 w-3.5" />
                {t("app.community.publishPost")}
              </ActionButton>
            </div>
          </div>

          <div className="space-y-4">
            {groupPosts.length > 0 ? (
              groupPosts.map((post) => <PostCard key={post.id} post={post} {...postCardProps} />)
            ) : (
              <div
                className="rounded-[22px] border border-dashed p-10 text-center text-sm"
                style={{ borderColor: "var(--upz-border)", color: "var(--upz-muted)", backgroundColor: "var(--upz-surface-soft)" }}
              >
                {t("app.community.feedEmpty", "Hali post yo'q. Birinchi bo'lib nima ulashing!")}
              </div>
            )}
          </div>
        </PageShell>
      </AppLayout>
    );
  }

  /* ── Main tabs view ────────────────────────────────── */
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

        {/* ── Channels tab ── */}
        {activeTab === "channels" && (
          <div className="space-y-3">
            {COMMUNITY_CHANNELS.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => openChannel(channel.id)}
                className="group w-full rounded-[22px] border p-4 text-left shadow-sm transition-all hover:shadow-md"
                style={{ backgroundColor: "var(--upz-surface)", borderColor: "var(--upz-border)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl text-xl font-bold"
                    style={{ backgroundColor: "rgb(99 102 241 / 0.12)", color: "#6366F1" }}
                  >
                    #
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: "var(--upz-text)" }}>
                        {t(`app.community.channels.${channel.id}.name`, channel.name)}
                      </span>
                      <Pill tone="blue" className="text-[10px]">
                        {t(`app.community.channels.${channel.id}.category`, channel.category)}
                      </Pill>
                    </div>
                    <p className="mt-0.5 text-xs" style={{ color: "var(--upz-muted)" }}>
                      {t("app.community.subscribers", { count: channel.subscribers })} •{" "}
                      {t(`app.community.channels.${channel.id}.last`, channel.last)}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--upz-muted)" }}
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Groups tab ── */}
        {activeTab === "groups" && (
          <div className="space-y-3">
            {COMMUNITY_GROUPS.map((group, index) => {
              const joined = joinedGroups.includes(group.id);
              return (
                <div
                  key={group.id}
                  className="rounded-[22px] border shadow-sm transition-all hover:shadow-md"
                  style={{ backgroundColor: "var(--upz-surface)", borderColor: "var(--upz-border)" }}
                >
                  <div className="flex items-center gap-3 p-4">
                    <span
                      className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl ring-1"
                      style={{ backgroundColor: "var(--upz-surface-soft)", ringColor: "var(--upz-border)" }}
                    >
                      <img
                        src={COMMUNITY_ASSETS[index % COMMUNITY_ASSETS.length]}
                        alt={group.profession}
                        className="h-7 w-7"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: "var(--upz-text)" }}>
                          {t(`app.community.groups.${group.id}.name`, group.name)}
                        </span>
                        <Pill tone={joined ? "green" : "slate"} className="text-[10px]">
                          {joined ? t("app.community.joined") : t("app.community.public")}
                        </Pill>
                      </div>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--upz-muted)" }}>
                        {t("app.community.membersCount", { count: group.members.toLocaleString() })}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 border-t px-4 py-3"
                    style={{ borderColor: "var(--upz-border)" }}
                  >
                    <ActionButton
                      variant={joined ? "secondary" : "primary"}
                      onClick={() => toggleGroup(group.id)}
                      className="py-1.5 text-xs"
                    >
                      {joined ? t("app.community.leave") : t("app.community.join")}
                    </ActionButton>
                    <button
                      type="button"
                      onClick={() => openGroup(group.id)}
                      className="group ml-auto flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: "rgb(99 102 241 / 0.10)",
                        color: "#6366F1",
                      }}
                    >
                      {t("app.community.openGroup", "Ochish")}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Network tab ── */}
        {activeTab === "network" && (
          <div className="grid gap-5 lg:grid-cols-2">
            <SurfaceCard>
              <SectionTitle title={t("app.community.networkDepth")} description={t("app.community.networkDepthDesc")} />
              <div className="grid gap-3 sm:grid-cols-2">
                {PROFESSIONAL_COMMUNITIES.map((community, index) => (
                  <div
                    key={community.profession}
                    className="rounded-2xl border p-4"
                    style={{ backgroundColor: "var(--upz-surface-soft)", borderColor: "var(--upz-border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={COMMUNITY_ASSETS[index % COMMUNITY_ASSETS.length]}
                        alt={`${community.profession} icon`}
                        className="h-7 w-7"
                        loading="lazy"
                        decoding="async"
                      />
                      <h3 className="font-semibold" style={{ color: "var(--upz-text)" }}>
                        {t(`app.community.professional.${index}.profession`, community.profession)}
                      </h3>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs" style={{ color: "var(--upz-muted)" }}>
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
                  <div
                    key={creator.name}
                    className="flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-sm"
                    style={{ backgroundColor: "var(--upz-surface)", borderColor: "var(--upz-border)" }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl ring-1"
                        style={{ backgroundColor: "rgb(99 102 241 / 0.08)", ringColor: "rgb(99 102 241 / 0.2)" }}
                      >
                        <CommunityRoleIcon role={creator.role} className="h-7 w-7" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold" style={{ color: "var(--upz-text)" }}>{creator.name}</p>
                        <p className="text-sm" style={{ color: "var(--upz-muted)" }}>
                          {t(`app.community.creators.${index}.role`, creator.role)} —{" "}
                          {t(`app.community.creators.${index}.contribution`, creator.contribution)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <PremiumGradientBadge label={t(`app.community.creators.${index}.badge`, creator.badge)} icon="/emojis/trophy.svg" />
                      <p className="mt-2 text-xs font-semibold" style={{ color: "var(--upz-muted)" }}>{creator.followers}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        )}
      </PageShell>
    </AppLayout>
  );
}

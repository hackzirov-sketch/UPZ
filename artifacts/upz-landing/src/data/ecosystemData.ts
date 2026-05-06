export const COMMUNITY_GROUPS = [
  { id: "dev", name: "Developer Guild", profession: "Developers", members: 12840, joined: true, moderation: "3 pending posts", description: "Code reviews, build logs, job leads, and framework discussions." },
  { id: "design", name: "Design Circle", profession: "Designers", members: 6240, joined: false, moderation: "Clean", description: "Portfolio critique, UI systems, motion, and client workflows." },
  { id: "teach", name: "Teacher Hub", profession: "Teachers", members: 3810, joined: false, moderation: "1 report", description: "Lesson planning, student engagement, classroom resources." },
  { id: "freelance", name: "Freelancer Market", profession: "Freelancers", members: 9150, joined: true, moderation: "Clean", description: "Proposals, pricing, client operations, and collaboration." },
  { id: "creator", name: "Creator Studio", profession: "Creators", members: 7340, joined: false, moderation: "2 flagged replies", description: "Content calendars, monetization, scripts, editing pipelines, and audience growth." },
  { id: "smm", name: "Growth & SMM Lab", profession: "SMM", members: 5120, joined: false, moderation: "Clean", description: "Campaign strategy, analytics, SEO, paid social, and brand systems." },
  { id: "student", name: "Student Progress Club", profession: "Students", members: 10920, joined: true, moderation: "5 pending intros", description: "Learning accountability, portfolios, peer review, and first-job preparation." },
];

export const COMMUNITY_CHANNELS = [
  { id: "c1", name: "UPZ Product Updates", subscribers: "18.4K", category: "Official", last: "Workspace presets shipped" },
  { id: "c2", name: "Remote Jobs Digest", subscribers: "9.2K", category: "Careers", last: "12 new verified roles" },
  { id: "c3", name: "Learning Drops", subscribers: "7.8K", category: "Education", last: "AI prompt design mini-course" },
  { id: "c4", name: "Freelance Deals Radar", subscribers: "6.5K", category: "Market", last: "5 project requests under review" },
  { id: "c5", name: "Design Systems Weekly", subscribers: "4.1K", category: "Design", last: "Token naming patterns for SaaS teams" },
  { id: "c6", name: "Build in Public", subscribers: "11.6K", category: "Startup", last: "MVP launch retrospectives" },
];

export const COMMUNITY_THREADS = [
  { id: "t1", title: "How should small teams organize project chats?", replies: 28, author: "Sara Chen", status: "Hot" },
  { id: "t2", title: "Share your weekly productivity dashboard", replies: 14, author: "Alex Kim", status: "Open" },
  { id: "t3", title: "Best client handoff checklist for freelancers", replies: 36, author: "Aisha Patel", status: "Pinned" },
  { id: "t4", title: "What should a Universal Bank invoice include?", replies: 19, author: "Luca Rossi", status: "Open" },
  { id: "t5", title: "AI assistant prompts that actually save time", replies: 44, author: "Mira Johnson", status: "Hot" },
  { id: "t6", title: "Drop your portfolio homepage for review", replies: 67, author: "Otabek Karimov", status: "Pinned" },
];

export const NEWS_ARTICLES = [
  { id: "n1", title: "AI copilots are becoming project teammates", category: "AI", readTime: "5 min", trending: true, saved: true, summary: "A practical look at how AI assistants move from chat windows into task, planning, and review loops." },
  { id: "n2", title: "Remote work tools consolidate around workflow hubs", category: "Productivity", readTime: "4 min", trending: true, saved: false, summary: "Teams increasingly prefer unified dashboards over scattered single-purpose apps." },
  { id: "n3", title: "Freelance payment rails expand local currency support", category: "Freelance", readTime: "6 min", trending: false, saved: false, summary: "New wallet UX patterns reduce the gap between contracts, invoices, and payouts." },
  { id: "n4", title: "Learning paths get shorter and more adaptive", category: "Learning", readTime: "3 min", trending: false, saved: false, summary: "Skill platforms are shifting toward personalized practice loops tied to user goals." },
  { id: "n5", title: "Community-led products are turning users into operators", category: "Community", readTime: "7 min", trending: true, saved: false, summary: "Channels, groups, and member-led discussions are becoming core retention loops for SaaS platforms." },
  { id: "n6", title: "Wallet-first freelance dashboards improve trust", category: "Finance", readTime: "5 min", trending: false, saved: true, summary: "Showing earnings, payouts, invoices, and payment methods together helps freelancers understand cash flow faster." },
  { id: "n7", title: "Design systems need motion tokens, not just color tokens", category: "Design", readTime: "4 min", trending: true, saved: false, summary: "Teams are documenting animation duration, easing, loading states, and empty-state motion as reusable product rules." },
  { id: "n8", title: "Global search is becoming the command center", category: "UX", readTime: "3 min", trending: false, saved: false, summary: "Search patterns now span people, projects, conversations, files, and knowledge objects in one modal." },
];

export const BANK_TRANSACTIONS = [
  { id: "ub-1007", title: "Client payment - Landing redesign", type: "Freelance earning", amount: "+$1,240.00", status: "Completed", date: "Today" },
  { id: "ub-1006", title: "UPZ Pro workspace", type: "Subscription", amount: "-$19.00", status: "Completed", date: "Yesterday" },
  { id: "ub-1005", title: "Local payout to card", type: "Withdrawal", amount: "-$520.00", status: "Processing", date: "May 3" },
  { id: "ub-1004", title: "Crypto placeholder transfer", type: "Crypto", amount: "+0.018 BTC", status: "Demo", date: "May 2" },
  { id: "ub-1003", title: "Team bonus pool", type: "Team earning", amount: "+$680.00", status: "Completed", date: "May 1" },
  { id: "ub-1002", title: "Invoice #UPZ-142", type: "Invoice", amount: "+$2,400.00", status: "Processing", date: "Apr 29" },
  { id: "ub-1001", title: "Course marketplace payout", type: "Learning", amount: "+$310.00", status: "Completed", date: "Apr 26" },
];

export const TEAM_MEMBERS = [
  { id: "tm1", name: "Alex Kim", handle: "@alex", email: "alex@upz.demo", role: "Admin", focus: "Frontend", status: "Online", workload: 82, tasks: 6, projects: 3, location: "Seoul", lastActive: "Now", skills: ["React", "Systems", "QA"], availability: "Deep work until 15:00" },
  { id: "tm2", name: "Sara Chen", handle: "@sara", email: "sara@upz.demo", role: "Member", focus: "Design", status: "Online", workload: 68, tasks: 4, projects: 2, location: "Taipei", lastActive: "2m", skills: ["UI", "Motion", "Research"], availability: "Open for review" },
  { id: "tm3", name: "James Wright", handle: "@james", email: "james@upz.demo", role: "Member", focus: "Delivery", status: "Away", workload: 54, tasks: 3, projects: 2, location: "London", lastActive: "18m", skills: ["Planning", "Docs", "Ops"], availability: "Back after standup" },
  { id: "tm4", name: "Luca Rossi", handle: "@luca", email: "luca@upz.demo", role: "Member", focus: "Marketing", status: "Offline", workload: 39, tasks: 2, projects: 1, location: "Milan", lastActive: "1h", skills: ["SMM", "Launch", "Analytics"], availability: "Async today" },
  { id: "tm5", name: "Mira Johnson", handle: "@mira", email: "mira@upz.demo", role: "Member", focus: "Product", status: "Online", workload: 75, tasks: 5, projects: 3, location: "New York", lastActive: "Now", skills: ["Strategy", "AI", "Roadmap"], availability: "Idea sprint" },
  { id: "tm6", name: "Otabek Karimov", handle: "@otabek", email: "otabek@upz.demo", role: "Member", focus: "Backend", status: "Away", workload: 61, tasks: 4, projects: 2, location: "Tashkent", lastActive: "24m", skills: ["API", "Storage", "Search"], availability: "Reviewing integrations" },
];

export const TEAM_ACTIVITY = [
  { id: "ta1", actor: "Sara Chen", actionKey: "sharedDesign", target: "Chat mobile polish", time: "4m" },
  { id: "ta2", actor: "Otabek Karimov", actionKey: "connectedSearch", target: "Global search demo", time: "18m" },
  { id: "ta3", actor: "Mira Johnson", actionKey: "createdBrief", target: "AI assistant launch ideas", time: "42m" },
  { id: "ta4", actor: "Alex Kim", actionKey: "approvedBuild", target: "Dark mode release", time: "1h" },
];

export const TEAM_RITUALS = [
  { id: "tr1", titleKey: "dailyStandup", time: "10:00", meta: "6 members" },
  { id: "tr2", titleKey: "designReview", time: "14:30", meta: "3 files" },
  { id: "tr3", titleKey: "launchSync", time: "17:00", meta: "UPZ v1" },
];

export const TEAM_PERMISSIONS = [
  { id: "invite", labelKey: "inviteMembers", enabled: true },
  { id: "projects", labelKey: "manageProjects", enabled: true },
  { id: "bank", labelKey: "viewBank", enabled: false },
  { id: "moderation", labelKey: "moderateCommunity", enabled: true },
];

export const PROJECT_COLUMNS = [
  { id: "todo", title: "To do", tasks: ["Set up project brief", "Invite beta testers", "Confirm payment copy", "Document first-version animation usage"] },
  { id: "doing", title: "In progress", tasks: ["Build community moderation UI", "Wire wallet history", "Draft AI assistant prompts", "Expand news category model"] },
  { id: "review", title: "Review", tasks: ["Chat mobile polish", "Workspace integration cards", "Team role permissions"] },
  { id: "done", title: "Done", tasks: ["MVP routes", "Onboarding", "Profile setup", "Light shell migration"] },
];

export const ACTIVITY_LOG = [
  "Sara moved Chat mobile polish to Review",
  "Alex assigned Wallet history to Luca",
  "James created deadline for Community beta",
  "Aisha commented on onboarding copy",
  "Mira added AI idea generator prompts",
  "Otabek connected project search data",
  "Luca approved Universal Bank transaction states",
];

export const GLOBAL_SEARCH_ITEMS = [
  { type: "User", title: "Alex Kim", detail: "Lead Developer" },
  { type: "Chat", title: "UPZ Core Team", detail: "5 members, 3 online" },
  { type: "Task", title: "Build community moderation UI", detail: "Project: UPZ Platform" },
  { type: "Project", title: "Landing Page Redesign", detail: "UPZ-142" },
  { type: "Article", title: "AI copilots are becoming project teammates", detail: "News" },
  { type: "Wallet", title: "Invoice #UPZ-142", detail: "Universal Bank" },
  { type: "Animation", title: "Original hero animation", detail: "First-version asset library" },
  { type: "Learning", title: "AI-powered productivity", detail: "64% complete" },
  { type: "Team", title: "UPZ Launch Squad", detail: "6 members" },
];

export const NOTIFICATIONS = [
  { id: "no1", category: "Project", title: "Deadline updated", body: "Community beta moved to Friday.", unread: true, time: "4m" },
  { id: "no2", category: "Chat", title: "New mention", body: "Sara mentioned you in UPZ Core Team.", unread: true, time: "18m" },
  { id: "no3", category: "Bank", title: "Payment received", body: "Client payment is available in Universal Bank.", unread: false, time: "2h" },
  { id: "no4", category: "News", title: "Saved article updated", body: "A related AI assistant article is trending.", unread: false, time: "1d" },
  { id: "no5", category: "Community", title: "Thread is hot", body: "AI assistant prompts reached 44 replies.", unread: true, time: "2d" },
  { id: "no6", category: "Workspace", title: "Integration ready", body: "Calendar card is ready for backend wiring.", unread: false, time: "3d" },
];

export const PUBLIC_LOTTIE_ANIMATIONS = [
  { id: "hero", title: "UPZ hero", url: "/animations/hero.json", area: "Landing", description: "Original first-version hero motion." },
  { id: "chat", title: "Chat flow", url: "/animations/chat.json", area: "Chat", description: "Original chat animation." },
  { id: "tasks", title: "Task manager", url: "/animations/tasks.json", area: "Tasks", description: "Original productivity task animation." },
  { id: "ai", title: "AI assistant", url: "/animations/ai.json", area: "AI", description: "Original AI learning animation." },
  { id: "ai2", title: "AI copilot", url: "/animations/ai2.json", area: "AI", description: "Original AI secondary animation." },
  { id: "learning", title: "Learning", url: "/animations/learning.json", area: "Learning", description: "Original learning animation." },
  { id: "freelance", title: "Freelance work", url: "/animations/freelance.json", area: "Freelance", description: "Original freelance animation." },
  { id: "rocket", title: "Launch", url: "/animations/rocket.json", area: "Startup", description: "Original rocket animation." },
];

export const ECOSYSTEM_MODULES = [
  { name: "Community", status: "Expanded", score: "92%", users: "28K", motion: "/animations/chat.json" },
  { name: "News", status: "Personalized", score: "86%", users: "11K", motion: "/animations/learning.json" },
  { name: "Universal Bank", status: "Wallet demo", score: "74%", users: "4.8K", motion: "/animations/freelance.json" },
  { name: "AI Assistant", status: "Copilot ready", score: "89%", users: "19K", motion: "/animations/ai2.json" },
  { name: "Projects", status: "Kanban ready", score: "81%", users: "9.4K", motion: "/animations/tasks.json" },
  { name: "Teams", status: "Role model", score: "77%", users: "6.2K", motion: "/animations/hero.json" },
];

export const PROFESSIONAL_COMMUNITIES = [
  { profession: "Frontend Engineers", groups: 42, channels: 18, mentors: 96, weeklyPosts: 1240 },
  { profession: "Product Designers", groups: 31, channels: 14, mentors: 61, weeklyPosts: 840 },
  { profession: "Teachers", groups: 24, channels: 9, mentors: 44, weeklyPosts: 520 },
  { profession: "Freelancers", groups: 38, channels: 16, mentors: 72, weeklyPosts: 1100 },
  { profession: "Content Creators", groups: 27, channels: 11, mentors: 53, weeklyPosts: 760 },
  { profession: "SMM Specialists", groups: 21, channels: 8, mentors: 39, weeklyPosts: 610 },
];

export const LEARNING_PATHS = [
  { id: "lp1", title: "AI-powered productivity", level: "Intermediate", modules: 8, progress: 64, animation: "/animations/ai.json" },
  { id: "lp2", title: "Freelance business system", level: "Advanced", modules: 10, progress: 42, animation: "/animations/freelance.json" },
  { id: "lp3", title: "Team project management", level: "Beginner", modules: 6, progress: 78, animation: "/animations/tasks.json" },
  { id: "lp4", title: "Community building", level: "Intermediate", modules: 7, progress: 55, animation: "/animations/chat.json" },
];

export const FEATURED_CREATORS = [
  { name: "Mira Johnson", role: "Product Designer", followers: "18.2K", contribution: "Design systems teardown", badge: "Mentor" },
  { name: "Otabek Karimov", role: "Frontend Engineer", followers: "12.7K", contribution: "React architecture guide", badge: "Top writer" },
  { name: "Aisha Patel", role: "Freelance Strategist", followers: "21.4K", contribution: "Client onboarding checklist", badge: "Verified" },
  { name: "Luca Rossi", role: "SMM Lead", followers: "9.8K", contribution: "Campaign analytics template", badge: "Creator" },
];

export const PAYMENT_METHODS = [
  { name: "Uzcard / Humo", region: "Uzbekistan", status: "Placeholder", fee: "1.2%" },
  { name: "Visa / Mastercard", region: "Global", status: "Ready UI", fee: "2.4%" },
  { name: "USDT wallet", region: "Crypto", status: "Demo", fee: "Network" },
  { name: "Bank transfer", region: "Local", status: "Planned", fee: "Fixed" },
];

export const AI_IDEAS = [
  { prompt: "Generate a micro-SaaS idea for designers", output: "Client feedback portal with AI summary and visual QA checklist." },
  { prompt: "Suggest tasks for UPZ launch", output: "Finalize onboarding, invite beta users, publish feature tour, monitor feedback." },
  { prompt: "Create a learning plan", output: "Three-week path: fundamentals, practice projects, portfolio proof." },
  { prompt: "Improve my freelance workflow", output: "Add proposal templates, invoice milestones, client check-ins, and delivery archive." },
];

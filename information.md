# Universal Productivity Zone (UPZ) - Project Information

Last updated: 2026-05-07
Last documented commit: ab22263
Repository: https://github.com/hackzirov-sketch/UPZ
Primary app: artifacts/upz-landing
Deployment target: Render Static Web Site

## 1. Project Summary

Universal Productivity Zone (UPZ) is a modern SaaS-style productivity ecosystem MVP. The project combines a public multilingual landing page with an internal productivity dashboard. The current app is frontend-only and uses mock data plus localStorage for demo state.

The product idea is to give users one clean workspace for:

- Personal productivity
- Chat and team communication
- Video meetings and calls
- Project and task management
- Community groups and channels
- Personalized news
- Universal Bank wallet placeholder
- AI assistant workflows
- Premium account advantages
- Workspace integrations
- Team management
- Profile and settings

Current product state:

- Frontend MVP demo is implemented.
- No backend is required for current features.
- Mock data is stored in source files.
- Local user, tasks, notes, integrations, and chat rooms use localStorage.
- UI is responsive for desktop, tablet, and mobile.
- Landing page and app support multiple languages.
- Premium account advantages are frontend-only and ready for future billing integration.

## 2. Design Direction

UPZ has two important design modes in the current codebase:

- Landing page: modern SaaS presentation with animated sections and public marketing content.
- Internal app: Modern Minimal Light as default, with dark mode support and polished dark surfaces where needed, especially chat call overlays and chat backgrounds.

Main design values:

- Clean Apple/Notion-like hierarchy
- Rounded 2xl/3xl cards
- Soft shadows
- Minimal borders
- Professional startup feel
- Familiar communication patterns inspired by Telegram Web and Google Meet, adapted to UPZ style
- Responsive mobile navigation
- Local MVP interactions that feel real without backend complexity

Primary design tokens:

```txt
Background:      #F7FAFC
Cards:           #FFFFFF
Border:          #E5E7EB
Text:            #111827
Secondary text:  #6B7280
Accent indigo:   #6366F1
Accent blue:     #3B82F6
Dark chat bg A:  #0B1120
Dark chat bg B:  #111827
```

Design system source:

```txt
artifacts/upz-landing/src/components/app/DesignSystem.tsx
artifacts/upz-landing/src/index.css
```

## 3. Tech Stack

Workspace:

- Package manager: pnpm
- Language: TypeScript
- Framework: React 19
- Build tool: Vite 7
- Routing: wouter
- Styling: Tailwind CSS 4
- Animation: framer-motion, Lottie
- Icons: lucide-react
- Charts: recharts
- UI primitives: Radix UI/shadcn-style components
- i18n: i18next, react-i18next, i18next-browser-languagedetector
- State persistence: localStorage
- Deployment: Render static web site

Important dependencies:

```txt
react
react-dom
vite
wouter
lucide-react
framer-motion
tailwindcss
@tailwindcss/vite
@tanstack/react-query
i18next
react-i18next
lottie-react
@lottiefiles/react-lottie-player
recharts
sonner
radix-ui packages
```

## 4. Root Project Tree

```txt
Asset-Manager/
|-- .agents/
|-- .git/
|-- .local/
|-- artifacts/
|   |-- upz-landing/
|   |   |-- public/
|   |   |-- src/
|   |   |-- components.json
|   |   |-- index.html
|   |   |-- package.json
|   |   |-- tsconfig.json
|   |   `-- vite.config.ts
|   |-- api-server/
|   `-- mockup-sandbox/
|-- attached_assets/
|-- lib/
|-- node_modules/
|-- scripts/
|-- .gitignore
|-- .npmrc
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- render.yaml
|-- replit.md
|-- tsconfig.base.json
`-- tsconfig.json
```

Generated/ignored folders that should not be manually edited:

```txt
node_modules/
artifacts/upz-landing/dist/
.git/
```

## 5. Main Frontend Tree

```txt
artifacts/upz-landing/
|-- public/
|   |-- favicon.svg
|   |-- opengraph.jpg
|   `-- animations/
|       |-- ai.json
|       |-- ai2.json
|       |-- chat.json
|       |-- freelance.json
|       |-- hero.json
|       |-- learning.json
|       |-- rocket.json
|       `-- tasks.json
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   |-- index.css
|   |-- components/
|   |   |-- ThemeToggle.tsx
|   |   |-- app/
|   |   |-- chat/
|   |   |-- landing/
|   |   `-- ui/
|   |-- data/
|   |   |-- ecosystemData.ts
|   |   `-- mockData.ts
|   |-- hooks/
|   |   |-- use-mobile.tsx
|   |   `-- use-toast.ts
|   |-- i18n/
|   |   |-- index.ts
|   |   `-- locales/
|   |       |-- ar.json
|   |       |-- en.json
|   |       |-- ru.json
|   |       |-- tr.json
|   |       `-- uz.json
|   |-- lib/
|   |   `-- utils.ts
|   |-- pages/
|   |-- types/
|   |   `-- index.ts
|   `-- utils/
|       |-- storage.ts
|       `-- theme.ts
|-- components.json
|-- index.html
|-- package.json
|-- tsconfig.json
`-- vite.config.ts
```

## 6. Route Tree

Routes are defined in:

```txt
artifacts/upz-landing/src/App.tsx
```

Current routes:

```txt
/
`-- LandingPage

/onboarding
`-- OnboardingPage

/app/home
`-- HomePage

/app/dashboard
`-- DashboardPage

/app/workspace
`-- WorkspacePage

/app/chat
`-- ChatPage

/app/meetings
`-- MeetingsPage

/app/premium
`-- PremiumPage

/app/projects
`-- ProjectsPage

/app/community
`-- CommunityPage

/app/news
`-- NewsPage

/app/bank
`-- BankPage

/app/assistant
`-- AssistantPage

/app/teams
`-- TeamsPage

/app/tasks
`-- TasksNotesPage

/app/profile
`-- ProfilePage

/app/settings
`-- SettingsPage

fallback
`-- NotFound
```

Protected app routes require:

```txt
storage.getUser()
storage.isOnboarded()
```

If the user is not onboarded, protected routes redirect to:

```txt
/onboarding
```

## 7. Page Inventory

All page files are in:

```txt
artifacts/upz-landing/src/pages/
```

Current page files:

```txt
AssistantPage.tsx
BankPage.tsx
ChatPage.tsx
CommunityPage.tsx
DashboardPage.tsx
HomePage.tsx
LandingPage.tsx
MeetingsPage.tsx
PremiumPage.tsx
NewsPage.tsx
not-found.tsx
OnboardingPage.tsx
ProfilePage.tsx
ProjectsPage.tsx
SettingsPage.tsx
TasksNotesPage.tsx
TeamsPage.tsx
WorkspacePage.tsx
```

### LandingPage

Public marketing website for UPZ.

Main sections:

- Header
- Hero
- Problem
- Solution
- Features
- For Whom
- How It Works
- Freelancer Ecosystem
- AI Assistant
- Final CTA
- Footer
- Language switcher
- Lottie animation blocks

Landing components are in:

```txt
artifacts/upz-landing/src/components/landing/
```

### OnboardingPage

Handles the frontend-only account entry and onboarding flow.

Current auth UI:

- Sign in / create account tabs
- Sign in with email or phone
- Password visibility toggle
- Registration requires full name, email, phone, username, password, confirm password, and terms checkbox
- Social provider demo buttons
- After account creation, user continues through profession, goal, and experience setup
- Sign in and social buttons create a local demo session without backend calls

User profile fields:

- name
- email
- phone
- username
- authProvider
- profession
- goal
- experience
- joinedAt

### HomePage

Personal command/home area.

Includes:

- Welcome card
- Goal summary
- Productivity metrics
- Quick actions
- Today's tasks
- Recent activity

### DashboardPage

Product command center.

Includes:

- High-level metrics
- Launch readiness
- Agenda
- Next actions
- Ecosystem health
- Weekly activity
- Productivity chart

### WorkspacePage

Advanced workspace demo.

Includes:

- Project/tool tabs
- Integration placeholders
- Custom layout cards
- Workspace module cards
- Drag/drop-ready conceptual layout

### ChatPage

Telegram-inspired chat experience adapted to UPZ.

Includes:

- Left chat sidebar
- Search chats
- Pinned chats
- All conversations
- Archived placeholder
- Main chat header
- Message bubbles
- Reply preview
- Edited label
- Message reactions
- Message options menu
- Emoji picker
- Message input
- File upload placeholder
- Voice/mic placeholder
- Chat search
- Pinned messages
- Local message sending
- Local reaction toggling
- Local editing/deleting/pinning
- 1-1 voice/video call overlay
- Group/team/project call overlay

Chat components:

```txt
artifacts/upz-landing/src/components/chat/
|-- ChatCallOverlay.tsx
|-- ChatHeader.tsx
|-- ChatListItem.tsx
|-- chatShared.tsx
|-- ChatSidebar.tsx
|-- MessageBubble.tsx
|-- MessageInput.tsx
|-- MessageOptionsMenu.tsx
`-- ReactionPicker.tsx
```

### MeetingsPage

Google Meet-inspired meeting section adapted to UPZ.

Includes:

- Live meeting room
- Participant video tiles
- Meeting code
- Copy link demo action
- Join by code
- Schedule meeting modal
- Call controls
- Upcoming calls
- Agenda cards
- Trust/security placeholder cards
- Local toast feedback

Main data:

```txt
MEETING_ROOMS
MEETING_PARTICIPANTS
```

### PremiumPage

Premium account benefits and pricing-style upgrade UI.

Includes:

- Premium hero and selected plan preview
- Free, Pro, and Team plan cards
- Premium benefit cards
- Plan comparison table
- Mock checkout CTA
- Local toast feedback
- Profile link into premium page
- Sidebar Pro badge

Main data:

```txt
PREMIUM_BENEFITS
PREMIUM_PLANS
PREMIUM_COMPARISON
```

### CommunityPage

Community system UI.

Includes:

- Public groups by profession
- Channels
- Threads/discussions
- Join/leave style actions
- Moderation UI placeholders
- Post/comment style discussion cards

Main data:

```txt
COMMUNITY_GROUPS
COMMUNITY_CHANNELS
COMMUNITY_THREADS
PROFESSIONAL_COMMUNITIES
FEATURED_CREATORS
```

### NewsPage

News system UI.

Includes:

- Personalized feed
- Profession-based categories
- Trending label
- Save/bookmark status
- Article preview/detail style cards

Main data:

```txt
NEWS_ARTICLES
```

### BankPage

Universal Bank wallet demo.

Includes:

- Wallet balance
- Transaction list
- Payment history
- Freelance earnings
- Crypto placeholders
- Local payment placeholders

Main data:

```txt
BANK_TRANSACTIONS
PAYMENT_METHODS
```

### AssistantPage

AI assistant demo.

Includes:

- AI chat-like interface
- Task suggestions
- Learning assistant ideas
- Project idea generator
- Floating assistant button in layout except pages where it would overlap

Main data:

```txt
AI_IDEAS
```

### TeamsPage

Team management UI.

Includes:

- Team dashboard
- Team members
- Roles
- Add member/create team placeholder
- Team chat linking concept

Main data:

```txt
TEAM_MEMBERS
```

### ProjectsPage

Project management UI.

Includes:

- Create project placeholder
- Kanban board
- Task assignment placeholders
- Deadlines
- Activity log

Main data:

```txt
PROJECT_COLUMNS
ACTIVITY_LOG
```

### TasksNotesPage

Personal tasks and notes.

Includes:

- Tasks
- Notes
- Priority
- LocalStorage persistence

Main data:

```txt
INITIAL_TASKS
INITIAL_NOTES
```

### ProfilePage

Local profile summary and editable profile-style UI.

### SettingsPage

Settings UI, theme/language/account style controls.

## 8. App Shell Components

App shell files:

```txt
artifacts/upz-landing/src/components/app/
|-- AppLayout.tsx
|-- DesignSystem.tsx
|-- Sidebar.tsx
|-- StatCard.tsx
`-- Topbar.tsx
```

### AppLayout

Main internal app wrapper.

Responsibilities:

- Sidebar layout
- Topbar layout
- Main content container
- Floating AI assistant button
- Page shell spacing
- Mobile sidebar behavior
- Dark mode shell integration

Important behavior:

- Floating assistant is hidden on chat, assistant, and meetings pages to avoid UI overlap.

### Sidebar

Main app navigation.

Navigation groups:

```txt
Core:
- Home
- Dashboard
- Workspace
- Chat
- Meetings

Work:
- Projects
- Teams
- Tasks & Notes
- AI Assistant

Growth:
- Community
- News
- Universal Bank

Account:
- Profile
- Settings
```

### Topbar

Top app header.

Includes:

- Page title
- Global search
- Notifications dropdown
- User avatar
- Theme toggle
- Language switcher
- Sidebar toggle on mobile

### DesignSystem

Reusable internal UI primitives.

Exports:

```txt
DESIGN_TOKENS
cn
PageShell
PageHeader
SurfaceCard
SectionTitle
MetricTile
Pill
ActionButton
SimpleTabs
EmptyState
LoadingSkeleton
ProgressBar
CommandCard
Toast
Modal
```

## 9. Chat System Details

Chat data source:

```txt
artifacts/upz-landing/src/data/mockData.ts
```

Chat local persistence:

```txt
upz_chat_rooms
```

Chat types:

```txt
1on1
group
team
project
```

Chat users:

```txt
MOCK_USERS
```

Mock chat rooms:

```txt
MOCK_CHAT_ROOMS
```

Chat interactions:

- Select chat room
- Search chat list
- Search inside current chat
- Send local message
- Reply to message
- Edit own message
- Delete message
- Forward message into composer
- Pin/unpin message
- Add/remove emoji reactions locally
- Clear history
- Delete chat locally
- Mute/unmute chat
- Pin/unpin chat room
- Open chat header menu
- Start voice call
- Start video call

Reactions supported:

```txt
👍
❤️
😂
🔥
👏
✅
```

Note: Reactions use Unicode emoji in source because the UI intentionally displays emoji.

### Chat call overlay

File:

```txt
artifacts/upz-landing/src/components/chat/ChatCallOverlay.tsx
```

Features:

- Telegram-like voice/video overlay
- 1-1 avatar stage
- Group participant grid
- Live timer
- Compact/minimized pill mode
- End call
- Mic toggle
- Speaker toggle
- Video toggle
- Screen share placeholder
- Back to chat/minimize
- Group participant states: speaking, online, muted, listening, camera off, joining

This is local UI only. It does not request camera/microphone permissions and does not connect to a video backend.

## 10. Meetings System Details

File:

```txt
artifacts/upz-landing/src/pages/MeetingsPage.tsx
```

Data source:

```txt
artifacts/upz-landing/src/data/ecosystemData.ts
```

Data exports:

```txt
MEETING_ROOMS
MEETING_PARTICIPANTS
```

Features:

- New meeting action
- Schedule modal
- Live meeting room stage
- Participant tiles
- Meeting room code
- Copy link placeholder
- Join by code
- Demo code action
- Upcoming calls list
- Trust layer cards
- Agenda cards
- Toast feedback

Meeting room mock examples:

```txt
UPZ Core Team Sync
Landing Page Design Review
Freelancer Client Call
```

## 11. Data Layer

There is no backend for the MVP frontend demo.

Primary data files:

```txt
artifacts/upz-landing/src/data/mockData.ts
artifacts/upz-landing/src/data/ecosystemData.ts
```

### mockData.ts exports

```txt
MOCK_USERS
MOCK_CHAT_ROOMS
INITIAL_TASKS
INITIAL_NOTES
WEEKLY_ACTIVITY
PROFESSION_LABELS
GOAL_LABELS
EXPERIENCE_LABELS
```

### ecosystemData.ts exports

```txt
COMMUNITY_GROUPS
COMMUNITY_CHANNELS
COMMUNITY_THREADS
NEWS_ARTICLES
BANK_TRANSACTIONS
TEAM_MEMBERS
MEETING_ROOMS
MEETING_PARTICIPANTS
PROJECT_COLUMNS
ACTIVITY_LOG
GLOBAL_SEARCH_ITEMS
NOTIFICATIONS
PUBLIC_LOTTIE_ANIMATIONS
ECOSYSTEM_MODULES
PROFESSIONAL_COMMUNITIES
LEARNING_PATHS
FEATURED_CREATORS
PAYMENT_METHODS
PREMIUM_BENEFITS
PREMIUM_PLANS
PREMIUM_COMPARISON
AI_IDEAS
```

## 12. LocalStorage Keys

Storage helper:

```txt
artifacts/upz-landing/src/utils/storage.ts
```

Keys:

```txt
upz_user
upz_tasks
upz_notes
upz_integrations
upz_onboarded
upz_chat_rooms
```

Stored objects:

- User profile
- Onboarding status
- Tasks
- Notes
- Integration toggle states
- Chat room/message local state

Important reset behavior:

- Logout clears only onboarding status.
- Chat room local changes persist until localStorage is cleared.
- If chat localStorage is empty, the app reloads mock chat data.

## 13. Type System

Types are defined in:

```txt
artifacts/upz-landing/src/types/index.ts
```

Important types:

```txt
Profession
Goal
Experience
Priority
ChatType
UserStatus
ChatReactionEmoji
UserProfile
Task
Note
ChatUser
ChatMessage
ChatRoom
Integration
```

Chat room type values:

```txt
1on1
group
team
project
```

User status values:

```txt
online
offline
away
```

## 14. Internationalization

I18n source:

```txt
artifacts/upz-landing/src/i18n/index.ts
artifacts/upz-landing/src/i18n/locales/
```

Supported languages:

```txt
en - English - ltr
uz - O'zbek - ltr
ru - Russian - ltr
ar - Arabic - rtl
tr - Turkish - ltr
```

Locale files:

```txt
ar.json
en.json
ru.json
tr.json
uz.json
```

Language detection:

```txt
localStorage
navigator
```

Fallback language:

```txt
en
```

Direction handling:

- `applyDir(lang)` sets `document.documentElement.dir`.
- Arabic uses RTL.
- Other supported languages use LTR.

Important: When new internal app text is added, add keys to all locale files so landing language selection stays consistent inside the app.

## 15. Styling and Theme

Global CSS:

```txt
artifacts/upz-landing/src/index.css
```

Theme helper:

```txt
artifacts/upz-landing/src/utils/theme.ts
```

Theme toggle component:

```txt
artifacts/upz-landing/src/components/ThemeToggle.tsx
```

Current UI style:

- Light mode is primary for the internal app.
- Dark mode is supported.
- Chat message area has custom CSS variables for light/dark backgrounds.
- Global thin scrollbars are styled.
- Motion is mostly done via framer-motion and original Lottie animation assets.

Chat background CSS variables:

```txt
--upz-chat-bg-a
--upz-chat-bg-b
--upz-chat-glow-a
--upz-chat-glow-b
```

## 16. Landing Components Tree

```txt
components/landing/
|-- AIAssistantSection.tsx
|-- FeaturesSection.tsx
|-- FinalCTASection.tsx
|-- Footer.tsx
|-- ForWhomSection.tsx
|-- FreelancerEcosystemSection.tsx
|-- Header.tsx
|-- HeroSection.tsx
|-- HowItWorksSection.tsx
|-- LanguageSwitcher.tsx
|-- LottieAnimation.tsx
|-- ProblemSection.tsx
`-- SolutionSection.tsx
```

Landing assets:

```txt
public/animations/ai.json
public/animations/ai2.json
public/animations/chat.json
public/animations/freelance.json
public/animations/hero.json
public/animations/learning.json
public/animations/rocket.json
public/animations/tasks.json
```

## 17. UI Primitives Tree

UI primitive components are in:

```txt
artifacts/upz-landing/src/components/ui/
```

Current primitives include:

```txt
accordion
alert-dialog
alert
aspect-ratio
avatar
badge
breadcrumb
button-group
button
calendar
card
carousel
chart
checkbox
collapsible
command
context-menu
dialog
drawer
dropdown-menu
empty
field
form
hover-card
input-group
input
input-otp
item
kbd
label
menubar
navigation-menu
pagination
popover
progress
radio-group
resizable
scroll-area
select
separator
sheet
sidebar
skeleton
slider
sonner
spinner
switch
table
tabs
textarea
toast
toaster
toggle-group
toggle
tooltip
```

## 18. Build and Run Commands

Run from repo root:

```bash
corepack pnpm --filter @workspace/upz-landing run typecheck
```

Build from repo root:

```bash
$env:BASE_PATH='/'; $env:PORT='5173'; corepack pnpm --filter @workspace/upz-landing build
```

Dev server from repo root:

```bash
$env:BASE_PATH='/'; $env:PORT='5173'; corepack pnpm --filter @workspace/upz-landing dev
```

Preview build:

```bash
$env:BASE_PATH='/'; $env:PORT='5173'; corepack pnpm --filter @workspace/upz-landing serve
```

Full workspace checks:

```bash
corepack pnpm run typecheck
corepack pnpm run build
```

Important Vite config requirement:

```txt
PORT must be set.
BASE_PATH must be set.
```

## 19. Render Deployment

Render config:

```txt
render.yaml
```

Service type:

```txt
static web site
```

Build command:

```bash
corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/upz-landing run build
```

Publish path:

```txt
./artifacts/upz-landing/dist/public
```

Environment variables:

```txt
NODE_VERSION=22
BASE_PATH=/
```

SPA rewrite:

```txt
source: /*
destination: /index.html
```

## 20. Git Workflow

Current main branch:

```txt
main
```

Remote:

```txt
origin https://github.com/hackzirov-sketch/UPZ.git
```

Last documented pushed commit:

```txt
ab22263 Add meetings and chat call UI
```

Recommended workflow:

```bash
git status -sb
git add <changed-files>
git commit -m "Clear commit message"
git push origin main
```

Avoid unless explicitly needed:

```bash
git push --force
git reset --hard
git checkout -- <file>
```

## 21. Current Completed Feature List

Landing:

- Multilingual landing page
- Hero section
- Problem/solution sections
- Feature sections
- Audience/for whom section
- AI assistant promotion
- Freelancer ecosystem section
- Original/public Lottie animations
- Final CTA
- Footer

Internal app:

- Protected app shell
- Onboarding
- Dashboard
- Home
- Workspace
- Chat
- Meetings
- Community
- News
- Universal Bank
- AI Assistant
- Teams
- Projects
- Tasks and notes
- Profile
- Settings
- Theme toggle
- Language switcher
- Global search
- Notifications center
- Responsive sidebar/topbar

Chat:

- Telegram-like chat layout
- 1-1, group, team, project chat types
- Message bubbles
- Reply/edit/delete/forward/pin
- Reactions
- Message input
- File/emoji/voice placeholders
- Pinned messages
- Chat search
- LocalStorage persistence
- Voice/video call overlay

Meetings:

- Google Meet-like meeting room UI
- Video tiles
- Join by code
- Schedule modal
- Participant states
- Agenda
- Trust layer
- Local demo controls

Premium:

- Free, Pro, and Team plan cards
- Premium benefits and upgrade CTAs
- Plan comparison table
- Mock checkout preview
- Sidebar Pro badge
- Profile premium status card

## 22. Known MVP Limitations

This project is intentionally a frontend MVP demo. Current limitations:

- No real backend API
- No real auth server
- No database
- No real file upload
- No real video/audio connection
- No real camera or mic permission flow
- No real payment processor
- No real crypto integration
- No real AI model integration
- No real notifications service
- No real team invite email
- No real calendar integration
- Mock data is static and local
- Some language files may contain older encoding artifacts from previous generated content; newly added Uzbek keys were cleaned with ASCII apostrophes where possible

## 23. Future Backend Integration Map

Suggested backend tables/entities:

```txt
users
profiles
workspaces
teams
team_members
projects
project_columns
project_tasks
notes
chat_rooms
chat_members
chat_messages
chat_reactions
pinned_messages
meetings
meeting_participants
notifications
wallets
transactions
articles
communities
community_posts
community_comments
ai_sessions
ai_messages
integrations
```

Suggested APIs:

```txt
POST /auth/signup
POST /auth/login
GET /me
PATCH /me
GET /dashboard
GET /workspace
GET /chat/rooms
GET /chat/rooms/:id/messages
POST /chat/rooms/:id/messages
PATCH /chat/messages/:id
DELETE /chat/messages/:id
POST /chat/messages/:id/reactions
POST /meetings
GET /meetings
POST /meetings/:id/join
GET /projects
POST /projects
PATCH /tasks/:id
GET /notifications
POST /notifications/read-all
GET /wallet
GET /transactions
POST /ai/chat
GET /news
GET /community/groups
```

Suggested realtime layer:

```txt
WebSocket or Supabase Realtime for chat, typing, notifications, and meeting presence.
WebRTC or third-party SDK for actual video/audio calls.
```

## 24. Suggested Next Improvements

High priority:

- Clean remaining encoding artifacts in non-Uzbek locale files if they appear in UI.
- Split large bundle with route-level lazy loading.
- Add backend-ready service layer instead of importing mock data directly.
- Add real auth and session handling.
- Add data schema planning before backend implementation.

Medium priority:

- Add dark mode polish across every internal page.
- Add responsive QA screenshots for mobile/tablet.
- Improve settings page with notification/theme/language sections.
- Add empty/loading/error states for every future API surface.
- Add modal confirmations for destructive chat actions.

Later:

- Real AI integration.
- Real calendar and meeting provider integration.
- Real wallet/payment providers.
- Public community profiles.
- Admin/moderation dashboard.
- Analytics dashboard.

## 25. File Ownership Guide

Use this map when editing features:

```txt
Landing page edits:
artifacts/upz-landing/src/pages/LandingPage.tsx
artifacts/upz-landing/src/components/landing/

App shell edits:
artifacts/upz-landing/src/components/app/AppLayout.tsx
artifacts/upz-landing/src/components/app/Sidebar.tsx
artifacts/upz-landing/src/components/app/Topbar.tsx

Design system edits:
artifacts/upz-landing/src/components/app/DesignSystem.tsx
artifacts/upz-landing/src/index.css

Chat edits:
artifacts/upz-landing/src/pages/ChatPage.tsx
artifacts/upz-landing/src/components/chat/
artifacts/upz-landing/src/data/mockData.ts

Meetings edits:
artifacts/upz-landing/src/pages/MeetingsPage.tsx
artifacts/upz-landing/src/data/ecosystemData.ts

Premium edits:
artifacts/upz-landing/src/pages/PremiumPage.tsx
artifacts/upz-landing/src/data/ecosystemData.ts

Mock ecosystem data:
artifacts/upz-landing/src/data/ecosystemData.ts

Types:
artifacts/upz-landing/src/types/index.ts

Storage:
artifacts/upz-landing/src/utils/storage.ts

Translations:
artifacts/upz-landing/src/i18n/locales/*.json

Routing:
artifacts/upz-landing/src/App.tsx

Build/deploy:
artifacts/upz-landing/vite.config.ts
render.yaml
```

## 26. Quick QA Checklist

Before pushing changes:

```bash
corepack pnpm --filter @workspace/upz-landing run typecheck
$env:BASE_PATH='/'; $env:PORT='5173'; corepack pnpm --filter @workspace/upz-landing build
```

Manual browser checks:

```txt
/ loads landing page
/onboarding saves local user
/app/home redirects correctly after onboarding
/app/chat opens chat layout
/app/chat voice/video call opens and closes
/app/meetings opens meeting UI
/app/premium opens premium plans and mock checkout
Language switcher changes landing and internal app text
Theme toggle does not break layout
Mobile width shows sidebar/chat navigation correctly
Global search opens from topbar
Notifications dropdown opens from topbar
```

## 27. Important Notes for Contributors

- Extend the current design system instead of redesigning from scratch.
- Keep the MVP frontend simple; do not add backend logic until planned.
- Use mock data only for demo features unless backend work is explicitly started.
- Keep translations updated in every locale file.
- Keep UI responsive by default.
- Avoid copying any external product branding, logo, or exact assets.
- Telegram/Google Meet influence should stay at layout/usability level only.
- Prefer reusable components in `components/app` or feature folders.
- Do not break existing route structure.
- Do not remove localStorage behavior unless replacing it with a planned data layer.

## 28. Short Product Pitch

UPZ is an all-in-one productivity ecosystem where users can work, learn, communicate, manage projects, follow industry news, handle earning/payment placeholders, and get AI guidance inside one clean workspace.

The current MVP already demonstrates the full product direction visually and interactively, while staying lightweight enough for future backend integration.

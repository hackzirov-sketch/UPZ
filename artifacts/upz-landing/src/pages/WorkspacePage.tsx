import { motion } from "framer-motion";
import {
  Code2, GitBranch, Terminal, Globe, Palette, Image, FolderOpen,
  MessageSquare, BookOpen, Calendar, Users, Instagram, Youtube,
  BarChart3, Megaphone, Briefcase, DollarSign, FileText, GraduationCap,
  ExternalLink, TrendingUp,
} from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile } from "@/types";
import { PROFESSION_LABELS } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

interface WorkspaceCard {
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  accent: string;
}

function getCards(profession: string): WorkspaceCard[] {
  switch (profession) {
    case 'developer': return [
      { title: 'GitHub Repos', desc: '3 active repositories — upz-frontend, api-server, mobile-app', icon: <GitBranch className="w-5 h-5" />, badge: '3 open PRs', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'Dev Task Board', desc: 'Sprint 1 in progress — 4 tasks remaining', icon: <Terminal className="w-5 h-5" />, badge: '4 tasks', badgeColor: '#3B82F6', accent: '#3B82F6' },
      { title: 'Code Projects', desc: 'UPZ Platform · API Server · Landing Page', icon: <Code2 className="w-5 h-5" />, badge: 'Active', badgeColor: '#10B981', accent: '#10B981' },
      { title: 'Live Deployments', desc: '2 environments · Dev & Staging', icon: <Globe className="w-5 h-5" />, badge: 'Online', badgeColor: '#10B981', accent: '#10B981' },
    ];
    case 'designer': return [
      { title: 'Portfolio Projects', desc: '5 case studies — Branding, UI, Motion', icon: <Palette className="w-5 h-5" />, badge: '5 projects', badgeColor: '#8B5CF6', accent: '#8B5CF6' },
      { title: 'Design Files', desc: 'Figma · Adobe XD · Sketch projects', icon: <Image className="w-5 h-5" />, badge: 'Figma sync', badgeColor: '#F59E0B', accent: '#F59E0B' },
      { title: 'Feedback Board', desc: 'Client feedback — 2 pending reviews', icon: <MessageSquare className="w-5 h-5" />, badge: '2 pending', badgeColor: '#EF4444', accent: '#EF4444' },
      { title: 'Asset Library', desc: '240 assets · icons, illustrations, fonts', icon: <FolderOpen className="w-5 h-5" />, badge: '240 assets', badgeColor: '#3B82F6', accent: '#3B82F6' },
    ];
    case 'teacher': return [
      { title: 'Class Tools', desc: 'Manage 3 active classes · 47 students total', icon: <GraduationCap className="w-5 h-5" />, badge: '3 classes', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'Student Progress', desc: 'Top performer: 92% avg — 5 need attention', icon: <TrendingUp className="w-5 h-5" />, badge: 'Week 4', badgeColor: '#10B981', accent: '#10B981' },
      { title: 'Lesson Notes', desc: '18 lesson plans — next: Thursday 10AM', icon: <FileText className="w-5 h-5" />, badge: 'Thursday', badgeColor: '#F59E0B', accent: '#F59E0B' },
      { title: 'Calendar', desc: 'Next class in 2 days · 4 events this week', icon: <Calendar className="w-5 h-5" />, badge: '4 events', badgeColor: '#3B82F6', accent: '#3B82F6' },
    ];
    case 'creator': return [
      { title: 'Instagram', desc: '4.2K followers · last post 2d ago', icon: <Instagram className="w-5 h-5" />, badge: '+120 this week', badgeColor: '#E91E8C', accent: '#E91E8C' },
      { title: 'YouTube', desc: '1.1K subscribers · 3 videos this month', icon: <Youtube className="w-5 h-5" />, badge: '1.1K subs', badgeColor: '#EF4444', accent: '#EF4444' },
      { title: 'Content Planning', desc: '6 posts scheduled this week', icon: <Calendar className="w-5 h-5" />, badge: '6 scheduled', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'Media Workflow', desc: 'Editing · Review · Publish pipeline', icon: <FolderOpen className="w-5 h-5" />, badge: '2 in review', badgeColor: '#F59E0B', accent: '#F59E0B' },
    ];
    case 'smm': return [
      { title: 'Campaign Planning', desc: '2 active campaigns · 3 upcoming', icon: <Megaphone className="w-5 h-5" />, badge: '2 active', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'SEO Overview', desc: 'Site score: 84/100 · 3 issues to fix', icon: <Globe className="w-5 h-5" />, badge: 'Score 84', badgeColor: '#10B981', accent: '#10B981' },
      { title: 'Social Analytics', desc: 'Total reach 24K this month · +18%', icon: <BarChart3 className="w-5 h-5" />, badge: '+18%', badgeColor: '#3B82F6', accent: '#3B82F6' },
      { title: 'Content Calendar', desc: '14 posts scheduled across platforms', icon: <Calendar className="w-5 h-5" />, badge: '14 posts', badgeColor: '#F59E0B', accent: '#F59E0B' },
    ];
    case 'freelancer': return [
      { title: 'Portfolio', desc: '8 case studies · 4 active client projects', icon: <Briefcase className="w-5 h-5" />, badge: '4 active', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'Client Projects', desc: 'Acme Corp · StartupX · TechBrand', icon: <Users className="w-5 h-5" />, badge: '3 clients', badgeColor: '#3B82F6', accent: '#3B82F6' },
      { title: 'Proposals', desc: '2 sent · 1 accepted · 1 pending', icon: <FileText className="w-5 h-5" />, badge: '2 pending', badgeColor: '#F59E0B', accent: '#F59E0B' },
      { title: 'Earnings', desc: 'This month: $3,200 · On track ↑', icon: <DollarSign className="w-5 h-5" />, badge: '$3,200', badgeColor: '#10B981', accent: '#10B981' },
    ];
    default: return [
      { title: 'Learning Path', desc: 'JavaScript · React · TypeScript · 3 modules left', icon: <BookOpen className="w-5 h-5" />, badge: '67% done', badgeColor: '#6366F1', accent: '#6366F1' },
      { title: 'Study Notes', desc: '24 notes created this month', icon: <FileText className="w-5 h-5" />, badge: '24 notes', badgeColor: '#3B82F6', accent: '#3B82F6' },
      { title: 'Courses', desc: '4 enrolled · 1 completed', icon: <GraduationCap className="w-5 h-5" />, badge: '1 done', badgeColor: '#10B981', accent: '#10B981' },
      { title: 'Calendar', desc: 'Study sessions: Mon, Wed, Fri 7PM', icon: <Calendar className="w-5 h-5" />, badge: 'Next: Mon', badgeColor: '#F59E0B', accent: '#F59E0B' },
    ];
  }
}

export default function WorkspacePage({ user, onLogout }: Props) {
  const cards = getCards(user.profession);

  return (
    <AppLayout user={user} title="Workspace" onLogout={onLogout}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-white">
              {PROFESSION_LABELS[user.profession]} Workspace
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Personalized tools for your workflow</p>
          </div>
          <span
            className="text-xs px-3 py-1.5 rounded-full font-medium"
            style={{ background: "rgba(99,102,241,0.15)", color: "#A5B4FC" }}
          >
            {PROFESSION_LABELS[user.profession]}
          </span>
        </motion.div>

        {/* Workspace Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl p-5 cursor-pointer group"
              style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${card.accent}22`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <div className="flex items-center gap-2">
                  {card.badge && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${card.badgeColor}22`, color: card.badgeColor }}
                    >
                      {card.badge}
                    </span>
                  )}
                  <ExternalLink
                    className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-400 transition-colors"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Integrations teaser */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl p-5 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div>
            <h3 className="font-semibold text-white mb-1">Connect your tools</h3>
            <p className="text-sm text-gray-400">Link GitHub, Google Drive, Calendar and more in Settings.</p>
          </div>
          <a href="/app/settings" className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
            Go to Settings →
          </a>
        </motion.div>
      </div>
    </AppLayout>
  );
}

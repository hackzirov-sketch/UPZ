import { motion } from "framer-motion";
import { Edit3, Award, Target, BookOpen, Briefcase, Star, GitBranch, Code2 } from "lucide-react";
import { AppLayout } from "@/components/app/AppLayout";
import type { UserProfile } from "@/types";
import { PROFESSION_LABELS, GOAL_LABELS, EXPERIENCE_LABELS } from "@/data/mockData";

interface Props { user: UserProfile; onLogout: () => void; }

const SKILLS_BY_PROFESSION: Record<string, string[]> = {
  developer: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'REST APIs'],
  designer: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'Adobe XD', 'Motion Design'],
  teacher: ['Curriculum Design', 'E-Learning', 'Mentoring', 'Public Speaking', 'LMS Tools'],
  student: ['Research', 'Note-taking', 'Time Management', 'Critical Thinking', 'Collaboration'],
  freelancer: ['Project Management', 'Client Communication', 'Proposals', 'Invoicing', 'Portfolio'],
  smm: ['Content Strategy', 'SEO', 'Analytics', 'Copywriting', 'Social Platforms', 'A/B Testing'],
  creator: ['Video Production', 'Editing', 'Scripting', 'Thumbnail Design', 'YouTube SEO', 'Instagram'],
};

const MOCK_CERTS = [
  { title: 'React Developer Certification', issuer: 'Meta', date: 'Jan 2024', color: '#61DAFB' },
  { title: 'TypeScript Professional', issuer: 'Microsoft', date: 'Mar 2024', color: '#3178C6' },
];

const MOCK_REPOS = [
  { name: 'upz-frontend', lang: 'TypeScript', stars: 4, updated: '2d ago', color: '#3178C6' },
  { name: 'api-server', lang: 'Node.js', stars: 2, updated: '5d ago', color: '#68A063' },
  { name: 'design-system', lang: 'CSS', stars: 1, updated: '1w ago', color: '#264DE4' },
];

export default function ProfilePage({ user, onLogout }: Props) {
  const daysSince = Math.floor((Date.now() - user.joinedAt) / 86400000);
  const skills = SKILLS_BY_PROFESSION[user.profession] ?? SKILLS_BY_PROFESSION['student'];

  return (
    <AppLayout user={user} title="Profile" onLogout={onLogout}>
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Profile header card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start gap-5 relative z-10">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366F1, #3B82F6)" }}
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-indigo-300 text-sm mt-0.5">{PROFESSION_LABELS[user.profession]}</p>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(99,102,241,0.2)", color: "#A5B4FC" }}>
                  <Target className="w-3 h-3 inline mr-1" />{GOAL_LABELS[user.goal]}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.15)", color: "#6EE7B7" }}>
                  <BookOpen className="w-3 h-3 inline mr-1" />{EXPERIENCE_LABELS[user.experience]}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "#9CA3AF" }}>
                  Joined {daysSince === 0 ? "today" : `${daysSince}d ago`}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t relative z-10" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {[
              { label: "Tasks Done", value: "24" },
              { label: "Projects", value: "4" },
              { label: "Streak", value: "7 🔥" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Goals & Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" /> About
            </h3>
            <div className="space-y-3">
              {[
                { label: "Profession", value: PROFESSION_LABELS[user.profession] },
                { label: "Main Goal", value: GOAL_LABELS[user.goal] },
                { label: "Experience", value: EXPERIENCE_LABELS[user.experience] },
                { label: "Member Since", value: new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{row.label}</span>
                  <span className="text-sm text-gray-200 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-5"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" /> Certificates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_CERTS.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cert.color}22` }}>
                  <Award className="w-5 h-5" style={{ color: cert.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{cert.title}</p>
                  <p className="text-xs text-gray-500">{cert.issuer} · {cert.date}</p>
                </div>
              </div>
            ))}
            <div
              className="flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer border-dashed"
              style={{ border: "1px dashed rgba(255,255,255,0.1)", color: "#6B7280" }}
            >
              <span className="text-xs">+ Add certificate</span>
            </div>
          </div>
        </motion.div>

        {/* GitHub repos (shown for developers) */}
        {user.profession === 'developer' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl p-5"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-gray-400" /> GitHub Repositories
            </h3>
            <div className="space-y-3">
              {MOCK_REPOS.map((repo) => (
                <div
                  key={repo.name}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-indigo-400">{repo.name}</p>
                      <p className="text-xs text-gray-600">Updated {repo.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: repo.color }} />
                      <span className="text-xs text-gray-500">{repo.lang}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Star className="w-3 h-3" />
                      <span className="text-xs">{repo.stars}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}

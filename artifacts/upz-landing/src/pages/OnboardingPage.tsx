import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GraduationCap, BookOpen, Briefcase, Palette, Megaphone, Video, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { storage } from "@/utils/storage";
import type { Profession, Goal, Experience } from "@/types";

const PROFESSIONS: { id: Profession; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'developer', label: 'Developer', icon: <Code2 className="w-5 h-5" />, desc: 'Build software & apps' },
  { id: 'teacher', label: 'Teacher', icon: <GraduationCap className="w-5 h-5" />, desc: 'Educate & mentor' },
  { id: 'student', label: 'Student', icon: <BookOpen className="w-5 h-5" />, desc: 'Learn & grow' },
  { id: 'freelancer', label: 'Freelancer', icon: <Briefcase className="w-5 h-5" />, desc: 'Work independently' },
  { id: 'designer', label: 'Designer', icon: <Palette className="w-5 h-5" />, desc: 'Create visual experiences' },
  { id: 'smm', label: 'SMM Specialist', icon: <Megaphone className="w-5 h-5" />, desc: 'Grow social presence' },
  { id: 'creator', label: 'Content Creator', icon: <Video className="w-5 h-5" />, desc: 'Create & publish content' },
];

const GOALS: { id: Goal; label: string; emoji: string }[] = [
  { id: 'learn', label: 'Learn new skills', emoji: '📚' },
  { id: 'find_work', label: 'Find work / clients', emoji: '💼' },
  { id: 'manage_team', label: 'Manage a team', emoji: '👥' },
  { id: 'build_portfolio', label: 'Build a portfolio', emoji: '🎨' },
  { id: 'freelance', label: 'Grow as freelancer', emoji: '🚀' },
];

const EXPERIENCES: { id: Experience; label: string; desc: string; color: string }[] = [
  { id: 'beginner', label: 'Beginner', desc: 'Just starting out', color: '#10B981' },
  { id: 'intermediate', label: 'Intermediate', desc: '1–3 years experience', color: '#3B82F6' },
  { id: 'advanced', label: 'Advanced', desc: '3+ years, seasoned pro', color: '#8B5CF6' },
];

export default function OnboardingPage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState<Profession | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);

  const steps = ['name', 'profession', 'goal', 'experience'];
  const currentStep = steps[step];

  const handleFinish = () => {
    if (!profession || !goal || !experience) return;
    storage.saveUser({
      name: name || 'User',
      profession,
      goal,
      experience,
      joinedAt: Date.now(),
    });
    storage.setOnboarded();
    navigate('/app/home');
  };

  const canNext =
    (currentStep === 'name' && name.trim().length > 0) ||
    (currentStep === 'profession' && profession !== null) ||
    (currentStep === 'goal' && goal !== null) ||
    (currentStep === 'experience' && experience !== null);

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#0B0F14" }}>
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Universal Productivity Zone</span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ background: i <= step ? "#6366F1" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Name */}
            {currentStep === 'name' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome! What's your name?</h2>
                <p className="text-gray-400 mb-8">We'll personalize your workspace for you.</p>
                <input
                  autoFocus
                  type="text"
                  placeholder="Your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && canNext && setStep(1)}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none text-base"
                  style={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            )}

            {/* Step 1: Profession */}
            {currentStep === 'profession' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What best describes you?</h2>
                <p className="text-gray-400 mb-6">We'll tailor your workspace to your field.</p>
                <div className="grid grid-cols-2 gap-3">
                  {PROFESSIONS.map((p) => (
                    <motion.button
                      key={p.id}
                      onClick={() => setProfession(p.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: profession === p.id ? "rgba(99,102,241,0.2)" : "#111827",
                        border: `1px solid ${profession === p.id ? "#6366F1" : "rgba(255,255,255,0.07)"}`,
                        color: profession === p.id ? "#A5B4FC" : "#9CA3AF",
                      }}
                    >
                      <div className="flex-shrink-0">{p.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-white">{p.label}</div>
                        <div className="text-xs opacity-60">{p.desc}</div>
                      </div>
                      {profession === p.id && <CheckCircle2 className="w-4 h-4 ml-auto text-indigo-400 flex-shrink-0" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Goal */}
            {currentStep === 'goal' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's your main goal?</h2>
                <p className="text-gray-400 mb-6">This helps us recommend the right tools.</p>
                <div className="flex flex-col gap-3">
                  {GOALS.map((g) => (
                    <motion.button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: goal === g.id ? "rgba(99,102,241,0.2)" : "#111827",
                        border: `1px solid ${goal === g.id ? "#6366F1" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className="font-medium text-white">{g.label}</span>
                      {goal === g.id && <CheckCircle2 className="w-4 h-4 ml-auto text-indigo-400 flex-shrink-0" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {currentStep === 'experience' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your experience level?</h2>
                <p className="text-gray-400 mb-6">No judgment — this helps us calibrate.</p>
                <div className="flex flex-col gap-3">
                  {EXPERIENCES.map((e) => (
                    <motion.button
                      key={e.id}
                      onClick={() => setExperience(e.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center gap-4 p-5 rounded-xl text-left transition-all"
                      style={{
                        background: experience === e.id ? "rgba(99,102,241,0.2)" : "#111827",
                        border: `1px solid ${experience === e.id ? "#6366F1" : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: e.color }} />
                      <div>
                        <div className="font-semibold text-white">{e.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{e.desc}</div>
                      </div>
                      {experience === e.id && <CheckCircle2 className="w-4 h-4 ml-auto text-indigo-400 flex-shrink-0" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
            disabled={step === 0}
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <motion.button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              whileHover={canNext ? { scale: 1.03 } : {}}
              whileTap={canNext ? { scale: 0.97 } : {}}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: canNext ? "#6366F1" : "rgba(99,102,241,0.3)",
                cursor: canNext ? "pointer" : "not-allowed",
              }}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleFinish}
              disabled={!canNext}
              whileHover={canNext ? { scale: 1.03 } : {}}
              whileTap={canNext ? { scale: 0.97 } : {}}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{
                background: canNext ? "#6366F1" : "rgba(99,102,241,0.3)",
                cursor: canNext ? "pointer" : "not-allowed",
              }}
            >
              Launch Workspace 🚀
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

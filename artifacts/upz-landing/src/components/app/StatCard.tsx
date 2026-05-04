import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent?: string;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp, accent = "#6366F1", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}22` }}>
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {trend && (
        <div className={`text-xs font-medium ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </motion.div>
  );
}

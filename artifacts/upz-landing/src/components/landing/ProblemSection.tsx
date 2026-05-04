import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function ProblemSection() {
  const tools = [
    { name: "Learning", color: "bg-red-50 text-red-700 border-red-200" },
    { name: "Job Search", color: "bg-orange-50 text-orange-700 border-orange-200" },
    { name: "Team Chat", color: "bg-green-50 text-green-700 border-green-200" },
    { name: "Project Mgmt", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { name: "File Sharing", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { name: "Freelancing", color: "bg-pink-50 text-pink-700 border-pink-200" },
    { name: "Payments", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "Productivity", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The fragmented tool problem</h2>
          <p className="text-xl text-muted-foreground mb-12">Professionals today juggle dozens of apps just to get work done.</p>
        </motion.div>

        <div className="relative py-10 mb-12">
          {/* Scattered tool pills */}
          <div className="flex flex-wrap justify-center gap-4 relative z-10 max-w-3xl mx-auto">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8, y: Math.random() * 40 - 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Badge variant="outline" className={`px-4 py-2 text-sm font-medium ${tool.color} shadow-sm`}>
                  {tool.name}
                </Badge>
              </motion.div>
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center -z-0">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
            One platform. All of it.
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

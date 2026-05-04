import { motion } from "framer-motion";
import { BookOpen, Target, FileStack, Users, Briefcase, DollarSign, ArrowRight, ArrowDown } from "lucide-react";

export function FreelancerEcosystemSection() {
  const steps = [
    { icon: BookOpen, label: "Learn" },
    { icon: Target, label: "Practice" },
    { icon: FileStack, label: "Build Portfolio" },
    { icon: Users, label: "Join Team" },
    { icon: Briefcase, label: "Real Projects" },
    { icon: DollarSign, label: "Earn" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Become a freelancer from zero
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              UPZ isn't just a freelance marketplace — it's the complete path from beginner to earning professional.
            </motion.p>
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div 
                  key={step.label}
                  className="flex flex-col items-center w-full md:w-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-border flex items-center justify-center text-indigo-600 mb-3 z-10 relative">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="font-semibold text-sm text-center">{step.label}</span>
                  
                  {/* Arrow for mobile (vertical) */}
                  {i < steps.length - 1 && (
                    <ArrowDown className="w-5 h-5 text-indigo-300 mt-4 md:hidden" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Connecting line for desktop (horizontal) */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-indigo-200 -z-0" />
            <div className="hidden md:flex absolute top-[1.4rem] left-0 right-0 justify-between px-16 z-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <ArrowRight key={i} className="w-5 h-5 text-indigo-300 translate-x-[20px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

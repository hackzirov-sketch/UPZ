import { motion } from "framer-motion";
import { 
  Layers, MessageSquare, BarChart3, CheckSquare, 
  BookOpen, Briefcase, Bot, Users, Wallet 
} from "lucide-react";

export function SolutionSection() {
  const modules = [
    { icon: Layers, name: "Personalized Workspace" },
    { icon: MessageSquare, name: "Chat" },
    { icon: BarChart3, name: "Dashboard" },
    { icon: CheckSquare, name: "Tasks & Notes" },
    { icon: BookOpen, name: "Learning" },
    { icon: Briefcase, name: "Freelancing" },
    { icon: Bot, name: "AI Assistant" },
    { icon: Users, name: "Communities" },
    { icon: Wallet, name: "Payments" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Everything you need, finally unified</h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              UPZ brings together all the essential tools for professional growth and daily work into a single, cohesive environment designed to eliminate friction.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((mod, i) => (
                <motion.div 
                  key={mod.name}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <mod.icon size={20} />
                  </div>
                  <span className="font-medium text-foreground">{mod.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 shadow-xl p-8 aspect-square md:aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              {/* Central hub illustration */}
              <div className="relative w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center z-10 border-4 border-indigo-50">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-md mb-2">
                    U
                  </div>
                  <span className="font-bold text-foreground">UPZ Core</span>
                </div>
                
                {/* Orbiting nodes */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * 60) * (Math.PI / 180);
                  const radius = 140;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div 
                      key={i}
                      className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-border"
                      style={{ x, y }}
                      animate={{ 
                        y: [y - 5, y + 5, y - 5],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "easeInOut" 
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

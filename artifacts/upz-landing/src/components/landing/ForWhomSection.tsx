import { motion } from "framer-motion";
import { Code, GraduationCap, UserCircle, Briefcase, Video, Megaphone, PenTool, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ForWhomSection() {
  const personas = [
    {
      role: "Developers",
      icon: Code,
      tags: ["GitHub integration", "AI coding help", "Project dashboard"]
    },
    {
      role: "Teachers",
      icon: GraduationCap,
      tags: ["Course management", "Student progress", "Class tools"]
    },
    {
      role: "Students",
      icon: UserCircle,
      tags: ["Learning path", "Notes", "Tasks"]
    },
    {
      role: "Freelancers",
      icon: Briefcase,
      tags: ["Portfolio", "Client communication", "Income tools"]
    },
    {
      role: "Content Creators",
      icon: Video,
      tags: ["Media workflow", "Content planning", "Social integrations"]
    },
    {
      role: "SMM Specialists",
      icon: Megaphone,
      tags: ["Campaign planning", "Analytics", "Social tools"]
    },
    {
      role: "Designers",
      icon: PenTool,
      tags: ["Project files", "Feedback", "Team collaboration"]
    },
    {
      role: "Teams & Companies",
      icon: Users,
      tags: ["Team control", "Project management", "Stats"]
    }
  ];

  return (
    <section id="for-whom" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built for every professional
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Whatever you do, UPZ adapts to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.role}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full bg-card hover:border-indigo-200 transition-colors shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <persona.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{persona.role}</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {persona.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

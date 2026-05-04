import { motion } from "framer-motion";
import { Layers, MessageSquare, BarChart3, Share2, Wallet, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottieAnimation } from "./LottieAnimation";

export function FeaturesSection() {
  const features = [
    {
      title: "Personalized Workspace",
      description: "A tailored environment that adapts to your specific role, whether you're a developer, designer, or creator.",
      icon: <Layers className="w-8 h-8 text-indigo-500" />,
      type: "icon"
    },
    {
      title: "Chat System",
      description: "Built-in communication tools for teams and clients, eliminating the need for external messaging apps.",
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      type: "icon"
    },
    {
      title: "Dashboard",
      description: "Real-time analytics and overview of all your ongoing projects, tasks, and financial metrics.",
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
      type: "icon"
    },
    {
      title: "Tasks & Notes",
      description: "Powerful project management connected directly to your knowledge base.",
      url: "https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json",
      type: "animation"
    },
    {
      title: "Learning System",
      description: "Integrated courses and skill-building paths tailored to your career goals.",
      url: "https://assets7.lottiefiles.com/packages/lf20_v4jerjlb.json",
      type: "animation"
    },
    {
      title: "Freelance & Hiring",
      description: "Find jobs, hire talent, and manage contracts all within the same platform.",
      url: "https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json",
      type: "animation"
    },
    {
      title: "Content & Social Tools",
      description: "Plan, schedule, and manage your content strategy across multiple channels.",
      icon: <Share2 className="w-8 h-8 text-blue-500" />,
      type: "icon"
    },
    {
      title: "Universal Bank",
      description: "Manage invoices, payments, and financial tracking natively without external gateways.",
      icon: <Wallet className="w-8 h-8 text-indigo-500" />,
      type: "icon"
    },
    {
      title: "AI Assistant",
      description: "Context-aware AI that helps draft messages, plan projects, and summarize information.",
      icon: <Bot className="w-8 h-8 text-blue-500" />,
      type: "icon"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powerful features for every professional
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to work, learn, and grow, beautifully integrated.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-card border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                    {feature.type === "icon" ? (
                      feature.icon
                    ) : (
                      <LottieAnimation 
                        url={feature.url!} 
                        fallback={<Layers className="w-8 h-8 text-indigo-500" />}
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

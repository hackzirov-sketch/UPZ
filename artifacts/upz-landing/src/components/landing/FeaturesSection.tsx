import { motion } from "framer-motion";
import { Layers, BarChart3, Share2, Wallet, Bot, MessageSquare, BookOpen, Users, CheckSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottieAnimation } from "./LottieAnimation";
import { useTranslation } from "react-i18next";

type FeatureVisual =
  | { kind: "icon"; el: React.ReactNode }
  | { kind: "lottie"; url: string; fallbackIcon: React.ReactNode };

const FEATURE_VISUALS: FeatureVisual[] = [
  { kind: "icon", el: <Layers className="w-8 h-8 text-indigo-500" /> },
  { kind: "lottie", url: "/animations/chat.json", fallbackIcon: <MessageSquare className="w-8 h-8 text-blue-500" /> },
  { kind: "icon", el: <BarChart3 className="w-8 h-8 text-indigo-500" /> },
  { kind: "lottie", url: "/animations/tasks.json", fallbackIcon: <CheckSquare className="w-8 h-8 text-indigo-500" /> },
  { kind: "lottie", url: "/animations/learning.json", fallbackIcon: <BookOpen className="w-8 h-8 text-blue-500" /> },
  { kind: "lottie", url: "/animations/freelance.json", fallbackIcon: <Users className="w-8 h-8 text-indigo-500" /> },
  { kind: "icon", el: <Share2 className="w-8 h-8 text-blue-500" /> },
  { kind: "icon", el: <Wallet className="w-8 h-8 text-indigo-500" /> },
  { kind: "lottie", url: "/animations/ai.json", fallbackIcon: <Bot className="w-8 h-8 text-blue-500" /> },
];

export function FeaturesSection() {
  const { t } = useTranslation();
  const items = t("features.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

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
            {t("features.title")}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, i) => {
            const visual = FEATURE_VISUALS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full bg-card border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <CardHeader className="pb-2">
                    {/* Visual: icon or large lottie animation */}
                    {visual?.kind === "lottie" ? (
                      <div className="w-full h-36 mb-3 overflow-hidden rounded-lg bg-indigo-50/40">
                        <LottieAnimation
                          url={visual.url}
                          fallback={
                            <div className="w-full h-full flex items-center justify-center">
                              {visual.fallbackIcon}
                            </div>
                          }
                          className="w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                        {visual?.el}
                      </div>
                    )}
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

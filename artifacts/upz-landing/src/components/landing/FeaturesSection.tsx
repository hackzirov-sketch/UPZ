import { motion } from "framer-motion";
import { Layers, MessageSquare, BarChart3, Share2, Wallet, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LottieAnimation } from "./LottieAnimation";
import { useTranslation } from "react-i18next";

const FEATURE_ICONS = [
  <Layers className="w-8 h-8 text-indigo-500" />,
  <MessageSquare className="w-8 h-8 text-blue-500" />,
  <BarChart3 className="w-8 h-8 text-indigo-500" />,
  null,
  null,
  null,
  <Share2 className="w-8 h-8 text-blue-500" />,
  <Wallet className="w-8 h-8 text-indigo-500" />,
  <Bot className="w-8 h-8 text-blue-500" />,
];

const FEATURE_ANIMATIONS = [
  null, null, null,
  "https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json",
  "https://assets7.lottiefiles.com/packages/lf20_v4jerjlb.json",
  "https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json",
  null, null, null,
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
          {items.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-card border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                    {FEATURE_ANIMATIONS[i] ? (
                      <LottieAnimation
                        url={FEATURE_ANIMATIONS[i]!}
                        fallback={<Layers className="w-8 h-8 text-indigo-500" />}
                        className="w-10 h-10"
                      />
                    ) : (
                      FEATURE_ICONS[i]
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

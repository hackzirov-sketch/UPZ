import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LottieAnimation } from "./LottieAnimation";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[400px] rounded-full bg-indigo-500/10 blur-3xl opacity-60" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[300px] rounded-full bg-blue-500/10 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <motion.div
            className="flex-1 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                {t("hero.badge")}
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
            >
              {t("hero.headline1")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
                {t("hero.headline2")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              {t("hero.subheadline")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/25 h-12 px-8 text-base" data-testid="button-hero-get-started">
                {t("hero.getStarted")}
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto group h-12 px-8 text-base font-medium" data-testid="button-hero-explore">
                {t("hero.exploreFeatures")}
                <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 w-full max-w-[560px] lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <LottieAnimation
              url="/animations/hero.json"
              className="w-full h-full max-w-[520px] mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

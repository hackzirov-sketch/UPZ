import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LottieAnimation } from "./LottieAnimation";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[400px] rounded-full bg-indigo-500/10 blur-3xl opacity-50" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[300px] rounded-full bg-blue-500/10 blur-3xl opacity-50" />
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
                All-in-One Productivity Platform
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extold text-foreground leading-tight tracking-tight mb-6 font-bold"
            >
              Work. Learn. Earn.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">All in one place.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              Universal Productivity Zone helps users learn skills, find jobs, manage teams, grow as freelancers, and work with AI-powered productivity tools in one personalized workspace.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/25 h-12 px-8 text-base">
                Get Started
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto group h-12 px-8 text-base font-medium">
                Explore Features
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-[600px] lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="aspect-square md:aspect-[4/3] lg:aspect-square relative flex items-center justify-center">
              <LottieAnimation 
                url="https://assets2.lottiefiles.com/packages/lf20_fcfjwiyb.json" 
                fallback={<LayoutDashboard className="w-32 h-32 text-indigo-200" />}
                className="w-full h-full max-w-[500px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

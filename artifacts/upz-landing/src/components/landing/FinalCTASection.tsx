import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Start building your future workspace today.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Join a platform designed for learning, working, collaboration, and professional growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-xl shadow-indigo-500/20 border-0 rounded-xl">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-2 rounded-xl">
              Log in
            </Button>
          </div>
          
          <div className="text-sm font-medium text-muted-foreground">
            Join <span className="text-indigo-600 font-bold">10,000+</span> professionals
          </div>
        </motion.div>
      </div>
    </section>
  );
}

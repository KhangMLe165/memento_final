import { motion } from "framer-motion";
import { CloudUpload, Feather, Sparkles, ArrowDown } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 md:px-16 bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-display italic text-foreground">Three gentle steps</h2>
        </motion.div>

        {/* Flow: Two inputs converge into one output */}
        <div className="flex flex-col items-center gap-0">
          {/* Top row: Materials + Context */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 w-full mb-2">
            {/* Step 1 — Materials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl border border-border bg-background p-8 md:p-10"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-full bg-accent flex items-center justify-center">
                  <CloudUpload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Your Materials
                  </p>
                  <h3 className="text-xl md:text-2xl font-display mb-3 text-foreground">Connect Your World With Us</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Link your photos, videos, voice recordings, and messages. That trip to Lisbon, that story you wish
                    your grandkids knew. Memento holds it all, and you stay in full control.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 — Context */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative rounded-2xl border border-border bg-background p-8 md:p-10"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-full bg-accent flex items-center justify-center">
                  <Feather className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Your Context
                  </p>
                  <h3 className="text-xl md:text-2xl font-display mb-3 text-foreground">Tell Us Who You Are</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Record your voice while seeing New York for the first time, say hello to your family, or connect
                    your journal. This is how we learn to represent you authentically, in your own words.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Converging flow lines */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center py-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 md:w-28 h-px bg-border" />
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ArrowDown className="w-4 h-4 text-primary" />
              </div>
              <div className="w-16 md:w-28 h-px bg-border" />
            </div>
          </motion.div>

          {/* Step 3 — AI Curation (the convergence) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-b from-background to-accent/30 p-8 md:p-10 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">AI Curation</p>
                <h3 className="text-xl md:text-2xl font-display mb-3 text-foreground">
                  We Help You Build Your Legacy Story
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
                  Our AI Curator weaves your materials and words into a story of your life, iteratively, until it's
                  right. You choose who receives it when the time comes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

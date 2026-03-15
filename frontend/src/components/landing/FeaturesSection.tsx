import { motion } from "framer-motion";
import {
  Camera,
  BookText,
  Instagram,
  Mic,
  Cloud,
  Notebook,
  ShieldCheck,
  UserCheck,
  Eye,
  KeyRound,
} from "lucide-react";

const sources = [
  {
    icon: Camera,
    label: "Google Photos",
    detail: "4,821 photos · 312 videos",
  },
  {
    icon: Instagram,
    label: "Instagram",
    detail: "287 posts · 14 reels",
  },
  {
    icon: Cloud,
    label: "iCloud",
    detail: "1,204 photos synced",
  },
  {
    icon: BookText,
    label: "Journals from London",
    detail: "3 years of entries",
  },
  {
    icon: Notebook,
    label: "College Writings",
    detail: "Essays, letters, reflections",
  },
  {
    icon: Mic,
    label: "Voice Recordings",
    detail: "Trip to Spain · Family stories",
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "You own everything",
    description:
      "Your data is never used to train AI models. It is never sold. Never shared. You can delete everything permanently, at any time.",
  },
  {
    icon: Eye,
    title: "AI reads your content only to serve you",
    description:
      "Our AI curator accesses your materials solely to build your memento — nothing else. It doesn't store interpretations, doesn't learn from your data, and its access ends the moment your memento is complete.",
  },
  {
    icon: KeyRound,
    title: "You control what gets included",
    description:
      "Nothing is added to your memento without your review. You see what the AI selected, and you have final say before anything is saved.",
  },
  {
    icon: UserCheck,
    title: "Human verification required",
    description:
      "Your memento is never released automatically. A verified next-of-kin and an independent third-party must both confirm before anything reaches your recipients.",
  },
];

const FeaturesSection = () => {
  return (
    <>
      {/* Connected Sources */}
      <section className="py-28 px-6 md:px-16 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Your Connected Sources
            </p>
            <h2 className="text-3xl md:text-4xl font-display italic text-foreground mb-3 max-w-xl">
              Everything that makes you, you.
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl">
              Connect the places where your life already lives. Memento brings it all together — gently, securely, and only with your permission.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map((source, i) => (
              <motion.div
                key={source.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all duration-400"
              >
                <div className="w-11 h-11 shrink-0 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <source.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-medium text-foreground truncate">
                    {source.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {source.detail}
                  </p>
                </div>
                <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-background" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Trust */}
      <section id="privacy" className="py-28 px-6 md:px-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Privacy & Trust
            </p>
            <h2 className="text-3xl md:text-5xl font-display italic text-foreground mb-4 max-w-2xl">
              Your memories. Your words. Your rules.
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl">
              You decide what's included, how it's presented, and who receives it. We're just here to make sure it gets there.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {trustFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-background p-8 md:p-10"
              >
                <div className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center mb-5">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;

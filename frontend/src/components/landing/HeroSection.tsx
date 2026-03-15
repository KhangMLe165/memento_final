import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Ethereal misty landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 md:px-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-display text-2xl italic tracking-wide text-foreground"
        >
          Memento
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground"
        >
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy & Trust</a>
          <a href="/start">
            <Button variant="hero" size="sm">Start Your Memento</Button>
          </a>
        </motion.div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          A Service For Your Legacy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display italic leading-[1.1] mb-8 text-foreground"
        >
          Preserve what
          <br />
          matters most
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Memento quietly gathers your photos, videos, messages, and memories —
          and when the time comes, brings them together into a place where your
          story lives on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center justify-center gap-6"
        >
        
          {/* Top row */}
          <div className="flex flex-row gap-4">
            <a href="#how-it-works">
              <Button variant="hero-outline" size="lg" className="text-base px-10 py-6">
                How It Works
              </Button>
            </a>
        
            <a href="#showcase">
              <Button variant="hero-outline" size="lg" className="text-base px-10 py-6">
                What is Memento?
              </Button>
            </a>
          </div>
        
          {/* Bottom CTA */}
          <a href="/start">
            <Button variant="hero" size="lg" className="text-base px-10 py-6">
              Start Your Memento
            </Button>
          </a>
        
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;

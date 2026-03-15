import { motion } from "framer-motion";
import { Play } from "lucide-react";
import portraitImg from "@/assets/memorial-portrait.jpg";
import familyHouseImg from "@/assets/memorial-family-house.jpg";
import familyGatheringImg from "@/assets/memorial-family-gathering.jpg";
import youngImg from "@/assets/memorial-young.jpg";
import weddingImg from "@/assets/memorial-wedding.jpg";
import videoImg from "@/assets/memorial-video.jpg";

const memories = [
  {
    src: youngImg,
    alt: "Young Thomas by his first car, 1963",
    caption: "Graduation day, 1963 — his first car and his whole life ahead",
    position: "object-top",
  },
  {
    src: weddingImg,
    alt: "Thomas and Margaret on their wedding day",
    caption: "June 14, 1966 — 'the luckiest day of my life'",
    position: "object-[center_65%]",
  },
  {
    src: familyHouseImg,
    alt: "The Pearson family outside their first home, 1972",
    caption: "Summer of '92 — Susie's first house, the kids still in sneakers",
    position: "object-center",
  },
  {
    src: familyGatheringImg,
    alt: "Thomas surrounded by family at a backyard gathering",
    caption: "Sunday dinner — the table he loved most was always outside",
    position: "object-center",
  },
];

const MemorialShowcase = () => {
  return (
    <section id="showcase" className="py-32 px-6 md:px-16 bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            YOUR STORY, PRESERVED
          </p>
          <h2 className="text-4xl md:text-5xl font-display italic text-foreground mb-2">
            This is what you leave behind
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Every photo, every voice, every word you chose to share, gathered into one place, just as you intended
          </p>
        </motion.div>

        {/* Memorial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-border/50 bg-background overflow-hidden shadow-xl"
        >
          {/* Portrait header */}
          <div className="flex flex-col items-center pt-16 pb-10 px-6 border-b border-border/30">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border/20 shadow-lg mb-8">
              <img src={portraitImg} alt="Thomas H. Peason" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl md:text-4xl font-display italic text-foreground mb-3">Thomas H. Pearson</h3>
            <p className="font-body text-sm text-muted-foreground tracking-wide mb-6">
              April 3, 1941 — February 12, 2024
            </p>
            <blockquote className="font-display italic text-foreground/80 text-lg md:text-xl max-w-lg text-center leading-relaxed">
              "He always said the best part of any meal was the people around the table. He meant it."
            </blockquote>
          </div>

          {/* Photo grid — 4 photos */}
          <div className="grid grid-cols-2 gap-px bg-border/30">
            {memories.map((memory, i) => (
              <motion.div
                key={memory.alt}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="relative group overflow-hidden"
              >
                <img
                  src={memory.src}
                  alt={memory.alt}
                  className={`w-full h-56 md:h-72 object-cover ${memory.position}`}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end">
                  <p className="font-body text-sm text-background/0 group-hover:text-background/90 transition-all duration-500 p-5">
                    {memory.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video message section */}
          <div className="border-t border-border/30">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-foreground/5">
                <img
                  src={videoImg}
                  alt="Thomas recording a video message for his family"
                  className="w-full h-80 md:h-[28rem] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/20 backdrop-blur-sm border-2 border-background/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-background ml-1" />
                  </div>
                  <p className="font-body text-xs uppercase tracking-[0.25em] text-background/80 mb-1">Video Message</p>
                  <p className="font-display italic text-background text-lg md:text-xl">"A message for my family"</p>
                  <p className="font-body text-xs text-background/60 mt-2">Recorded December 4, 2023 · 4:32</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* His words */}
          <div className="px-8 py-10 md:px-16 md:py-14">
            <div className="p-5 rounded-xl bg-card border border-border/30">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">His words</p>
              <p className="font-display italic text-foreground/70 text-base leading-relaxed">
                "I was never great with words, but I want you all to know: the life I had was the life I wanted. Every
                Sunday dinner, every fishing trip, every time one of you walked through that front door. That was it. I
                look forward to it every single time. And that was everything."
              </p>
            </div>

            <p className="font-body text-xs text-muted-foreground pt-6">
              4 photos · 1 video message · 1 life well lived
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemorialShowcase;

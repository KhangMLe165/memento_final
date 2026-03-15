import { motion } from "framer-motion";
import { Heart, Feather, Quote } from "lucide-react";

/** Strip leading markdown # from a line. */
function stripMarkdownHeaders(s: string): string {
  return s.replace(/^#+\s*/, "").trim();
}

/** Split tribute text into sections. */
function parseMemorySections(
  text: string
): Array<
  { type: "title"; content: string } | { type: "paragraph"; content: string }
> {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.map((block) => {
    const isSingleLine = !block.includes("\n");
    const isShort = block.length <= 100;
    const endsWithPeriod = block.endsWith(".");
    const looksLikeTitle = isSingleLine && isShort && !endsWithPeriod;
    return looksLikeTitle
      ? { type: "title" as const, content: stripMarkdownHeaders(block) }
      : { type: "paragraph" as const, content: block };
  });
}

interface MementoTributeProps {
  name: string;
  tribute: string;
  photoUrls: string[];
  onBack: () => void;
}

const MementoTribute = ({
  name,
  tribute,
  photoUrls,
  onBack,
}: MementoTributeProps) => {
  const sections = parseMemorySections(tribute);

  // Distribute photos between sections
  const photoInsertPoints: number[] = [];
  const titleIndices = sections
    .map((s, i) => (s.type === "title" ? i : -1))
    .filter((i) => i > 0);
  if (photoUrls.length > 0 && titleIndices.length > 0) {
    const step = Math.max(1, Math.floor(titleIndices.length / photoUrls.length));
    for (let i = 0; i < photoUrls.length && i * step < titleIndices.length; i++) {
      photoInsertPoints.push(titleIndices[i * step]);
    }
  }

  let photoCounter = 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center"
        >
          {/* Nav */}
          <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-6">
            <button
              onClick={onBack}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to editor
            </button>
            <span className="font-display text-lg italic text-foreground/60">
              Memento
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-16 bg-primary/30" />
            <Feather className="w-5 h-5 text-primary/50" />
            <div className="h-px w-16 bg-primary/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            1963–1992 
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-display text-5xl md:text-7xl italic font-medium text-foreground mb-6"
          >
            {name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/20" />
            <Heart className="w-4 h-4 text-primary/40" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* Photo hero strip */}
      {photoUrls.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="max-w-6xl mx-auto px-6 pb-16"
        >
          <div
            className={`grid gap-4 ${
              photoUrls.length === 1
                ? "grid-cols-1 max-w-2xl mx-auto"
                : photoUrls.length === 2
                ? "grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-3"
            }`}
          >
            {photoUrls.map((url, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 + i * 0.15 }}
                className="relative group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border/40 shadow-lg">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />
              </motion.figure>
            ))}
          </div>
        </motion.section>
      )}

      {/* Narrative */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="relative">
          {/* Decorative left line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent hidden md:block" />

          <div className="md:pl-12">
            {sections.map((part, i) => {
              const shouldInsertPhoto = photoInsertPoints.includes(i);
              const photoUrl =
                shouldInsertPhoto && photoCounter < photoUrls.length
                  ? photoUrls[photoCounter++]
                  : null;

              return (
                <div key={i}>
                  {/* Inline photo between sections */}
                  {photoUrl && (
                    <motion.figure
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8 }}
                      className="my-12 -mx-4 md:-mx-8"
                    >
                      <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border/30 shadow-md">
                        <img
                          src={photoUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.figure>
                  )}

                  {part.type === "title" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.6 }}
                      className="mt-16 first:mt-0 mb-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-primary/40" />
                        <Quote className="w-3.5 h-3.5 text-primary/30" />
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl italic font-medium text-foreground">
                        {part.content}
                      </h2>
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5 }}
                      className="font-body text-base md:text-lg text-muted-foreground leading-[1.85] tracking-wide mb-6 whitespace-pre-wrap"
                    >
                      {part.content}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/20" />
            <Feather className="w-5 h-5 text-primary/30" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
          <p className="font-display text-lg italic text-muted-foreground/70">
            Preserved with care by Memento
          </p>
          <p className="font-body text-xs text-muted-foreground/40 mt-2 uppercase tracking-[0.2em]">
            A digital legacy
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default MementoTribute;

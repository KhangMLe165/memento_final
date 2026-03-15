import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Image,
  Video,
  FileText,
  Mic,
  Package,
  StickyNote,
  ArrowRight,
  ArrowLeft,
  Upload,
  ShieldCheck,
} from "lucide-react";
import MementoTribute from "@/pages/MementoTribute";

const referenceId = `MEM-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).substring(4).toUpperCase()}`;

const uploadCategories = [
  { icon: Image, label: "Photos", description: "Family portraits, trips, everyday moments", accepted: "image/*" },
  { icon: Video, label: "Videos", description: "Home videos, clips, screen recordings", accepted: "video/*" },
  { icon: StickyNote, label: "Notes & Documents", description: "Letters, essays, journal entries", accepted: ".pdf,.doc,.docx,.txt" },
  { icon: FileText, label: "Writings", description: "Stories, poems, blog posts, reflections", accepted: ".pdf,.doc,.docx,.txt,.md" },
  { icon: Mic, label: "Voice & Audio", description: "Voice memos, recordings, interviews", accepted: "audio/*" },
  { icon: Package, label: "Physical Items Pickup", description: "Request a pickup for photo albums, letters, heirlooms", accepted: undefined },
];

const questions = [
  { id: "proudest", label: "What are you most proud of in your life?", placeholder: "It could be a moment, a relationship, a choice you made…" },
  { id: "remember", label: "How would you like to be remembered?", placeholder: "In your own words — there's no wrong answer here…" },
  { id: "message", label: "Is there something you've always wanted to say to someone?", placeholder: "A message, a thank you, an apology, a declaration…" },
  { id: "story", label: "What story do you wish more people knew about you?", placeholder: "The one that never made it to the dinner table…" },
];

const gentleNudges = [
  "Take your time — Memento is built to grow with you.",
  "Memories take time to gather. We're here whenever you're ready.",
  "There's no rush. Upload what feels right, when it feels right.",
  "You can always come back and add more later.",
];

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function fileToBase64(file: File): Promise<{ media_type: string; data: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve({ media_type: file.type || "image/jpeg", data: base64 });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const StartMemento = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tribute, setTribute] = useState<string | null>(null);
  const [attachedPhotoUrls, setAttachedPhotoUrls] = useState<string[]>([]);
  const attachedPhotoUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      attachedPhotoUrlsRef.current.forEach(URL.revokeObjectURL);
    };
  }, []);

  const handleFileUpload = (category: string, files: FileList | null) => {
    if (!files) return;
    setUploadedFiles((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), ...Array.from(files)],
    }));
  };

  const handleComplete = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const textParts = [
        `Name: ${name}`,
        ...questions.map((q) => `${q.label}\n${answers[q.id] || "(not provided)"}`),
      ];
      const userText = textParts.join("\n\n---\n\n");

      const content: Array<
        | { type: "text"; text: string }
        | { type: "image"; source: { type: "base64"; media_type: string; data: string } }
      > = [{ type: "text", text: userText }];

      const photoFiles = uploadedFiles["Photos"] || [];
      const imagesToSend = photoFiles.slice(0, 3);
      for (const file of imagesToSend) {
        if (!file.type.startsWith("image/")) continue;
        const { media_type, data } = await fileToBase64(file);
        content.push({ type: "image", source: { type: "base64", media_type, data } });
      }

      const systemPrompt = `You are a thoughtful memory curator. Your task is to transform the user's personal materials (written reflections and any photos they provided) into a single, warm, first-person narrative memory that could appear in a digital legacy archive.

Steps before writing:
1. Analyze any visual materials: setting, people, emotional tone, activity, time period.
2. Extract from the written context: names, relationships, dates, meaningful events, emotional significance.
3. Combine visuals and text into one coherent story.

Output format and style:
- Write in first person ("I") as the person whose memory this is.
- Structure the memory into clearly titled sections. Each section has a short evocative title on its own line (e.g. "Arrival at Cornell", "Memorable Orientation Week", "Facing My Fear of Water", "Growth and Reflection"), followed by multiple paragraphs of narrative. Do not use markdown—no #, ##, or ### in front of titles; use plain text only.
- Write several paragraphs per section. The overall piece should be substantial and detailed—like a reflective memoir entry.
- Tone: warm, reflective, grounded in specific details, natural and human. Avoid sounding like AI or a formal obituary. Focus on the moment and life, not death.
- Include specific details from the user's input (names, places, events). If context is limited, lean on visual details; do not invent unrealistic facts.
- End with a closing section that reflects on what the person learned or how they want to be remembered, still in first person.`;

      const res = await fetch(`${API_BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [{ content }],
          max_tokens: 4000,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(errBody || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      const tributeText = data?.content?.[0]?.text ?? "";
      setTribute(tributeText);

      const urls = imagesToSend.map((f) => URL.createObjectURL(f));
      setAttachedPhotoUrls((prev) => {
        prev.forEach(URL.revokeObjectURL);
        return urls;
      });
      attachedPhotoUrlsRef.current = urls;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nudge = gentleNudges[Math.floor(Math.random() * gentleNudges.length)];

  // Show the full tribute page when generated
  if (tribute) {
    return (
      <MementoTribute
        name={name}
        tribute={tribute}
        photoUrls={attachedPhotoUrls}
        onBack={() => {
          attachedPhotoUrlsRef.current.forEach(URL.revokeObjectURL);
          attachedPhotoUrlsRef.current = [];
          setAttachedPhotoUrls([]);
          setTribute(null);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16 border-b border-border/50">
        <a href="/" className="font-display text-2xl italic tracking-wide text-foreground">
          Memento
        </a>
        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Encrypted & Private</span>
        </div>
      </nav>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-3 mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground mb-8">Step {step} of 3</p>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-8">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-lg font-semibold text-foreground mb-1">
                    Thank you for choosing to open a Memento account with us.
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    We're honored to have spoken with you about preserving what matters most.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 mb-10">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Your Reference ID
                </p>
                <p className="font-display text-lg font-semibold text-foreground tracking-wide">{referenceId}</p>
                <p className="font-body text-xs text-muted-foreground mt-2">
                  This is your private identifier. Everything here is encrypted and visible only to you.
                </p>
              </div>

              <div className="space-y-3">
                <label className="font-display text-xl italic text-foreground">What's your name?</label>
                <p className="font-body text-sm text-muted-foreground">The name you'd like your memento to carry.</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="text-base py-6 bg-card border-border focus:border-primary"
                />
              </div>

              <div className="mt-10 flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  className="text-base px-8 py-6"
                  onClick={() => setStep(2)}
                  disabled={!name.trim()}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Upload */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <h2 className="font-display text-3xl md:text-4xl italic text-foreground mb-3">Upload your life</h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Photos, videos, notes, writings, voice recordings — anything that tells your story.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {uploadCategories.map((cat) => {
                  const fileCount = uploadedFiles[cat.label]?.length || 0;
                  return (
                    <label
                      key={cat.label}
                      className="group relative flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <cat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-medium text-foreground">{cat.label}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                        {fileCount > 0 && (
                          <p className="font-body text-xs text-primary mt-1.5">
                            {fileCount} file{fileCount > 1 ? "s" : ""} selected
                          </p>
                        )}
                      </div>
                      <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                      {cat.accepted && (
                        <input
                          type="file"
                          multiple
                          accept={cat.accepted}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(cat.label, e.target.files)}
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              <div className="rounded-xl bg-accent/50 border border-border/50 p-5 mb-10">
                <p className="font-body text-sm text-muted-foreground italic leading-relaxed">"{nudge}"</p>
              </div>

              <div className="flex justify-between">
                <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button variant="hero" size="lg" className="text-base px-8 py-6" onClick={() => setStep(3)}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Questions */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <h2 className="font-display text-3xl md:text-4xl italic text-foreground mb-3">Tell us who you are</h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-xl">
                  In your own words — so we can represent you authentically.
                </p>
              </div>

              <div className="space-y-8">
                {questions.map((q, i) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <label className="font-display text-base font-medium text-foreground">{q.label}</label>
                    <Textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={q.placeholder}
                      className="min-h-[120px] text-base bg-card border-border focus:border-primary resize-none"
                    />
                  </motion.div>
                ))}
              </div>

              {error && (
                <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 mt-6 text-sm text-destructive font-body">
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-12">
                <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" onClick={() => setStep(2)} disabled={isSubmitting}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="hero"
                  size="lg"
                  className="text-base px-8 py-6"
                  onClick={handleComplete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Curating your memory…" : "Complete Your Memento"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default StartMemento;

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialMaya from "@/assets/testimonial-maya.jpg";
import testimonialDaniel from "@/assets/testimonial-daniel.jpg";

const testimonials = [
  {
    text: "My kids were 4 and 6 when their grandfather passed. They won't remember him the way I do. He was my person and I wanted to share that so badly. Thanks to Memento, they'll know his laugh. They'll hear him tell the story of how he met their grandmother in his voice. They'll know who he was, the adventures he's taken, the deeply caring person he was, not just that he existed.",
    author: "Maya R.",
    location: "Portland",
    image: testimonialMaya,
    imageAlt: "A grandfather laughing with his two young grandchildren on a porch swing",
  },
  {
    text: "I was 8,000 miles away when my mother died. The guilt of not being there, I carried it for months. But she had prepared her Memento. The night I finally opened it, it felt like she had been waiting for me. Like she had saved one last conversation just for me and I couldn't be more thankful she did.",
    author: "Daniel K.",
    location: "London",
    image: testimonialDaniel,
    imageAlt: "A proud mother with her son at his graduation ceremony",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-32 px-6 md:px-16 bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm tracking-[0.25em] uppercase text-primary mb-4">
            In Their Words
          </p>
          <h2 className="text-3xl md:text-4xl font-display italic leading-tight">
            Stories that moved us
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: index * 0.15 }}
              className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Photo */}
              <div className={`shrink-0 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-foreground">
                  <img
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quote */}
              <div className={`flex-1 ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <Quote className={`w-10 h-10 text-primary/30 mb-6 mx-auto ${index % 2 === 1 ? "md:ml-auto md:mr-0" : "md:mx-0"}`} />
                <blockquote className={`font-body text-lg md:text-xl leading-relaxed text-primary-foreground/85 text-center ${index % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                  "{testimonial.text}"
                </blockquote>
                <p className={`mt-6 font-display italic text-primary text-center ${index % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                  — {testimonial.author},{" "}
                  <span className="text-primary-foreground/50 not-italic font-body text-sm">
                    {testimonial.location}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

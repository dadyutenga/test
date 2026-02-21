import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "James Mwangi",
    role: "Property Developer",
    text: "GreenScape transformed our commercial property into a stunning green oasis. Their attention to detail and sustainable approach exceeded all expectations.",
  },
  {
    name: "Amina Hassan",
    role: "Homeowner",
    text: "From the initial design to the final planting, the team was professional, creative, and a joy to work with. Our garden is now the highlight of the neighbourhood.",
  },
  {
    name: "David Kimaro",
    role: "Hotel Manager",
    text: "The landscape design for our resort was exceptional. Guests constantly compliment the beautiful outdoor spaces that GreenScape created for us.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-muted" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">{t("testimonials")}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t("whatClientsSay")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Quote className="mx-auto text-primary/20 mb-6" size={48} />
          <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8 italic">
            "{testimonials[current].text}"
          </p>
          <p className="font-display text-xl font-bold text-foreground">{testimonials[current].name}</p>
          <p className="text-sm text-primary font-body">{testimonials[current].role}</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-primary/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

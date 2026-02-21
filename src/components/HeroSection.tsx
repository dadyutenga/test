import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const slides = [heroBg, project1, project2];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={current}
          src={slides[current]}
          alt="GreenScape project"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-foreground/30" />

      <div className="relative z-10 text-center px-6 py-32 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/80 font-body text-sm tracking-[0.3em] uppercase mb-6"
        >
          {t("subtitle")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-[1.1] mb-10"
        >
          {t("tagline").split(",")[0]},
          <br />
          {t("tagline").split(",")[1]}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent font-body font-semibold px-10 py-4 text-sm tracking-wide text-primary-foreground rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("ourServices")} <ArrowRight size={18} />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-accent font-body font-semibold px-10 py-4 text-sm tracking-wide text-primary-foreground rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("viewProjects")}
          </a>
        </motion.div>

        {/* Stats bar - centered below buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-foreground/20 backdrop-blur-md rounded-2xl px-12 py-6 flex gap-12 md:gap-16 mt-12"
        >
          {[
            { number: "50+", label: t("projectsCompleted") },
            { number: "5+", label: t("yearsExperience") },
            { number: "100+", label: t("happyClients") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.number}</span>
              <p className="text-primary-foreground/80 font-body text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-primary-foreground w-8" : "bg-primary-foreground/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

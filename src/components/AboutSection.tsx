import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { number: "50+", label: t("projectsCompleted") },
    { number: "10+", label: t("yearsExperience") },
    { number: "30+", label: t("happyClients") },
  ];

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">{t("aboutUs")}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("whereArchMeetsNature")}
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              {t("aboutDesc1")}
            </p>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              {t("aboutDesc2")}
            </p>

            <div className="flex gap-12 mt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.number}</span>
                  <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-primary p-8">
              <p className="text-primary-foreground font-display text-2xl font-bold mb-3">{t("ourVision")}</p>
              <p className="text-primary-foreground/80 font-body text-sm leading-relaxed">
                {t("visionDesc")}
              </p>
            </div>
            <div className="bg-card border border-border p-8">
              <p className="text-foreground font-display text-2xl font-bold mb-3">{t("ourMission")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t("missionDesc")}
              </p>
            </div>
            <div className="bg-card border border-border p-8">
              <p className="text-foreground font-display text-2xl font-bold mb-3">{t("professionalExperience")}</p>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {t("professionalExperienceDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

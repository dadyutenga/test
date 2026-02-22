import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServices } from "@/hooks/use-services";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openService, setOpenService] = useState<number | null>(null);
  const { t } = useLanguage();
  const { data: services } = useServices();

  if (!services) return null;

  return (
    <section id="services" className="section-padding bg-muted" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">{t("whatWeDo")}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t("ourServicesTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 cursor-pointer">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{service.description}</p>
              <button
                onClick={() => setOpenService(index)}
                className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all"
              >
                {t("viewCategories")} <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openService !== null && services[openService] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={services[openService].image}
                  alt={services[openService].title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setOpenService(null)}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                >
                  <X size={20} className="text-foreground" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {services[openService].title}
                </h3>
                <p className="text-sm text-primary font-body font-semibold tracking-widest uppercase mb-6">{t("categories")}</p>
                <div className="space-y-4">
                  {services[openService].categories.map((cat, i) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-muted rounded-xl overflow-hidden"
                    >
                      <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-display text-lg font-bold text-foreground mb-1">{cat.name}</h4>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">{cat.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;

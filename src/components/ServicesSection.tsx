import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import servicePlanning from "@/assets/service-planning.jpg";
import serviceDesign from "@/assets/service-design.jpg";
import serviceConstruction from "@/assets/service-construction.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  name: string;
  description: string;
  image: string;
}

interface Service {
  titleKey: string;
  descKey: string;
  image: string;
  categories: Category[];
}

const services: Service[] = [
  {
    titleKey: "landscapePlanning",
    descKey: "landscapePlanningDesc",
    image: servicePlanning,
    categories: [
      { name: "Site Analysis & Master Planning", description: "Comprehensive assessment of terrain, soil, climate, and existing vegetation to create strategic development plans.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop" },
      { name: "Garden Design", description: "Creative garden layouts with sustainable planting schemes, water features, and outdoor living areas.", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop" },
      { name: "Irrigation & Drainage Systems", description: "Efficient water management solutions including drip irrigation, sprinkler systems, and stormwater drainage.", image: "https://images.unsplash.com/photo-1560693512-cecc1ac0de54?w=400&h=300&fit=crop" },
      { name: "Softscape & Hardscape Design", description: "Integration of plants, lawns, and trees with pathways, patios, retaining walls, and decorative elements.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
    ],
  },
  {
    titleKey: "architecturalBuildings",
    descKey: "architecturalBuildingsDesc",
    image: serviceDesign,
    categories: [
      { name: "Residential Architecture", description: "Design and construction of modern homes, villas, duplexes, and apartment complexes.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" },
      { name: "Commercial Architecture", description: "Office buildings, retail spaces, hospitality venues, and mixed-use developments.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
      { name: "Structural Engineering", description: "Load analysis, foundation design, and structural integrity assessments for all building types.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop" },
      { name: "Interior Design & Finishing", description: "Complete interior fit-outs including materials selection, lighting design, and custom furnishings.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop" },
    ],
  },
  {
    titleKey: "projectManagement",
    descKey: "projectManagementDesc",
    image: serviceConstruction,
    categories: [
      { name: "Construction Supervision", description: "On-site management ensuring quality workmanship, safety compliance, and schedule adherence.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
      { name: "Budget & Cost Control", description: "Detailed cost estimation, procurement management, and financial tracking throughout the project lifecycle.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
      { name: "Contractor Coordination", description: "Selection, vetting, and management of subcontractors and specialist trades.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" },
      { name: "Quality Assurance & Handover", description: "Systematic inspections, punch-list management, and smooth project handover to clients.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openService, setOpenService] = useState<number | null>(null);
  const { t } = useLanguage();

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
              key={service.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 cursor-pointer">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t(service.descKey)}</p>
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

      {/* Categories Modal */}
      <AnimatePresence>
        {openService !== null && (
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
                  alt={t(services[openService].titleKey)}
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
                  {t(services[openService].titleKey)}
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

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectProcess {
  step: string;
  description: string;
}

interface Project {
  title: string;
  category: string;
  image: string;
  process: ProjectProcess[];
}

const projects: Project[] = [
  {
    title: "Modern Villa Residence",
    category: "Residential",
    image: project1,
    process: [
      { step: "Site Survey & Analysis", description: "Conducted comprehensive land survey, soil testing, and environmental impact assessment." },
      { step: "Concept Design", description: "Developed initial architectural concepts incorporating client vision and landscape integration." },
      { step: "Detailed Design & Approvals", description: "Created full construction drawings and obtained all necessary permits and approvals." },
      { step: "Foundation & Structure", description: "Laid foundations and erected the primary structural framework with quality materials." },
      { step: "Landscape Integration", description: "Designed and installed surrounding gardens, pathways, and outdoor living spaces." },
      { step: "Final Handover", description: "Completed finishing touches, quality inspection, and handed over to delighted clients." },
    ],
  },
  {
    title: "Luxury Estate Development",
    category: "Commercial",
    image: project2,
    process: [
      { step: "Feasibility Study", description: "Analyzed market demand, site potential, and financial viability of the development." },
      { step: "Master Planning", description: "Created comprehensive site layout with roads, utilities, and green spaces." },
      { step: "Infrastructure Development", description: "Built access roads, water systems, and electrical infrastructure." },
      { step: "Building Construction", description: "Constructed multiple estate units with consistent quality and design standards." },
      { step: "Landscaping & Amenities", description: "Developed common gardens, recreational areas, and security features." },
      { step: "Project Completion", description: "Final inspections, handover, and post-completion support for residents." },
    ],
  },
  {
    title: "Contemporary Duplex",
    category: "Residential",
    image: project3,
    process: [
      { step: "Client Consultation", description: "Met with clients to understand lifestyle needs, budget, and design preferences." },
      { step: "Architectural Design", description: "Designed a modern duplex with open floor plans and natural light optimization." },
      { step: "Structural Engineering", description: "Engineered robust structural systems for the two-storey layout." },
      { step: "Construction Phase", description: "Managed day-to-day construction with strict quality and safety protocols." },
      { step: "Interior & Exterior Finishing", description: "Applied premium finishes, fixtures, and exterior cladding." },
      { step: "Landscaping & Handover", description: "Created beautiful front and rear gardens, completing the project for handover." },
    ],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openProject, setOpenProject] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">{t("portfolio")}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t("featuredProjects")}
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                <div>
                  <p className="text-primary-foreground/70 font-body text-xs tracking-[0.2em] uppercase mb-1">{project.category}</p>
                  <h3 className="font-display text-xl font-bold text-primary-foreground">{project.title}</h3>
                </div>
              </div>
              <div className="p-5 bg-card border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground font-body mb-4">{project.category}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenProject(index); }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {t("viewProcess")} <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Modal */}
      <AnimatePresence>
        {openProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenProject(null)}
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
                  src={projects[openProject].image}
                  alt={projects[openProject].title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setOpenProject(null)}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
                >
                  <X size={20} className="text-foreground" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">{projects[openProject].title}</h3>
                <p className="text-sm text-primary font-body font-semibold tracking-widest uppercase mb-8">{t("viewProcess")}</p>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
                  <div className="space-y-6">
                    {projects[openProject].process.map((step, i) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="relative z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <span className="text-primary-foreground font-body text-xs font-bold">{i + 1}</span>
                        </div>
                        <div className="pb-2">
                          <h4 className="font-display text-lg font-bold text-foreground mb-1">{step.step}</h4>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

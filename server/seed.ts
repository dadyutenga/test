import bcrypt from "bcryptjs";
import "./database.js";
import { createUser, hasUsers } from "./repositories/user.repository.js";
import * as projectRepo from "./repositories/project.repository.js";
import * as serviceRepo from "./repositories/service.repository.js";
import { getContactInfo, updateContactInfo } from "./repositories/contact.repository.js";
import * as testimonialRepo from "./repositories/testimonial.repository.js";

if (!hasUsers()) {
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hash = bcrypt.hashSync(defaultPassword, 10);
  createUser("admin", hash);
  console.log(`Created admin user: admin / ${defaultPassword === "admin123" ? "admin123 (change this after first login!)" : "[custom password]"}`);
}

const existingProjects = projectRepo.findAll();
if (existingProjects.length === 0) {
  projectRepo.create({
    title: "Modern Villa Residence",
    category: "Residential",
    image: "",
    featured: 1,
    steps: [
      { step_title: "Site Survey & Analysis", description: "Conducted comprehensive land survey, soil testing, and environmental impact assessment." },
      { step_title: "Concept Design", description: "Developed initial architectural concepts incorporating client vision and landscape integration." },
      { step_title: "Detailed Design & Approvals", description: "Created full construction drawings and obtained all necessary permits and approvals." },
      { step_title: "Foundation & Structure", description: "Laid foundations and erected the primary structural framework with quality materials." },
      { step_title: "Landscape Integration", description: "Designed and installed surrounding gardens, pathways, and outdoor living spaces." },
      { step_title: "Final Handover", description: "Completed finishing touches, quality inspection, and handed over to delighted clients." },
    ],
  });

  projectRepo.create({
    title: "Luxury Estate Development",
    category: "Commercial",
    image: "",
    featured: 1,
    steps: [
      { step_title: "Feasibility Study", description: "Analyzed market demand, site potential, and financial viability of the development." },
      { step_title: "Master Planning", description: "Created comprehensive site layout with roads, utilities, and green spaces." },
      { step_title: "Infrastructure Development", description: "Built access roads, water systems, and electrical infrastructure." },
      { step_title: "Building Construction", description: "Constructed multiple estate units with consistent quality and design standards." },
      { step_title: "Landscaping & Amenities", description: "Developed common gardens, recreational areas, and security features." },
      { step_title: "Project Completion", description: "Final inspections, handover, and post-completion support for residents." },
    ],
  });

  projectRepo.create({
    title: "Contemporary Duplex",
    category: "Residential",
    image: "",
    featured: 1,
    steps: [
      { step_title: "Client Consultation", description: "Met with clients to understand lifestyle needs, budget, and design preferences." },
      { step_title: "Architectural Design", description: "Designed a modern duplex with open floor plans and natural light optimization." },
      { step_title: "Structural Engineering", description: "Engineered robust structural systems for the two-storey layout." },
      { step_title: "Construction Phase", description: "Managed day-to-day construction with strict quality and safety protocols." },
      { step_title: "Interior & Exterior Finishing", description: "Applied premium finishes, fixtures, and exterior cladding." },
      { step_title: "Landscaping & Handover", description: "Created beautiful front and rear gardens, completing the project for handover." },
    ],
  });

  console.log("Seeded 3 projects");
}

const existingServices = serviceRepo.findAll();
if (existingServices.length === 0) {
  serviceRepo.create({
    title: "Landscape Planning",
    description: "Comprehensive landscape architecture and planning services from concept to completion.",
    image: "",
    categories: [
      { name: "Site Analysis & Master Planning", description: "Comprehensive assessment of terrain, soil, climate, and existing vegetation to create strategic development plans.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop" },
      { name: "Garden Design", description: "Creative garden layouts with sustainable planting schemes, water features, and outdoor living areas.", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop" },
      { name: "Irrigation & Drainage Systems", description: "Efficient water management solutions including drip irrigation, sprinkler systems, and stormwater drainage.", image: "https://images.unsplash.com/photo-1560693512-cecc1ac0de54?w=400&h=300&fit=crop" },
      { name: "Softscape & Hardscape Design", description: "Integration of plants, lawns, and trees with pathways, patios, retaining walls, and decorative elements.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop" },
    ],
  });

  serviceRepo.create({
    title: "Architectural Buildings",
    description: "Full-service architectural design and construction for residential and commercial projects.",
    image: "",
    categories: [
      { name: "Residential Architecture", description: "Design and construction of modern homes, villas, duplexes, and apartment complexes.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" },
      { name: "Commercial Architecture", description: "Office buildings, retail spaces, hospitality venues, and mixed-use developments.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
      { name: "Structural Engineering", description: "Load analysis, foundation design, and structural integrity assessments for all building types.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop" },
      { name: "Interior Design & Finishing", description: "Complete interior fit-outs including materials selection, lighting design, and custom furnishings.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop" },
    ],
  });

  serviceRepo.create({
    title: "Project Management",
    description: "End-to-end project management ensuring quality delivery on time and within budget.",
    image: "",
    categories: [
      { name: "Construction Supervision", description: "On-site management ensuring quality workmanship, safety compliance, and schedule adherence.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop" },
      { name: "Budget & Cost Control", description: "Detailed cost estimation, procurement management, and financial tracking throughout the project lifecycle.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
      { name: "Contractor Coordination", description: "Selection, vetting, and management of subcontractors and specialist trades.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" },
      { name: "Quality Assurance & Handover", description: "Systematic inspections, punch-list management, and smooth project handover to clients.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
    ],
  });

  console.log("Seeded 3 services");
}

const contact = getContactInfo();
if (!contact.phone) {
  updateContactInfo({
    phone: "+255 620 569 000",
    email: "priscaezekiel7@gmail.com",
    whatsapp: "+255 620 569 000",
    address: "Dar es Salaam, Tanzania",
  });
  console.log("Seeded contact info");
}

const existingTestimonials = testimonialRepo.findAll();
if (existingTestimonials.length === 0) {
  testimonialRepo.create({
    name: "James Mwangi",
    role: "Property Developer",
    text: "GreenScape transformed our commercial property into a stunning green oasis. Their attention to detail and sustainable approach exceeded all expectations.",
  });
  testimonialRepo.create({
    name: "Amina Hassan",
    role: "Homeowner",
    text: "From the initial design to the final planting, the team was professional, creative, and a joy to work with. Our garden is now the highlight of the neighbourhood.",
  });
  testimonialRepo.create({
    name: "David Kimaro",
    role: "Hotel Manager",
    text: "The landscape design for our resort was exceptional. Guests constantly compliment the beautiful outdoor spaces that GreenScape created for us.",
  });
  console.log("Seeded 3 testimonials");
}

console.log("Seed complete.");

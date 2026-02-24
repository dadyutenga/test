export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  featured: number;
  sort_order: number;
  created_at: string;
  steps: ProjectStep[];
}

export interface ProjectStep {
  id: number;
  project_id: number;
  step_title: string;
  description: string;
  sort_order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
  categories: ServiceCategory[];
}

export interface ServiceCategory {
  id: number;
  service_id: number;
  name: string;
  description: string;
  image: string;
  sort_order: number;
}

export interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface CreateProjectPayload {
  title: string;
  category: string;
  image?: string;
  featured?: number;
  steps?: { step_title: string; description: string }[];
}

export interface UpdateProjectPayload {
  title?: string;
  category?: string;
  image?: string;
  featured?: number;
  steps?: { step_title: string; description: string }[];
}

export interface CreateServicePayload {
  title: string;
  description: string;
  image?: string;
  categories?: { name: string; description: string; image?: string }[];
}

export interface UpdateServicePayload {
  title?: string;
  description?: string;
  image?: string;
  categories?: { name: string; description: string; image?: string }[];
}

export interface UpdateContactPayload {
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
}

export interface CreateMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  sort_order: number;
  created_at: string;
}

export interface CreateTestimonialPayload {
  name: string;
  role: string;
  text: string;
  image?: string;
}

export interface UpdateTestimonialPayload {
  name?: string;
  role?: string;
  text?: string;
  image?: string;
}

import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import type { Testimonial, CreateTestimonialPayload, UpdateTestimonialPayload } from "@/types";

export const fetchTestimonials = () => apiGet<Testimonial[]>("/testimonials");

export const createTestimonial = (data: CreateTestimonialPayload) =>
  apiPost<Testimonial>("/testimonials", data);

export const updateTestimonial = (id: number, data: UpdateTestimonialPayload) =>
  apiPut<Testimonial>(`/testimonials/${id}`, data);

export const deleteTestimonial = (id: number) => apiDelete(`/testimonials/${id}`);

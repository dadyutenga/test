import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import type { Service, CreateServicePayload, UpdateServicePayload } from "@/types";

export const fetchServices = () => apiGet<Service[]>("/services");

export const fetchService = (id: number) => apiGet<Service>(`/services/${id}`);

export const createService = (data: CreateServicePayload) => apiPost<Service>("/services", data);

export const updateService = (id: number, data: UpdateServicePayload) =>
  apiPut<Service>(`/services/${id}`, data);

export const deleteService = (id: number) => apiDelete(`/services/${id}`);

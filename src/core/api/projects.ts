import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import type { Project, CreateProjectPayload, UpdateProjectPayload } from "@/types";

export const fetchProjects = () => apiGet<Project[]>("/projects");

export const fetchProject = (id: number) => apiGet<Project>(`/projects/${id}`);

export const createProject = (data: CreateProjectPayload) => apiPost<Project>("/projects", data);

export const updateProject = (id: number, data: UpdateProjectPayload) =>
  apiPut<Project>(`/projects/${id}`, data);

export const deleteProject = (id: number) => apiDelete(`/projects/${id}`);

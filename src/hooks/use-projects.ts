import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/core/api/projects";
import type { CreateProjectPayload, UpdateProjectPayload } from "@/types";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectPayload) => createProject(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProjectPayload }) =>
      updateProject(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

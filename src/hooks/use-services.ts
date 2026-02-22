import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "@/core/api/services";
import type { CreateServicePayload, UpdateServicePayload } from "@/types";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServicePayload) => createService(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateServicePayload }) =>
      updateService(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

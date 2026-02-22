import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchContactInfo,
  updateContactInfo,
  fetchMessages,
  submitMessage,
  markMessageRead,
  deleteMessage,
} from "@/core/api/contact";
import type { UpdateContactPayload, CreateMessagePayload } from "@/types";

export function useContactInfo() {
  return useQuery({
    queryKey: ["contact-info"],
    queryFn: fetchContactInfo,
  });
}

export function useUpdateContactInfo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateContactPayload) => updateContactInfo(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-info"] }),
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
}

export function useSubmitMessage() {
  return useMutation({
    mutationFn: (data: CreateMessagePayload) => submitMessage(data),
  });
}

export function useMarkMessageRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => markMessageRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMessage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

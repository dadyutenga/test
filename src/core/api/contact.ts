import { apiGet, apiPut, apiPost, apiPatch, apiDelete } from "./client";
import type {
  ContactInfo,
  ContactMessage,
  UpdateContactPayload,
  CreateMessagePayload,
} from "@/types";

export const fetchContactInfo = () => apiGet<ContactInfo>("/contact");

export const updateContactInfo = (data: UpdateContactPayload) =>
  apiPut<ContactInfo>("/contact", data);

export const fetchMessages = () => apiGet<ContactMessage[]>("/contact/messages");

export const submitMessage = (data: CreateMessagePayload) =>
  apiPost<ContactMessage>("/contact/messages", data);

export const markMessageRead = (id: number) =>
  apiPatch<{ success: boolean }>(`/contact/messages/${id}/read`);

export const deleteMessage = (id: number) => apiDelete(`/contact/messages/${id}`);

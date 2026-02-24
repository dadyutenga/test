import { apiPost, apiGet } from "./client";
import type { AuthResponse } from "@/types";

export const login = (username: string, password: string) =>
  apiPost<AuthResponse>("/auth/login", { username, password });

export const verifyAuth = () => apiGet<{ user: { userId: number; username: string } }>("/auth/me");

export const changePassword = (currentPassword: string, newPassword: string) =>
  apiPost<{ message: string }>("/auth/change-password", { currentPassword, newPassword });

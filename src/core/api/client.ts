const API_BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options: RequestInit = { method, headers };

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    options.body = body;
  }

  const res = await fetch(`${API_BASE}${path}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const apiGet = <T>(path: string) => request<T>("GET", path);
export const apiPost = <T>(path: string, body?: unknown) => request<T>("POST", path, body);
export const apiPut = <T>(path: string, body?: unknown) => request<T>("PUT", path, body);
export const apiPatch = <T>(path: string, body?: unknown) => request<T>("PATCH", path, body);
export const apiDelete = <T>(path: string) => request<T>("DELETE", path);

export async function apiUpload(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  return request<{ url: string }>("POST", "/upload", formData);
}

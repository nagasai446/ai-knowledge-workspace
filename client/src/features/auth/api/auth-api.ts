import { apiRequest, setAccessToken } from "@/lib/app-client";

import type { LoginResponse, RegisterResponse, User } from "../auth-types";

export async function register(email: string, password: string) {
  return apiRequest("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  }) as Promise<RegisterResponse>;
}

export async function login(email: string, password: string) {
  const response = (await apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })) as LoginResponse;

  setAccessToken(response.access_token);

  return response;
}

export async function refreshSession() {
  const response = (await apiRequest("/api/v1/auth/refresh", {
    method: "POST",
  })) as LoginResponse;

  setAccessToken(response.access_token);

  return response;
}

export async function getCurrentUser() {
  return apiRequest("/api/v1/auth/me") as Promise<User>;
}

export async function logout() {
  try {
    await apiRequest("/api/v1/auth/logout", {
      method: "POST",
    });
  } finally {
    setAccessToken(null);
  }
}

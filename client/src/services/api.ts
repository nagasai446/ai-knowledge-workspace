const API_URL = import.meta.env.VITE_API_URL;

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function apiRequest(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}

export function register(email: string, password: string) {
  return apiRequest("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string) {
  const data = await apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setAccessToken(data.access_token);

  return data;
}

export function getCurrentUser() {
  return apiRequest("/api/v1/auth/me");
}

export async function refreshSession() {
  const data = await apiRequest("/api/v1/auth/refresh", {
    method: "POST",
  });

  setAccessToken(data.access_token);

  return data;
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

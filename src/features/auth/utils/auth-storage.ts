import type { AuthSession } from "@/features/auth/types/auth.type";

const AUTH_KEY = "maternity_auth_session";

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthSession());
}

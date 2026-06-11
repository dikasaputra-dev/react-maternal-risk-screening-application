import type { AuthSession, AuthUser } from "@/features/auth/types/auth.type";
import { tokenStorage } from "@/features/auth/utils/token-storage";

const AUTH_KEY = "maternity_auth_session";

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));

  tokenStorage.setTokens(session.accessToken, session.refreshToken);
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    clearAuthSession();

    return null;
  }
}

export function updateAuthUser(user: AuthUser) {
  const session = getAuthSession();

  if (!session) return;

  const updatedSession: AuthSession = {
    ...session,
    user,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(updatedSession));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);

  tokenStorage.clearTokens();
}

export function isAuthenticated() {
  return Boolean(getAuthSession());
}

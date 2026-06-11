import type { ReactNode } from "react";

import { useAuthSync } from "@/features/auth/hooks/use-auth-sync";

type AuthSyncProviderProps = {
  children: ReactNode;
};

export function AuthSyncProvider({ children }: AuthSyncProviderProps) {
  useAuthSync();

  return children;
}

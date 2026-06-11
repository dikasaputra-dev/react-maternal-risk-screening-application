import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMeApi } from "@/api/auth.api";
import { env } from "@/config/env";
import { tokenStorage } from "@/features/auth/utils/token-storage";
import {
  getAuthSession,
  updateAuthUser,
} from "@/features/auth/utils/auth-storage";

export function useAuthSync() {
  const token = tokenStorage.getAccessToken();

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeApi,
    enabled: Boolean(token) && !env.mock.auth,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (query.data) {
      updateAuthUser(query.data);
    }
  }, [query.data]);

  return {
    ...query,
    session: getAuthSession(),
  };
}

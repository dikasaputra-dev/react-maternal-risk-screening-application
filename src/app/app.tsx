import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/app/providers/query-provider";
import { AuthSyncProvider } from "@/app/providers/auth-sync-provider";
import { appRouter } from "@/app/router/app-router";
import { ToastProvider } from "@/components/ui/toast";

export function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <AuthSyncProvider>
          <RouterProvider router={appRouter} />
        </AuthSyncProvider>
      </ToastProvider>
    </QueryProvider>
  );
}

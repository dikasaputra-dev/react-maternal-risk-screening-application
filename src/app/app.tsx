import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/app/providers/query-provider";
import { appRouter } from "@/app/router/app-router";
import { ToastProvider } from "@/components/ui/toast";

export function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <RouterProvider router={appRouter} />
      </ToastProvider>
    </QueryProvider>
  );
}

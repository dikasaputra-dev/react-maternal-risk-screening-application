import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "@/app/providers/query-provider";
import { appRouter } from "@/app/router/app-router";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={appRouter} />
    </QueryProvider>
  );
}

import { RouterProvider } from "react-router-dom";

import { appRoute } from "@/app/router/app-router";

export function App() {
  return <RouterProvider router={appRoute} />;
}
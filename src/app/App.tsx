import { RouterProvider } from "@tanstack/react-router";

import { router as defaultRouter } from "@/router/router";
import type { createAppRouter } from "@/router/router";

interface AppProps {
  router?: ReturnType<typeof createAppRouter>;
}

export function App({ router = defaultRouter }: AppProps) {
  return <RouterProvider router={router} />;
}

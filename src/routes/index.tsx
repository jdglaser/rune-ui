import { createFileRoute } from "@tanstack/react-router";

import { ThemeCatalog } from "@/pages/catalog/ThemeCatalog";

export const Route = createFileRoute("/")({ component: HomePage });

export function HomePage() {
  return <ThemeCatalog />;
}

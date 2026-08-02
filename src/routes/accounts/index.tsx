import { createFileRoute } from "@tanstack/react-router";

import { AccountsPage } from "@/demo/features/accounts/pages/AccountsPage";

export const Route = createFileRoute("/accounts/")({
  component: AccountsPage,
});

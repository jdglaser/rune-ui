import { createFileRoute } from "@tanstack/react-router";

import { AccountsPage } from "@/app/features/accounts/pages/AccountsPage";

export const Route = createFileRoute("/accounts/")({
  component: AccountsPage,
});

import { createFileRoute } from "@tanstack/react-router";

import { AccountsLayout } from "@/app/features/accounts/pages/AccountsLayout";

export const Route = createFileRoute("/accounts")({
  component: AccountsLayout,
});

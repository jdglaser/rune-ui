import { createFileRoute } from "@tanstack/react-router";

import { AccountsLayout } from "@/demo/features/accounts/pages/AccountsLayout";

export const Route = createFileRoute("/accounts")({
  component: AccountsLayout,
});

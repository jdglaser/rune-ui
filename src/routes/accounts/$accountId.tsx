import { createFileRoute } from "@tanstack/react-router";

import { AccountDetailsLayout } from "@/app/features/accounts/pages/AccountDetailsLayout";

export const Route = createFileRoute("/accounts/$accountId")({
  component: AccountDetailsLayout,
});

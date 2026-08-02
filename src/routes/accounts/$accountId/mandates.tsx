import { createFileRoute } from "@tanstack/react-router";

import { AccountMandatesPage } from "@/demo/features/accounts/pages/AccountMandatesPage";

export const Route = createFileRoute("/accounts/$accountId/mandates")({
  component: AccountMandatesPage,
});

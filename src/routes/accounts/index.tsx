import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accounts/")({
  component: AccountsIndexPage,
});

export function AccountsIndexPage() {
  return (
    <div>
      <h3>Accounts</h3>
      <p>Account data will be introduced in a later lesson.</p>
    </div>
  );
}

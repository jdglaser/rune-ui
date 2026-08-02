import { Link } from "@tanstack/react-router";

export function AccountsPage() {
  return (
    <div>
      <h3>Accounts</h3>
      <p>Account data will be introduced in a later lesson.</p>
      <Link to="/accounts/$accountId" params={{ accountId: "example-account" }}>
        Open example account
      </Link>
    </div>
  );
}

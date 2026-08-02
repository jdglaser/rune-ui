import { useTheme } from "@emotion/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/accounts")({
  component: AccountsLayout,
});

export function AccountsLayout() {
  const theme = useTheme();

  return (
    <section aria-labelledby="accounts-heading">
      <h2 id="accounts-heading" css={{ marginTop: 0 }}>
        Northstar Institutional
      </h2>
      <p css={{ color: theme.colors.text.muted }}>
        Institutional investment accounts and mandates.
      </p>
      <Outlet />
    </section>
  );
}

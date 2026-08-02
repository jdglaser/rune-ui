import { useTheme } from "@emotion/react";
import { getRouteApi, Link, Outlet } from "@tanstack/react-router";

import { Inline, Stack } from "@/ui/layout";

const accountRoute = getRouteApi("/accounts/$accountId");

export function AccountDetailsLayout() {
  const theme = useTheme();
  const { accountId } = accountRoute.useParams();

  return (
    <Stack gap="lg">
      <div>
        <h3>Account {accountId}</h3>
        <p css={{ color: theme.colors.text.muted }}>
          Placeholder account overview. Real account data arrives in a later
          lesson.
        </p>
      </div>
      <nav aria-label="Account sections">
        <Inline gap="md">
          <Link
            to="/accounts/$accountId"
            params={{ accountId }}
            activeOptions={{ exact: true }}
          >
            Overview
          </Link>
          <Link to="/accounts/$accountId/mandates" params={{ accountId }}>
            Mandates
          </Link>
        </Inline>
      </nav>
      <Outlet />
    </Stack>
  );
}

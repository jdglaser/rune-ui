import { useTheme } from "@emotion/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import type { AppTheme } from "@/theme";
import { Container, Inline, Stack } from "@/ui/layout";

export const Route = createRootRoute({ component: RootLayout });

export function RootLayout() {
  const theme = useTheme();

  return (
    <div css={pageStyles(theme)}>
      <Container size="wide" gutter="lg">
        <Stack gap="2xl">
          <header>
            <h1 css={headingStyles(theme)}>Rune UI</h1>
            <p css={{ color: theme.colors.text.muted }}>
              A reusable, accessible React UI foundation.
            </p>
            <nav aria-label="Primary navigation">
              <Inline gap="md">
                <Link to="/" activeOptions={{ exact: true }}>
                  Home
                </Link>
                <Link to="/accounts">Accounts</Link>
              </Inline>
            </nav>
          </header>
          <main>
            <Outlet />
          </main>
        </Stack>
      </Container>
    </div>
  );
}

const pageStyles = (theme: AppTheme) => ({
  paddingBlock: theme.space["2xl"],
});

const headingStyles = (theme: AppTheme) => ({
  margin: 0,
  fontFamily: theme.fonts.heading,
  fontSize: theme.typography.fontSize.headingLg,
  lineHeight: theme.typography.lineHeight.heading,
});

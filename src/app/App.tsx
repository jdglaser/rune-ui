import { useTheme } from "@emotion/react";

import { ThemeCatalog } from "@/pages/catalog/ThemeCatalog";
import type { AppTheme } from "@/theme";

const pageStyles = (theme: AppTheme) => ({
  width: "min(100% - 2rem, 72rem)",
  marginInline: "auto",
  paddingBlock: theme.space["2xl"],
});

export function App() {
  const theme = useTheme();

  return (
    <main css={pageStyles(theme)}>
      <header css={{ marginBottom: theme.space["2xl"] }}>
        <h1
          css={{
            margin: 0,
            fontFamily: theme.fonts.heading,
            fontSize: theme.typography.fontSize.headingLg,
            lineHeight: theme.typography.lineHeight.heading,
          }}
        >
          Rune UI
        </h1>
        <p css={{ color: theme.colors.text.muted }}>
          A reusable, accessible React UI foundation.
        </p>
      </header>
      <ThemeCatalog />
    </main>
  );
}

import { useTheme } from "@emotion/react";

import type { AppTheme } from "@/theme";
import { Inline, Stack } from "@/ui/layout";

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
      <h2>Layout</h2>
      <h3>Stack</h3>
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
      <h3>Inline</h3>
      <Inline>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Inline>
    </main>
  );
}

import { useTheme } from "@emotion/react";

import type { AppTheme } from "@/theme";
import { AutoGrid, Center, Container, Grid, Inline, Stack } from "@/ui/layout";

const pageStyles = (theme: AppTheme) => ({
  paddingBlock: theme.space["2xl"],
});

export function App() {
  const theme = useTheme();

  return (
    <main css={pageStyles(theme)}>
      <Container size="wide" gutter="lg">
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
        <Stack gap="2xl">
          <div>
            <h2 css={{ margin: 0 }}>Layout primitives</h2>
            <p css={{ color: theme.colors.text.muted }}>
              Each component controls one kind of layout. The children are the
              content; the props describe how that content is arranged.
            </p>
          </div>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>Container: constrained page width</h3>
              <p css={{ color: theme.colors.text.muted }}>
                Container centers content, limits its maximum width, and adds a
                consistent horizontal gutter at the edges.
              </p>
              <div css={demoSurface(theme)}>
                <Container size="narrow" gutter="lg">
                  <div css={demoItem(theme)}>Narrow content region</div>
                </Container>
              </div>
              <code css={codeStyles(theme)}>
                {'<Container size="narrow" gutter="lg">\n  ...\n</Container>'}
              </code>
            </Stack>
          </section>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>Stack: vertical layout</h3>
              <p css={{ color: theme.colors.text.muted }}>
                Stack places children top-to-bottom. Use <code>gap</code> for
                consistent vertical spacing.
              </p>
              <div css={demoSurface(theme)}>
                <Stack gap="sm">
                  <div css={demoItem(theme)}>First item</div>
                  <div css={demoItem(theme)}>Second item</div>
                  <div css={demoItem(theme)}>Third item</div>
                </Stack>
              </div>
              <code css={codeStyles(theme)}>
                {'<Stack gap="sm">\n  ...\n</Stack>'}
              </code>
            </Stack>
          </section>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>Inline: horizontal layout</h3>
              <p css={{ color: theme.colors.text.muted }}>
                Inline places children left-to-right. Use <code>justify</code>{" "}
                to distribute them and <code>wrap</code> when they may run out
                of room.
              </p>
              <div css={demoSurface(theme)}>
                <Inline gap="sm" align="center" justify="space-between">
                  <div css={demoItem(theme)}>Start</div>
                  <div css={demoItem(theme)}>Middle</div>
                  <div css={demoItem(theme)}>End</div>
                </Inline>
              </div>
              <code css={codeStyles(theme)}>
                {
                  '<Inline gap="sm" align="center" justify="space-between">\n  ...\n</Inline>'
                }
              </code>
            </Stack>
          </section>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>Grid: rows and columns</h3>
              <p css={{ color: theme.colors.text.muted }}>
                Grid creates explicit tracks. Here, four children are placed in
                two equal columns with a consistent gap.
              </p>
              <div css={demoSurface(theme)}>
                <Grid columns="repeat(2, minmax(0, 1fr))" gap="md">
                  <div css={demoItem(theme)}>Column 1</div>
                  <div css={demoItem(theme)}>Column 2</div>
                  <div css={demoItem(theme)}>Column 1</div>
                  <div css={demoItem(theme)}>Column 2</div>
                </Grid>
              </div>
              <code css={codeStyles(theme)}>
                {
                  '<Grid columns="repeat(2, minmax(0, 1fr))" gap="md">\n  ...\n</Grid>'
                }
              </code>
            </Stack>
          </section>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>
                AutoGrid: responsive equal-width items
              </h3>
              <p css={{ color: theme.colors.text.muted }}>
                AutoGrid chooses the number of columns automatically. The{" "}
                <code>sm</code> preset keeps each item at least 12rem wide, and
                the columns adapt as the available space changes.
              </p>
              <div css={demoSurface(theme)}>
                <AutoGrid minItemWidth="sm" gap="md">
                  <div css={demoItem(theme)}>Item 1</div>
                  <div css={demoItem(theme)}>Item 2</div>
                  <div css={demoItem(theme)}>Item 3</div>
                  <div css={demoItem(theme)}>Item 4</div>
                </AutoGrid>
              </div>
              <code css={codeStyles(theme)}>
                {'<AutoGrid minItemWidth="sm" gap="md">\n  ...\n</AutoGrid>'}
              </code>
            </Stack>
          </section>

          <section>
            <Stack gap="sm">
              <h3 css={{ margin: 0 }}>Center: centered content</h3>
              <p css={{ color: theme.colors.text.muted }}>
                Center places content on the selected axis. The default is both
                horizontal and vertical.
              </p>
              <div css={demoSurface(theme)}>
                <Center axis="both" minHeight="8rem">
                  <div css={demoItem(theme)}>Centered content</div>
                </Center>
              </div>
              <code css={codeStyles(theme)}>
                {'<Center axis="both" minHeight="8rem">\n  ...\n</Center>'}
              </code>
            </Stack>
          </section>
        </Stack>
      </Container>
    </main>
  );
}

const demoSurface = (theme: AppTheme) => ({
  padding: theme.space.md,
  backgroundColor: theme.colors.surface.subtle,
  border: `1px dashed ${theme.colors.border.default}`,
  borderRadius: theme.radii.md,
});

const demoItem = (theme: AppTheme) => ({
  padding: theme.space.sm,
  color: theme.colors.text.inverse,
  backgroundColor: theme.colors.action.primary,
  borderRadius: theme.radii.sm,
});

const codeStyles = (theme: AppTheme) => ({
  display: "block",
  padding: theme.space.sm,
  color: theme.colors.text.muted,
  backgroundColor: theme.colors.surface.subtle,
  borderRadius: theme.radii.sm,
  fontFamily: theme.fonts.monospace,
  whiteSpace: "pre-wrap" as const,
});

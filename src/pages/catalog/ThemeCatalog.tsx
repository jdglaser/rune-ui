import { useTheme } from "@emotion/react";

import { palette } from "@/theme/palette";
import type { AppTheme } from "@/theme/types";

const sectionStyles = (theme: AppTheme) => ({
  display: "grid",
  gap: theme.space.md,
});

const swatchGridStyles = (theme: AppTheme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))",
  gap: theme.space.sm,
});

const swatchStyles = (theme: AppTheme, color: string) => ({
  minHeight: "5rem",
  padding: theme.space.sm,
  display: "flex",
  alignItems: "end",
  color: theme.colors.text.default,
  backgroundColor: color,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radii.sm,
  fontFamily: theme.fonts.monospace,
  fontSize: theme.typography.fontSize.small,
});

export function ThemeCatalog() {
  const theme = useTheme();

  return (
    <div css={{ display: "grid", gap: theme.space.xl }}>
      <section css={sectionStyles(theme)}>
        <div>
          <h2 css={{ margin: 0 }}>Raw palette</h2>
          <p css={{ color: theme.colors.text.muted }}>
            Intentionally incomplete placeholders for the future company
            palette.
          </p>
        </div>
        <div css={swatchGridStyles(theme)}>
          <div css={swatchStyles(theme, palette.neutral[10])}>neutral-10</div>
          <div css={swatchStyles(theme, palette.neutral[20])}>neutral-20</div>
          <div
            css={[
              swatchStyles(theme, palette.blue[60]),
              { color: theme.colors.text.inverse },
            ]}
          >
            blue-60
          </div>
          <div
            css={[
              swatchStyles(theme, palette.red[60]),
              { color: theme.colors.text.inverse },
            ]}
          >
            red-60
          </div>
        </div>
      </section>

      <section css={sectionStyles(theme)}>
        <div>
          <h2 css={{ margin: 0 }}>Semantic colors</h2>
          <p css={{ color: theme.colors.text.muted }}>
            Reusable components consume roles like action and surface rather
            than selecting raw shades.
          </p>
        </div>
        <div css={swatchGridStyles(theme)}>
          <div css={swatchStyles(theme, theme.colors.surface.subtle)}>
            surface.subtle
          </div>
          <div
            css={[
              swatchStyles(theme, theme.colors.action.primary),
              { color: theme.colors.text.inverse },
            ]}
          >
            action.primary
          </div>
          <div
            css={[
              swatchStyles(theme, theme.colors.action.danger),
              { color: theme.colors.text.inverse },
            ]}
          >
            action.danger
          </div>
        </div>
      </section>

      <section css={sectionStyles(theme)}>
        <div>
          <h2 css={{ margin: 0 }}>Foundation scales</h2>
          <p css={{ color: theme.colors.text.muted }}>
            Typed spacing, typography, radii, focus, and control tokens are
            available through the Emotion theme.
          </p>
        </div>
        <div
          css={{
            padding: theme.space.lg,
            backgroundColor: theme.colors.surface.default,
            border: `1px solid ${theme.colors.border.default}`,
            borderRadius: theme.radii.md,
            boxShadow: theme.shadows.raised,
          }}
        >
          <code css={{ fontFamily: theme.fonts.monospace }}>
            theme.space.md · theme.radii.md · theme.controls.height.md
          </code>
        </div>
      </section>
    </div>
  );
}

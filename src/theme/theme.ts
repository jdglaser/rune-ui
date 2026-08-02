import { palette } from "@/theme/palette";

export const theme = {
  palette,
  colors: {
    text: {
      default: "var(--semantic-text-default)",
      muted: "var(--semantic-text-muted)",
      disabled: "var(--semantic-text-disabled)",
      inverse: "var(--semantic-text-inverse)",
      danger: "var(--semantic-text-danger)",
    },
    surface: {
      page: "var(--semantic-surface-page)",
      default: "var(--semantic-surface-default)",
      subtle: "var(--semantic-surface-subtle)",
      disabled: "var(--semantic-surface-disabled)",
    },
    border: {
      default: "var(--semantic-border-default)",
      strong: "var(--semantic-border-strong)",
      focus: "var(--semantic-border-focus)",
      danger: "var(--semantic-border-danger)",
      disabled: "var(--semantic-border-disabled)",
    },
    action: {
      primary: "var(--semantic-action-primary)",
      primaryHover: "var(--semantic-action-primary-hover)",
      primaryPressed: "var(--semantic-action-primary-pressed)",
      secondary: "var(--semantic-action-secondary)",
      secondaryHover: "var(--semantic-action-secondary-hover)",
      secondaryPressed: "var(--semantic-action-secondary-pressed)",
      danger: "var(--semantic-action-danger)",
      dangerHover: "var(--semantic-action-danger-hover)",
      dangerPressed: "var(--semantic-action-danger-pressed)",
      disabled: "var(--semantic-action-disabled)",
    },
  },
  fonts: {
    body: "var(--font-family-body)",
    heading: "var(--font-family-heading)",
    monospace: "var(--font-family-monospace)",
  },
  space: {
    none: "var(--space-none)",
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    md: "var(--space-md)",
    lg: "var(--space-lg)",
    xl: "var(--space-xl)",
    "2xl": "var(--space-2xl)",
  },
  contentWidths: {
    narrow: "40rem",
    normal: "64rem",
    wide: "90rem",
    full: "none",
  },
  typography: {
    fontSize: {
      body: "var(--font-size-body)",
      label: "var(--font-size-label)",
      small: "var(--font-size-small)",
      headingSm: "var(--font-size-heading-sm)",
      headingLg: "var(--font-size-heading-lg)",
    },
    fontWeight: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
    },
    lineHeight: {
      body: "var(--line-height-body)",
      heading: "var(--line-height-heading)",
    },
  },
  radii: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    full: "var(--radius-full)",
  },
  shadows: {
    raised: "var(--shadow-raised)",
  },
  controls: {
    height: {
      sm: "var(--control-height-sm)",
      md: "var(--control-height-md)",
    },
  },
  focus: {
    ring: "var(--semantic-focus-ring)",
    width: "var(--focus-ring-width)",
    offset: "var(--focus-ring-offset)",
  },
  transitions: {
    fast: "var(--transition-fast)",
  },
} as const;

export type AppTheme = typeof theme;
export type SpacingKey = keyof typeof theme.space;

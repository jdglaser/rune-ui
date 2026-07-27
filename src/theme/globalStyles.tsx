import { Global, useTheme } from "@emotion/react";

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={{
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          fontFamily: theme.fonts.body,
          color: theme.colors.text.default,
          backgroundColor: theme.colors.surface.page,
        },
        body: {
          margin: 0,
          minWidth: "20rem",
          minHeight: "100vh",
          fontSize: theme.typography.fontSize.body,
          lineHeight: theme.typography.lineHeight.body,
        },
        "button, input, textarea, select": {
          font: "inherit",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            scrollBehavior: "auto",
            animationDuration: "0.01ms",
            animationIterationCount: 1,
            transitionDuration: "0.01ms",
          },
        },
      }}
    />
  );
}

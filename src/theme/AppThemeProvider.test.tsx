import { useTheme } from "@emotion/react";
import { render, screen } from "@testing-library/react";

import { AppThemeProvider } from "@/theme";

function ThemeConsumer() {
  const theme = useTheme();

  return <span>{theme.colors.text.default}</span>;
}

describe("AppThemeProvider", () => {
  it("renders children with the typed application theme", () => {
    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>,
    );

    expect(
      screen.getByText("var(--semantic-text-default)"),
    ).toBeInTheDocument();
  });
});

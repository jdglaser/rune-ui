import { render, screen } from "@testing-library/react";

import { App } from "@/app/App";
import { AppThemeProvider } from "@/theme";

describe("App", () => {
  it("renders the application shell", () => {
    render(
      <AppThemeProvider>
        <App />
      </AppThemeProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Rune UI" }),
    ).toBeInTheDocument();
  });
});

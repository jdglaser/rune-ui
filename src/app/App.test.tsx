import { createMemoryHistory } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { App } from "@/app/App";
import { createAppRouter } from "@/router/router";
import { AppThemeProvider } from "@/theme";

describe("App", () => {
  function renderRoute(path: string) {
    const router = createAppRouter(
      createMemoryHistory({ initialEntries: [path] }),
    );

    render(
      <AppThemeProvider>
        <App router={router} />
      </AppThemeProvider>,
    );

    return router;
  }

  it("renders the home route", async () => {
    renderRoute("/");

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Raw palette",
      }),
    ).toBeInTheDocument();
  });

  it("renders the accounts route", async () => {
    renderRoute("/accounts");

    expect(
      await screen.findByRole("heading", { level: 3, name: "Accounts" }),
    ).toBeInTheDocument();
  });

  it("navigates on the client while keeping the root layout mounted", async () => {
    const user = userEvent.setup();
    const router = renderRoute("/");
    const rootHeading = await screen.findByRole("heading", {
      level: 1,
      name: "Rune UI",
    });

    await user.click(screen.getByRole("link", { name: "Accounts" }));

    expect(router.state.location.pathname).toBe("/accounts");
    expect(
      await screen.findByRole("heading", { level: 3, name: "Accounts" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Rune UI" })).toBe(
      rootHeading,
    );
  });
});

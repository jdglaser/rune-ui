import { Link } from "@tanstack/react-router";

describe("typed route parameters", () => {
  it("documents the generated account parameter name", () => {
    const validLink = (
      <Link to="/accounts/$accountId" params={{ accountId: "example-account" }}>
        Account
      </Link>
    );

    const invalidLink = (
      <Link
        to="/accounts/$accountId"
        // @ts-expect-error -- the generated route requires accountId, not id.
        params={{ id: "example-account" }}
      >
        Account
      </Link>
    );

    expect(validLink).toBeDefined();
    expect(invalidLink).toBeDefined();
  });
});

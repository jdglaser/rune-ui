import { EntityNotFoundError } from "@/demo/data/errors";
import { accountFixtures } from "@/demo/data/fixtures";
import {
  INSTITUTIONAL_DATA_STORAGE_KEY,
  LocalStorageInstitutionalDataClient,
} from "@/demo/data/localStorageInstitutionalDataClient";

describe("LocalStorageInstitutionalDataClient", () => {
  let client: LocalStorageInstitutionalDataClient;

  beforeEach(() => {
    localStorage.clear();
    client = new LocalStorageInstitutionalDataClient(localStorage, 0);
  });

  it("seeds stable fixtures on the first read", async () => {
    const accounts = await client.getAccounts();

    expect(accounts).toEqual(accountFixtures);
    expect(accounts).toHaveLength(12);
    expect(localStorage.getItem(INSTITUTIONAL_DATA_STORAGE_KEY)).not.toBeNull();
  });

  it("persists updates across client instances", async () => {
    await client.updateAccount("wisconsin-retirement", {
      shortName: "Updated Wisconsin",
    });

    const nextClient = new LocalStorageInstitutionalDataClient(localStorage, 0);

    await expect(
      nextClient.getAccount("wisconsin-retirement"),
    ).resolves.toMatchObject({ shortName: "Updated Wisconsin" });
  });

  it("updates an account without allowing its identity to change", async () => {
    const updatedAccount = await client.updateAccount("wisconsin-retirement", {
      id: "replacement-id",
      status: "pending",
    });

    expect(updatedAccount).toMatchObject({
      id: "wisconsin-retirement",
      status: "pending",
    });
  });

  it("restores fixture state on reset", async () => {
    await client.updateAccount("wisconsin-retirement", { status: "closed" });

    await client.reset();

    await expect(
      client.getAccount("wisconsin-retirement"),
    ).resolves.toMatchObject({ status: "active" });
  });

  it("throws a named error for a missing account", async () => {
    const result = client.getAccount("missing-account");

    await expect(result).rejects.toBeInstanceOf(EntityNotFoundError);
    await expect(result).rejects.toMatchObject({
      name: "EntityNotFoundError",
      entityName: "Account",
      entityId: "missing-account",
    });
  });

  it.each(["not json", JSON.stringify({ accounts: "invalid" })])(
    "recovers safely from corrupt storage: %s",
    async (corruptValue) => {
      localStorage.setItem(INSTITUTIONAL_DATA_STORAGE_KEY, corruptValue);

      await expect(client.getAccounts()).resolves.toEqual(accountFixtures);
      expect(
        JSON.parse(localStorage.getItem(INSTITUTIONAL_DATA_STORAGE_KEY) ?? ""),
      ).toMatchObject({ accounts: accountFixtures });
    },
  );

  it("returns only mandates belonging to the requested account", async () => {
    const mandates = await client.getMandatesForAccount("wisconsin-retirement");

    expect(mandates).toHaveLength(2);
    expect(
      mandates.every(({ accountId }) => accountId === "wisconsin-retirement"),
    ).toBe(true);
  });
});

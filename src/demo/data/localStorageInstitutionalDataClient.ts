import { EntityNotFoundError } from "@/demo/data/errors";
import { accountFixtures, mandateFixtures } from "@/demo/data/fixtures";
import type {
  Account,
  InstitutionalDataClient,
  Mandate,
} from "@/demo/data/institutionalDataClient";

export const INSTITUTIONAL_DATA_STORAGE_KEY =
  "rune-ui:northstar-institutional:v1";

interface StoredInstitutionalData {
  accounts: Account[];
  mandates: Mandate[];
}

export class LocalStorageInstitutionalDataClient implements InstitutionalDataClient {
  constructor(
    private readonly storage: Storage,
    private readonly delayMilliseconds = 40,
  ) {}

  async getAccounts(): Promise<Account[]> {
    await this.delay();
    return this.read().accounts.map(copyAccount);
  }

  async getAccount(accountId: string): Promise<Account> {
    await this.delay();
    const account = this.read().accounts.find(({ id }) => id === accountId);

    if (!account) {
      throw new EntityNotFoundError("Account", accountId);
    }

    return copyAccount(account);
  }

  async updateAccount(
    accountId: string,
    changes: Partial<Account>,
  ): Promise<Account> {
    await this.delay();
    const data = this.read();
    const accountIndex = data.accounts.findIndex(({ id }) => id === accountId);

    if (accountIndex === -1) {
      throw new EntityNotFoundError("Account", accountId);
    }

    const currentAccount = data.accounts[accountIndex];
    if (!currentAccount) {
      throw new EntityNotFoundError("Account", accountId);
    }

    const updatedAccount = { ...currentAccount, ...changes, id: accountId };
    data.accounts[accountIndex] = updatedAccount;
    this.write(data);

    return copyAccount(updatedAccount);
  }

  async getMandatesForAccount(accountId: string): Promise<Mandate[]> {
    await this.delay();
    const data = this.read();

    if (!data.accounts.some(({ id }) => id === accountId)) {
      throw new EntityNotFoundError("Account", accountId);
    }

    return data.mandates
      .filter((mandate) => mandate.accountId === accountId)
      .map(copyMandate);
  }

  async reset(): Promise<void> {
    await this.delay();
    this.write(createFixtureData());
  }

  private read(): StoredInstitutionalData {
    const storedValue = this.storage.getItem(INSTITUTIONAL_DATA_STORAGE_KEY);

    if (storedValue !== null) {
      try {
        const parsedValue: unknown = JSON.parse(storedValue);
        if (isStoredInstitutionalData(parsedValue)) {
          return parsedValue;
        }
      } catch {
        // Invalid external state is replaced with the known-good fixtures below.
      }
    }

    const fixtureData = createFixtureData();
    this.write(fixtureData);
    return fixtureData;
  }

  private write(data: StoredInstitutionalData): void {
    this.storage.setItem(INSTITUTIONAL_DATA_STORAGE_KEY, JSON.stringify(data));
  }

  private async delay(): Promise<void> {
    if (this.delayMilliseconds === 0) {
      await Promise.resolve();
      return;
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, this.delayMilliseconds);
    });
  }
}

function createFixtureData(): StoredInstitutionalData {
  return {
    accounts: accountFixtures.map(copyAccount),
    mandates: mandateFixtures.map(copyMandate),
  };
}

function copyAccount(account: Account): Account {
  return { ...account };
}

function copyMandate(mandate: Mandate): Mandate {
  return { ...mandate };
}

function isStoredInstitutionalData(
  value: unknown,
): value is StoredInstitutionalData {
  if (!isRecord(value)) {
    return false;
  }

  return (
    Array.isArray(value.accounts) &&
    value.accounts.every(isAccount) &&
    Array.isArray(value.mandates) &&
    value.mandates.every(isMandate)
  );
}

function isAccount(value: unknown): value is Account {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.shortName === "string" &&
    isOneOf(value.type, [
      "pension",
      "endowment",
      "foundation",
      "insurance",
      "sovereign",
    ]) &&
    isOneOf(value.status, ["active", "pending", "closed"]) &&
    typeof value.marketValue === "number" &&
    typeof value.relationshipManager === "string" &&
    typeof value.inceptionDate === "string" &&
    typeof value.description === "string"
  );
}

function isMandate(value: unknown): value is Mandate {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.accountId === "string" &&
    typeof value.name === "string" &&
    typeof value.strategy === "string" &&
    typeof value.benchmark === "string" &&
    isOneOf(value.status, ["active", "on-hold", "terminated"]) &&
    typeof value.assetsUnderManagement === "number"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isOneOf<const Value extends string>(
  value: unknown,
  allowedValues: readonly Value[],
): value is Value {
  return (
    typeof value === "string" &&
    allowedValues.some((allowedValue) => allowedValue === value)
  );
}

export const institutionalDataClient: InstitutionalDataClient =
  new LocalStorageInstitutionalDataClient(globalThis.localStorage);

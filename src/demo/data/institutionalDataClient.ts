export type AccountStatus = "active" | "pending" | "closed";

export type AccountType =
  "pension" | "endowment" | "foundation" | "insurance" | "sovereign";

export interface Account {
  id: string;
  name: string;
  shortName: string;
  type: AccountType;
  status: AccountStatus;
  marketValue: number;
  relationshipManager: string;
  inceptionDate: string;
  description: string;
}

export type MandateStatus = "active" | "on-hold" | "terminated";

export interface Mandate {
  id: string;
  accountId: string;
  name: string;
  strategy: string;
  benchmark: string;
  status: MandateStatus;
  assetsUnderManagement: number;
}

export interface InstitutionalDataClient {
  getAccounts(): Promise<Account[]>;
  getAccount(accountId: string): Promise<Account>;
  updateAccount(accountId: string, changes: Partial<Account>): Promise<Account>;
  getMandatesForAccount(accountId: string): Promise<Mandate[]>;
  reset(): Promise<void>;
}

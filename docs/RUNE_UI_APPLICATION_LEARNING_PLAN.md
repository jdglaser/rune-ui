# Rune UI: Iterative Router, Query, and App Architecture Learning Plan

Use this file as the working guide for a collaborative Codex session.

The goal is to add application infrastructure to Rune UI in small, understandable stages. Do not implement the entire plan at once. Each lesson introduces one concept, applies it to a small institutional-investments demo app, verifies it, and stops for review.

---

## Project Goal

Extend Rune UI from a reusable UI foundation into an opinionated enterprise React starter that demonstrates:

- file-based TanStack Router
- nested application sections
- parent and child routes
- typed path parameters
- typed search parameters
- URL-backed filters
- TanStack Query
- route loaders that prime the Query cache
- pending route UI
- scroll restoration
- React Aria breadcrumbs
- dynamic breadcrumb labels
- skeletons and pending breadcrumb states
- clean separation among routing, server state, domain logic, and UI components

The project should remain understandable enough to copy into a production enterprise application later.

---

# Demo Application: Northstar Institutional

Build a small fake institutional-investments application inside Rune UI.

Use a neutral internal name:

```text
Northstar Institutional
```

The demo app manages institutional investment accounts, mandates, and reports.

## Core entities

### Account

```ts
export type AccountStatus =
  | "active"
  | "pending"
  | "closed";

export type AccountType =
  | "pension"
  | "endowment"
  | "foundation"
  | "insurance"
  | "sovereign";

export type Account = {
  id: string;
  name: string;
  shortName: string;
  type: AccountType;
  status: AccountStatus;
  marketValue: number;
  relationshipManager: string;
  inceptionDate: string;
  description: string;
};
```

### Mandate

```ts
export type MandateStatus =
  | "active"
  | "on-hold"
  | "terminated";

export type Mandate = {
  id: string;
  accountId: string;
  name: string;
  strategy: string;
  benchmark: string;
  status: MandateStatus;
  assetsUnderManagement: number;
};
```

## Example accounts

Include at least 12 deterministic account records so filtering, pagination, and scroll restoration are easy to demonstrate.

Example names:

- Wisconsin Municipal Retirement System
- Great Lakes University Endowment
- Northwoods Community Foundation
- Meridian Life Insurance
- Prairie State Teachers Pension
- Harbor County Employees Retirement Plan
- Lakefront Arts Foundation
- Badger State Treasury Reserve
- Cedar Grove Health Trust
- Iron Range Public Safety Pension
- Horizon Research Endowment
- Riverbend Charitable Foundation

Do not generate random IDs or data at runtime. Keep fixtures stable for tests.

---

# Data Layer Strategy

Use a browser-local fake data client.

## Preferred storage

Use `localStorage` behind a repository interface.

Why:

- survives refreshes
- behaves more like persistent backend data
- still requires asynchronous APIs
- can be reset easily
- remains simple enough for teaching

Do not let React components access `localStorage` directly.

## Repository contract

Create a typed interface:

```ts
export interface InstitutionalDataClient {
  getAccounts(): Promise<Account[]>;
  getAccount(accountId: string): Promise<Account>;
  updateAccount(
    accountId: string,
    changes: Partial<Account>,
  ): Promise<Account>;

  getMandatesForAccount(
    accountId: string,
  ): Promise<Mandate[]>;

  reset(): Promise<void>;
}
```

## Browser implementation

Create:

```text
src/demo/data/
  institutionalDataClient.ts
  localStorageInstitutionalDataClient.ts
  fixtures.ts
  errors.ts
```

The browser client should:

- seed fixtures on first use
- read and write JSON through one storage key
- simulate a short deterministic delay
- reject with a named `EntityNotFoundError` when needed
- validate only enough to fail safely if stored JSON is corrupt
- recover by reseeding fixtures when appropriate
- never expose raw storage details to routes or components

Recommended storage key:

```text
rune-ui:northstar-institutional:v1
```

## Important architecture

The local-storage client is acting as a fake backend.

```text
React components
        ↓
TanStack Query
        ↓
InstitutionalDataClient
        ↓
localStorage
```

Routes and components must not call `localStorage` directly.

---

# Rules for Codex

## Working style

For every lesson:

1. Inspect the current repository state.
2. Explain the concept being introduced.
3. Identify the exact files to add or modify.
4. Explain important tradeoffs.
5. Implement only that lesson.
6. Run type checking, linting, tests, and the production build.
7. Summarize what changed.
8. Stop for review.

Do not continue to the next lesson automatically.

## General constraints

Follow existing Rune UI conventions:

- React
- TypeScript
- Vite
- Emotion
- Emotion `css` prop
- object-style Emotion styles
- React Aria Components
- typed theme
- semantic design tokens
- Vitest
- React Testing Library

Do not use:

- React Router
- Wouter
- Redux
- Zustand
- Tailwind
- Emotion `styled`
- direct component access to localStorage
- a fake REST server
- an external API
- random test fixtures
- broad `any`
- pathname splitting for breadcrumbs
- one giant shared `utils` folder

Keep route files thin.

Keep feature logic outside route declarations when it becomes substantial.

---

# Target Project Structure

The final structure may resemble:

```text
src/
  app/
    AppProviders.tsx
    AppShell.tsx

  demo/
    data/
      errors.ts
      fixtures.ts
      institutionalDataClient.ts
      localStorageInstitutionalDataClient.ts

    features/
      accounts/
        api/
          accountQueries.ts
        components/
          AccountFilters.tsx
          AccountList.tsx
          AccountSummary.tsx
        domain/
          accountFilters.ts
          applyAccountFilters.ts
        pages/
          AccountsPage.tsx
          AccountDetailsPage.tsx

      mandates/
        api/
          mandateQueries.ts
        components/
        pages/

  query/
    queryClient.ts

  router/
    router.ts
    routerContext.ts
    route-breadcrumbs/
      RouteBreadcrumbs.tsx
      routeBreadcrumbs.types.ts
      routeBreadcrumbs.utils.ts

  routes/
    __root.tsx
    index.tsx
    accounts.tsx
    accounts/
      index.tsx
      $accountId.tsx
      $accountId/
        mandates.tsx

  ui/
    breadcrumbs/
    skeleton/
    visually-hidden/

  routeTree.gen.ts
```

Do not create all folders up front. Add them as lessons require them.

---

# Lesson Sequence

---

## Lesson 0: Baseline and Architecture Map

### Goal

Understand the existing Rune UI repository before changing it.

### Teach

Explain:

- current application entry point
- current provider composition
- current UI public API
- current theme setup
- current testing setup
- current catalog structure
- where application infrastructure should live
- which code belongs in Rune UI versus the demo app

### Work

Do not make code changes.

Create a short architecture proposal covering:

- target folder structure
- dependency additions
- lesson order
- difficult-to-reverse decisions
- how the existing catalog will coexist with the Northstar demo

### Stop condition

Stop after presenting the proposal.

### First Codex prompt

```text
Read this entire learning-plan file.

Complete Lesson 0 only.

Inspect the current Rune UI repository and present the baseline architecture map and proposed staged implementation. Do not modify files. Explain the existing entry point, providers, theme, UI exports, tests, and catalog. Then recommend where the Northstar Institutional demo, router, query client, and local-storage data client should live.

Stop after the proposal.
```

---

## Lesson 1: File-Based TanStack Router Foundation

### Goal

Introduce TanStack Router without adding data loading yet.

### Teach

Explain:

- what the route tree is
- how file-based routing works
- route files versus feature components
- `__root.tsx`
- `Outlet`
- index routes
- dynamic route filenames
- generated route-tree code
- typed links
- router module augmentation

### Add

Dependencies:

```text
@tanstack/react-router
@tanstack/router-plugin
```

Create:

```text
src/router/router.ts
src/routes/__root.tsx
src/routes/index.tsx
src/routes/accounts.tsx
src/routes/accounts/index.tsx
```

Configure:

- Vite plugin
- generated route tree
- RouterProvider
- router type registration
- basic navigation

### Demo behavior

Routes:

```text
/
└── /accounts
```

The `/accounts` parent route should render a section layout with an `Outlet`.

Do not add Query yet.

### Tests

Test:

- home route renders
- accounts route renders
- navigation uses client-side routing
- root layout remains mounted across navigation where observable

### Stop condition

Stop after router foundation works.

### Codex prompt

```text
Complete Lesson 1 only.

Add file-based TanStack Router to Rune UI. Teach the route tree, root route, index routes, nested routes, generated routeTree file, typed links, and Outlet as you work.

Implement only / and /accounts. Do not add TanStack Query, loaders, search params, breadcrumbs, or the local-storage data client yet.

Run typecheck, lint, tests, and build. Summarize the result and stop.
```

---

## Lesson 2: Nested App Sections

### Goal

Show how subfolders model enterprise application sections.

### Teach

Explain:

- parent route layouts
- child routes
- section navigation
- why route folders should not contain all feature logic
- pathless layouts versus URL-bearing parent routes
- what remains mounted as children change

### Add

Routes:

```text
/accounts
/accounts/$accountId
/accounts/$accountId/mandates
```

Use placeholder content only.

Suggested files:

```text
src/routes/accounts/$accountId.tsx
src/routes/accounts/$accountId/mandates.tsx
```

Add a simple account section navigation.

### Tests

Test:

- dynamic account ID is typed and rendered
- nested mandates route renders within account section layout
- wrong param property in a documentation example is marked as invalid without breaking the build

### Stop condition

Stop before adding real account data.

### Codex prompt

```text
Complete Lesson 2 only.

Extend the file-based route tree into a realistic nested Accounts section:

- /accounts
- /accounts/$accountId
- /accounts/$accountId/mandates

Use placeholder content only.

Teach how route subfolders, parent layouts, Outlet, dynamic params, and typed links work. Keep route files thin. Do not add TanStack Query, loaders, data clients, search params, or breadcrumbs yet.

Run checks and stop.
```

---

## Lesson 3: Fake Institutional Data Client

### Goal

Introduce a clean data boundary before TanStack Query.

### Teach

Explain:

- why localStorage is treated like an external data source
- why components should not access it directly
- repository/client interfaces
- DTO/domain concerns, even though this demo uses one model
- asynchronous boundaries
- deterministic fixtures
- named errors

### Add

Create:

```text
src/demo/data/
  errors.ts
  fixtures.ts
  institutionalDataClient.ts
  localStorageInstitutionalDataClient.ts
```

Seed stable fixture data.

Create a singleton client instance through a deliberate module export or provider. Explain the choice.

### Tests

Test:

- first read seeds data
- data persists
- update works
- reset restores fixtures
- missing account throws named error
- corrupt storage is handled safely

Mock localStorage only at the storage boundary.

### Stop condition

Do not connect the client to routes or components yet.

### Codex prompt

```text
Complete Lesson 3 only.

Create the Northstar Institutional fake data layer using localStorage behind a typed InstitutionalDataClient interface.

Add deterministic Account and Mandate fixtures, asynchronous client methods, a short deterministic delay, reset support, corruption handling, and EntityNotFoundError.

Do not add TanStack Query or connect the client to routes yet.

Teach the repository boundary and test it thoroughly. Run checks and stop.
```

---

## Lesson 4: TanStack Query Foundation

### Goal

Introduce TanStack Query independently of router loaders.

### Teach

Explain:

- server state versus local UI state
- QueryClient
- QueryClientProvider
- query keys
- query options
- stale time
- retries
- cache ownership
- why Query calls the data client

### Add

Dependency:

```text
@tanstack/react-query
```

Create:

```text
src/query/queryClient.ts
src/demo/features/accounts/api/accountQueries.ts
```

Create query options:

```ts
accountsQueryOptions
accountQueryOptions(accountId)
accountMandatesQueryOptions(accountId)
```

Use `useQuery` in the accounts list and account detail pages.

For this lesson, components may show component-level loading states.

### Tests

Test query functions and integration behavior without asserting TanStack internals.

### Stop condition

Do not add route loaders yet.

### Codex prompt

```text
Complete Lesson 4 only.

Add TanStack Query and connect it to the existing InstitutionalDataClient.

Create one QueryClient, provider composition, reusable queryOptions for:

- accounts
- account detail
- account mandates

Use useQuery in the current routes and show simple component-level pending and error states.

Teach server state, query keys, stale time, retries, and cache ownership.

Do not add router loaders, ensureQueryData, route pending components, or breadcrumbs yet.

Run checks and stop.
```

---

## Lesson 5: Typed Search Params and URL-Owned Filters

### Goal

Introduce typed route search params as the source of truth for account filters.

### Teach

Explain:

- raw URL values are untrusted
- `validateSearch`
- route-owned search state
- defaults
- replace versus push
- resetting dependent state
- why applied filters should not be duplicated in `useState`
- why client-side filtering remains domain logic

### Add

Account filters:

```ts
export type AccountSearch = {
  query: string;
  type: AccountType | "all";
  status: AccountStatus | "all";
  page: number;
};
```

Create:

```text
src/demo/features/accounts/domain/accountFilters.ts
src/demo/features/accounts/domain/applyAccountFilters.ts
src/demo/features/accounts/components/AccountFilters.tsx
```

Rules:

- malformed values fall back safely
- query/type/status changes reset page to 1
- page changes preserve filters
- rapid filter changes use history replacement
- default values should be omitted when practical
- filtering occurs before pagination
- source arrays are not mutated

### Tests

Test:

- search parsing
- malformed values
- filter updates
- page reset
- client-side filtering
- pagination after filtering

### Stop condition

Do not add router loaders.

### Codex prompt

```text
Complete Lesson 5 only.

Add typed and validated search params to the /accounts route:

- query
- type
- status
- page

Use the URL as the source of truth. Do not mirror applied filters into useState.

Create pure client-side filtering and pagination functions outside React and outside the router. Changing query/type/status must reset page to 1. Page changes must preserve filters.

Teach validateSearch, route-owned search state, replace versus push, and the separation between URL parsing and domain filtering.

Run checks and stop.
```

---

## Lesson 6: Router Context and `ensureQueryData`

### Goal

Integrate Router and Query without creating two caches.

### Teach

Explain:

- typed router context
- making QueryClient available to loaders
- loaders declare route data requirements
- Query owns the cache
- `ensureQueryData`
- cached versus missing data
- why the component still calls `useQuery` or `useSuspenseQuery`
- blocking versus nonblocking route data

### Add

Create typed router context:

```ts
export type AppRouterContext = {
  queryClient: QueryClient;
};
```

Update root route and router construction.

Add loaders:

- `/accounts` ensures accounts query
- `/accounts/$accountId` ensures account detail query
- mandates remains component-loaded for now as a secondary query

Use shared query options.

### Tests

Test:

- loaders call the same query definitions
- navigating to a cached route does not create duplicate data fetches
- direct navigation works

Instrument the fake client with test spies only where appropriate.

### Stop condition

Do not add pending route skeletons yet.

### Codex prompt

```text
Complete Lesson 6 only.

Integrate TanStack Router and TanStack Query using typed router context.

Add ensureQueryData loaders for:

- /accounts
- /accounts/$accountId

Use the existing shared queryOptions. Keep account mandates component-loaded as a secondary query.

Teach exactly what ensureQueryData does, how the router waits, how Query remains the cache owner, and why components still subscribe through useQuery or useSuspenseQuery.

Do not add pending route skeletons or breadcrumbs yet.

Run checks and stop.
```

---

## Lesson 7: Route Pending UI and Skeleton Foundations

### Goal

Show meaningful loading UI while blocking loaders run.

### Teach

Explain:

- route pending state
- `pendingComponent`
- pending delay and minimum duration
- current route versus destination pending UI
- route-level versus component-level loading
- why skeletons cannot infer future content size
- structural skeletons
- preserving cached content during refetches

### Add Rune UI components

```text
src/ui/skeleton/
  Skeleton.tsx
  SkeletonText.tsx
  Skeleton.test.tsx

src/ui/visually-hidden/
  VisuallyHidden.tsx
```

Suggested APIs:

```tsx
<Skeleton width="12rem" height="1rem" />
<SkeletonText lines={3} lastLineWidth="65%" />
```

Add:

- `AccountsPageSkeleton`
- `AccountDetailsSkeleton`

Use pending components for primary route data.

Keep mandates as a component-level skeleton.

### Accessibility

- skeleton bars are `aria-hidden`
- containing regions use `aria-busy`
- reduced-motion preferences are respected
- no screen-reader narration of decorative animation

### Tests

Test public behavior, not generated class names.

### Stop condition

Do not add breadcrumbs yet.

### Codex prompt

```text
Complete Lesson 7 only.

Add Rune UI Skeleton, SkeletonText, and VisuallyHidden components.

Then add route pending components for the accounts list and account detail routes. Keep mandates as component-level loading.

Teach route pendingComponent, pending timing, route-level versus panel-level loading, why skeletons cannot automatically know future content size, and how to preserve existing content during refetches.

Use accessible aria-busy regions and hide decorative skeleton bars from assistive technology.

Do not add breadcrumbs yet.

Run checks and stop.
```

---

## Lesson 8: Router-Independent React Aria Breadcrumbs

### Goal

Build the visual breadcrumb component without routing knowledge.

### Teach

Explain:

- visual UI versus router adapter
- React Aria breadcrumb primitives
- current-page semantics
- separators hidden from assistive technology
- router independence
- why pathname splitting is wrong

### Add

```text
src/ui/breadcrumbs/
  Breadcrumbs.tsx
  Breadcrumbs.types.ts
  Breadcrumbs.test.tsx
```

Suggested model:

```ts
export type BreadcrumbItem = {
  id: string;
  label?: React.ReactNode;
  href?: string;
  isPending?: boolean;
  pendingLabel?: string;
  pendingWidth?: string;
};
```

Requirements:

- ancestors are links
- final item is current
- pending item renders a visual skeleton and hidden loading label
- no TanStack imports
- no Query imports
- React Aria handles accessible behavior
- client-side link rendering may be injected through a narrow adapter

### Tests

Test:

- landmark label
- ancestor links
- current item
- separator accessibility
- pending item
- keyboard behavior
- single-item behavior

### Stop condition

Do not derive items from route matches yet.

### Codex prompt

```text
Complete Lesson 8 only.

Implement a router-independent Rune UI Breadcrumbs component using React Aria Components.

Support normal and pending breadcrumb items. Pending items should render a Skeleton plus a VisuallyHidden loading label.

Do not import TanStack Router or TanStack Query in the UI component. Do not split pathnames.

Teach the separation between resolved breadcrumb data and router-aware derivation.

Run checks and stop.
```

---

## Lesson 9: Route Metadata and `RouteBreadcrumbs`

### Goal

Derive breadcrumbs from active route matches.

### Teach

Explain:

- static route data
- module augmentation
- active route matches
- route hierarchy order
- static versus dynamic labels
- why breadcrumb data should reuse loader/query results
- pending destination matches
- ancestor pathname navigation

### Add

```text
src/router/route-breadcrumbs/
  RouteBreadcrumbs.tsx
  routeBreadcrumbs.types.ts
  routeBreadcrumbs.utils.ts
  RouteBreadcrumbs.test.tsx
```

Static metadata concept:

```ts
export type RouteBreadcrumbDefinition = {
  label?: string;
  pendingLabel?: string;
  pendingWidth?: string;
};
```

Example:

```ts
staticData: {
  breadcrumb: {
    label: "Accounts",
  },
}
```

Dynamic account route:

```ts
staticData: {
  breadcrumb: {
    pendingLabel: "Loading account",
    pendingWidth: "9rem",
  },
}
```

Loader should ensure the account query and return minimal breadcrumb metadata:

```ts
return {
  breadcrumb: account.name,
};
```

The route component should still use the Query cache.

### Pending behavior

During navigation:

```text
Accounts / [breadcrumb skeleton]

[account page skeleton]
```

After load:

```text
Accounts / Wisconsin Municipal Retirement System

[account page]
```

### Link behavior

Breadcrumb navigation must be client-side.

Keep TanStack integration in the router layer.

### Tests

Test:

- static labels
- dynamic account name
- pending account crumb
- omitted routes
- hierarchy order
- ancestor links
- final item not linked
- direct navigation
- client-side navigation

### Stop condition

Stop after breadcrumbs work.

### Codex prompt

```text
Complete Lesson 9 only.

Add typed route breadcrumb metadata and a TanStack-aware RouteBreadcrumbs adapter.

Use active route matches to derive breadcrumb items. Static routes use staticData. The dynamic account route should show a pending breadcrumb skeleton while the account query is loading, then display the loaded account name.

Reuse the existing account query and route loader. Do not fetch separately for breadcrumbs. Keep the visual Breadcrumbs component router-independent.

Teach staticData, active matches, dynamic loader labels, pending matches, and client-side breadcrumb links.

Run checks and stop.
```

---

## Lesson 10: Scroll Restoration

### Goal

Introduce navigation-state restoration for list/detail workflows.

### Teach

Explain:

- forward navigation versus Back navigation
- window scroll restoration
- custom scroll containers
- virtualized tables
- why route history already preserves the filtered URL
- why detail routes should not carry list filters

### Add

Enable router scroll restoration.

Make the account list long enough to test.

Manual scenario:

1. Open `/accounts` with filters.
2. Scroll down.
3. Open an account.
4. Press Back.
5. Confirm:
   - filtered URL returns
   - filter controls return
   - result set returns
   - scroll position returns

### Tests

Do not fake browser scroll restoration in JSDOM.

Add a documented manual verification procedure.

### Stop condition

Stop after documentation and manual verification.

### Codex prompt

```text
Complete Lesson 10 only.

Enable TanStack Router scroll restoration and add a reliable manual verification path using the accounts list/detail workflow.

Teach why browser history restores the prior filtered URL, why detail routes should not copy list filters, and the limits of scroll restoration for custom containers and virtualized tables.

Do not add brittle JSDOM scroll tests.

Run checks, document the manual test, and stop.
```

---

## Lesson 11: Parent Data, Child Routes, and Shared Query Cache

### Goal

Show how nested routes share data without depending on parent loader order.

### Teach

Explain:

- child components can read parent route data
- child loaders should not assume parent loaders finished first
- loaders may run in parallel
- Query deduplicates shared requests
- parent section prerequisites
- `beforeLoad` for synchronous inherited context
- Query for server data

### Add

Parent `/accounts` route ensures a shared reference query, such as account types or relationship managers.

Account detail child ensures account detail.

Mandates child ensures mandates.

Both parent and children consume Query data with shared query options.

Optionally demonstrate a synchronous `beforeLoad` context value:

```ts
sectionName: "Accounts"
```

Do not introduce authentication yet.

### Tests

Test shared Query behavior and deduplication where practical.

### Stop condition

Stop after the relationship is demonstrated.

### Codex prompt

```text
Complete Lesson 11 only.

Demonstrate shared data across nested routes without depending on parent loader completion order.

Have the /accounts parent ensure shared reference data. Have the account detail and mandates children ensure their own queries. Use shared TanStack Query options so repeated ensureQueryData calls deduplicate through the cache.

Teach parent loader data versus Query cache, parallel loaders, and when beforeLoad context is appropriate.

Run checks and stop.
```

---

## Lesson 12: Mutation Example and Query Invalidation

### Goal

Complete the basic Query lifecycle with one edit operation.

### Teach

Explain:

- mutations
- invalidation
- updating detail and list queries
- local form state versus server state
- why URL filter state remains separate
- optimistic updates as deferred complexity

### Add

Add a simple account edit page or dialog for:

- short name
- relationship manager
- status

Use plain React form state for the small form.

Use the local-storage data client to persist updates.

Add mutation options.

On success:

- update or invalidate account detail
- invalidate account list
- navigate back or show success feedback

Do not add React Hook Form or schema validation yet.

### Tests

Test persistence and cache refresh behavior.

### Stop condition

Stop after one straightforward mutation.

### Codex prompt

```text
Complete Lesson 12 only.

Add one simple account-edit workflow using TanStack Query mutations and the existing local-storage data client.

Use plain React state for the small form. On success, refresh the account detail and account list caches appropriately.

Teach mutation state, invalidation, server state versus form state, and why optimistic updates are deferred.

Do not add React Hook Form or schema validation.

Run checks and stop.
```

---

# Architecture Reference

## Responsibility map

```text
TanStack Router
- route hierarchy
- path params
- search params
- navigation
- loader requirements
- pending boundaries
- scroll restoration
- route metadata

TanStack Query
- asynchronous data fetching
- cache
- stale state
- retries
- deduplication
- invalidation
- mutation lifecycle

InstitutionalDataClient
- fake backend boundary
- persistence
- data retrieval
- data updates
- named failures

Domain modules
- filter models
- search parsing helpers
- pure filtering
- pagination
- derived values
- business rules

Route files
- validateSearch
- loaderDeps
- loaders
- static metadata
- pending/error components
- page component selection

Feature pages/components
- UI composition
- local interaction state
- useQuery/useMutation subscriptions

Rune UI
- accessible reusable components
- layout
- forms controls
- breadcrumbs
- skeletons
- theming
```

---

# Important Patterns to Preserve

## Query options are shared

```ts
const options = accountQueryOptions(accountId);
```

The loader and component use the same definition.

```ts
loader: ({ context, params }) =>
  context.queryClient.ensureQueryData(
    accountQueryOptions(params.accountId),
  );
```

```ts
const accountQuery = useQuery(
  accountQueryOptions(accountId),
);
```

## URL owns applied filters

```text
URL search params
    ↓
validated AccountSearch
    ↓
pure filtering function
    ↓
rendered rows
```

Do not use:

```text
URL
  ↕ effects
local filter state
```

## Route loaders do not replace Query

```text
Loader
- says when critical data must be ready

Query
- owns the actual cached data lifecycle
```

## Breadcrumbs do not fetch

```text
Account loader/query
    ↓
loaded account name
    ↓
RouteBreadcrumbs
    ↓
Breadcrumb UI
```

## Skeletons model structure

They do not automatically infer unloaded content dimensions.

Use:

- a few reusable skeleton primitives
- route-specific composition where necessary
- existing cached content during refetches
- minimum block sizes where layout stability matters

---

# Final Review Checklist

After all lessons, verify:

- route files remain thin
- feature code is outside route folders
- no component accesses localStorage directly
- one QueryClient exists
- generated route tree is not manually edited
- search params are validated
- applied filters are not duplicated in local state
- client-side filters are pure functions
- pagination follows filtering
- critical route data uses `ensureQueryData`
- secondary data loads at component level
- route pending UI is meaningful
- breadcrumbs reuse route/query data
- breadcrumb UI is router-independent
- query parameters do not accumulate across unrelated routes
- detail routes do not carry irrelevant list filters
- Back restores filtered list URL
- scroll restoration is enabled
- no Emotion `styled`
- no raw component colors
- tests focus on behavior
- README explains the architecture

---

# How to Use This File with Codex

Start each session by saying:

```text
Read RUNE_UI_APPLICATION_LEARNING_PLAN.md.

We are currently on Lesson N.

Inspect the repository and confirm what prior lessons are complete. Then complete only Lesson N. Teach the concept before implementation, explain the files you will change, implement it, run all checks, summarize, and stop.
```

Do not ask Codex to “implement the plan.”

Ask it to complete exactly one lesson.

Keep commits aligned to lesson boundaries where practical.

Suggested commit style:

```text
lesson 1: add file-based router foundation
lesson 2: add nested account routes
lesson 3: add local institutional data client
lesson 4: add tanstack query foundation
```

This keeps the work reviewable and makes rollback straightforward.

Across modern libraries, the recurring foundation is **one-dimensional flow, two-dimensional grid, width constraint, and a small number of composition helpers**. Chakra, MUI, Mantine, and React Spectrum all converge around variants of `Stack`/`Flex`, `Grid`, and `Container`. ([Chakra UI][1])

For **Rune UI**, I would organize layout components into three levels.

## 1. Core primitives

These should be low-level, reusable, and visually neutral.

### `Stack`

Vertical flow with consistent spacing.

```tsx
<Stack gap="lg">
  <Heading>Account details</Heading>
  <TextField />
  <TextField />
</Stack>
```

```ts
type StackProps = {
  gap?: SpaceToken
  align?: "start" | "center" | "end" | "stretch"
  children: ReactNode
}
```

Keep it vertical. Although some libraries let `Stack` switch directions, a dedicated horizontal primitive produces clearer JSX:

```tsx
<Stack>...</Stack>
<Inline>...</Inline>
```

Modern libraries consistently treat stacks as the standard solution for one-dimensional layouts. ([Chakra UI][1])

---

### `Inline`

Horizontal flow that can wrap.

```tsx
<Inline gap="sm" align="center" justify="space-between" wrap>
  <Inline gap="sm" align="center">
    <Avatar />
    <AccountName />
  </Inline>

  <ButtonGroup />
</Inline>
```

Suggested API:

```ts
type InlineProps = {
  gap?: SpaceToken
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
  wrap?: boolean
  children: ReactNode
}
```

I prefer `Inline` over `HStack` or `Group`. It describes the layout concept rather than the underlying CSS direction.

Use it for:

* toolbars
* button groups
* metadata
* badges
* filter controls
* label-and-value arrangements

---

### `Grid`

A thin CSS Grid primitive for explicit, nonuniform layouts.

```tsx
<Grid
  columns="minmax(16rem, 20rem) minmax(0, 1fr)"
  gap="lg"
>
  <FilterPanel />
  <Results />
</Grid>
```

Suggested API:

```ts
type GridProps = {
  columns?: CSSProperties["gridTemplateColumns"]
  rows?: CSSProperties["gridTemplateRows"]
  gap?: SpaceToken
  columnGap?: SpaceToken
  rowGap?: SpaceToken
  align?: CSSProperties["alignItems"]
  children: ReactNode
}
```

Do **not** build a Bootstrap-style 12-column system initially. Current libraries differ here: Mantine retains a span-based grid, while React Spectrum exposes CSS Grid more directly, and MUI distinguishes its column grid from vertical stacking. Rune UI can stay closer to the platform rather than inventing a second layout language. ([MUI][2])

---

### `AutoGrid`

A higher-level grid for equal or minimum-width items.

```tsx
<AutoGrid minItemWidth="18rem" gap="lg">
  <MetricCard />
  <MetricCard />
  <MetricCard />
</AutoGrid>
```

Implementation:

```tsx
gridTemplateColumns:
  `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`
```

Suggested API:

```ts
type AutoGridProps = {
  minItemWidth?: string
  gap?: SpaceToken
  children: ReactNode
}
```

This is the Rune equivalent of `SimpleGrid`, which Chakra and Mantine use for equal-width responsive layouts. ([Chakra UI][3])

I prefer `AutoGrid` because its name explains what it does: it chooses the column count automatically.

---

### `Container`

Constrains content width and centers it.

```tsx
<Container size="wide">
  <PageContent />
</Container>
```

Suggested sizes:

```ts
contentWidths: {
  narrow: "40rem",
  normal: "64rem",
  wide: "90rem",
  full: "none",
}
```

Suggested API:

```ts
type ContainerProps = {
  size?: "narrow" | "normal" | "wide" | "full"
  gutter?: SpaceToken
  children: ReactNode
}
```

A container should provide:

```css
width: 100%;
max-width: var(--selected-width);
margin-inline: auto;
padding-inline: var(--gutter);
```

This matches the conventional responsibility of container components in libraries such as MUI and Chakra: fluid content with a constrained maximum width. ([Chakra UI][4])

---

## 2. Small utility primitives

Add these only when their use becomes frequent.

### `Center`

Centers content on one or both axes.

```tsx
<Center minHeight="20rem">
  <EmptyState />
</Center>
```

Suggested API:

```ts
type CenterProps = {
  inline?: boolean
  block?: boolean
  minHeight?: CSSProperties["minHeight"]
  children: ReactNode
}
```

Defaulting to both axes is reasonable:

```css
display: grid;
place-items: center;
```

Useful for:

* empty states
* loading states
* sign-in surfaces
* illustrations

---

### `Spacer`

Consumes remaining flex space.

```tsx
<Inline align="center">
  <Logo />
  <Spacer />
  <UserMenu />
</Inline>
```

Implementation:

```css
flex: 1 1 auto;
```

Chakra exposes this pattern directly, but CSS auto margins can often do the same job. ([Chakra UI][5])

I would classify it as optional. `justify="space-between"` is usually enough when there are exactly two groups.

---

### `Bleed`

Allows content to escape a container’s padding.

```tsx
<Card>
  <Stack gap="md">
    <Bleed inline>
      <Image />
    </Bleed>

    <CardContent />
  </Stack>
</Card>
```

Useful for:

* edge-to-edge card images
* tables inside padded surfaces
* full-width separators
* embedded charts

This is a useful modern composition primitive, but it should come after the core set; Chakra is one library that exposes it explicitly. ([Chakra UI][4])

---

### `AspectRatio`

Maintains media dimensions.

```tsx
<AspectRatio ratio={16 / 9}>
  <img src={src} alt="" />
</AspectRatio>
```

This is technically a sizing primitive rather than general layout, but it commonly lives in the layout family.

Use native CSS:

```css
aspect-ratio: 16 / 9;
```

---

## 3. Semantic application layouts

These should be built **using** the primitives rather than becoming infinitely configurable primitives themselves.

### `Page`

Owns the outer page region and responsive gutters.

```tsx
<Page width="wide">
  <PageHeader />
  <PageBody />
</Page>
```

It can compose `Container` internally:

```tsx
function Page({ width = "wide", children }: PageProps) {
  return (
    <main>
      <Container size={width}>{children}</Container>
    </main>
  )
}
```

Responsibilities:

* semantic `<main>`
* page width
* responsive horizontal gutters
* vertical page padding

It should not own page-specific columns or navigation.

---

### `Section`

Creates consistent vertical separation between page regions.

```tsx
<Page>
  <Stack gap="2xl">
    <Section>
      <Overview />
    </Section>

    <Section>
      <AccountsTable />
    </Section>
  </Stack>
</Page>
```

Potential API:

```ts
type SectionProps = {
  as?: "section" | "div"
  children: ReactNode
}
```

Keep it intentionally boring. It should mostly provide semantics and perhaps a standard scroll margin—not arbitrary card styling.

---

### `PageHeader`

A common and valuable composition for enterprise applications:

```tsx
<PageHeader
  title="Accounts"
  description="Manage platform accounts and ownership."
  breadcrumbs={<Breadcrumbs />}
  actions={
    <Button variant="primary">Create account</Button>
  }
/>
```

Responsive behavior:

```text
Wide:
title and description             actions

Narrow:
title and description
actions
```

This is better as a semantic composition than repeatedly assembling the same stack and inline structures on every page.

---

### `SplitLayout`

Two unequal regions, usually sidebar plus main content.

```tsx
<SplitLayout
  sidebar={<FilterPanel />}
  main={<Results />}
  sidebarWidth="18rem"
/>
```

Its responsive behavior could be:

* side-by-side when sufficient space exists
* stacked or drawer-triggered when narrow

However, do not make `SplitLayout` decide whether filters become a drawer. The page owns that interaction. The component should primarily manage the geometry.

---

### `AppShell`

The highest-level application frame:

```tsx
<AppShell
  header={<Header />}
  navigation={<Navigation />}
>
  <Outlet />
</AppShell>
```

Responsibilities:

* application header
* navigation rail/sidebar
* main region
* viewport height
* overflow boundaries
* skip-link target

This should be application-opinionated and may belong in `app/` rather than the reusable `ui/` package.

---

## What I would not build

### No general-purpose `Box`

MUI and Chakra provide `Box` as a generic styled container. ([Chakra UI][4])

Rune UI already uses Emotion’s `css` prop:

```tsx
<div css={{ padding: theme.space.lg }} />
```

A component like this adds almost nothing:

```tsx
<Box padding="lg" background="surface">
```

It would force you to create and maintain a parallel style-prop system. Plain semantic HTML plus `css` is clearer.

---

### No universal `Flex`

You could expose:

```tsx
<Flex direction="row" wrap="wrap" ... />
```

But most real uses should be more communicative:

```tsx
<Stack />
<Inline />
```

Add a raw `Flex` only when repeated layouts genuinely cannot be expressed clearly through those two.

---

### No `Row` and `Column`

Those names sound tied to a rigid grid system. `Inline` and `Stack` describe content flow more accurately.

---

### No responsive object props initially

Avoid turning every component into this:

```tsx
<Grid
  columns={{
    base: 1,
    md: 2,
    xl: 4,
  }}
/>
```

That requires Rune UI to implement:

* prop parsing
* breakpoint translation
* TypeScript machinery
* conflict resolution
* runtime or generated CSS
* documentation for a custom responsive syntax

Prefer fluid CSS, container queries, and the `css` prop:

```tsx
<AutoGrid minItemWidth="18rem" />

<Grid
  css={{
    gridTemplateColumns: "1fr",

    [theme.media.lg]: {
      gridTemplateColumns: "18rem minmax(0, 1fr)",
    },
  }}
/>
```

---

## Recommended Rune UI layout package

I would launch with:

```text
layout/
├── Stack/
├── Inline/
├── Grid/
├── AutoGrid/
├── Container/
├── Page/
└── Section/
```

Then add as real use cases emerge:

```text
layout/
├── Center/
├── Bleed/
├── AspectRatio/
├── PageHeader/
└── SplitLayout/
```

`AppShell` should probably remain an app-level component until you have built two or more applications that demonstrate the same shell requirements.

## The central rule

Use the narrowest component that accurately expresses the layout:

```text
Vertical sequence        → Stack
Horizontal sequence      → Inline
Explicit 2D layout       → Grid
Fluid repeated items     → AutoGrid
Maximum content width    → Container
Screen-level content     → Page
Semantic page region     → Section
```

That gives Rune UI a modern layout foundation without recreating Chakra or MUI’s entire styling engine.

[1]: https://chakra-ui.com/docs/components/stack?utm_source=chatgpt.com "Stack"
[2]: https://mui.com/material-ui/react-grid/?utm_source=chatgpt.com "React Grid component - Material UI"
[3]: https://chakra-ui.com/docs/components/simple-grid?utm_source=chatgpt.com "SimpleGrid"
[4]: https://chakra-ui.com/docs/components/concepts/overview?utm_source=chatgpt.com "Components"
[5]: https://chakra-ui.com/docs/components/flex?utm_source=chatgpt.com "Flex"

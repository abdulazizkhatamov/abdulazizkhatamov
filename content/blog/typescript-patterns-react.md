---
title: "TypeScript Patterns Every React Developer Should Know"
date: "2025-01-15"
excerpt: "Generic components, discriminated unions, and utility types that eliminate entire categories of runtime bugs in React apps."
tags: ["TypeScript", "React", "Patterns"]
published: true
---

TypeScript in React is often used at 20% of its potential — just annotating props and leaving the rest as `any`. Here are the patterns that actually change how you write components.

## Discriminated Unions for Component State

Instead of optional props that create impossible states, use discriminated unions:

```ts
// ❌ Impossible states exist: loading=true AND data=someValue
type Props = {
  loading?: boolean;
  data?: User;
  error?: string;
};

// ✅ Only valid states are possible
type Props =
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };

function UserCard(props: Props) {
  if (props.status === "loading") return <Skeleton />;
  if (props.status === "error") return <ErrorMessage message={props.error} />;
  return <div>{props.data.name}</div>;
}
```

The compiler now enforces that you handle every state. No more `data?.name` everywhere.

## Generic Components Done Right

Avoid `any` in list components by making them properly generic:

```tsx
type SelectProps<T> = {
  options: T[];
  value: T;
  onChange: (val: T) => void;
  getLabel: (item: T) => string;
  getId: (item: T) => string;
};

function Select<T>({ options, value, onChange, getLabel, getId }: SelectProps<T>) {
  return (
    <select
      value={getId(value)}
      onChange={(e) => {
        const found = options.find((o) => getId(o) === e.target.value);
        if (found) onChange(found);
      }}
    >
      {options.map((opt) => (
        <option key={getId(opt)} value={getId(opt)}>
          {getLabel(opt)}
        </option>
      ))}
    </select>
  );
}
```

Usage is fully type-safe — no casting required:

```tsx
<Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(u) => u.name}
  getId={(u) => u.id}
/>
```

## Utility Types That Actually Get Used

### `ReturnType` for derived types

When a function returns a complex object, derive its type rather than defining it twice:

```ts
async function getProjectWithStats(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug }, include: { views: true } });
  return { ...project, viewCount: project?.views.length ?? 0 };
}

// No need to manually define this type
type ProjectWithStats = Awaited<ReturnType<typeof getProjectWithStats>>;
```

### `Extract` for narrowing union types

```ts
type Status = "draft" | "published" | "archived";
type PublishableStatus = Extract<Status, "draft" | "published">; // "draft" | "published"
```

Useful when you want a subset of a union without duplicating the values.

### `Record` with union keys for exhaustive maps

```ts
type Locale = "en" | "uz" | "ru";

// TypeScript will error if you miss a locale
const labels: Record<Locale, string> = {
  en: "English",
  uz: "O'zbek",
  ru: "Русский",
};
```

## Type-Safe Event Handlers

Stop using `any` for event types:

```ts
// ✅ Correctly typed
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

// For custom component events
type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
```

## The `satisfies` Operator

New in TypeScript 4.9, `satisfies` lets you validate a value matches a type without widening it:

```ts
const config = {
  theme: "dark",
  locale: "en",
  features: ["blog", "projects"],
} satisfies Partial<AppConfig>;

// config.theme is still "dark" (literal), not string
// But TypeScript validated it against AppConfig
```

Compare this to a type annotation which widens `"dark"` to `string`, losing autocompletion on the literal.

## Narrowing with Type Guards

Instead of scattered `as` casts, write type guards that teach the compiler what you know:

```ts
function isApiError(error: unknown): error is { message: string; code: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error
  );
}

try {
  await fetchData();
} catch (error) {
  if (isApiError(error)) {
    // TypeScript knows error.message and error.code exist here
    toast.error(`${error.code}: ${error.message}`);
  }
}
```

## Final Thought

The goal isn't to annotate everything — it's to model your domain accurately. When your types reflect the real constraints of your data, the compiler becomes a collaborator that catches bugs before they reach users.

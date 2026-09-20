# Next.js Project Instructions

## Architecture
Use a **feature-based architecture** with the Next.js App Router.
Keep everything related to a feature close to that feature.
Examples: `home`, `menu`, `order`, `login`, `profile`, `checkout`.

Avoid large global technical folders that collect unrelated code.

## Folder Convention
Route folders use normal names:
```text
menu/
order/
login/
profile/
```

Folders that are **not routes** must start with `_`:
```text
_components/
_ui/
_hooks/
_lib/
_types/
_data/
_actions/
```

## Recommended Structure
```text
src/app/
├── layout.tsx
├── page.tsx
├── _home/
│   ├── home-page.tsx
│   ├── _components/
│   ├── _ui/
│   └── _lib/
├── menu/
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── _components/
│   ├── _ui/
│   ├── _hooks/
│   ├── _lib/
│   └── _types/
├── order/
│   ├── page.tsx
│   ├── _components/
│   ├── _hooks/
│   ├── _lib/
│   ├── _types/
│   └── _actions/
├── login/
│   ├── page.tsx
│   ├── _components/
│   └── _lib/
├── _components/
├── _ui/
├── _hooks/
├── _lib/
└── _types/
```

The homepage uses `_home` because `/` is already represented by `app/page.tsx`.

```tsx
import { HomePage } from "./_home/home-page";

export default function Page() {
  return <HomePage />;
}
```

## Feature Ownership
Keep feature-specific code inside the feature that owns it.

```text
menu/
├── page.tsx
├── _components/
│   ├── menu-header.tsx
│   ├── category-filter.tsx
│   ├── menu-grid.tsx
│   └── food-card.tsx
├── _hooks/
│   └── use-menu-filter.ts
├── _lib/
│   └── filter-menu.ts
└── _types/
    └── menu.ts
```

Do not move feature-specific code into shared folders.
Move code to shared folders only when multiple features genuinely reuse it.

## Component Size
Keep components focused and manageable.
Target around **120 lines or less per component**.
This is a guideline, not a strict limit.

Split a component when it:
- handles multiple responsibilities;
- contains large JSX sections;
- mixes business logic with presentation;
- contains reusable UI;
- becomes difficult to scan or maintain.

Avoid large page files.

Bad:
```text
menu/page.tsx → 500+ lines
```

Good:
```text
menu/page.tsx
menu/_components/menu-header.tsx
menu/_components/category-filter.tsx
menu/_components/menu-grid.tsx
menu/_components/food-card.tsx
```

## Route Files
Keep `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` lightweight.

They should mainly handle:
- route composition;
- metadata;
- data-loading boundaries;
- route-level layout.

Move detailed UI into feature components.

## Reusability
Use this rule:
- used once → keep local;
- reused inside one feature → keep inside that feature;
- reused across multiple features → move to shared code.

Shared UI:
```text
app/_ui/
├── button.tsx
├── input.tsx
├── dialog.tsx
├── badge.tsx
└── skeleton.tsx
```

Shared application components:
```text
app/_components/
├── site-header.tsx
├── site-footer.tsx
├── mobile-navigation.tsx
└── cart-button.tsx
```

Do not create abstractions before they are needed.

## Server and Client Components
Use **Server Components by default**.

Add `"use client"` only when required for:
- state;
- effects;
- browser APIs;
- interactive event logic;
- client-only libraries.

Keep client boundaries as small as possible.
Do not make an entire page a Client Component because one child needs interactivity.

## Business Logic
Do not place complex business logic directly inside JSX.

Use:
```text
_hooks/
_lib/
_actions/
_data/
```

Examples:
```text
order/_lib/calculate-order-total.ts
order/_actions/create-order.ts
menu/_hooks/use-menu-filter.ts
```

Prefer pure functions where possible.

## Types
Keep feature-specific types inside the feature:
```text
menu/_types/menu.ts
order/_types/order.ts
```

Move a type to `app/_types` only when multiple features use it.
Do not duplicate the same type in multiple folders.

## Naming
Use descriptive names.

Prefer:
```text
food-card.tsx
category-filter.tsx
order-summary.tsx
delivery-address-form.tsx
```

Avoid:
```text
component.tsx
section.tsx
helper.ts
utils.ts
```

Use `kebab-case` for files/folders and `PascalCase` for React components.

## Imports
Prefer configured path aliases:
```tsx
import { Button } from "@/app/_ui/button";
```

Avoid deep relative imports:
```tsx
import { Button } from "../../../../_ui/button";
```

Do not create circular dependencies.
Shared code must not depend on feature-specific code.

## State
Prefer local state for local UI.
Do not add global state unless multiple unrelated areas genuinely need it.
Prefer Next.js server-side data patterns before unnecessary client-side state.

## Forms
Break large forms into logical components:
```text
checkout/_components/
├── customer-info-form.tsx
├── delivery-address-form.tsx
├── payment-method.tsx
└── order-review.tsx
```

Keep validation schemas close to the feature that uses them.

## General Rules
- Keep related code colocated.
- Prefer composition over monolithic components.
- Avoid duplicated logic.
- Avoid premature abstraction.
- Avoid unnecessary dependencies.
- Use semantic HTML and accessible UI.
- Keep responsive behavior in mind.
- Prefer readable code over clever code.
- Remove dead code instead of commenting it out.
- Do not create files/folders without a clear responsibility.
- **NEVER use `import React from "react";`** — Modern Next.js and React use the automatic JSX transform. Only import specific hooks or types directly (e.g., `import { useState } from "react";` or `import type { ReactNode } from "react";`).
- **DO NOT test or build the site (`npm run build`, automated browser tests) after each iteration** unless the user explicitly requests it. Work iteratively and fast without triggering unnecessary build/test cycles.

## Before Adding Code
Check:
1. Which feature owns this code?
2. Is this folder a route or internal folder?
3. Does a reusable component already exist?
4. Is the component becoming too large?
5. Should logic be separated from JSX?
6. Does this really need to be shared globally?

When unsure, keep code inside the feature first.
Move it to shared code only after real reuse appears.

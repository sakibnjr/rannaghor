# Project Coding Rules

1. **Unnecessary React Imports**:
   NEVER use `import React from "react";`. React 19 / Next.js uses the automatic JSX transform. Only import specific hooks or types directly (e.g. `import { useState } from "react";` or `import type { ReactNode } from "react";`).

2. **Testing & Building**:
   DO NOT test or build the site (`npm run build`, automated browser tests, etc.) after each iteration unless the user explicitly requests it.

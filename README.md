# Hunqz monorepo

This repository is a pnpm/turbo monorepo containing multiple apps and shared packages.

## Architecture

repo/
├── .github/
├── .husky/
│
├── apps/
│ ├── spa/
│ └── web/
│
├── packages/
│ ├── shared/
│ └── ui/
│
├── tooling/
│ ├── eslint-config/
│ ├── tailwind-config/
│ └── tsconfig/
│
├── .editorconfig
├── .eslintignore
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc.cjs
│
├── commitlint.config.cjs
├── eslint.config.cjs 
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json


## Prerequisites

- Node.js (recommended >= 18)
- pnpm (managed via Corepack or installed globally)

Install pnpm (recommended via Corepack):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Or install with npm:

```bash
npm install -g pnpm
```

## Clone

Clone the [hunqz](https://github.com/Babanila/hunqz) repository and enter the project folder:

```bash
git clone https://github.com/Babanila/hunqz
cd hunqz
```

Replace [hunqz](https://github.com/Babanila/hunqz) with the HTTPS or SSH URL of this repository.

## Install dependencies

Install workspace dependencies from the repository root:

```bash
pnpm install
```

This will install dependencies for all workspace packages using pnpm and Turbo.

## Development

- Run all development tasks (uses Turbo to run package dev scripts in parallel):

```bash
pnpm dev
```

- Run a single app (examples):

```bash
cd apps/spa
pnpm dev

# From repo root (filter by package)
pnpm --filter ./apps/spa dev

cd apps/web
pnpm dev

# From repo root
pnpm --filter ./apps/web dev
```

The `apps/spa` project uses Vite and `apps/web` is a Next.js app — their individual `package.json` files expose package-specific scripts.

## Build

Build all packages via Turbo:

```bash
pnpm build
```

Or build a single package from its folder:

```bash
cd apps/spa
pnpm build
```

## Tests

- Run the test suite for the entire monorepo:

```bash
pnpm test
```

- Run tests for a single package:

```bash
pnpm --filter ./packages/shared test
```

Tests use the configured test runners in each package (e.g., Vitest/Jest depending on package).

## Linting & Formatting

- Lint all packages:

```bash
pnpm lint
```

- Format and fix lint issues:

```bash
pnpm format
pnpm lint:fix
```

## Useful scripts (root `package.json`)

- `pnpm dev` : run dev across workspace (Turbo)
- `pnpm build` : build across workspace (Turbo)
- `pnpm test` : run tests across workspace (Turbo)
- `pnpm lint` : lint across workspace (Turbo)


## Using the App

- Start the dev server for the app you want to test:

```bash
# For SPA (Vite)
pnpm --filter ./apps/spa dev

# For Next web
pnpm --filter ./apps/web dev
```

- Open the app in your browser:
	- SPA: http://localhost:5173
	- Web: http://localhost:3000

- Test the profiles flow:
	- From the homepage click the "Explore Profiles" button to load the profiles list.
	- Or click the "Profile" link in the page header to open the profile page.
	- Expected result: the profiles list or the selected profile page loads and displays profile details.


## Notes

- The project uses `pnpm` workspaces and `turbo` for orchestration. Running `pnpm install` from the root will populate workspace symlinks and make package scripts available from subfolders.
- If you run into permission or environment issues, ensure your Node.js and pnpm versions are compatible with the workspace (see `package.json` `packageManager` field).

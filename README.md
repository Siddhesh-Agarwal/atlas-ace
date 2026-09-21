# atlas-ace

A country guessing game. Given a capital or currency, name the country. Built with React 19, TypeScript, and Vite.

## How it works

- Two modes: **Capital** and **Currency**
- Type a country name to guess — typo-tolerant matching via Levenshtein distance
- Shared currencies (e.g. Euro, CFA Franc, US Dollar) accept any valid country
- Tracks streak and best score per mode
- Hint reveals first letter and letter count

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # type-check and build for production
pnpm lint     # biome lint --write
pnpm format   # biome format --write
pnpm check    # biome check --fix
pnpm preview  # preview production build
```

## Tech

- React 19 with React Compiler (via Babel plugin)
- TypeScript (strict, `erasableSyntaxOnly`)
- Vite 8
- Biome for linting and formatting
- Tailwind CSS + CSS custom properties for theming

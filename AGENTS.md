# atlas-ace

A country guessing game (capital or currency) built with React 19, TypeScript, and Vite.

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # tsc -b && vite build
pnpm lint       # biome lint --write
pnpm format     # biome format --write
pnpm check      # biome check --fix
pnpm preview    # vite preview
```

## Architecture

- **Entry:** `src/main.tsx` → `src/App.tsx`
- **Game data:** `src/lib/countries.ts` — single source of truth for country entries, guess validation, and typo-tolerant matching (Levenshtein distance)
- **Styling:** Tailwind utility classes + CSS custom properties defined in `src/index.css` (dark "ink/parchment/brass" theme). Fonts: Fraunces (display) and IBM Plex Mono (labels).
- **React Compiler** is enabled via `babel-plugin-react-compiler` in `vite.config.ts` — do not add manual `useMemo`/`useCallback` unless profiling shows a need.

## Conventions

- Biome is the sole linter/formatter.
- Tabs for indentation (Biome default).
- Double quotes for JS/TS strings.
- The `checkGuess` function accepts any country that shares the same capital/currency as the target (e.g. guessing "France" for "Euro" is correct). When adding countries, ensure aliases are lowercase.
- No tests exist. No CI is configured.

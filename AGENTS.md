# AGENTS.md — Instructions for AI Coding Agents

## Tech stack

- Next.js 16 (App Router) with React 19
- TypeScript in strict mode
- Tailwind CSS 4 for styling
- Biome for formatting and linting
- Jest + React Testing Library for tests
- React Compiler enabled (`babel-plugin-react-compiler`)

## Architecture

The project follows Clean Architecture:

```
src/core/entities/       — Domain models (e.g. Game)
src/core/interfaces/     — Repository interfaces (e.g. IGameRepository)
src/core/use-cases/      — Business logic (e.g. GameService)
src/infrastructure/      — Concrete implementations (file repos, analytics)
src/lib/container.ts     — Dependency injection container
```

Keep domain logic in `core/` free of framework dependencies. Infrastructure implements the interfaces defined in `core/interfaces/`.

## Key commands

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run test      # Run tests
npm run lint      # Biome check
npm run format    # Biome format (auto-fix)
```

## Code style

- Biome handles formatting (2-space indent) and linting — run `npm run lint` before committing
- Path alias: `@/*` maps to `src/*`
- No manual `useMemo`/`useCallback` — React Compiler handles memoization
- Use `"use client"` directive on client components
- All user-facing text is in **Belarusian**

## Testing

- Jest with `ts-jest` and `jest-environment-jsdom`
- React Testing Library for component tests
- Tests are colocated in `__tests__/` directories next to source files

## Important patterns

- Game state is persisted in `localStorage`
- PostHog is used for analytics; Vercel Analytics for web vitals
- The `data/` directory (word embeddings) must be manually cloned from a separate repo — do not commit changes to it

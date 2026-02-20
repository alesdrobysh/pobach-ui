# Побач (pobach.app)

A daily semantic word guessing game for the Belarusian language, inspired by [Contexto](https://contexto.me/) and [Semantle](https://semantle.com/).

## How it works

Every day a new secret word is chosen. Players submit guesses and the game ranks each guess by semantic similarity using ML word embeddings — the closer the meaning, the lower the rank number. The goal is to find the secret word.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Linting/Formatting:** Biome
- **Testing:** Jest, React Testing Library
- **Analytics:** PostHog, Vercel Analytics
- **Deployment:** Vercel (Frankfurt region)

## Getting started

### Prerequisites

- Node.js (see `.nvmrc`)
### Install & run

```bash
npm install
npm run dev        # start dev server
```

You also need to manually clone the data repository into the `data/` directory (see [Data](#data) below).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Auto-format with Biome |
| `npm run test` | Run Jest tests |
| `npm run clean` | Remove `.next` and `node_modules` |

## Project structure

```
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # React components
├── contexts/       # React contexts
├── core/
│   ├── entities/       # Domain models
│   ├── interfaces/     # Repository interfaces
│   └── use-cases/      # Business logic (GameService)
├── hooks/          # Custom React hooks
├── infrastructure/ # Concrete implementations (repos, analytics)
├── lib/            # Utilities, config, DI container
└── providers/      # React providers
```

## Data

Word embeddings live in a separate private repository. Clone it manually into `data/`.

## Inspirations

- [Contexto](https://contexto.me/)
- [Semantle](https://semantle.com/)

## Word sources

- [Belarus/GrammarDB](https://github.com/Belarus/GrammarDB)
- [verbumby/slouniki](https://github.com/verbumby/slouniki)

## Contact

support@pobach.app

## License

The code in this repository is licensed under the [MIT License](LICENSE).

# Project notes

Martin Lechner's personal website, built with Astro and deployed to Netlify from `master`.

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type-check (`astro check`) and build into `dist/`
- `npm run lint:prose`: check spelling and grammar of every Markdown file with [Harper](https://writewithharper.com). Pass file paths to check only those.

Node comes from `.tool-versions` (asdf).

## Content

- Blog posts live in `src/content/blog/<slug>/index.md`, book reviews in `src/content/books/<slug>.md`, talks in `src/data/talks.json`. Front matter schemas are in `src/content.config.ts`.
- Book reviews with `draft: true` stay in the repo but aren't published.
- Prose is written in British English.

## Prose linter

The `Prose lint` GitHub Action runs `npm run lint:prose` on every pull request and fails if it reports anything, so run it after changing any Markdown file and fix what it finds.

- The linter is `scripts/lint-prose.js`. It only reports mistakes, not style suggestions; the ignored lint kinds and disabled rules are listed at the top of the script.
- Names, brands and technical terms Harper doesn't know go into `scripts/dictionary.txt`, one per line (case-sensitive, kept sorted). Only add real words there. Fix actual typos in the text.

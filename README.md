# Martin Lechner's website

Source of [my personal website](https://lechner.work). It's built with [Astro](https://astro.build) and deployed to Netlify.

## Development

```sh
npm install
npm run dev         # start the dev server
npm run build       # type-check and build into dist/
npm run lint:prose  # check spelling and grammar of all Markdown files
```

## Content

- Blog posts: `src/content/blog/<slug>/index.md`
- Book reviews: `src/content/books/<slug>.md` (set `draft: true` to keep a review unpublished)
- Talks: `src/data/talks.json`

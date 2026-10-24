import { defineCollection } from "astro:content"
import { file, glob } from "astro/loaders"
import { z } from "astro/zod"

const blog = defineCollection({
  // Each post lives in its own folder as index.md, the folder name is the slug
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
  }),
})

const books = defineCollection({
  // One review per file, the body is the review text
  loader: glob({ pattern: "*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.enum(["People & leadership", "Engineering"]),
    // When the review was added, newest reviews are listed first
    date: z.coerce.date(),
    // Drafts are kept in the repo but not shown on the site
    draft: z.boolean().default(false),
  }),
})

const talks = defineCollection({
  loader: file("./src/data/talks.json", {
    parser: text =>
      JSON.parse(text).map((talk: { title: string }, order: number) => ({
        id: talk.title,
        order,
        ...talk,
      })),
  }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    kind: z.enum(["Talk", "Lightning talk"]),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
  }),
})

export const collections = { blog, books, talks }

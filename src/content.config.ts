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
  loader: file("./src/data/books.json", {
    parser: text =>
      JSON.parse(text).map((book: { title: string }, order: number) => ({
        id: book.title,
        order,
        ...book,
      })),
  }),
  schema: z.object({
    // Position in the JSON file, collections are otherwise sorted by id
    order: z.number(),
    title: z.string(),
    author: z.string(),
    category: z.enum(["People & leadership", "Engineering"]),
    text: z.string(),
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

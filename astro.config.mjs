// @ts-check
import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://www.lechner.work",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  image: {
    layout: "constrained",
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
})

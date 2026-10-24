// Checks spelling and grammar of Markdown files with Harper (https://writewithharper.com).
// Usage: npm run lint:prose [files...]  (defaults to every Markdown file in the repo)
// Words Harper doesn't know, like names, go into dictionary.txt next to this script.
import { glob, readFile } from "node:fs/promises"
import { Dialect, LocalLinter } from "harper.js"
import { binaryInlined } from "harper.js/binaryInlined"

// Only report mistakes, not style suggestions like "use excellent instead of very good"
const IGNORED_KINDS = ["Enhancement", "Formatting", "Readability", "Regionalism", "Style"]
const DISABLED_RULES = ["UseTitleCase", "DisjointPrefixes", "MissingPreposition"]

const files = process.argv.slice(2)
if (files.length === 0) {
  const exclude = ["node_modules", "dist", ".astro", ".git"]
  for await (const file of glob("**/*.md", { exclude })) files.push(file)
}

const linter = new LocalLinter({ binary: binaryInlined, dialect: Dialect.British })
await linter.setLintConfig(Object.fromEntries(DISABLED_RULES.map(rule => [rule, false])))
const dictionary = (await readFile(new URL("dictionary.txt", import.meta.url), "utf8"))
  .split("\n")
  .map(word => word.trim())
  .filter(Boolean)
await linter.importWords(dictionary)

// Blank out the frontmatter so it isn't linted, keeping newlines so line numbers stay correct
const stripFrontmatter = text =>
  text.replace(/^---\n[\s\S]*?\n---\n/, match => match.replace(/[^\n]/g, " "))

const position = (text, index) => {
  const before = text.slice(0, index).split("\n")
  return `${before.length}:${before.at(-1).length + 1}`
}

let problems = 0
for (const file of files.sort()) {
  const text = await readFile(file, "utf8")
  for (const lint of await linter.lint(stripFrontmatter(text), { language: "markdown" })) {
    if (IGNORED_KINDS.includes(lint.lint_kind_pretty())) continue
    // Harper still suggests other casings for dictionary words, e.g. "JS" for "Gatsby.js"
    if (dictionary.includes(lint.get_problem_text())) continue
    const suggestions = lint.suggestions().map(s => `"${s.get_replacement_text()}"`)
    const hint = suggestions.length > 0 ? ` (try ${suggestions.slice(0, 3).join(", ")})` : ""
    console.log(
      `${file}:${position(text, lint.span().start)} ${lint.lint_kind_pretty()}: ${lint.message()}${hint}`
    )
    problems++
  }
}

console.log(problems === 0 ? "No prose problems found." : `\n${problems} prose problem(s) found.`)
process.exitCode = problems === 0 ? 0 : 1

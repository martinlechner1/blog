---
title: Revamping this website
date: "2026-10-23T12:00:00.000Z"
description: From Gatsby 2 to Astro, and saying goodbye to my homegrown tracking
---

This website started in early 2019 as a Gatsby starter blog, and [I wrote about how I deployed it](/blog/deploy-blog/) back then. Since then it has mostly been left alone. The stack aged accordingly: Gatsby 2, React 16 and a build pinned to Node 12, which reached end of life in 2022. It was time for a refresh.

## Why Astro

The site is a handful of Markdown posts and some JSON files for books and talks. It doesn't need a client-side React app, a GraphQL layer or an offline service worker. [Astro](https://astro.build) fits this much better: content collections with a typed schema, static HTML output and zero JavaScript by default. The migration mostly meant moving the content into `src/content` and rewriting a few pages as `.astro` components.

The Node version is now pinned in a `.tool-versions` file managed by [asdf](https://asdf-vm.com), so my local setup and the Netlify build use the same version.

## A cleaner design

I wanted something a bit more professional: a single readable column, a clear navigation, system fonts and automatic dark mode. Photos in posts are now resized and served as WebP in multiple sizes, which makes posts like the [coffee guide](/blog/coffee/) a lot lighter.

The books section stayed, since it is still my favourite part. The reviews are unchanged, but the books are now grouped by topic and show their authors.

## Goodbye, tracking

In 2019 I built [serverless tracking on a budget](/blog/tracking/) with Netlify functions and DynamoDB. It was a fun project, but I haven't looked at the numbers in years. So it is gone: no hit counter, no analytics, no cookies.

## Keeping old links working

Posts used to live at the site root, for example `/coffee/`. They now live under `/blog/`, and Netlify redirects the old URLs, so existing links keep working.

## Built entirely from my phone

The fun part: I didn't touch a laptop for any of this. [Claude Code](https://claude.com/claude-code) runs on `mini`, a small home server, and I drove the whole session from my phone using Claude Code's Remote Control. I described what I wanted, and Claude cloned the repo, set up asdf and Node, did the migration and committed the result on a branch.

To see the result, the Astro dev server listens on the server's [Tailscale](https://tailscale.com) address. My phone is on the same tailnet, so I could open the site under `mini`'s MagicDNS name and watch every change hot-reload, without exposing anything to the local network or the internet. Reviewing the design on a phone screen first also turned out to be a nice forcing function for a mobile-first layout.

The whole migration happened in a single session, mobile first in the most literal sense.

// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mathiash98.github.io",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
  ],
  redirects: {
    "/boligkalkulator": {
      status: 301,
      destination: "/bolig-vs-indeksfond",
    },
    "/posts/[...slug]": {
      status: 301,
      destination: "/blog/[...slug]",
    },
    // "index.xml": {
    //   status: 301,
    //   destination: "/rss.xml",
    // },
  },
});

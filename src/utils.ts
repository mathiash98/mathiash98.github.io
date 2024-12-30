import { getCollection } from "astro:content";

/**
 * Returns all blog posts sorted by date descending.
 * Filters away drafts in production.
 */
export async function getPosts() {
  return (await getCollection("blog"))
    .filter((post) => (import.meta.env.PROD ? post.data.draft !== true : true))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

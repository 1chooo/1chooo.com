import { remark } from "remark";
import html from "remark-html";

const cache = new Map<string, string>();

export default async function markdownToHtml(markdown: string) {
  if (cache.has(markdown)) {
    return cache.get(markdown)!;
  }

  const result = await remark().use(html).process(markdown);
  const htmlContent = result.toString();

  cache.set(markdown, htmlContent);

  return htmlContent;
}

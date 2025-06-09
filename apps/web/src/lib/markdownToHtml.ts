import html from "remark-html";
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const cache = new Map<string, string>();

export default async function markdownToHtml(markdown: string) {
  if (cache.has(markdown)) {
    return cache.get(markdown)!;
  }

  const result = await unified()
    .use(html)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      // or `theme` for a single theme
      themes: {
        light: 'github-dark',
        dark: 'github-dark',
      }
    })
    .use(rehypeStringify)
    .process(markdown);

  const htmlContent = result.toString();

  cache.set(markdown, htmlContent);

  return htmlContent;
}

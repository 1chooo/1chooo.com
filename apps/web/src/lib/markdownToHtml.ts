import html from "remark-html";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

const cache = new Map<string, string>();

export default async function markdownToHtml(markdown: string) {
  if (cache.has(markdown)) {
    return cache.get(markdown)!;
  }

  const result = await unified()
    .use(html)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeStringify)
    .use(rehypeShiki, {
      theme: "github-dark",
    })
    .use(rehypeStringify)
    .process(markdown);

  const htmlContent = result.toString();

  cache.set(markdown, htmlContent);

  return htmlContent;
}

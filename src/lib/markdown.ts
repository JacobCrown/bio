import { Marked } from 'marked';

/**
 * Renders Markdown text (from content bodies or text fields) to HTML.
 * `headingOffset` shifts heading levels so that `##` inside an entry nests
 * correctly under the page's own headings.
 */
export function renderMarkdown(source: string, { headingOffset = 0, inline = false } = {}): string {
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const level = Math.min(depth + headingOffset, 6);
        return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
    },
  });
  const html = inline ? marked.parseInline(source) : marked.parse(source);
  return typeof html === 'string' ? html : '';
}

/** First paragraph of a Markdown text — used for list excerpts. */
export const firstParagraph = (source: string) => source.trim().split(/\n\s*\n/)[0] ?? '';

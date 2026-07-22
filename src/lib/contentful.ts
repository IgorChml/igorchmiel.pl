import { BlogPost } from '../types';

// ── Rich Text types ─────────────────────────────────────────────────
interface RtText  { nodeType: 'text'; value: string; marks: { type: string }[] }
interface RtBlock { nodeType: string; content: RtNode[]; data?: any }
type RtNode = RtText | RtBlock;
interface RtDocument { nodeType: 'document'; content: RtNode[] }

function inlineText(nodes: RtNode[]): string {
  return nodes
    .filter((n): n is RtText => n.nodeType === 'text')
    .map(n => {
      let v = n.value;
      const hasBold   = n.marks.some(m => m.type === 'bold');
      const hasItalic = n.marks.some(m => m.type === 'italic');
      const hasCode   = n.marks.some(m => m.type === 'code');
      if (hasCode)   v = `\`${v}\``;
      if (hasBold)   v = `**${v}**`;
      if (hasItalic) v = `*${v}*`;
      return v;
    })
    .join('');
}

function richTextToMarkdown(doc: RtDocument, assetMap: Record<string, string> = {}): string {
  if (!doc?.content) return '';
  const parts: string[] = [];

  for (const node of doc.content) {
    switch (node.nodeType) {
      case 'embedded-asset-block': {
        const assetId = (node as RtBlock).data?.target?.sys?.id;
        const url = assetId ? assetMap[assetId] : undefined;
        if (url) parts.push(`![image](${url})`);
        break;
      }
      case 'paragraph': {
        const text = inlineText((node as RtBlock).content).trim();
        if (text) parts.push(text);
        break;
      }
      case 'heading-1':
      case 'heading-2':
      case 'heading-3':
        parts.push(`### ${inlineText((node as RtBlock).content)}`);
        break;
      case 'heading-4':
      case 'heading-5':
      case 'heading-6':
        parts.push(`#### ${inlineText((node as RtBlock).content)}`);
        break;
      case 'unordered-list': {
        const items = (node as RtBlock).content
          .map(li => '- ' + inlineText(
            (li as RtBlock).content?.[0]?.nodeType !== 'text'
              ? ((li as RtBlock).content[0] as RtBlock).content
              : (li as RtBlock).content
          )).join('\n');
        parts.push(items);
        break;
      }
      case 'ordered-list': {
        const items = (node as RtBlock).content
          .map((li, i) => `${i + 1}. ` + inlineText(
            (li as RtBlock).content?.[0]?.nodeType !== 'text'
              ? ((li as RtBlock).content[0] as RtBlock).content
              : (li as RtBlock).content
          )).join('\n');
        parts.push(items);
        break;
      }
      case 'blockquote': {
        const text = (node as RtBlock).content
          .map(p => inlineText((p as RtBlock).content)).join(' ');
        parts.push(`*${text}*`);
        break;
      }
      default:
        if ((node as RtBlock).content) {
          const text = inlineText((node as RtBlock).content).trim();
          if (text) parts.push(text);
        }
    }
  }
  return parts.join('\n\n');
}

function richTextToSummary(doc: RtDocument, maxLen = 220): string {
  if (!doc?.content) return '';
  for (const node of doc.content) {
    if (node.nodeType === 'paragraph') {
      const text = (node as RtBlock).content
        .filter((n): n is RtText => n.nodeType === 'text')
        .map(n => n.value).join('').trim();
      if (text) return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
    }
  }
  return '';
}

// ── Open Graph image via Contentful Images API ──────────────────────
// Social scrapers (Facebook, LinkedIn, WhatsApp) reject images that are
// too large or lack fixed dimensions, falling back to the favicon.
// This resizes/crops the raw asset to a 1200×630 progressive JPEG.
export function contentfulOgImage(assetUrl: string): string {
  if (!assetUrl) return '';
  const sep = assetUrl.includes('?') ? '&' : '?';
  return `${assetUrl}${sep}w=1200&h=630&fit=fill&f=center&fm=jpg&fl=progressive&q=80`;
}

// ── SEO-friendly slug from a post title ─────────────────────────────
// "Jak AI zmienia SEO? 5 trendów!" → "jak-ai-zmienia-seo-5-trendow"
export function slugify(title: string): string {
  return title
    .toLowerCase()
    // ł/Ł survive NFD normalization, so map them explicitly
    .replace(/ł/g, 'l')
    // decompose accented chars (ą→a+ogonek) and drop the combining marks
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    // punctuation and symbols → space, so "SEO?5" doesn't glue into "seo5"
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pl-PL', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

function estimateReadTime(text: string): string {
  const mins = Math.max(1, Math.round(text.split(/\s+/).length / 200));
  return `${mins} min czytania`;
}

// ── Parse a raw Contentful entries response into BlogPost[] ──────────
export function parseEntries(data: any): BlogPost[] {
  const items: any[] = data?.items || [];

  // Build asset id → URL map from includes
  const assetMap: Record<string, string> = {};
  for (const asset of data?.includes?.Asset ?? []) {
    const url: string = asset.fields?.file?.url ?? '';
    if (url) assetMap[asset.sys.id] = url.startsWith('//') ? `https:${url}` : url;
  }

  const seenSlugs = new Set<string>();

  return items.map((item): BlogPost => {
    const f        = item.fields;
    const markdown = f.body ? richTextToMarkdown(f.body as RtDocument, assetMap) : '';
    const summary  = f.body ? richTextToSummary(f.body  as RtDocument) : '';
    const imageId  = f.image?.sys?.id;

    // Prefer an editor-defined slug field; otherwise derive one from the
    // title. Fall back to sys.id for untitled posts, and disambiguate
    // duplicate titles with the entry id so lookups stay unambiguous.
    let slug = (f.slug as string) || slugify(f.title ?? '') || item.sys.id;
    if (seenSlugs.has(slug)) slug = `${slug}-${item.sys.id.slice(0, 6).toLowerCase()}`;
    seenSlugs.add(slug);

    return {
      id:            item.sys.id,
      slug,
      title:         f.title ?? 'Bez tytułu',
      summary,
      content:       markdown,
      category:      (f.category as string) || 'tech',
      categoryLabel: (f.categoryLabel as string) || f.category || 'Development & SaaS',
      readTime:      estimateReadTime(markdown),
      date:          formatDate(item.sys.createdAt),
      imageUrl:      imageId ? (assetMap[imageId] ?? '') : '',
      isoDate:       item.sys.createdAt,
    };
  });
}

// ── Main fetch — calls our Express proxy, token stays server-side ──
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blog/posts');
    if (!res.ok) return [];

    const data = await res.json();
    return parseEntries(data);
  } catch (err) {
    console.error('fetchBlogPosts error:', err);
    return [];
  }
}

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

function richTextToMarkdown(doc: RtDocument): string {
  if (!doc?.content) return '';
  const parts: string[] = [];

  for (const node of doc.content) {
    switch (node.nodeType) {
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

// ── Main fetch — calls our Express proxy, token stays server-side ──
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blog/posts');
    if (!res.ok) return [];

    const data = await res.json();
    const items: any[] = data.items || [];

    // Build asset id → URL map from includes
    const assetMap: Record<string, string> = {};
    for (const asset of data.includes?.Asset ?? []) {
      const url: string = asset.fields?.file?.url ?? '';
      if (url) assetMap[asset.sys.id] = url.startsWith('//') ? `https:${url}` : url;
    }

    return items.map((item): BlogPost => {
      const f        = item.fields;
      const markdown = f.body ? richTextToMarkdown(f.body as RtDocument) : '';
      const summary  = f.body ? richTextToSummary(f.body  as RtDocument) : '';
      const imageId  = f.image?.sys?.id;

      return {
        id:            item.sys.id,
        slug:          item.sys.id,
        title:         f.title ?? 'Bez tytułu',
        summary,
        content:       markdown,
        category:      'tech' as BlogPost['category'],
        categoryLabel: 'Development & SaaS',
        readTime:      estimateReadTime(markdown),
        date:          formatDate(item.sys.createdAt),
        imageUrl:      imageId ? (assetMap[imageId] ?? '') : '',
      };
    });
  } catch (err) {
    console.error('fetchBlogPosts error:', err);
    return [];
  }
}

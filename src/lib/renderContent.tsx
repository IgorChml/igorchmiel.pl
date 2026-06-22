import React from 'react';

// Pure markdown-ish renderer (no React hooks) so it can run in both Server
// and Client Components. Renders the simplified markdown produced by the
// Contentful rich-text converter.
export function renderContent(content: string) {
  return content.split('\n\n').map((paragraph, index) => {
    const trimmed = paragraph.trim();
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img key={index} src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-lg my-2" loading="lazy" />
      );
    }
    if (trimmed.startsWith('####')) {
      return (
        <h4 key={index} className="text-base sm:text-lg font-bold text-white pt-2 pb-1 font-sans">
          {trimmed.replace('####', '').trim()}
        </h4>
      );
    }
    if (trimmed.startsWith('###')) {
      return (
        <h3 key={index} className="text-lg sm:text-xl font-bold text-white pt-4 pb-1 font-sans border-b border-white/8">
          {trimmed.replace('###', '').trim()}
        </h3>
      );
    }
    if (trimmed.startsWith('-') || (trimmed.startsWith('*') && !trimmed.endsWith('*'))) {
      const items = trimmed.split('\n').map(item => item.replace(/^[\s\-\*]+/, '').trim());
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 text-neutral-400">
          {items.map((it, i) => (
            <li key={i}>
              {it.includes('**') ? (
                <span>{it.split('**').map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-semibold">{p}</strong> : p)}</span>
              ) : it}
            </li>
          ))}
        </ul>
      );
    }
    if (trimmed.startsWith('1.')) {
      const items = trimmed.split(/\n\d+\.\s+/).filter(Boolean);
      return (
        <ol key={index} className="list-decimal pl-5 space-y-2 text-neutral-400">
          {items.map((it, i) => (
            <li key={i}>
              {it.includes('**') ? (
                <span>{it.split('**').map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-semibold">{p}</strong> : p)}</span>
              ) : it}
            </li>
          ))}
        </ol>
      );
    }
    if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
      return (
        <p key={index} className="italic text-neutral-500 pl-4 border-l-2 border-brand py-1 bg-white/3 rounded-r">
          {trimmed.replace(/^\*|\*$/g, '').trim()}
        </p>
      );
    }
    if (trimmed.includes('**')) {
      const parts = trimmed.split('**');
      return (
        <p key={index} className="font-sans leading-relaxed text-neutral-400">
          {parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi} className="text-neutral-100 font-bold">{p}</strong> : p)}
        </p>
      );
    }
    return (
      <p key={index} className="font-sans leading-relaxed text-neutral-400">
        {trimmed}
      </p>
    );
  });
}

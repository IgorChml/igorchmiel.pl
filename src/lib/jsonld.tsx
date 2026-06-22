const BASE = 'https://igorchmiel.pl';

export interface Crumb {
  name: string;
  path: string; // absolute path beginning with '/'
}

// Builds a schema.org BreadcrumbList. Pass the trail from Home → … → current.
// "Home" is prepended automatically.
export function breadcrumbJsonLd(trail: Crumb[]) {
  const items = [{ name: 'Strona główna', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: `${BASE}${c.path === '/' ? '/' : c.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

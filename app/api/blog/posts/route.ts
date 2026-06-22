import { NextResponse } from 'next/server';

export async function GET() {
  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID || '';
  const token = process.env.VITE_CONTENTFUL_ACCESS_TOKEN || '';

  if (!spaceId || !token) {
    return NextResponse.json({ items: [], includes: {}, total: 0 });
  }

  try {
    const cfUrl =
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries` +
      `?content_type=blogPage&access_token=${token}&include=1&order=-sys.createdAt`;

    const cfRes = await fetch(cfUrl, { next: { revalidate: 300 } });

    if (!cfRes.ok) {
      return NextResponse.json({ items: [], includes: {}, total: 0 });
    }

    const data = await cfRes.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ items: [], includes: {}, total: 0 });
  }
}

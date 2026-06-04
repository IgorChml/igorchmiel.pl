export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID || '';
  const token   = process.env.VITE_CONTENTFUL_ACCESS_TOKEN || '';

  if (!spaceId || !token) {
    console.warn('[blog/posts] Contentful env vars missing');
    return res.status(200).json({ items: [], includes: {}, total: 0 });
  }

  try {
    const cfUrl =
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries` +
      `?content_type=blogPage&access_token=${token}&include=1&order=-sys.createdAt`;

    const cfRes = await fetch(cfUrl);

    if (!cfRes.ok) {
      const errText = await cfRes.text();
      console.error('[blog/posts] Contentful error:', cfRes.status, errText);
      return res.status(200).json({ items: [], includes: {}, total: 0 });
    }

    const data = await cfRes.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error('[blog/posts] fetch exception:', err.message);
    return res.status(200).json({ items: [], includes: {}, total: 0 });
  }
}

import { BlogPostReader } from '../../../src/components/BlogPage';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <BlogPostReader slug={slug} />
      </div>
    </div>
  );
}

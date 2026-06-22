import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-extrabold text-brand font-mono">404</h1>
        <h2 className="text-xl font-bold text-white font-sans">Strona nie została znaleziona</h2>
        <p className="text-sm text-neutral-500 font-sans leading-relaxed">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-brand text-neutral-950 rounded font-sans font-bold text-xs uppercase tracking-wider hover:bg-brand-dark hover:scale-105 active:scale-95 transition-all duration-150"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}

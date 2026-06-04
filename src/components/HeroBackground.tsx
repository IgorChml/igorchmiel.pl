import React from 'react';

/**
 * Animated hero background using the provided circuit-board image.
 * Effect: slow Ken Burns (zoom + pan) + subtle amber/blue gradient overlay + scanline shimmer.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">

      {/* ── The image with Ken Burns animation ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'heroBgKenBurns 22s ease-in-out infinite alternate',
          opacity: 0.55,
        }}
      />

      {/* ── Dark vignette + brand colour tint overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(255,182,39,0.07) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 80% at 20% 60%, rgba(59,159,232,0.06) 0%, transparent 70%),' +
            'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.15) 50%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      {/* ── Scanline shimmer (subtle horizontal moving highlight) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)',
          animation: 'heroScanline 8s linear infinite',
        }}
      />

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.7) 60%, transparent 100%)',
        }}
      />

      {/* ── CSS keyframes injected via style tag ── */}
      <style>{`
        @keyframes heroBgKenBurns {
          0%   { transform: scale(1.0)  translate(0px, 0px); }
          25%  { transform: scale(1.06) translate(-1%, 0.5%); }
          50%  { transform: scale(1.09) translate(1%, -1%); }
          75%  { transform: scale(1.05) translate(-0.5%, 1%); }
          100% { transform: scale(1.0)  translate(0px, 0px); }
        }
        @keyframes heroScanline {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
      `}</style>
    </div>
  );
}

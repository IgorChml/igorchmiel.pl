import React from 'react';

const VIDEO_URL =
  'https://firebasestorage.googleapis.com/v0/b/image-storage-c04c6.firebasestorage.app/o/wykonaj_t%C4%85_sam%C4%85_czynno%C5%9B%C4%87_dla_t.mp4?alt=media&token=183ccc2e-22d5-4e82-b2a2-f6ee072b88d5';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">

      {/* ── Looping background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Brand colour tint overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(255,182,39,0.07) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 80% at 20% 60%, rgba(59,159,232,0.05) 0%, transparent 70%),' +
            'linear-gradient(to bottom, rgba(10,10,10,0.30) 0%, rgba(10,10,10,0.10) 50%, rgba(10,10,10,0.50) 100%)',
        }}
      />

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.7) 60%, transparent 100%)',
        }}
      />
    </div>
  );
}

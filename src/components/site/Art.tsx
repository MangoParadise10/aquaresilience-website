import { useId } from "react";

// Original line art for Dignoria: the noria wheel, Persian geometry, the qanat, flowing water.

type ArtProps = { className?: string };

/** Silver gradient defs shared by the line drawings. */
const Silver = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="0.35" stopColor="#9fb2cc" />
      <stop offset="0.55" stopColor="#f4f8ff" />
      <stop offset="1" stopColor="#7f95b3" />
    </linearGradient>
  </defs>
);

/**
 * The Dignoria mark, the Royal Seal: a solid eight-pointed Persian star (khatam) struck like a
 * king's seal, the brand line running round the rim, and the noria wheel and blue eye of water
 * cut out of the metal at its centre.
 */
export const Mark = ({ className = "", ring = true }: ArtProps & { ring?: boolean }) => {
  const id = useId().replace(/:/g, "");
  const spokes = [
    [100, 80, 100, 73], [100, 120, 100, 127], [80, 100, 73, 100], [120, 100, 127, 100],
    [86, 86, 81, 81], [114, 114, 119, 119], [114, 86, 119, 81], [86, 114, 81, 119],
  ];
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#9fb2cc" />
          <stop offset="0.55" stopColor="#f4f8ff" />
          <stop offset="1" stopColor="#6f85a5" />
        </linearGradient>
        <radialGradient id={`e${id}`} cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#a5f3fc" />
          <stop offset="0.45" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#1e3a8a" />
        </radialGradient>
        <path id={`r${id}`} d="M100,100 m-71,0 a71,71 0 1,1 142,0 a71,71 0 1,1 -142,0" />
      </defs>
      <circle cx="100" cy="100" r="94" stroke={`url(#s${id})`} strokeWidth="5" />
      <circle cx="100" cy="100" r="85" stroke={`url(#s${id})`} strokeWidth="1.6" />
      {ring && (
        <text fontFamily="Cinzel, Georgia, serif" fontWeight="700" fontSize="11.5" letterSpacing="5.2" fill="#dfe7f3">
          <textPath href={`#r${id}`}>DIGNORIA · WATER RESTORED · DIGNITY RENEWED ·</textPath>
        </text>
      )}
      <g fill={`url(#s${id})`}>
        <rect x="62" y="62" width="76" height="76" />
        <rect x="62" y="62" width="76" height="76" transform="rotate(45 100 100)" />
      </g>
      <circle cx="100" cy="100" r="27" fill="#060f2a" />
      <g stroke={`url(#s${id})`} strokeWidth="3">
        {spokes.map(([x1, y1, x2, y2]) => <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
      </g>
      <circle cx="100" cy="100" r="11" fill={`url(#e${id})`} />
      <circle cx="100" cy="100" r="4" fill="#020617" />
      <circle cx="97" cy="96.5" r="2" fill="#fff" />
    </svg>
  );
};

/** The noria: an ancient water wheel lifting and circulating water. */
export const Noria = ({ className = "", spin = true }: ArtProps & { spin?: boolean }) => {
  const id = useId().replace(/:/g, "");
  const n = 16;
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden="true">
      <Silver id={`n${id}`} />
      <g className={spin ? "animate-spin-slow" : ""} stroke={`url(#n${id})`}>
        <circle cx="200" cy="200" r="170" strokeWidth="1.6" />
        <circle cx="200" cy="200" r="150" strokeWidth="0.8" opacity="0.6" />
        <circle cx="200" cy="200" r="30" strokeWidth="1.6" />
        <path d="M200 160 L228 172 L240 200 L228 228 L200 240 L172 228 L160 200 L172 172 Z" strokeWidth="1" opacity="0.8" />
        {Array.from({ length: n }).map((_, i) => {
          const a = (i / n) * Math.PI * 2;
          return <line key={`s${i}`} x1={200 + Math.cos(a) * 30} y1={200 + Math.sin(a) * 30} x2={200 + Math.cos(a) * 170} y2={200 + Math.sin(a) * 170} strokeWidth="0.9" opacity="0.65" />;
        })}
        {Array.from({ length: n }).map((_, i) => {
          const a = ((i + 0.5) / n) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 170;
          const y = 200 + Math.sin(a) * 170;
          return <rect key={`b${i}`} x={x - 9} y={y - 7} width="18" height="14" rx="3" strokeWidth="1.3" transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />;
        })}
      </g>
    </svg>
  );
};

/** Flowing lines, used as a quiet texture. */
export const FlowLines = ({ className = "" }: ArtProps) => (
  <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i}
        d={`M-20 ${80 + i * 45} C 250 ${20 + i * 45}, 450 ${180 + i * 40}, 700 ${100 + i * 42} S 1050 ${40 + i * 48}, 1220 ${120 + i * 40}`}
        stroke="currentColor" strokeWidth={i % 2 ? 0.8 : 1.3} strokeDasharray="6 10"
        className="animate-flow" style={{ animationDuration: `${10 + i * 2}s` }} opacity={0.35 + i * 0.08} />
    ))}
  </svg>
);

/** Aqueduct arches: historical water engineering. */
export const Aqueduct = ({ className = "" }: ArtProps) => (
  <svg viewBox="0 0 600 220" className={className} fill="none" stroke="currentColor" aria-hidden="true">
    <line x1="0" y1="30" x2="600" y2="30" strokeWidth="1.5" />
    <line x1="0" y1="44" x2="600" y2="44" strokeWidth="1" />
    <path d="M0 22 H600" strokeWidth="0.75" strokeDasharray="4 6" className="animate-flow" />
    {Array.from({ length: 6 }).map((_, i) => {
      const x = i * 100;
      return <path key={i} d={`M${x + 10} 220 V110 A40 40 0 0 1 ${x + 90} 110 V220`} strokeWidth="1.2" />;
    })}
    <line x1="0" y1="219" x2="600" y2="219" strokeWidth="1.5" />
  </svg>
);

/** Persian girih geometry: eight-pointed stars and crosses, as a tiling overlay. */
export const Girih = ({ className = "", opacity = 0.18 }: ArtProps & { opacity?: number }) => {
  const id = useId().replace(/:/g, "");
  const star = (cx: number, cy: number, r: number) => {
    const pts = (rot: number) => Array.from({ length: 4 }).map((_, i) => {
      const a = rot + (i * Math.PI) / 2;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(" ");
    return (
      <g key={`${cx}-${cy}`}>
        <polygon points={pts(Math.PI / 4)} />
        <polygon points={pts(0)} />
      </g>
    );
  };
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={`g${id}`} width="96" height="96" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#dbe7ff" strokeWidth="0.8" opacity={opacity}>
            {star(48, 48, 26)}
            {star(0, 0, 26)}
            {star(96, 0, 26)}
            {star(0, 96, 26)}
            {star(96, 96, 26)}
            <path d="M48 22 L48 0 M48 74 L48 96 M22 48 L0 48 M74 48 L96 48" />
            <circle cx="48" cy="48" r="9" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#g${id})`} />
    </svg>
  );
};

/**
 * Cross-section of a Persian qanat: a mother well at the foot of the mountains taps the
 * groundwater, and a gently sloping tunnel carries it by gravity to the village and gardens.
 */
export const Qanat = ({ className = "" }: ArtProps) => {
  const id = useId().replace(/:/g, "");
  const shafts = [150, 215, 275, 330, 380, 425, 465, 500];
  const tunnelY = (x: number) => 248 - ((x - 110) / (600 - 110)) * 108; // slopes up to the surface
  return (
    <svg viewBox="0 0 680 300" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`w${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.15" />
          <stop offset="1" stopColor="#67e8f9" stopOpacity="0.5" />
        </linearGradient>
        <filter id={`f${id}`}><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      {/* mountains */}
      <path d="M0 140 L40 60 L75 100 L110 40 L150 110 L170 140" stroke="#cdd9ea" strokeWidth="1.3" />
      {/* ground line */}
      <path d="M170 140 H600 L640 140" stroke="#cdd9ea" strokeWidth="1.3" />
      {/* aquifer */}
      <path d="M0 230 Q60 215 120 236 T250 250" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
      <rect x="0" y="236" width="230" height="40" fill={`url(#w${id})`} opacity="0.5" />
      {/* mother well */}
      <line x1="120" y1="104" x2="120" y2="250" stroke="#ffffff" strokeWidth="1.6" />
      {/* access shafts */}
      {shafts.map((x) => (
        <g key={x}>
          <line x1={x} y1="140" x2={x} y2={tunnelY(x)} stroke="#cdd9ea" strokeWidth="1.1" />
          <path d={`M${x - 7} 140 Q${x} 128 ${x + 7} 140`} stroke="#cdd9ea" strokeWidth="1" />
        </g>
      ))}
      {/* tunnel and the water inside it */}
      <path d={`M120 250 L600 ${tunnelY(600)}`} stroke="#ffffff" strokeWidth="1.4" />
      <path d={`M120 250 L600 ${tunnelY(600)}`} stroke="#67e8f9" strokeWidth="4" opacity="0.6" filter={`url(#f${id})`} />
      <path d={`M120 250 L600 ${tunnelY(600)}`} stroke="#a5f3fc" strokeWidth="2" strokeDasharray="8 10" className="animate-flow" />
      {/* village: dome, windcatcher, gardens */}
      <path d="M600 140 V118 Q615 98 630 118 V140" stroke="#ffffff" strokeWidth="1.3" />
      <path d="M642 140 V100 H654 V140 M642 108 H654" stroke="#ffffff" strokeWidth="1.2" />
      <path d="M570 140 V124 M570 124 q-8 -6 0 -16 q8 10 0 16 M548 140 V128 M548 128 q-6 -5 0 -12 q6 7 0 12" stroke="#7dd3fc" strokeWidth="1.1" />
      {/* labels */}
      <g fill="#cdd9ea" fontFamily="Inter Variable, Inter, sans-serif" fontSize="11" letterSpacing="1.5">
        <text x="20" y="290">GROUNDWATER</text>
        <text x="128" y="268">MOTHER WELL</text>
        <text x="300" y="120">ACCESS SHAFTS</text>
        <text x="300" y="232" fill="#a5f3fc">GRAVITY-FED TUNNEL</text>
        <text x="560" y="164">VILLAGE &amp; GARDENS</text>
      </g>
    </svg>
  );
};

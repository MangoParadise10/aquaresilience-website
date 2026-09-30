// Original line illustrations for Dignoria: the noria water wheel, flowing pipework and aqueduct arches.

type ArtProps = { className?: string };

/** The noria: an ancient water wheel lifting and circulating water. */
export const Noria = ({ className = "", spin = true }: ArtProps & { spin?: boolean }) => {
  const spokes = 16;
  const buckets = 16;
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden="true">
      <g className={spin ? "animate-spin-slow" : ""} stroke="currentColor">
        <circle cx="200" cy="200" r="170" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="150" strokeWidth="0.75" opacity="0.6" />
        <circle cx="200" cy="200" r="28" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="10" strokeWidth="1" />
        {Array.from({ length: spokes }).map((_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          return (
            <line key={`s${i}`} x1={200 + Math.cos(a) * 28} y1={200 + Math.sin(a) * 28}
              x2={200 + Math.cos(a) * 170} y2={200 + Math.sin(a) * 170} strokeWidth="0.9" opacity="0.7" />
          );
        })}
        {Array.from({ length: buckets }).map((_, i) => {
          const a = ((i + 0.5) / buckets) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 170;
          const y = 200 + Math.sin(a) * 170;
          return (
            <rect key={`b${i}`} x={x - 9} y={y - 7} width="18" height="14" rx="3" strokeWidth="1.2"
              transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />
          );
        })}
      </g>
    </svg>
  );
};

/** Flowing pipework lines, used as a quiet background texture. */
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
    {Array.from({ length: 12 }).map((_, i) => {
      const x = i * 50;
      return <path key={`u${i}`} d={`M${x + 8} 44 V72 A17 17 0 0 1 ${x + 42} 72 V44`} strokeWidth="0.8" opacity="0.7" />;
    })}
    <line x1="0" y1="219" x2="600" y2="219" strokeWidth="1.5" />
  </svg>
);

/** The Dignoria mark: a simplified wheel with a single droplet bucket. */
export const Mark = ({ className = "" }: ArtProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="16" r="3" fill="currentColor" />
    {[0, 60, 120, 180, 240, 300].map((d) => (
      <line key={d} x1="16" y1="16" x2={16 + Math.cos((d * Math.PI) / 180) * 13} y2={16 + Math.sin((d * Math.PI) / 180) * 13}
        stroke="currentColor" strokeWidth="1.4" />
    ))}
    <path d="M16 23.5c-1.9 0-3.2-1.3-3.2-3 0-1.8 3.2-5.5 3.2-5.5s3.2 3.7 3.2 5.5c0 1.7-1.3 3-3.2 3Z" fill="hsl(var(--sea-aqua))" />
  </svg>
);

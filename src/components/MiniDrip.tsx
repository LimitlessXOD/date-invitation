import React from 'react';

interface MiniDripProps {
  /** Which edge the drips hang from */
  position?: 'top' | 'bottom';
  /** Visual intensity — controls opacity/glow, not layout */
  intensity?: 'subtle' | 'normal' | 'strong';
  /** How many drip tendrils to render (2-4 looks best) */
  count?: 2 | 3 | 4;
  className?: string;
}

// Deterministic pseudo-random drip shapes so each instance looks organic
// but doesn't need external randomness (keeps SSR / re-render stable).
const DRIP_VARIANTS = [
  { x: 18, len: 9, w: 3.2, delay: 0 },
  { x: 42, len: 14, w: 3.8, delay: 0.6 },
  { x: 63, len: 7, w: 2.6, delay: 1.1 },
  { x: 84, len: 11, w: 3.2, delay: 0.3 },
];

export const MiniDrip: React.FC<MiniDripProps> = ({
  position = 'bottom',
  intensity = 'normal',
  count = 3,
  className = '',
}) => {
  const drips = DRIP_VARIANTS.slice(0, count);

  const opacityMap = { subtle: 0.45, normal: 0.75, strong: 1 };
  const glowMap = { subtle: 0, normal: 0.35, strong: 0.7 };
  const baseOpacity = opacityMap[intensity];
  const glowOpacity = glowMap[intensity];

  const gradId = React.useId();
  const glowId = React.useId();

  return (
    <div
      className={`mini-drip pointer-events-none absolute left-0 right-0 overflow-visible ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } h-4 z-10 ${className}`}
      style={{ opacity: baseOpacity }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full ${position === 'top' ? 'rotate-180' : ''}`}
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9f1239" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          {glowOpacity > 0 && (
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="220%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.4" floodColor="#e11d48" floodOpacity={glowOpacity} />
            </filter>
          )}
        </defs>

        {/* thin base line */}
        <rect x="0" y="0" width="100" height="1" fill={`url(#${gradId})`} opacity="0.6" />

        <g filter={glowOpacity > 0 ? `url(#${glowId})` : undefined}>
          {drips.map((d, i) => (
            <g key={i} className={`animate-mini-drip-${(i % 2) + 1}`} style={{ transformOrigin: `${d.x}% 0px` }}>
              <path
                d={`M${d.x - d.w / 2},0
                    C${d.x - d.w / 2},${d.len * 0.5} ${d.x - d.w / 2 + 0.4},${d.len * 0.9} ${d.x},${d.len}
                    C${d.x + d.w / 2 - 0.4},${d.len * 0.9} ${d.x + d.w / 2},${d.len * 0.5} ${d.x + d.w / 2},0
                    Z`}
                fill={`url(#${gradId})`}
              />
              <circle cx={d.x} cy={d.len} r={d.w / 2.6} fill="#fb7185" opacity="0.85" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

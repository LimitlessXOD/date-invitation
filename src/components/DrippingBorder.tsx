import React from 'react';

interface DrippingBorderProps {
  position?: 'top' | 'bottom';
  className?: string;
  glow?: boolean;
}

export const DrippingBorder: React.FC<DrippingBorderProps> = ({
  position = 'top',
  className = '',
  glow = false,
}) => {
  return (
    <div
      className={`dripping-border absolute left-0 right-0 ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } pointer-events-none overflow-hidden h-7 z-10 ${className}`}
    >
      <svg
        className={`w-full h-full ${position === 'bottom' ? 'rotate-180' : ''}`}
        viewBox="0 0 600 32"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bloodDripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#42100e" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#751b17" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4d1511" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#701c17" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#42100e" stopOpacity="0.9" />
          </linearGradient>
          <filter id="bloodGlow" x="-10%" y="-10%" width="120%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#e11d48" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Top base bar */}
        <rect x="0" y="0" width="600" height="3" fill="url(#bloodDripGrad)" />

        {/* Animated Dripping Paths */}
        <g filter={glow ? 'url(#bloodGlow)' : undefined}>
          {/* Static base wave with organic droplets */}
          <path
            d="M0,0 L600,0 L600,4 
               C580,4 576,14 570,14 C564,14 560,4 540,4 
               C525,4 520,20 514,20 C508,20 503,4 480,4 
               C465,4 460,11 454,11 C448,11 444,4 420,4 
               C400,4 394,26 386,26 C378,26 374,4 350,4 
               C335,4 330,16 324,16 C318,16 314,4 290,4 
               C275,4 268,23 260,23 C252,23 246,4 220,4 
               C205,4 200,12 194,12 C188,12 184,4 160,4 
               C145,4 138,28 128,28 C118,28 112,4 90,4 
               C75,4 70,15 64,15 C58,15 54,4 30,4 
               C18,4 12,9 0,4 Z"
            fill="url(#bloodDripGrad)"
          />

          {/* Drip 1 - Longest Left (animated stretch) */}
          <path
            className="animate-drip-1"
            d="M124,4 C124,14 123,26 128,29 C133,26 132,14 132,4 Z"
            fill="url(#bloodDripGrad)"
          />

          {/* Drip 2 - Center (animated stretch) */}
          <path
            className="animate-drip-2"
            d="M382,4 C382,12 381,24 386,27 C391,24 390,12 390,4 Z"
            fill="url(#bloodDripGrad)"
          />

          {/* Drip 3 - Right */}
          <path
            className="animate-drip-1"
            d="M510,4 C510,10 509,19 514,21 C519,19 518,10 518,4 Z"
            fill="url(#bloodDripGrad)"
          />

          {/* Hanging droplet pearls */}
          <circle cx="128" cy="29" r="2.2" fill="#7b2720" opacity="0.8" />
          <circle cx="386" cy="27" r="2.2" fill="#7b2720" opacity="0.8" />
          <circle cx="260" cy="23" r="1.8" fill="#7b2720" opacity="0.7" />
          <circle cx="514" cy="21" r="1.8" fill="#7b2720" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};

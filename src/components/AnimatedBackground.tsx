import React, { useEffect, useRef } from 'react';
import { MovieGenre } from '../types';

interface AnimatedBackgroundProps {
  intensity?: 'subtle' | 'horror' | 'warm' | 'celebrate';
  genre?: MovieGenre;
}

const GENRE_AMBIENCE: Record<MovieGenre, string[]> = {
  horror: ['#6b201c', '#3d1512', '#74312b', '#2f2621'],
  comedy: ['#d79d21', '#72551d', '#f0d48e', '#7d5931'],
  romance: ['#b95a79', '#5e273b', '#edafbd', '#7b3d55'],
  action: ['#df6c2d', '#773019', '#efb06e', '#813d20'],
  thriller: ['#4d9a9c', '#1f5052', '#9ed2ce', '#2f686a'],
  animation: ['#6e86dc', '#35427d', '#b8c5ff', '#4f62aa'],
  drama: ['#9b744c', '#513a28', '#d8b58d', '#6f5135'],
  fantasy: ['#8271c3', '#403668', '#c5b8ed', '#594d8b'],
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ intensity = 'subtle', genre = 'horror' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = window.innerWidth < 768 ? 35 : 65;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      targetAlpha: number;
      pulseSpeed: number;
      color: string;
      isDroplet?: boolean;
    }> = [];

    const colors = GENRE_AMBIENCE[genre];

    for (let i = 0; i < particleCount; i++) {
      const isDroplet = Math.random() < 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isDroplet ? Math.random() * 2.2 + 1.2 : Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: isDroplet ? Math.random() * 0.4 + 0.15 : (Math.random() - 0.5) * 0.3 - 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        targetAlpha: Math.random() * 0.45 + 0.1,
        pulseSpeed: 0.005 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDroplet,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.05) {
          p.targetAlpha = Math.random() * 0.45 + 0.1;
        }

        ctx.save();
        ctx.beginPath();
        if (p.isDroplet) {
          // Teardrop shape
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.isDroplet ? 14 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, genre]);

  const ambient = GENRE_AMBIENCE[genre];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic ambient gradient orbs */}
      <div
        className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-35 transition-all duration-1000"
        style={{ backgroundColor: ambient[1] }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full blur-[110px] opacity-30 transition-all duration-1000"
        style={{ backgroundColor: ambient[0] }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] rounded-full blur-[120px] opacity-35 transition-all duration-1000"
        style={{ backgroundColor: ambient[3] }}
      />

      {/* Cinematic subtle dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,3,7,0.9)_100%)]" />

      {/* Subtle scanline / stardust texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Canvas for floating embers & light orbs */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
    </div>
  );
};

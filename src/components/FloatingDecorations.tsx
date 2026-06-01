import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
}

const shapes = ['circle', 'square', 'triangle', 'diamond'] as const;

function Shape({ shape, size, color }: { shape: Particle['shape']; size: number; color: string }) {
  const s = size;
  if (shape === 'circle') {
    return (
      <div
        style={{
          width: s,
          height: s,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          background: `${color}18`,
        }}
      />
    );
  }
  if (shape === 'square') {
    return (
      <div
        style={{
          width: s,
          height: s,
          border: `1.5px solid ${color}`,
          background: `${color}18`,
          transform: 'rotate(15deg)',
        }}
      />
    );
  }
  if (shape === 'diamond') {
    return (
      <div
        style={{
          width: s * 0.7,
          height: s * 0.7,
          border: `1.5px solid ${color}`,
          background: `${color}18`,
          transform: 'rotate(45deg)',
        }}
      />
    );
  }
  // triangle
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <polygon
        points="12,2 22,22 2,22"
        fill={`${color}18`}
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  );
}

export default function FloatingDecorations() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 28 + 10,
      opacity: Math.random() * 0.3 + 0.08,
      duration: Math.random() * 8 + 5,
      delay: Math.random() * 4,
      shape: shapes[Math.floor(Math.random() * shapes.length)] ?? 'circle',
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const COLORS = ['#2d6dff', '#60a5fa', '#818cf8', '#38bdf8', '#0052cc'];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      style={{ transform: `translateY(${parallaxY}px)` }}
    >
      {particles.map((p) => {
        const color = COLORS[p.id % COLORS.length] ?? '#2d6dff';
        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            <Shape shape={p.shape} size={p.size} color={color} />
          </div>
        );
      })}

      {/* Large accent blobs */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          top: '10%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(0,82,204,0.12) 0%, transparent 70%)',
          animation: 'drift 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          bottom: '20%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(45,109,255,0.10) 0%, transparent 70%)',
          animation: 'drift 22s ease-in-out 3s infinite reverse',
        }}
      />
    </div>
  );
}

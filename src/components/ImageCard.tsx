import { useState } from 'react';
import type { PortfolioItem } from '../data/portfolio';

interface ImageCardProps {
  item: PortfolioItem;
}

export default function ImageCard({ item }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(0,82,204,0.25), 0 8px 24px rgba(0,0,0,0.2)'
          : '0 8px 32px rgba(0,0,0,0.15)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-800/20 animate-pulse" />
      )}

      <img
        src={item.src}
        alt={item.title}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${hovered ? 'scale-105' : 'scale-100'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-400 flex flex-col justify-end p-4 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-white font-grandstander font-bold text-sm leading-tight mb-1">
          {item.title}
        </h3>
        <p className="text-white/70 font-raleway text-xs leading-snug line-clamp-2">
          {item.description}
        </p>
        {item.client && (
          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-raleway font-semibold text-blue-300 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            {item.client}
          </span>
        )}
        <div className="flex gap-1 mt-2 flex-wrap">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[9px] bg-white/15 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Shine effect */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}

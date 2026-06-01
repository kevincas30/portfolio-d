import { useState } from 'react';
import type { PortfolioItem } from '../data/portfolio';

interface InstagramFrameProps {
  item: PortfolioItem;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

const LIKE_EMOJIS = ['❤️', '🔥', '✨', '😍', '👏'];

export default function InstagramFrame({ item }: InstagramFrameProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 800) + 200);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));

    if (next) {
      const id = Date.now();
      const emoji = LIKE_EMOJIS[Math.floor(Math.random() * LIKE_EMOJIS.length)] ?? '❤️';
      const x = Math.random() * 60 + 20;
      setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
      setTimeout(() => {
        setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
      }, 1200);
    }
  };

  const isPortrait = item.aspect === 'portrait';

  return (
    <div className="instagram-frame bg-white w-full max-w-sm mx-auto select-none">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 flex-shrink-0">
          <img
            src="/assets/foto/foto_sin_fondo.png"
            alt="Kevin Castillo"
            className="w-full h-full rounded-full object-cover bg-white"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-900 leading-tight">kevincastillo.design</p>
          <p className="text-[10px] text-gray-500 leading-tight truncate">{item.client ?? 'Proyecto'}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-700 transition-colors p-1">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: isPortrait ? '4/5' : '1/1' }}>
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <button
            onClick={handleLike}
            className="opacity-0 hover:opacity-100 transition-opacity"
            aria-label="Like"
          >
            <div className="text-5xl drop-shadow-lg animate-pulse">❤️</div>
          </button>
        </div>

        {/* Floating emoji reactions */}
        {floatingEmojis.map(({ id, emoji, x }) => (
          <div
            key={id}
            className="absolute bottom-4 pointer-events-none text-2xl"
            style={{
              left: `${x}%`,
              animation: 'floatUp 1.2s ease-out forwards',
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center gap-3 mb-1.5">
          <button
            onClick={handleLike}
            className={`transition-transform active:scale-90 ${liked ? 'text-red-500' : 'text-gray-800 hover:text-gray-500'}`}
            aria-label="Me gusta"
          >
            <HeartIcon filled={liked} />
          </button>
          <button className="text-gray-800 hover:text-gray-500 transition-colors">
            <CommentIcon />
          </button>
          <button className="text-gray-800 hover:text-gray-500 transition-colors">
            <ShareIcon />
          </button>
          <div className="ml-auto text-gray-800 hover:text-gray-500 transition-colors cursor-pointer">
            <BookmarkIcon />
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-900">{likeCount.toLocaleString()} Me gusta</p>
        <p className="text-xs text-gray-800 mt-0.5">
          <span className="font-semibold">kevincastillo.design</span>{' '}
          <span className="text-gray-600">{item.description}</span>
        </p>
        <div className="flex gap-1 mt-1 flex-wrap">
          {item.tags?.map((tag) => (
            <span key={tag} className="text-[10px] text-blue-500">#{tag.toLowerCase().replace(' ', '_')}</span>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-1">hace 2 días</p>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-80px) scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

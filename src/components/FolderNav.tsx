import { useState } from 'react';
import type { Category, FolderCategory } from '../data/portfolio';

interface FolderNavProps {
  categories: FolderCategory[];
  active: Category;
  onSelect: (id: Category) => void;
}

const FOLDER_COLORS: Record<Category, { base: string; glow: string; text: string }> = {
  banners: { base: '#0052cc', glow: 'rgba(0,82,204,0.5)',  text: '#fff' },
  books:   { base: '#7c3aed', glow: 'rgba(124,58,237,0.5)', text: '#fff' },
  ebooks:  { base: '#059669', glow: 'rgba(5,150,105,0.5)',  text: '#fff' },
  social:  { base: '#db2777', glow: 'rgba(219,39,119,0.5)', text: '#fff' },
  videos:  { base: '#dc2626', glow: 'rgba(220,38,38,0.5)',  text: '#fff' },
};

function FolderTab({
  cat,
  isActive,
  onClick,
}: {
  cat: FolderCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = FOLDER_COLORS[cat.id];

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-start group outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-b-xl"
      aria-pressed={isActive}
      style={{ minWidth: 110 }}
    >
      {/* Folder ear */}
      <div
        className="w-2/3 h-2 rounded-t-lg transition-all duration-400"
        style={{
          background: isActive ? colors.base : 'rgba(255,255,255,0.08)',
          boxShadow: isActive ? `0 -4px 12px ${colors.glow}` : 'none',
        }}
      />

      {/* Folder body */}
      <div
        className="w-full px-4 py-3 rounded-tr-xl rounded-b-xl transition-all duration-400 flex flex-col gap-0.5 border"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${colors.base}, ${colors.base}dd)`
            : 'rgba(255,255,255,0.04)',
          borderColor: isActive ? `${colors.base}80` : 'rgba(255,255,255,0.08)',
          boxShadow: isActive ? `0 8px 32px ${colors.glow}, 0 2px 8px rgba(0,0,0,0.2)` : 'none',
          transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <span className="text-xl leading-none">{cat.icon}</span>
        <span
          className="font-grandstander font-bold text-xs leading-tight mt-1 transition-colors duration-300"
          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
        >
          {cat.label}
        </span>
        <span
          className="font-raleway text-[10px] transition-colors duration-300"
          style={{ color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}
        >
          {cat.count} piezas
        </span>

        {/* Fill animation */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-tr-xl rounded-b-xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
            }}
          />
        )}
      </div>
    </button>
  );
}

export default function FolderNav({ categories, active, onSelect }: FolderNavProps) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex gap-2 min-w-max px-1">
        {categories.map((cat) => (
          <FolderTab
            key={cat.id}
            cat={cat}
            isActive={active === cat.id}
            onClick={() => onSelect(cat.id)}
          />
        ))}
      </div>
    </div>
  );
}

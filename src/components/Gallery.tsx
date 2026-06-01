import { useState, useEffect, useRef } from 'react';
import { categories } from '../data/portfolio';
import type { Category, PortfolioItem } from '../data/portfolio';
import FolderNav from './FolderNav';
import InstagramFrame from './InstagramFrame';
import VideoPlayer from './VideoPlayer';
import ImageCard from './ImageCard';

function useReveal(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [dep]);

  return { ref, visible };
}

function BentoGrid({ items, isSocial, isVideo }: { items: PortfolioItem[]; isSocial: boolean; isVideo: boolean }) {
  const { ref, visible } = useReveal(items);

  if (isVideo) {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="transition-all duration-700"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <VideoPlayer item={item} />
          </div>
        ))}
      </div>
    );
  }

  if (isSocial) {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex justify-center transition-all duration-700"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <InstagramFrame item={item} />
          </div>
        ))}
      </div>
    );
  }

  // Generic bento grid
  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {items.map((item, i) => {
        const colSpan =
          item.span === 'wide' ? 'col-span-2' : 'col-span-1';
        const rowSpan =
          item.span === 'tall' ? 'row-span-2' : 'row-span-1';

        return (
          <div
            key={item.id}
            className={`${colSpan} ${rowSpan} transition-all duration-700`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <ImageCard item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState<Category>('banners');

  const activeCategory = categories.find((c) => c.id === active);
  const isSocial = active === 'social';
  const isVideo = active === 'videos';

  return (
    <section id="gallery" className="w-full">
      {/* Folder Navigation */}
      <FolderNav
        categories={categories}
        active={active}
        onSelect={setActive}
      />

      {/* Gallery panel */}
      <div
        className="mt-0 rounded-b-3xl rounded-tr-3xl p-6 md:p-8 min-h-[480px]"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: 'none',
        }}
      >
        {/* Category header */}
        {activeCategory && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{activeCategory.icon}</span>
            <div>
              <h2 className="font-grandstander font-bold text-xl text-white leading-tight">
                {activeCategory.label}
              </h2>
              <p className="font-borel text-sm text-blue-300">
                {activeCategory.count} piezas creadas con pasión
              </p>
            </div>
          </div>
        )}

        {activeCategory && (
          <BentoGrid
            items={activeCategory.items}
            isSocial={isSocial}
            isVideo={isVideo}
          />
        )}
      </div>
    </section>
  );
}

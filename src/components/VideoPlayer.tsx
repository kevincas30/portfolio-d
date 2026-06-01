import { useRef, useState } from 'react';
import type { PortfolioItem } from '../data/portfolio';

interface VideoPlayerProps {
  item: PortfolioItem;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  );
}

export default function VideoPlayer({ item }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      void v.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  return (
    <div
      className="video-player-container group cursor-pointer relative"
      onClick={togglePlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Play / Pause button */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          !playing || hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-xl">
          {playing ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>

      {/* Top: title */}
      <div className={`absolute top-0 left-0 right-0 p-3 transition-opacity duration-300 ${hovered || !playing ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white text-xs font-raleway font-semibold drop-shadow-lg">{item.title}</p>
        <div className="flex gap-1 mt-1">
          {item.tags?.map((tag) => (
            <span key={tag} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 ${hovered || !playing ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-white/30 rounded-full mb-2 cursor-pointer pointer-events-auto"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/80 text-[10px] font-raleway">UGC • Vertical</span>
          <button
            onClick={toggleMute}
            className="text-white/80 hover:text-white transition-colors pointer-events-auto p-1"
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
          >
            {muted ? <MuteIcon /> : <VolumeIcon />}
          </button>
        </div>
      </div>

      {/* Muted indicator pulse */}
      {muted && playing && (
        <div className="absolute top-3 right-3 pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
            <MuteIcon />
          </div>
        </div>
      )}
    </div>
  );
}

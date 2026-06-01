import { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const COLORS = [
  'text-blue-400',
  'text-cyan-400',
  'text-indigo-400',
  'text-sky-300',
  'text-blue-300',
];

export default function TypewriterEffect({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseTime = 1800,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex] ?? '';

    const tick = () => {
      if (!isDeleting) {
        const next = current.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === current) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        const next = current.slice(0, displayText.length - 1);
        setDisplayText(next);
        if (next === '') {
          setIsDeleting(false);
          const nextIdx = (phraseIndex + 1) % phrases.length;
          setPhraseIndex(nextIdx);
          setColorIndex((c) => (c + 1) % COLORS.length);
          return;
        }
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span className={`font-grandstander font-bold transition-colors duration-500 ${COLORS[colorIndex]}`}>
        {displayText}
      </span>
      <span className="typewriter-cursor" />
    </span>
  );
}

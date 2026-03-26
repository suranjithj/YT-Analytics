'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'Resolving channel identity…',
  'Fetching upload history…',
  'Loading video metrics…',
  'Computing performance scores…',
  'Almost there…',
];

export function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 1800);

    const progTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p; // stall near the end
        return p + Math.random() * 8;
      });
    }, 400);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-56px)] px-4">
      {/* Animated logo */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-[#f97316]/20 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#f97316] fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 rounded-full bg-white/[0.06] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-[#f97316] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status message */}
      <p className="text-sm text-[#71717a] h-5 transition-all">{MESSAGES[msgIdx]}</p>

      {/* Skeleton cards */}
      <div className="mt-12 w-full max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Thumbnail skeleton */}
            <div className="skeleton aspect-video w-full" />
            {/* Body skeleton */}
            <div className="p-4 space-y-3">
              <div className="skeleton h-3.5 rounded w-full" />
              <div className="skeleton h-3.5 rounded w-3/4" />
              <div className="flex gap-2 mt-2">
                <div className="skeleton h-3 rounded w-12" />
                <div className="skeleton h-3 rounded w-12" />
                <div className="skeleton h-3 rounded w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState, useRef, type FormEvent } from 'react';
import { Search, Link2 } from 'lucide-react';

interface Props {
  onSearch: (url: string) => void;
}

const EXAMPLES = [
  'https://youtube.com/@mkbhd',
  'https://youtube.com/@veritasium',
  'https://youtube.com/@linustechtips',
];

export function ChannelSearch({ onSearch }: Props) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleExample = (url: string) => {
    setValue(url);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center rounded-2xl border transition-all duration-200 ${
            focused
              ? 'border-[#f97316]/60 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
              : 'border-white/10'
          } bg-white/[0.04]`}
        >
          <div className="absolute left-4 text-[#52525b]">
            <Link2 className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste a YouTube channel URL or handle…"
            className="flex-1 bg-transparent py-4 pl-11 pr-4 text-white placeholder:text-[#3f3f46] text-sm outline-none font-body"
            autoComplete="off"
            spellCheck={false}
          />

          <button
            type="submit"
            disabled={!value.trim()}
            className="m-1.5 px-5 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-medium hover:bg-[#ea580c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            Analyze
          </button>
        </div>
      </form>

      {/* Quick examples */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        <span className="text-xs text-[#3f3f46]">Try:</span>
        {EXAMPLES.map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => handleExample(url)}
            className="text-xs px-2.5 py-1 rounded-full border border-white/[0.08] text-[#71717a] hover:text-white hover:border-white/20 transition-all"
          >
            {url.replace('https://youtube.com/', '')}
          </button>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState, useRef, type FormEvent } from 'react';
import { Search, Link2 } from 'lucide-react';

interface Props {
  onSearch: (url: string) => void;
}

const EXAMPLES = [
  { label: '@mkbhd',         url: 'https://youtube.com/@mkbhd'         },
  { label: '@veritasium',    url: 'https://youtube.com/@veritasium'    },
  { label: '@linustechtips', url: 'https://youtube.com/@linustechtips' },
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center rounded-2xl transition-all duration-200"
          style={{
            border: `1px solid ${focused ? 'var(--accent)' : 'var(--border-strong)'}`,
            boxShadow: focused ? '0 0 0 3px var(--accent-dim)' : 'none',
            background: 'var(--bg-elevated)',
          }}
        >
          <div className="absolute left-4" style={{ color: 'var(--text-muted)' }}>
            <Link2 className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste a YouTube channel URL or @handle…"
            className="flex-1 bg-transparent py-3.5 pl-11 pr-3 text-sm outline-none"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
            autoComplete="off"
            spellCheck={false}
          />

          <button
            type="submit"
            disabled={!value.trim()}
            className="m-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'var(--accent)',
              fontFamily: 'var(--font-display)',
            }}
            onMouseOver={(e) => { if (value.trim()) (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent)'; }}
          >
            <Search className="w-3.5 h-3.5" />
            Analyze
          </button>
        </div>
      </form>

      {/* Quick-fill examples */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        <span className="text-sm" style={{ color: 'var(--text-faint)' }}>Try:</span>
        {EXAMPLES.map(({ label, url }) => (
          <button
            key={label}
            type="button"
            onClick={() => { setValue(url); inputRef.current?.focus(); }}
            className="text-sm px-2.5 py-1 rounded-full transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
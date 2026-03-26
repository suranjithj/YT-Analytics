'use client';

import { useState } from 'react';
import { ChevronDown} from 'lucide-react';

const FAQS = [
  { q: 'Do I need a YouTube API key?',          a: 'To self-host, yes - get a free YouTube Data API v3 key from Google Cloud Console. The hosted version at YT Analytics.app handles this for you.' },
  { q: 'How many videos can it analyze?',        a: 'Free: 25 per analysis. Pro: 200. Agency: unlimited. The API returns the most recent uploads first.' },
  { q: 'How is the Performance Score calculated?', a: 'A transparent 0–100 composite: views 50%, likes 30%, engagement rate 20%. Scores are relative to the channel - 95 means top tier for that creator.' },
  { q: 'How fresh is the data?',                 a: 'Data is fetched live every time you run an analysis. Cached results expire after 5 minutes, so you always get near-real-time metrics.' },
  { q: 'Can I analyze private or unlisted videos?', a: 'No - YT Analytics only accesses public data via the official YouTube Data API v3. Private and unlisted videos are inaccessible by design.' },
  { q: 'Is YT Analytics affiliated with YouTube?', a: 'No. YT Analytics is an independent tool using the official YouTube Data API v3. All YouTube data belongs to Google LLC.' },
];

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Common questions</h2>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need to know before getting started.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card overflow-hidden fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} style={{ color: 'var(--accent)' }} />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
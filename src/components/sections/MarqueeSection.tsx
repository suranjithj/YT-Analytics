'use client';

const MARQUEE_ITEMS = [
  '🔥 Trending Detection','📊 Performance Score','📅 This Month Filter',
  '⬇️ CSV Export','🔍 Channel Search','👁 View Analytics',
  '❤️ Engagement Rate','💬 Comment Tracking','📈 Growth Signals',
  '🎯 Competitor Intel','⚡ Live Data','📱 Mobile Ready',
];

export default function MarqueeSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="py-5 overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
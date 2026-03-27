'use client';

import {
    Award, Star
} from 'lucide-react';

const TESTIMONIALS = [
  { quote: 'YT Analytics cut our competitor research time from 3 hours to under 10 minutes. We now brief every video shoot with channel intelligence.', name: 'Amara Osei',     role: 'Head of Content, MediaForge Agency',          avatar: 'AO', color: '#f97316', stars: 5 },
  { quote: 'The trending detection is scary accurate. I spotted a competitor breakout format 2 weeks before it went viral and adapted immediately.',   name: 'James Whitfield', role: 'YouTube Strategist & Creator (380K subs)',     avatar: 'JW', color: '#60a5fa', stars: 5 },
  { quote: 'Our agency manages 14 client channels. YT Analytics is the first tool that does not feel like a developer prototype - clients love it.',     name: 'Priya Sundaram',  role: 'Founder, Velocity Creative',                 avatar: 'PS', color: '#4ade80', stars: 5 },
  { quote: 'The engagement rate and performance score are exactly what was missing. Finally a number I can present directly to my brand partners.',    name: 'Carlos Mendes',   role: 'Full-time Creator & Brand Consultant',        avatar: 'CM', color: '#a78bfa', stars: 5 },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label"><Award className="w-3 h-3" />Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Loved by creators &amp; agencies</h2>
          <p style={{ color: 'var(--text-muted)' }}>From solo creators to enterprise media teams.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="card card-hover p-6 fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex gap-0.5 mb-4">{Array.from({ length: t.stars }).map((_, s) => (<Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: '#facc15' }} />))}</div>
              <p className="text-md leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{t.name}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
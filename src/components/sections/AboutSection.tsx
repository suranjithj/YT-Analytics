'use client';

import {
    Zap, BarChart2, Users, Star, Shield, ExternalLink
} from 'lucide-react';

const ABOUT_STATS = [
  { value: '10K+', label: 'Analyses run',          icon: BarChart2 },
  { value: '500+', label: 'Creators & agencies',   icon: Users     },
  { value: '4.9★', label: 'Average rating',         icon: Star      },
  { value: '99.9%',label: 'Uptime SLA',             icon: Shield    },
];

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="section-label"><Users className="w-3 h-3" />About YT Analytics</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Built by creators,<br /><span className="text-gradient">for creators</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              YT Analytics was born from frustration. Our team spent hours every week manually checking competitor channels - copying view counts into spreadsheets, trying to spot patterns, and briefing video teams on trends they had spotted three weeks too late.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              So we built the tool we always wanted. No login walls. No bloated dashboards. Just paste a URL and get every insight that matters - instantly.
            </p>
            <div className="space-y-3">
              {[
                { icon: Zap,    title: 'Speed first',          desc: 'Results in seconds, not minutes' },
                { icon: Shield, title: 'Privacy by default',   desc: 'Only public data, always transparent' },
                { icon: Star,   title: 'Creator-focused',      desc: 'Built for how real creators actually work' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}>
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{title}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_STATS.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className="card p-6 text-center card-hover fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                <p className="text-3xl font-bold mb-1 text-gradient" style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl p-5 text-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>Built in public 🚀</p>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Follow our journey on Twitter &amp; GitHub. We ship fast and fix things even faster.</p>
              <div className="flex items-center justify-center gap-4">
                {[{ label: 'Twitter' }, { label: 'GitHub' }].map(({ label }) => (
                  <a key={label} href="#" className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    <ExternalLink className="w-3.5 h-3.5" />{label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
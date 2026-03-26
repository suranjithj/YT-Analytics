'use client';

import {
    BarChart2, TrendingUp, Zap, Play
} from 'lucide-react';

const STATS = [
  { value: '50+',  label: 'Videos per channel analysis', icon: Play     },
  { value: '4',    label: 'Interactive chart views',      icon: BarChart2 },
  { value: '6',    label: 'Sortable metrics per video',   icon: TrendingUp },
  { value: '10s',  label: 'Average time to first insight',icon: Zap      },
];

export default function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 50%, var(--accent-dim) 0%, transparent 70%)' }} />
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 mr-2" style={{ color: 'var(--accent)' }} />
                  <span className="text-4xl sm:text-5xl font-bold text-gradient" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
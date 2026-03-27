'use client';

import Link from 'next/link';

import {
  Zap, CheckCircle2, Play,Eye, Flame,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-16 px-4 text-center overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 15%, var(--accent-glow) 0%, transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-semibold" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-glow)', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          YouTube Competitor Intelligence
        </div>

        <h1 className="fade-up delay-1 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          See exactly what
          <br /><span className="text-gradient">makes rivals win</span>
        </h1>

        <p className="fade-up delay-2 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
          Paste any YouTube channel URL and instantly unlock every video&apos;s performance -
          views, engagement, trending signals, and competitor insights in seconds.
        </p>

        <div className="fade-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/analyze" className="flex btn-primary items-center gap-2 text-base px-7 py-3.5 w-full sm:w-auto justify-center">
            <Zap className="w-4 h-4" />Analyze a Channel Free
          </Link>
          <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 btn-ghost text-base px-7 py-3.5 w-full sm:w-auto justify-center">
            <Play className="w-4 h-4" />See How It Works
          </a>
        </div>

        <div className="fade-up delay-4 flex flex-wrap items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-faint)' }}>
          {['No credit card required', 'Free forever plan', 'Powered by YouTube Data API'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />{t}
            </span>
          ))}
        </div>
      </div>

      {/* Preview card */}
      <div className="fade-up delay-5 relative z-10 mt-14 w-full max-w-3xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg), 0 0 80px var(--accent-glow)', background: 'var(--bg-surface)' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" /><div className="w-3 h-3 rounded-full bg-yellow-400/60" /><div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <div className="flex-1 mx-4 px-3 py-1 rounded-md text-sm font-mono" style={{ background: 'var(--bg-base)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>YT Analytics.app/analyze</div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-animated flex items-center justify-center text-white text-sm font-bold shrink-0">M</div>
              <div className="flex-1 min-w-0"><div className="skeleton h-3.5 rounded w-36 mb-1.5" /><div className="skeleton h-2.5 rounded w-24" /></div>
              <div className="hidden sm:flex gap-4 shrink-0">
                {[['12.4M','Views'],['890K','Subs'],['4.2%','Eng.']].map(([v,l]) => (
                  <div key={l} className="text-right">
                    <p className="text-sm font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{v}</p>
                    <p className="text-sm" style={{ color: 'var(--text-faint)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[{score:97,trending:true,views:'2.1M'},{score:84,trending:true,views:'1.4M'},{score:71,trending:false,views:'890K'}].map((v,i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
                  <div className="aspect-video relative" style={{ background: 'var(--bg-overlay)' }}>
                    <div className="skeleton w-full h-full" />
                    {v.trending && <span className="trending-badge absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-0.5" style={{ background: 'var(--accent)' }}><Flame className="w-2 h-2" />HOT</span>}
                    <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>{i+1}</span>
                  </div>
                  <div className="p-2">
                    <div className="skeleton h-2 rounded w-full mb-1.5" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] flex items-center gap-0.5" style={{ color: 'var(--text-muted)' }}><Eye className="w-2.5 h-2.5" />{v.views}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 rounded-full" style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)' }}>{v.score}</span>
                    </div>
                    <div className="h-0.5 rounded-full mt-1.5 overflow-hidden" style={{ background: 'var(--bg-overlay)' }}>
                      <div className="h-full rounded-full" style={{ width: `${v.score}%`, background: '#4ade80' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }} />
    </section>
  );
}
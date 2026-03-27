'use client';

import Link from 'next/link';
import { Lightbulb, Search, RefreshCw, BarChart2, Download, Zap, 
} from 'lucide-react';

const STEPS = [
  { number: '01', title: 'Paste the Channel URL',   desc: 'Copy any YouTube channel URL and paste it in. @handle, /c/name, full channel ID - any format works.',                icon: Search    },
  { number: '02', title: 'We Fetch the Data',        desc: 'YT Analytics resolves the channel, pulls up to 50 recent uploads, and fetches full statistics for each video.',        icon: RefreshCw },
  { number: '03', title: 'Explore & Analyze',        desc: 'Filter by time period, sort by views or engagement, spot trending videos, and explore 4 performance charts.',        icon: BarChart2 },
  { number: '04', title: 'Export & Act',             desc: 'Download your analysis as CSV. Share with your team, feed your BI tool, or brief your next production sprint.',      icon: Download  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label"><Lightbulb className="w-3 h-3" />How It Works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            From URL to insights<br /><span className="text-gradient">in four steps</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>No setup. No learning curve. Just results.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-5 z-10" style={{ background: 'var(--bg-elevated)', border: '2px solid var(--accent)', boxShadow: '0 0 24px var(--accent-glow)' }}>
                  <Icon className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{i + 1}</span>
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-14 text-center">
          <Link href="/analyze" className="flex items-center gap-2 justify-center btn-primary text-base px-8 py-3.5">
            <Zap className="w-4 h-4" />Try It Now - It&apos;s Free
          </Link>
        </div>
      </div>
    </section>
  );
}
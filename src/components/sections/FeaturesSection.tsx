'use client';

import {
  BarChart2, TrendingUp, Download, Search, Globe, BarChart, Target, Sparkles,
} from 'lucide-react';

const FEATURES = [
  { icon: Search,    title: 'Universal URL Parsing',   desc: 'Handles @handles, /c/name, /channel/UCid, and bare handles. Paste anything - it just works.',                                       color: '#f97316' },
  { icon: BarChart2, title: 'Deep Video Metrics',      desc: 'Views, likes, comments, engagement rate, duration, and a composite performance score for every video.',                              color: '#60a5fa' },
  { icon: TrendingUp,title: 'Trending Detection',      desc: 'Top-performing 20% of uploads are automatically flagged with a live Trending badge. Spot what is winning.',                          color: '#4ade80' },
  { icon: BarChart,  title: 'Performance Charts',      desc: 'Four interactive chart views: top videos by views, engagement comparison, scatter analysis, and upload timeline.',                    color: '#a78bfa' },
  { icon: Target,    title: 'Smart Filtering',         desc: 'Filter by time period (this month, last 7/30/90 days), sort by any metric, and search by title or tag.',                             color: '#f472b6' },
  { icon: Download,  title: 'CSV Export',              desc: 'Export any filtered dataset to CSV instantly. Import into Sheets, Excel, or your BI tool of choice.',                               color: '#facc15' },
  { icon: Globe,     title: 'Channel Intelligence',    desc: 'Best upload day, average video length, top tags, subscriber count, and total channel view history at a glance.',                    color: '#34d399' },
  { icon: Sparkles,  title: 'Performance Score',       desc: 'Transparent 0–100 composite: views 50%, likes 30%, engagement 20%. A single number to prioritize every video.',                    color: '#fb923c' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label"><Sparkles className="w-3 h-3" />Features</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Everything you need to<span className="text-gradient"> outcompete</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>No spreadsheets. No manual research. Paste a URL and get every insight that matters - instantly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card card-hover p-5 fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
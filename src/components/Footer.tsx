'use client';

import Link from 'next/link';
import { ArrowRight, Zap, PlayCircle } from 'lucide-react';
import { useState } from 'react';

type FooterLink = { label: string; href: string; external?: boolean };

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Product: [
    { label: 'Analyze Channel',   href: '/analyze' },
    { label: 'Features',          href: '#features' },
    { label: 'Pricing',           href: '#pricing' },
    { label: 'Changelog',         href: '#' },
    { label: 'Roadmap',           href: '#' },
  ],
  Company: [
    { label: 'About Us',     href: '#about' },
    { label: 'Blog',         href: '#' },
    { label: 'Careers',      href: '#' },
    { label: 'Press Kit',    href: '#' },
    { label: 'Contact',      href: '#contact' },
  ],
  Resources: [
    { label: 'Documentation',    href: '#' },
    { label: 'API Reference',    href: '#' },
    { label: 'YouTube API Docs', href: 'https://developers.google.com/youtube/v3', external: true },
    { label: 'Creator Guide',    href: '#' },
    { label: 'Support',          href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy',    href: '#' },
    { label: 'Data Processing',  href: '#' },
  ],
};

const SOCIALS = [
  { label: 'Twitter',  href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub',   href: '#' },
  { label: 'YouTube',  href: '#' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus('success');
    setEmail('');
    setTimeout(() => setSubStatus('idle'), 4000);
  };

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      {/* ── Top CTA band ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 100%, var(--accent-dim) 0%, transparent 70%)',
          }}
        />
        <div className="container-wide py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
              >
                Ready to start?
              </p>
              <h3
                className="text-2xl sm:text-3xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Analyze your first competitor
                <br className="hidden sm:block" /> channel in 10 seconds.
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/analyze" className="flex items-center gap-2 btn-primary px-6 py-3 text-base">
                <Zap className="w-4 h-4" />
                Start Free Analysis
              </Link>
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-ghost px-6 py-3 text-base"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-animated flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                YT Analytics
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              The fastest way for creators and agencies to analyze competitor YouTube channels.
              Paste a URL — get instant performance intelligence.
            </p>

            {/* Newsletter */}
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Get weekly insights
            </p>
            {subStatus === 'success' ? (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-glow)' }}
              >
                ✓ You&apos;re subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-base flex-1 text-sm py-2.5"
                  required
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                  onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent-light)')}
                  onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-sm font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseOver={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                        onMouseOut={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                      >
                        {label} ↗
                      </a>
                    ) : href.startsWith('#') ? (
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseOver={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                        onMouseOut={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseOver={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                        onMouseOut={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid var(--border)' }} className="p-2">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-center sm:text-left" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} YT Analytics. Not affiliated with Google LLC or YouTube.
          </p>
          <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-faint)' }}>
            <span>Powered by</span>
            <a
              href="https://developers.google.com/youtube/v3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              <PlayCircle className="w-3 h-3" /> YouTube Data API v3
            </a>
            <span className="mx-1">·</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
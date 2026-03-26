'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import {
  Sun, Moon, Menu, X, BarChart2, ChevronDown,
  Zap, BookOpen, Star
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Analyze', href: '/analyze' },
  {
    label: 'Features',
    href: '#features',
    dropdown: [
      { icon: BarChart2, label: 'Video Analytics',   desc: 'Deep metrics for every upload',     href: '#features' },
      { icon: Zap,       label: 'Trending Detector', desc: 'Spot viral content early',          href: '#features' },
      { icon: Star,      label: 'Performance Score', desc: 'Composite ranking algorithm',       href: '#features' },
      { icon: BookOpen,  label: 'Export Reports',    desc: 'CSV export for any dataset',        href: '#features' },
    ],
  },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b shadow-sm' : 'border-b border-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? 'var(--bg-surface)' : 'transparent',
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg gradient-animated flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                YT Analytics
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  // Single wrapper div owns ALL hover state — no gap between trigger and panel
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Invisible bridge fills the gap between button bottom and panel top */}
                    {openDropdown === link.label && (
                      <>
                        <div className="absolute top-full left-0 right-0 h-2" />
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl p-2 shadow-lg"
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-lg)',
                          }}
                        >
                          {link.dropdown.map(({ icon: Icon, label, desc, href }) => (
                            <a
                              key={label}
                              href={href}
                              onClick={() => handleAnchorClick(href)}
                              className="flex items-start gap-3 p-2.5 rounded-lg transition-colors"
                              style={{ color: 'var(--text-secondary)' }}
                              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: 'var(--accent-dim)' }}
                              >
                                <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseOver={(e) => { (e.target as HTMLElement).style.color = 'var(--text-primary)'; (e.target as HTMLElement).style.background = 'var(--bg-elevated)'; }}
                    onMouseOut={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseOver={(e) => { (e.target as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseOut={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link href="/analyze" className="hidden md:inline-flex btn-primary text-sm">
                <Zap className="w-3.5 h-3.5" />
                Start Analyzing
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'var(--bg-base)' }}>
          <div className="h-16" />
          <div className="container-wide py-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(100dvh-64px)]">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)', background: 'transparent' }}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      {link.dropdown.map(({ icon: Icon, label, desc, href }) => (
                        <a
                          key={label}
                          href={href}
                          onClick={() => handleAnchorClick(href)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors"
                          style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
                        >
                          <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href); }}
                  className="px-4 py-3 rounded-xl text-base font-medium transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <Link
                href="/analyze"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-base py-3"
              >
                <Zap className="w-4 h-4" />
                Start Analyzing Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
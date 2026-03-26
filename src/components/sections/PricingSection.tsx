'use client';

import {
    Zap, CheckCircle2
} from 'lucide-react';

const PRICING_PLANS = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Perfect for individual creators getting started.',
    cta: 'Get Started Free', ctaHref: '/analyze', popular: false,
    features: ['5 analyses per day', 'Up to 25 videos per channel', 'All core metrics', 'Grid & list views', 'Basic sorting & filtering'],
    missing: ['Charts & visualizations', 'CSV export', 'Trending detection'],
  },
  {
    name: 'Pro', price: '$19', period: '/month',
    desc: 'For serious creators and small teams who need full competitive intelligence.',
    cta: 'Start Free Trial', ctaHref: '/analyze', popular: true,
    features: ['Unlimited analyses', 'Up to 200 videos per channel', 'All metrics + performance score', '4 interactive chart views', 'CSV export', 'Trending detection', 'Advanced filters', 'Priority support'],
    missing: [],
  },
  {
    name: 'Agency', price: '$79', period: '/month',
    desc: 'For agencies managing multiple clients at scale.',
    cta: 'Contact Sales', ctaHref: '#contact', popular: false,
    features: ['Everything in Pro', 'Unlimited videos per channel', 'White-label reports', 'Team collaboration', 'API access', 'Dedicated account manager', 'SLA support'],
    missing: [],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label"><Zap className="w-3 h-3" />Pricing</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Simple, transparent<br /><span className="text-gradient">pricing that scales</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Start free. Upgrade when you need more. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <div key={plan.name} className={`card p-6 relative fade-up ${plan.popular ? 'pricing-popular' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'var(--accent)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>MOST POPULAR</div>
              )}
              <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{plan.name}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{plan.desc}</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{plan.price}</span>
                <span className="text-sm pb-1" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>
              <a
                href={plan.ctaHref}
                onClick={(e) => { if (plan.ctaHref.startsWith('#')) { e.preventDefault(); document.querySelector(plan.ctaHref)?.scrollIntoView({ behavior: 'smooth' }); } }}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold mb-6 transition-all ${plan.popular ? 'btn-primary justify-center' : 'btn-ghost justify-center'}`}
              >
                {plan.cta}
              </a>
              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4ade80' }} />{f}
                  </li>
                ))}
                {plan.missing?.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm line-through" style={{ color: 'var(--text-faint)' }}>
                    <div className="w-4 h-4 shrink-0 mt-0.5 flex items-center justify-center"><div className="w-2.5 h-px" style={{ background: 'var(--text-faint)' }} /></div>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-faint)' }}>All plans include a 14-day free trial. Cancel anytime.</p>
      </div>
    </section>
  );
}
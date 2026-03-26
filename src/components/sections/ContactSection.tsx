'use client';

import { useState } from 'react';
import {
    Mail, ExternalLink, MapPin, CheckCircle2, RefreshCw, ArrowRight
} from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => { setStatus('sent'); setForm({ name: '', email: '', subject: '', message: '' }); }, 1200);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label"><Mail className="w-3 h-3" />Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Get in touch</h2>
          <p style={{ color: 'var(--text-muted)' }}>Have a question, bug report, or partnership idea? We&apos;d love to hear from you.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-4xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail,         title: 'Email us',    value: 'hello@ytanalytics.app', desc: 'Reply within 24 hours' },
              { icon: ExternalLink, title: 'Twitter / X', value: '@ytanalytics',          desc: 'Quick questions & updates' },
              { icon: MapPin,       title: 'Timezone',    value: 'UTC+0 / GMT',          desc: 'Mon–Fri, 9am–6pm' },
            ].map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{title}</p>
                  <p className="text-sm" style={{ color: 'var(--accent)' }}>{value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent)', color: '#fff' }}><CheckCircle2 className="w-6 h-6" /></div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Message sent!</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-xs" style={{ color: 'var(--accent)' }}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>Name</label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-base" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>Email</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-base" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>Subject</label>
                  <input type="text" placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-base" required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>Message</label>
                  <textarea placeholder="Tell us more…" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-base resize-none" required />
                </div>
                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-3 text-base">
                  {status === 'sending' ? (<><RefreshCw className="w-4 h-4 animate-spin" />Sending…</>) : (<><Mail className="w-4 h-4" />Send Message<ArrowRight className="w-4 h-4" /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { profile } from '../data/content';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-white/10 bg-[#060607]/88 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="btn-gold-nav flex h-9 w-9 shrink-0 items-center justify-center !rounded-xl font-display text-sm font-bold">
              SA
            </span>
            <span className="leading-tight">
              <span className="block truncate font-display text-[15px] font-semibold text-white">Saim Asif</span>
              <span className="block text-[9px] font-bold tracking-[0.28em] text-gold">FULL STACK · TEAM LEAD</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 text-sm text-muted md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href={profile.resume} className="btn-gold-nav ml-3 px-4 py-2 text-sm">
              Résumé
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a href={profile.resume} className="btn-gold-nav px-3.5 py-2 text-sm">
              Résumé
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost flex h-10 w-10 items-center justify-center !rounded-xl text-cream"
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-white/8 px-4 pb-4 pt-2 md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-display text-[15px] font-medium text-cream hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

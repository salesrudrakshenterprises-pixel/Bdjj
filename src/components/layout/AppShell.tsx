'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Sun, Moon, Bell } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/meditate', label: 'Meditate' },
  { href: '/community', label: 'Community' },
  { href: '/profile', label: 'Profile' },
];

function TabIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? '#C89B3C' : 'var(--text-muted)';
  const w = active ? 2.5 : 1.5;

  if (name === 'Home')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    );
  if (name === 'Explore')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    );
  if (name === 'Meditate')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
      </svg>
    );
  if (name === 'Community')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useThemeStore();

  const isTabPage = ['/', '/explore', '/meditate', '/community', '/profile'].includes(pathname);
  const isMemberPage = pathname.startsWith('/member/');
  const isGuruPage = pathname.startsWith('/guru/');

  if (isMemberPage || isGuruPage) return <>{children}</>;

  return (
    <div className="app-shell">
      <header className="app-topbar flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div style={{ width: 28, height: 28, borderRadius: 14, background: '#C89B3C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>OM</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.3px' }}>BDJJ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={toggleTheme} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ color: 'var(--text-secondary)' }}>
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link href="/member/notifications" className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ color: 'var(--text-secondary)' }}>
            <Bell size={17} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#C89B3C' }} />
          </Link>
        </div>
      </header>

      <main className="app-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="app-tabbar">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className="tab-item no-underline">
              <div style={{
                width: 40, height: 26, borderRadius: 13,
                background: isActive ? 'rgba(200,155,60,0.1)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s'
              }}>
                <TabIcon name={tab.label} active={isActive} />
              </div>
              <span className="tab-label" style={{ color: isActive ? '#C89B3C' : 'var(--text-muted)' }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

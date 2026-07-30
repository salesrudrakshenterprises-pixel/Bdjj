'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import {
  Sun, Moon, Bell, Sparkles,
} from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home', icon: Sparkles },
  { href: '/explore', label: 'Explore', icon: undefined },
  { href: '/meditate', label: 'Meditate', icon: undefined },
  { href: '/community', label: 'Community', icon: undefined },
  { href: '/profile', label: 'Profile', icon: undefined },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useThemeStore();

  const isTabPage = ['/', '/explore', '/meditate', '/community', '/profile'].includes(pathname);
  const isMemberPage = pathname.startsWith('/member/');
  const isGuruPage = pathname.startsWith('/guru/');

  if (isMemberPage || isGuruPage) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      {/* Top Bar */}
      <header className="app-topbar">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C89B3C] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">OM</span>
            </div>
            <span className="font-semibold text-[17px] tracking-tight">BDJJ</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-accent-soft transition-all active:scale-90"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/member/notifications"
              className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:bg-accent-soft transition-all active:scale-90 relative"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C89B3C]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="app-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="app-tabbar">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="tab-item"
            >
              <div
                className={cn(
                  'w-[42px] h-[28px] rounded-full flex items-center justify-center transition-all duration-200',
                  isActive ? 'bg-accent-soft' : ''
                )}
              >
                {tab.label === 'Home' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#C89B3C' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                )}
                {tab.label === 'Explore' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#C89B3C' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                  </svg>
                )}
                {tab.label === 'Meditate' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#C89B3C' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                  </svg>
                )}
                {tab.label === 'Community' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#C89B3C' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {tab.label === 'Profile' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#C89B3C' : 'var(--text-muted)'} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                )}
              </div>
              <span
                className="tab-label"
                style={{ color: isActive ? '#C89B3C' : 'var(--text-muted)' }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* FAB for donations */}
      <Link href="/donations" className="fab">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </Link>
    </div>
  );
}

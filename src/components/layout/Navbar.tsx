'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gurudev', label: 'Gurudev' },
  { href: '/services', label: 'Services' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donations', label: 'Donations' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-gold text-lg font-bold text-bg-primary">
                OM
              </span>
              <span className="font-display text-xl font-bold text-text-primary">
                BDJJ
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                href="/member/login"
                className="btn-outline hidden whitespace-nowrap px-4 py-2 text-xs sm:inline-flex"
              >
                Member Login
              </Link>

              <Link
                href="/donations"
                className="btn-primary hidden whitespace-nowrap px-4 py-2 text-xs sm:inline-flex"
              >
                <Heart size={14} />
                Donate
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-all duration-300 hover:bg-accent/10 hover:text-accent lg:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass overflow-hidden border-b border-accent/10"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-accent/10 pt-3">
                  <Link
                    href="/member/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-outline w-full justify-center py-2.5 text-sm"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/donations"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full justify-center py-2.5 text-sm"
                  >
                    <Heart size={14} />
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

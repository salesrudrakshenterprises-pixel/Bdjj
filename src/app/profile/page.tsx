'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Settings, CreditCard, Heart, Calendar, Award, Bell, Download, LogOut, ChevronRight, Shield, Sun, Moon, Bookmark } from 'lucide-react';
import { useAuthStore, useThemeStore } from '@/lib/store';

const menuItems = [
  { icon: User, label: 'My Profile', href: '/member/profile' },
  { icon: CreditCard, label: 'Membership Card', href: '/member/membership-card' },
  { icon: Heart, label: 'My Donations', href: '/member/my-donations' },
  { icon: Calendar, label: 'My Bookings', href: '/member/bookings' },
  { icon: Award, label: 'Meditation Tracker', href: '/member/meditation' },
  { icon: Bell, label: 'Notifications', href: '/member/notifications' },
  { icon: Settings, label: 'Settings', href: '/member/settings' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'GU';
  const displayName = user?.name || 'Guest User';

  return (
    <div className="app-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="pt-4 pb-2 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <h1 className="text-xl font-bold font-display text-text-primary">{displayName}</h1>
          <span className="badge badge-gold mt-1">Member</span>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-3 gap-3 py-2">
            {[
              { label: 'Donations', value: '12' },
              { label: 'Events', value: '8' },
              { label: 'Streak', value: '5 d' },
            ].map((stat) => (
              <div key={stat.label} className="app-card p-3.5 text-center">
                <span className="block text-lg font-bold text-text-primary">{stat.value}</span>
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Menu List */}
        <motion.div variants={itemVariants} className="pt-1">
          <div className="app-card divide-y divide-bg-cardAlt overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 active:bg-bg-secondary transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-[18px] h-[18px] text-accent" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-text-primary">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div variants={itemVariants}>
          <div className="app-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/5 flex items-center justify-center">
                {isDark ? <Moon className="w-[18px] h-[18px] text-accent" /> : <Sun className="w-[18px] h-[18px] text-accent" />}
              </div>
              <span className="text-sm font-semibold text-text-primary">Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                isDark ? 'bg-accent' : 'bg-bg-secondary border border-bg-cardAlt'
              }`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                  isDark ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Sign In / Sign Out */}
        <motion.div variants={itemVariants} className="pb-6 pt-1">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="btn-app w-full border border-red-200 dark:border-red-900 text-red-500 bg-red-50 dark:bg-red-950/30"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          ) : (
            <Link href="/member/login" className="btn-primary-app btn-app w-full">
              <User className="w-5 h-5" />
              Sign In
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

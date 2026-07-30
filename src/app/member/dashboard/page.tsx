'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore, useNotificationStore } from '@/lib/store';
import { events, notifications } from '@/lib/data';
import { StatCard } from '@/components/shared/StatCard';
import { formatDate, formatCurrency, getTimeAgo, getStatusColor } from '@/lib/utils';
import {
  User, CreditCard, Heart, Calendar, Brain, Sun, Bell, ArrowRight, Clock,
  Users, Activity, Medal, Gift
} from 'lucide-react';

const quickActions = [
  { icon: <User className="w-6 h-6" />, label: 'My Profile', href: '/member/profile', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'Membership Card', href: '/member/membership-card', color: 'from-amber-500/20 to-amber-600/10' },
  { icon: <Heart className="w-6 h-6" />, label: 'My Donations', href: '/member/my-donations', color: 'from-red-500/20 to-red-600/10' },
  { icon: <Calendar className="w-6 h-6" />, label: 'My Bookings', href: '/member/bookings', color: 'from-green-500/20 to-green-600/10' },
  { icon: <Brain className="w-6 h-6" />, label: 'Meditation Tracker', href: '/member/meditation', color: 'from-purple-500/20 to-purple-600/10' },
  { icon: <Sun className="w-6 h-6" />, label: 'Daily Blessings', href: '/member/blessings', color: 'from-orange-500/20 to-orange-600/10' },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { notifications: notificationList } = useNotificationStore();

  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const recentNotifications = notificationList.slice(0, 5);

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-bg-primary text-xl font-bold">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'M'}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Welcome back, {user?.name || 'Seeker'}
            </h1>
            <p className="text-text-muted text-sm">May your day be filled with divine light</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<Heart className="w-6 h-6" />} value="₹25,005" label="Total Donations" />
          <StatCard icon={<Calendar className="w-6 h-6" />} value="12" label="Events Attended" />
          <StatCard icon={<Brain className="w-6 h-6" />} value="1,240" suffix="min" label="Meditation Minutes" />
          <StatCard icon={<Sun className="w-6 h-6" />} value="45" label="Days Active" />
        </div>

        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={action.href}>
                <div className="glass-card rounded-2xl p-5 text-center group hover:shadow-[0_20px_60px_rgba(200,164,92,0.1)] transition-all duration-300 cursor-pointer">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} text-accent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <p className="text-sm font-medium text-text-secondary">{action.label}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Events
              </h2>
              <Link href="/events" className="text-accent text-sm hover:text-accent-light flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{event.title}</p>
                      <p className="text-xs text-text-muted">{formatDate(event.date)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-sm text-center py-6">No upcoming events</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                Recent Activity
              </h2>
              <Link href="/member/notifications" className="text-accent text-sm hover:text-accent-light flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {recentNotifications.length > 0 ? (
              <div className="space-y-3">
                {recentNotifications.map((notif, i) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      notif.type === 'event' ? 'bg-green-500/10 text-green-400' :
                      notif.type === 'donation' ? 'bg-red-500/10 text-red-400' :
                      notif.type === 'blessing' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {notif.type === 'event' ? <Calendar className="w-4 h-4" /> :
                       notif.type === 'donation' ? <Heart className="w-4 h-4" /> :
                       notif.type === 'blessing' ? <Sun className="w-4 h-4" /> :
                       <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary">{notif.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">{getTimeAgo(notif.createdAt)}</p>
                    </div>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Bell className="w-10 h-10 text-text-muted mx-auto mb-2" />
                <p className="text-text-muted text-sm">No recent activity</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

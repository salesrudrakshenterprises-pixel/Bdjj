'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { useNotificationStore } from '@/lib/store';
import { getTimeAgo } from '@/lib/utils';
import { Bell, Info, Calendar, Heart, Sun, CheckCheck, Trash2 } from 'lucide-react';

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  event: <Calendar className="w-5 h-5" />,
  donation: <Heart className="w-5 h-5" />,
  blessing: <Sun className="w-5 h-5" />,
  system: <Bell className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  info: 'bg-blue-500/20 text-blue-400',
  event: 'bg-amber-500/20 text-amber-400',
  donation: 'bg-rose-500/20 text-rose-400',
  blessing: 'bg-[#C8A45C]/20 text-[#C8A45C]',
  system: 'bg-purple-500/20 text-purple-400',
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationStore();

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <SectionHeading title="Notifications" subtitle="Stay updated with your spiritual journey" />
          <AnimatedCard>
            <EmptyState
              icon={<Bell className="w-10 h-10" />}
              title="No notifications yet"
              description="When you receive updates about events, blessings, and activities, they will appear here."
            />
          </AnimatedCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeading title="Notifications" subtitle="Stay updated with your spiritual journey" />

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400 text-sm">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
          </p>
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <GlowButton size="sm" onClick={markAllRead}>
                <CheckCheck className="w-4 h-4" />
                Mark All Read
              </GlowButton>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => !n.read && markRead(n.id)}
              className={`glass-card rounded-2xl p-5 flex items-start gap-4 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_32px_rgba(200,164,92,0.1)] ${
                !n.read ? 'border-[#C8A45C]/40' : 'border-transparent'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || typeColors.info}`}>
                {typeIcons[n.type] || typeIcons.info}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`text-sm ${!n.read ? 'text-white font-semibold' : 'text-gray-300'}`}>
                      {n.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{n.message}</p>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#C8A45C] flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-2">{getTimeAgo(n.createdAt)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

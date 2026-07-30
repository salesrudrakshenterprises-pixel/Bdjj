'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { StatCard } from '@/components/shared/StatCard';
import { events } from '@/lib/data';
import { formatDate, getStatusColor, getEventTypeColor } from '@/lib/utils';
import {
  Calendar, Plus, Edit, Trash2, Users, BarChart3, TrendingUp, MapPin, Globe, Monitor
} from 'lucide-react';

const statusFilters = ['All', 'upcoming', 'ongoing', 'completed', 'cancelled'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = statusFilter === 'All'
    ? events
    : events.filter((e) => e.status === statusFilter);

  const totalRegistrations = events.reduce((sum, e) => sum + e.registered, 0);
  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const avgAttendance = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

  const modeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Monitor className="h-3 w-3" />;
      case 'offline': return <MapPin className="h-3 w-3" />;
      case 'hybrid': return <Globe className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <SectionHeading title="Events Management" centered={false} />
          <GlowButton>
            <Plus className="h-4 w-4" />
            Create New Event
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard icon={<Calendar className="h-6 w-6" />} value={events.length} label="Total Events" />
          <StatCard icon={<Users className="h-6 w-6" />} value={totalRegistrations} label="Total Registrations" />
          <StatCard icon={<BarChart3 className="h-6 w-6" />} value={avgAttendance} label="Avg Attendance Rate" suffix="%" />
          <StatCard icon={<TrendingUp className="h-6 w-6" />} value={events.filter(e => e.status === 'upcoming').length} label="Upcoming Events" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-6"
        >
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                statusFilter === s
                  ? 'bg-accent text-[#1A1A2E]'
                  : 'bg-white/5 text-text-muted border border-accent/10 hover:border-accent/30'
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="glass-card rounded-xl p-5 border border-accent/5 hover:shadow-[0_10px_30px_rgba(200,164,92,0.1)] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/10">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(event.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      {modeIcon(event.mode)} {event.mode}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {event.registered}/{event.capacity}
                    </span>
                  </div>
                  <div className="mt-2 w-full max-w-xs h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all" title="Cancel">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">No {statusFilter.toLowerCase()} events found</p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

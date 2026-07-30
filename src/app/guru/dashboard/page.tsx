'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { StatCard } from '@/components/shared/StatCard';
import { events, members } from '@/lib/data';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  Users, Calendar, Clock, MessageSquare, Bell, TrendingUp, Activity,
  ArrowRight, Eye, UserPlus
} from 'lucide-react';

const quickActions = [
  {
    icon: Users,
    title: 'Manage Members',
    desc: 'View and manage all registered members',
    link: '/guru/members',
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Calendar,
    title: 'View Appointments',
    desc: 'Check and manage your appointments',
    link: '/guru/appointments',
    color: 'from-amber-500/20 to-amber-600/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: TrendingUp,
    title: 'Create Event',
    desc: 'Schedule new spiritual events',
    link: '/guru/events',
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-400',
  },
  {
    icon: MessageSquare,
    title: 'Send Message',
    desc: 'Communicate with devotees',
    link: '/guru/messages',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
  },
];

const recentMembers = [
  { name: 'Priya Sharma', date: '2024-01-15', type: 'Premium', status: 'active' },
  { name: 'Rajesh Kumar', date: '2024-02-20', type: 'Lifetime', status: 'active' },
  { name: 'Anita Desai', date: '2024-03-10', type: 'Basic', status: 'active' },
  { name: 'Vikram Patel', date: '2024-01-05', type: 'Premium', status: 'active' },
  { name: 'Sunita Verma', date: '2024-04-22', type: 'Basic', status: 'active' },
];

const upcomingEvents = events.slice(0, 4);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GuruDashboard() {
  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-3xl font-bold text-white"
              >
                Namaste, Gurudev
              </motion.h1>
              <p className="mt-2 text-text-secondary">Welcome to your spiritual dashboard</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="relative"
              >
                <Bell className="h-5 w-5 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">3</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10"
        >
          <motion.div variants={itemVariants}>
            <StatCard icon={<Users className="h-6 w-6" />} value="1,247" label="Total Members" suffix="" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<Calendar className="h-6 w-6" />} value="12" label="Upcoming Events" suffix="" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<Clock className="h-6 w-6" />} value="8" label="Pending Appointments" suffix="" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard icon={<MessageSquare className="h-6 w-6" />} value="24" label="New Messages" suffix="" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading title="Quick Actions" centered={false} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <Link key={action.title} href={action.link}>
                  <AnimatedCard delay={i * 0.1} className={`bg-gradient-to-br ${action.color} border border-accent/5`}>
                    <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10`}>
                      <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                    <p className="text-xs text-text-muted">{action.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                      Access <ArrowRight className="h-3 w-3" />
                    </div>
                  </AnimatedCard>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SectionHeading title="Upcoming Events" centered={false} />
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(200,164,92,0.1)] transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{event.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {formatDate(event.date)} | {event.time} | {event.mode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <Eye className="h-4 w-4 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link href="/guru/events">
                <GlowButton variant="ghost" size="sm">
                  View All Events <ArrowRight className="h-3 w-3" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeading title="Recent Member Registrations" centered={false} />
          <div className="glass-card rounded-2xl overflow-hidden border border-accent/5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/10 bg-accent/5">
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Name</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Date</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Membership</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Status</th>
                    <th className="text-right px-6 py-4 font-medium text-text-muted">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMembers.map((m, i) => (
                    <motion.tr
                      key={m.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border-b border-accent/5 last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
                            {m.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-white">{m.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{formatDate(m.date)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(m.type.toLowerCase())}`}>
                          {m.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <Activity className="h-3 w-3" /> {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/guru/members`} className="text-accent hover:text-accent-light text-xs font-medium transition-colors">
                          View
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

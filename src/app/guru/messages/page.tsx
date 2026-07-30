'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  MessageSquare, Send, Users, Clock, Bell, FileText, Eye, Loader2
} from 'lucide-react';

const audienceOptions = ['All Members', 'Premium', 'Basic', 'Specific Member'];

const quickTemplates = [
  'Upcoming Satsang Reminder',
  'Weekly Blessing Message',
  'Event Announcement',
  'Festival Greetings',
];

interface SentMessage {
  id: string;
  title: string;
  dateSent: string;
  audience: string;
  openRate: string;
  status: string;
}

const sentMessages: SentMessage[] = [
  { id: 'm1', title: 'Weekly Blessing - Week 12', dateSent: new Date(Date.now() - 86400000).toISOString(), audience: 'All Members', openRate: '78%', status: 'sent' },
  { id: 'm2', title: 'Satsang Reminder: Friday Evening', dateSent: new Date(Date.now() - 3 * 86400000).toISOString(), audience: 'Premium', openRate: '92%', status: 'sent' },
  { id: 'm3', title: 'New Course Announcement', dateSent: new Date(Date.now() - 7 * 86400000).toISOString(), audience: 'All Members', openRate: '65%', status: 'sent' },
  { id: 'm4', title: 'Festival of Lights Invitation', dateSent: new Date(Date.now() - 14 * 86400000).toISOString(), audience: 'All Members', openRate: '88%', status: 'sent' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MessagesPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('All Members');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SectionHeading title="Daily Messages" centered={false} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-accent" /> Send New Message
              </h3>
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">Message Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Weekly Blessing"
                    className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">Message Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Target Audience</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                      <select
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all appearance-none"
                      >
                        {audienceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#1A1A2E]">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-secondary">Schedule Date</label>
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-3 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-secondary">Time</label>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-3 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <GlowButton type="submit" loading={sending} className="w-full">
                  <Send className="h-4 w-4" />
                  {scheduleDate ? 'Schedule Message' : 'Send Message Now'}
                </GlowButton>
              </form>
            </AnimatedCard>

            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" /> Quick Message Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickTemplates.map((tpl, i) => (
                  <button
                    key={tpl}
                    onClick={() => { setTitle(tpl); }}
                    className="text-left p-3 rounded-xl border border-accent/10 bg-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all text-sm text-text-secondary"
                  >
                    <FileText className="h-4 w-4 text-accent inline mr-2" />
                    {tpl}
                  </button>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" /> Sent Messages History
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {sentMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-4 border border-accent/5 hover:shadow-[0_10px_30px_rgba(200,164,92,0.1)] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <MessageSquare className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-white text-sm truncate">{msg.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(msg.status === 'sent' ? 'completed' : 'pending')}`}>
                          {msg.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {formatDate(msg.dateSent)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {msg.audience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Open: {msg.openRate}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

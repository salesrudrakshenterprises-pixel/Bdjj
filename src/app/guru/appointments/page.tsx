'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  Calendar, Clock, Users, Video, Check, X, Plus, Edit, ChevronLeft, ChevronRight
} from 'lucide-react';

const tabs = ['All', 'Scheduled', 'Completed', 'Cancelled', 'Pending'];

interface AppointmentData {
  id: string;
  devoteeName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  notes: string;
  meetingLink?: string;
}

const appointmentsData: AppointmentData[] = [
  { id: 'a1', devoteeName: 'Priya Sharma', date: new Date(Date.now() + 86400000).toISOString(), time: '09:00', duration: 30, type: 'Spiritual', status: 'scheduled', notes: 'Seeking guidance on meditation practice', meetingLink: 'https://zoom.us/j/123' },
  { id: 'a2', devoteeName: 'Rajesh Kumar', date: new Date(Date.now() + 2 * 86400000).toISOString(), time: '14:00', duration: 45, type: 'Personal', status: 'scheduled', notes: 'Family issues discussion', meetingLink: 'https://zoom.us/j/456' },
  { id: 'a3', devoteeName: 'Anita Desai', date: new Date(Date.now() - 86400000).toISOString(), time: '11:00', duration: 30, type: 'Group', status: 'completed', notes: 'Group satsang follow-up' },
  { id: 'a4', devoteeName: 'Vikram Patel', date: new Date(Date.now() + 3 * 86400000).toISOString(), time: '16:00', duration: 60, type: 'Spiritual', status: 'pending', notes: 'Initial consultation' },
  { id: 'a5', devoteeName: 'Sunita Verma', date: new Date(Date.now() - 2 * 86400000).toISOString(), time: '10:00', duration: 30, type: 'Personal', status: 'cancelled', notes: 'Cancelled due to personal reasons' },
  { id: 'a6', devoteeName: 'Deepak Joshi', date: new Date(Date.now() + 4 * 86400000).toISOString(), time: '08:00', duration: 30, type: 'Spiritual', status: 'scheduled', notes: 'Morning blessing session', meetingLink: 'https://zoom.us/j/789' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filtered = appointmentsData.filter((a) => {
    if (activeTab === 'All') return true;
    return a.status === activeTab.toLowerCase();
  });

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const monthStr = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <SectionHeading title="Appointments" centered={false} />
          <GlowButton>
            <Plus className="h-4 w-4" />
            Schedule New Appointment
          </GlowButton>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <AnimatedCard>
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h3 className="font-display font-semibold text-white">{monthStr}</h3>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div key={d} className="text-xs text-text-muted py-2">{d}</div>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const today = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();
                  const hasAppointment = appointmentsData.some(
                    (a) => new Date(a.date).getDate() === day && new Date(a.date).getMonth() === currentMonth.getMonth()
                  );
                  return (
                    <button
                      key={day}
                      className={`relative p-2 rounded-lg text-xs transition-all ${
                        today
                          ? 'bg-accent text-[#1A1A2E] font-bold'
                          : 'text-text-secondary hover:bg-accent/10 hover:text-white'
                      }`}
                    >
                      {day}
                      {hasAppointment && !today && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex gap-2 flex-wrap mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-accent text-[#1A1A2E]'
                      : 'bg-white/5 text-text-muted border border-accent/10 hover:border-accent/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filtered.map((appt, i) => (
                <motion.div
                  key={appt.id}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-5 border border-accent/5 hover:shadow-[0_10px_30px_rgba(200,164,92,0.1)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/10">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-white">{appt.devoteeName}</h3>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(appt.status)}`}>
                          {appt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatDate(appt.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {appt.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {appt.duration} min
                        </span>
                        <span className="text-accent font-medium">{appt.type}</span>
                      </div>
                      {appt.notes && (
                        <p className="mt-2 text-xs text-text-muted italic">{appt.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {appt.meetingLink && (
                        <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                          <GlowButton variant="outline" size="sm">
                            <Video className="h-3 w-3" /> Join
                          </GlowButton>
                        </a>
                      )}
                      <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No {activeTab.toLowerCase()} appointments</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

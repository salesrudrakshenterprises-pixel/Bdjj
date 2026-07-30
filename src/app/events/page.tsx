'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Tag, Filter, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { events } from '@/lib/data';
import { formatDate, formatCurrency, getEventTypeColor } from '@/lib/utils';

const eventTypes = ['All', 'Satsang', 'Meditation', 'Workshop', 'Festival', 'Retreat'] as const;
type EventType = (typeof eventTypes)[number];

const typeValueMap: Record<string, string> = {
  All: 'all',
  Satsang: 'satsang',
  Meditation: 'meditation',
  Workshop: 'workshop',
  Festival: 'festival',
  Retreat: 'retreat',
};

const modeColors: Record<string, string> = {
  online: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  offline: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  hybrid: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventType>('All');

  const filteredEvents =
    activeFilter === 'All'
      ? events
      : events.filter((e) => e.type === typeValueMap[activeFilter]);

  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="hero-gradient pointer-events-none absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="section-heading">
              <span className="text-gradient">Spiritual Events</span>
            </h1>
            <p className="section-subtitle mx-auto mt-4 max-w-2xl">
              Join us for transformative gatherings, sacred ceremonies, and spiritual retreats
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="container mx-auto">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <Filter className="mr-1 h-4 w-4 text-accent" />
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === type
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'glass text-text-secondary hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
            >
              {filteredEvents.map((event, index) => {
                const capacityPercent = Math.round(
                  (event.registered / event.capacity) * 100,
                );
                const isFree = event.price === 0;
                return (
                  <AnimatedCard key={event.id} delay={index * 0.08}>
                    <div className="flex h-full flex-col">
                      <div className="relative mb-4 overflow-hidden rounded-xl">
                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5">
                          <Calendar className="h-16 w-16 text-accent/30" />
                        </div>
                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getEventTypeColor(event.type)}`}
                        >
                          {event.type}
                        </span>
                        <span
                          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize ${modeColors[event.mode] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {event.mode}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold">{event.title}</h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                        {event.description}
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Calendar className="h-3.5 w-3.5 text-accent" />
                          <span>{formatDate(event.date)}</span>
                          <Clock className="ml-2 h-3.5 w-3.5 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3 border-t border-accent/10 pt-4">
                        <div className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 text-accent" />
                          {isFree ? (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                              Free
                            </span>
                          ) : (
                            <span className="text-sm font-bold text-accent">
                              {formatCurrency(event.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {event.registered}/{event.capacity}
                          </span>
                          <span>{capacityPercent}% filled</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-accent/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${capacityPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.08 }}
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <GlowButton size="sm">
                          {isFree ? 'Register Now' : 'Register Now'}{' '}
                          <ChevronRight className="h-4 w-4" />
                        </GlowButton>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <Calendar className="mx-auto h-16 w-16 text-text-muted" />
              <p className="mt-4 text-text-muted">No upcoming events in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

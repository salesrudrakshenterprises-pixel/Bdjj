'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, BookOpen, Heart, Calendar, Image, Music, Users, MapPin, ArrowRight, ChevronRight, Star, Clock } from 'lucide-react';
import { events } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const categories = [
  { name: 'Satsang', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { name: 'Meditation', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { name: 'Workshop', icon: Music, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { name: 'Festival', icon: Sparkles, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
  { name: 'Retreat', icon: MapPin, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30' },
  { name: 'Ceremony', icon: Heart, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
];

const categoryChips = ['All', 'Satsang', 'Meditation', 'Workshop', 'Festival', 'Retreat', 'Ceremony', 'Online'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const todayBlessing = {
  title: 'The Light Within',
  message: 'Just as a lamp dispels darkness, the light of divine knowledge dispels the ignorance of the soul.',
  scripture: 'Bhagavad Gita 10.11',
};

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  return (
    <div className="app-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {/* Search */}
        <motion.div variants={itemVariants} className="pt-2 pb-4">
          <div className="app-card-glass flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search blessings, events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-[15px]"
            />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <button className="section-action">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="app-card p-4 flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.bg}`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-text-primary text-center leading-tight">{cat.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Featured */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Today&apos;s Featured</h2>
            <button className="section-action">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
          <div className="hero-card hero-gradient p-6 text-white">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 fill-white/80" />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Daily Blessing</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">{todayBlessing.title}</h3>
              <p className="text-sm text-white/85 leading-relaxed mb-3">{todayBlessing.message}</p>
              <p className="text-xs text-white/60 italic">{todayBlessing.scripture}</p>
              <Link
                href="/blessings"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Explore by Category */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Explore by Category</h2>
            <button className="section-action">See All</button>
          </div>
          <div className="scroll-x">
            {categoryChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeChip === chip
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-bg-secondary text-text-secondary'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Popular Events */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Popular Events</h2>
            <Link href="/events" className="section-action">
              See All <ChevronRight className="w-3.5 h-3.5 inline" />
            </Link>
          </div>
          <div className="space-y-3 pb-4">
            {events.slice(0, 2).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="app-card p-4 flex gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge badge-gold">{event.type}</span>
                      <span className="badge badge-soft">{event.mode}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary truncate">{event.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted self-center flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
